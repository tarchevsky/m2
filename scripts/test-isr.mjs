#!/usr/bin/env node

/**
 * Скрипт для тестирования ISR ревалидации
 *
 * Использование:
 * node scripts/test-isr.mjs [путь] [секретный_токен]
 *
 * Примеры:
 * node scripts/test-isr.mjs / - ревалидация главной страницы
 * node scripts/test-isr.mjs /category-slug - ревалидация страницы категории
 */

import fetch from 'node-fetch'
import { setTimeout } from 'timers/promises'

// Конфигурация по умолчанию
const config = {
  baseUrl: process.env.SITE_URL || 'http://localhost:3000',
  pathToRevalidate: process.argv[2] || '/',
  secret: process.argv[3] || 'your-secret-token',
  maxRetries: 3,
  retryDelay: 1000,
}

// Функция для форматирования строки
function formatLogMessage(message, type = 'info') {
  const colors = {
    info: '\x1b[36m', // Голубой
    success: '\x1b[32m', // Зеленый
    error: '\x1b[31m', // Красный
    warning: '\x1b[33m', // Желтый
    reset: '\x1b[0m', // Сброс цвета
  }

  return `${colors[type]}[${type.toUpperCase()}]${colors.reset} ${message}`
}

// Главная функция
async function testISR() {
  console.log(
    formatLogMessage(
      `Начинаем тестирование ISR для пути: ${config.pathToRevalidate}`,
    ),
  )

  // Проверяем доступность страницы перед ревалидацией
  try {
    const pageUrl = `${config.baseUrl}${config.pathToRevalidate}`
    console.log(formatLogMessage(`Проверяем доступность страницы: ${pageUrl}`))

    const pageResponse = await fetch(pageUrl)
    if (!pageResponse.ok) {
      throw new Error(
        `Страница недоступна: ${pageResponse.status} ${pageResponse.statusText}`,
      )
    }

    console.log(
      formatLogMessage('Страница доступна, проверяем кеш заголовки...'),
    )

    // Проверяем заголовки кеширования
    const cacheControl = pageResponse.headers.get('cache-control')
    console.log(
      formatLogMessage(`Cache-Control: ${cacheControl || 'не установлен'}`),
    )

    // Теперь вызываем API ревалидации
    const revalidateUrl = `${config.baseUrl}/api/revalidate?path=${encodeURIComponent(config.pathToRevalidate)}&secret=${config.secret}`
    console.log(formatLogMessage(`Вызываем API ревалидации: ${revalidateUrl}`))

    let success = false
    let retries = 0

    while (!success && retries < config.maxRetries) {
      try {
        const revalidateResponse = await fetch(revalidateUrl)
        const revalidateData = await revalidateResponse.json()

        if (revalidateResponse.ok && revalidateData.revalidated) {
          console.log(
            formatLogMessage(
              `Ревалидация успешна: ${revalidateData.message}`,
              'success',
            ),
          )
          console.log(
            formatLogMessage(
              `Временная метка: ${revalidateData.timestamp}`,
              'success',
            ),
          )
          success = true
        } else {
          throw new Error(
            revalidateData.message || 'Неизвестная ошибка ревалидации',
          )
        }
      } catch (error) {
        retries++
        console.log(
          formatLogMessage(
            `Ошибка при ревалидации (попытка ${retries}/${config.maxRetries}): ${error.message}`,
            'error',
          ),
        )

        if (retries < config.maxRetries) {
          console.log(
            formatLogMessage(
              `Повторная попытка через ${config.retryDelay}мс...`,
              'warning',
            ),
          )
          await setTimeout(config.retryDelay)
        }
      }
    }

    if (!success) {
      console.log(
        formatLogMessage(
          'Не удалось выполнить ревалидацию после нескольких попыток',
          'error',
        ),
      )
      process.exit(1)
    }

    // Проверяем страницу после ревалидации
    console.log(formatLogMessage('Проверяем страницу после ревалидации...'))
    const newPageResponse = await fetch(pageUrl, { cache: 'no-store' })

    if (newPageResponse.ok) {
      console.log(
        formatLogMessage(
          'Страница успешно загружена после ревалидации',
          'success',
        ),
      )
      const newCacheControl = newPageResponse.headers.get('cache-control')
      console.log(
        formatLogMessage(
          `Новый Cache-Control: ${newCacheControl || 'не установлен'}`,
        ),
      )

      console.log(
        formatLogMessage('Тестирование ISR успешно завершено!', 'success'),
      )
    } else {
      console.log(
        formatLogMessage(
          `Ошибка при проверке страницы после ревалидации: ${newPageResponse.status} ${newPageResponse.statusText}`,
          'error',
        ),
      )
    }
  } catch (error) {
    console.log(
      formatLogMessage(
        `Ошибка при тестировании ISR: ${error.message}`,
        'error',
      ),
    )
    process.exit(1)
  }
}

// Запускаем тестирование
testISR()
