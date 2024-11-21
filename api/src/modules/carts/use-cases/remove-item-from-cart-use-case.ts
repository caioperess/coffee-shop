import { inject, injectable } from 'tsyringe'
import { ItemDoesNotExistsOnCartError } from '../errors/item-not-in-cart.js'
import { UserHasNoCartError } from '../errors/user-has-no-cart.js'
import type { ICartsRepository } from '../repositories/cart.repository.js'

interface RemoveItemFromCartUseCaseParams {
	userId: string
	itemId: string
}

@injectable()
export class RemoveItemFromCartUseCase {
	constructor(
		@inject('cartsRepository')
		private readonly cartsRepository: ICartsRepository,
	) {}

	async execute({ userId, itemId }: RemoveItemFromCartUseCaseParams) {
		const cart = await this.cartsRepository.findActiveCartByUserId(userId)

		if (!cart) {
			throw new UserHasNoCartError()
		}

		const cartItem = cart.CartItems.find((item) => item.id === itemId)

		if (!cartItem) {
			throw new ItemDoesNotExistsOnCartError()
		}

		await this.cartsRepository.removeItem(itemId)
	}
}
