import type { IProductsRepository } from '@/modules/products/repositories/products.repository.js'
import { EntityNotFoundError } from '@/shared/errors/entity-not-found.js'
import { inject, injectable } from 'tsyringe'
import type { ICartsRepository } from '../repositories/cart.repository.js'

interface AddItemToCartUseCaseParams {
	userId: string
	item: {
		id: string
		quantity: number
		price: number
	}
}

@injectable()
export class AddItemToCartUseCase {
	constructor(
		@inject('cartsRepository')
		private readonly cartsRepository: ICartsRepository,
		@inject('productsRepository')
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

		const cartItem = await this.cartsRepository.findItemByIdAndCartId(
			item.id,
			cart.id,
		)

		if (cartItem) {
			const newQuantity = cartItem.quantity + item.quantity

			await this.cartsRepository.updateItemQuantity(cartItem.id, newQuantity)
		} else {
			await this.cartsRepository.addItem({
				price: item.price,
				quantity: item.quantity,
				cart_id: cart.id,
				product_id: item.id,
			})
		}
	}
}
