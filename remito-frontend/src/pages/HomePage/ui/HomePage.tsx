import { Advantages } from '@/widgets/Advantages'
import { Brands } from '@/widgets/Brands'
import { FAQ } from '@/widgets/FAQ'
import { FormSend } from '@/widgets/FormSend'
import { Hero } from '@/widgets/Hero'
import { How } from '@/widgets/How'
import { Products } from '@/widgets/Products'
import { Reviews } from '@/widgets/Reviews'
import { Services } from '@/widgets/Services'

export function HomePage() {
	return (
		<>
			<Hero />
			<Advantages />
			<Services />
			<How />
			<Products />
			{/* <Reviews /> */}
			<Brands />
			<FAQ />
			{/* <FormSend /> */}
		</>
	)
}
