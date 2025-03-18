'use client'

import { formatGenerationTime, recordGenerationTime } from '@/utils/isr-helpers'
import { useEffect, useState } from 'react'

/**
 * Компонент для отображения времени генерации страницы
 * Полезен для тестирования работы ISR
 */
export default function IsrDebugIndicator({
  pageId,
  className = 'p-2 bg-gray-100 text-xs text-gray-600',
  showOnlyInDevelopment = true,
}: {
  pageId: string
  className?: string
  showOnlyInDevelopment?: boolean
}) {
  const [timestamp, setTimestamp] = useState<string>('')

  useEffect(() => {
    // На клиенте записываем и показываем время генерации
    const generationTime = recordGenerationTime(pageId)
    setTimestamp(formatGenerationTime(generationTime))

    // Создаем элемент в консоли браузера для удобства отладки
    console.group('ISR Debug Info')
    console.log(`Страница: ${pageId}`)
    console.log(`Время генерации: ${generationTime}`)
    console.log(`Formatted: ${formatGenerationTime(generationTime)}`)
    console.groupEnd()
  }, [pageId])

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
