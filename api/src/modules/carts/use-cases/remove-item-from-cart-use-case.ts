import { ItemDoesNotExistsOnCartError } from '../errors/item-not-in-cart.js'
import { UserHasNoCartError } from '../errors/user-has-no-cart.js'
import type { ICartItemsRepository } from '../repositories/cart-item.repository.js'
import type { ICartsRepository } from '../repositories/cart.repository.js'

interface RemoveItemFromCartUseCaseParams {
	userId: string
	itemId: string
}

export class RemoveItemFromCartUseCase {
	constructor(
		private readonly cartItemsRepository: ICartItemsRepository,
		private readonly cartsRepository: ICartsRepository,
	) {}

	async execute({ userId, itemId }: RemoveItemFromCartUseCaseParams) {
		const cart = await this.cartsRepository.findActiveCartByUserId(userId)

		if (!cart) {
			throw new UserHasNoCartError()
		}

		const cartItem = await this.cartItemsRepository.findById(itemId)

		if (!cartItem) {
			throw new ItemDoesNotExistsOnCartError()
		}

		await this.cartItemsRepository.delete(itemId)
	}
}
