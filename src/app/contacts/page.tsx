import type {Metadata} from "next";
import Htag from "@/components/Htag/Htag";

export const metadata: Metadata = {
	title: 'Контакты',
}

export default function ContactsPage() {
	return (
		<div className='cont'>
			<Htag tag='h1'>Страница контакты</Htag>
		</div>
	)
}
