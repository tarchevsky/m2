'use client'

import Burger from '@/components/burger/Burger'
import Logo from '@/components/logo/Logo'
import cn from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Header.module.scss'

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { path: '/', label: 'Главная' },
    { path: '/contacts', label: 'Контакты' },
  ]

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive)
  }

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuActive])

  return (
    <header className="cont relative flex justify-between md:justify-between items-center">
      <Logo className="my-4 flex flex-col justify-center z-20" type="file" />
      <nav
        className={cn(
          { [styles.active]: isMenuActive },
          'fixed md:static z-10 w-full h-full md:w-auto md:h-auto end-0 bottom-0 -translate-y-full md:translate-y-0 opacity-0 md:opacity-100 transition-all duration-300 ease-out',
        )}
      >
        <ul
          tabIndex={0}
          className="absolute md:static menu flex-nowrap gap-5 md:menu-horizontal start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 md:translate-x-0"
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={cn(
                styles.item,
                'block text-center opacity-0 md:opacity-100',
              )}
            >
              <Link
                className="px-[10px] btn btn-ghost font-normal"
                href={item.path}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Burger toggleMenu={toggleMenu} />
    </header>
  )
}

export default Header
