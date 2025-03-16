import {ReactNode} from "react";

export interface ModalProps {
	message?: string
	children?: ReactNode
}

export interface ModalHandle {
	showModal: () => void
}
