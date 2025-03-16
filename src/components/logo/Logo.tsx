'use client'

import { DARK_THEME } from '@/constants/theme.constants'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  href?: string
  type?: 'file' | 'text'
  logo?: string
  darkLogo?: string
  lightLogo?: string
  logoAlt?: string
}

const Logo = ({
  width = 150,
  height = 150,
  className = '',
  href = '/',
  type = 'text',
  logo = 'logo',
  darkLogo = '/logo/logo-dark.svg',
  lightLogo = '/logo/logo-light.svg',
  logoAlt = 'Логотип компании',
}: LogoProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Функция для проверки текущей темы
  const checkTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme')
    setIsDarkTheme(theme === DARK_THEME)
  }

  useEffect(() => {
    setMounted(true)

    // Проверяем текущую тему при монтировании
    checkTheme()

    // Создаем MutationObserver для отслеживания изменений атрибута data-theme
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          checkTheme()
        }
      })
    })

    // Начинаем наблюдение за изменениями атрибута data-theme
    observer.observe(document.documentElement, { attributes: true })

    // Очищаем наблюдатель при размонтировании
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Link href={href}>
      {type === 'text' ? (
        <div
          {...(className ? { className } : {})}
          dangerouslySetInnerHTML={{ __html: logo }}
        />
      ) : (
        <Image
          src={isDarkTheme ? darkLogo : lightLogo}
          alt={logoAlt}
          width={width}
          height={height}
          priority
          {...(className ? { className } : {})}
        />
      )}
    </Link>
  )
}

export default Logo
