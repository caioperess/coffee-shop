import type { ICartsRepository } from '@/modules/carts/repositories/cart.repository.js'
import { inject, injectable } from 'tsyringe'
import { CartNotFoundError } from '../errors/cart-not-found.js'
import type { ICheckoutsRepository } from '../repositories/checkout.repository.js'

interface CheckoutUseCaseParams {
	userId: string
	cartId: string
}

@injectable()
export class CheckoutUseCase {
	constructor(
		@inject('checkoutsRepository')
		private readonly checkoutsRepository: ICheckoutsRepository,
		@inject('cartsRepository')
		private readonly cartsRepository: ICartsRepository,
	) {}

	async execute({ cartId, userId }: CheckoutUseCaseParams) {
		const cart = await this.cartsRepository.findById(cartId)

		if (!cart) {
			throw new CartNotFoundError()
		}

		const totalPrice = cart.CartItems.reduce(
			(acc, item) => acc + Number(item.price) * item.quantity,
			0,
		)

		await this.cartsRepository.checkout(cartId)
		const checkout = await this.checkoutsRepository.create({
			user_id: userId,
			cart_id: cartId,
			total_price: totalPrice,
		})

		return { checkout }
	}
}
