import type { CartItems } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import type { ICartItemsRepository } from '../repositories/cart-item.repository.js'
import type { ICartsRepository } from '../repositories/cart.repository.js'

interface FetchCartItemsUseCaseParams {
	userId: string
}

interface FetchCartItemsUseCaseResponse {
	cartItems: CartItems[]
}

@injectable()
export class FetchCartItemsUseCase {
	constructor(
		@inject('cartItemsRepository')
		private readonly cartsItemsRepository: ICartItemsRepository,
		@inject('cartsRepository')
		private readonly cartsRepository: ICartsRepository,
	) {}

	async execute({
		userId,
	}: FetchCartItemsUseCaseParams): Promise<FetchCartItemsUseCaseResponse> {
		const cart = await this.cartsRepository.findActiveCartByUserId(userId)

		if (!cart) {
			return { cartItems: [] }
		}

		const cartItems = await this.cartsItemsRepository.findManyByCartId(cart.id)

		return { cartItems }
	}
}
