/**
 * Утилита для тестирования Incremental Static Regeneration (ISR)
 *
 * Эта утилита позволяет проверить работу ISR в Next.js:
 * 1. Отображением времени последней генерации страницы
 * 2. Вспомогательными методами для тестирования регенерации
 */

// Сохраняем время генерации для всех страниц
const pageGenerationTimes: Record<string, string> = {}

/**
 * Добавляет или обновляет время генерации для определенной страницы
 * @param pageId Уникальный идентификатор страницы
 * @returns Строка с временем генерации в ISO формате
 */
export function recordGenerationTime(pageId: string): string {
  const timestamp = new Date().toISOString()
  pageGenerationTimes[pageId] = timestamp

  // Также выводим в консоль для отладки
  console.log(`[ISR] Страница ${pageId} сгенерирована в: ${timestamp}`)

  return timestamp
}

/**
 * Возвращает время последней генерации страницы
 * @param pageId Уникальный идентификатор страницы
 * @returns Строка с временем генерации в ISO формате или сообщение, если время не найдено
 */
export function getLastGenerationTime(pageId: string): string {
  return pageGenerationTimes[pageId] || 'Время генерации не записано'
}

/**
 * Форматирует время для удобного отображения
 * @param isoTime Время в ISO формате
 * @returns Отформатированная строка времени
 */
export function formatGenerationTime(isoTime: string): string {
  if (isoTime === 'Время генерации не записано') return isoTime

  try {
    const date = new Date(isoTime)
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date)
  } catch (e) {
    return isoTime
  }
}

/**
 * Хелпер для проверки, была ли страница реально ревалидирована
 */
export async function triggerRevalidation(path: string): Promise<boolean> {
  try {
    // В Next.js 14+ можно использовать API роуты для ревалидации
    const response = await fetch(
      `/api/revalidate?path=${encodeURIComponent(path)}`,
    )
    return response.ok
  } catch (error) {
    console.error('Ошибка при вызове ревалидации:', error)
    return false
  }
}
