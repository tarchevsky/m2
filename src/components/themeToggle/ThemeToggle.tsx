import { ThemeToggleProps } from '@/types'
import { useEffect, useState } from 'react'
import {DARK_THEME, THEME} from "@/constants/theme.constants";

const ThemeToggle = ({ className }: ThemeToggleProps) => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) {
			document.documentElement.setAttribute('data-theme', savedTheme)
			setIsDarkMode(savedTheme === DARK_THEME)
		}
	}, [])

	const toggleTheme = () => {
		const newTheme = isDarkMode ? THEME : DARK_THEME
		localStorage.setItem('theme', newTheme)
		document.documentElement.setAttribute('data-theme', newTheme)
		setIsDarkMode(!isDarkMode)
	}
	return (
		<label className='flex items-center cursor-pointer gap-2 h-12 md:h-auto'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='20'
				height='20'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<circle cx='12' cy='12' r='5' />
				<path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
			</svg>
			<input
				type='checkbox'
				value={DARK_THEME}
				name='themeToggle'
				aria-label='Переключатель темы'
				className='toggle theme-controller'
				checked={isDarkMode}
				onChange={toggleTheme}
			/>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='20'
				height='20'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
			</svg>
		</label>
	)
}

export default ThemeToggle
