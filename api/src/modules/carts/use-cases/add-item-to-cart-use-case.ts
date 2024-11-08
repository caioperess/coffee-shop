import type { IProductsRepository } from '@/modules/products/repositories/products.repository.js'
import { EntityNotFoundError } from '@/shared/errors/entity-not-found.js'
import type { ICartItemsRepository } from '../repositories/cart-item.repository.js'
import type { ICartsRepository } from '../repositories/cart.repository.js'

interface AddItemToCartUseCaseParams {
	userId: string
	item: {
		id: string
		quantity: number
		price: number
	}
}

export class AddItemToCartUseCase {
	constructor(
		private readonly cartItemsRepository: ICartItemsRepository,
		private readonly cartsRepository: ICartsRepository,
		private readonly productsRepository: IProductsRepository,
	) {}

	async execute({ userId, item }: AddItemToCartUseCaseParams) {
		const product = await this.productsRepository.findById(item.id)

		if (!product) {
			throw new EntityNotFoundError()
		}

		let cart = await this.cartsRepository.findActiveCartByUserId(userId)

		if (!cart) {
			cart = await this.cartsRepository.create({ user_id: userId })
		}

		const doesItemAlreadyAdded =
			await this.cartItemsRepository.findByCartIdAndItemId(cart.id, item.id)

		if (doesItemAlreadyAdded) {
			const updatedItemQuantity = {
				...doesItemAlreadyAdded,
				quantity: doesItemAlreadyAdded.quantity + item.quantity,
			}

			await this.cartItemsRepository.save(updatedItemQuantity)
		} else {
			await this.cartItemsRepository.create({
				price: item.price,
				quantity: item.quantity,
				cart_id: cart.id,
				product_id: item.id,
			})
		}
	}
}
