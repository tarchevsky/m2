import styles from './Burger.module.scss'
import { useState } from 'react'
import cn from 'clsx'
import {BurgerProps} from "@/types";

const Burger = ({ toggleMenu }: BurgerProps) => {
	const [isActive, setIsActive] = useState(false)
	const toggleIsActive = () => {
		setIsActive(!isActive)

		toggleMenu()
	}

	return (
		<button
			className={cn(
				styles.burger,
				'block md:hidden absolute w-[30px] h-[20px] inset-y-1/2 right-6 -translate-y-1/2 cursor-pointer z-20'
			)}
			aria-label='Open the menu'
			onClick={toggleIsActive}
		>
			<div
				className={`${styles.inner} ${isActive ? styles.active : ''} relative z-20 top-0 start-0 h-full`}
			>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</button>
	)
}

export default Burger
