'use client'

import { formatGenerationTime } from '@/utils/isr-helpers'
import { useEffect, useState } from 'react'

/**
 * Компонент для отображения времени генерации страницы
 * Полезен для тестирования работы ISR
 */
export default function IsrDebugIndicator({
  pageId,
  serverGenerationTime,
  className = 'p-2 bg-gray-100 text-xs text-gray-600',
  showOnlyInDevelopment = true,
}: {
  pageId: string
  serverGenerationTime?: string
  className?: string
  showOnlyInDevelopment?: boolean
}) {
  const [timestamp, setTimestamp] = useState<string>('')

  useEffect(() => {
    // Используем серверное время, если оно передано
    const generationTime = serverGenerationTime || new Date().toISOString()

    setTimestamp(formatGenerationTime(generationTime))

    // Создаем элемент в консоли браузера для удобства отладки
    console.group('ISR Debug Info')
    console.log(`Страница: ${pageId}`)
    console.log(`Время генерации: ${generationTime}`)
    console.log(`Formatted: ${formatGenerationTime(generationTime)}`)
    console.groupEnd()
  }, [pageId, serverGenerationTime])

  // Не показываем в production, если установлен флаг
  if (showOnlyInDevelopment && process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className={className}>
      <span>🔄 Страница сгенерирована: {timestamp}</span>
    </div>
  )
}
