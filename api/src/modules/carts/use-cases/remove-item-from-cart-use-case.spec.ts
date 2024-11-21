import { ItemDoesNotExistsOnCartError } from '../errors/item-not-in-cart.js'
import { UserHasNoCartError } from '../errors/user-has-no-cart.js'
import type { ICartsRepository } from '../repositories/cart.repository.js'
import { InMemoryCartRepository } from '../repositories/in-memory/in-memory-cart.repository.js'
import { RemoveItemFromCartUseCase } from './remove-item-from-cart-use-case.js'

let cartsRepository: ICartsRepository
let sut: RemoveItemFromCartUseCase

describe('Remove Item from Cart Use Case', () => {
	beforeEach(() => {
		cartsRepository = new InMemoryCartRepository()
		sut = new RemoveItemFromCartUseCase(cartsRepository)
	})

	it('should be able to remove an item from cart', async () => {
		const cart = await cartsRepository.create({
			id: 'cart-1',
			user_id: 'user-1',
		})

		const cartItem = await cartsRepository.addItem({
			id: 'cart-item-1',
			price: 10,
			quantity: 1,
			cart_id: cart.id,
			product_id: 'product-1',
		})

		await sut.execute({ userId: 'user-1', itemId: cartItem.id })

		const cartWithItems = await cartsRepository.findById(cart.id)

		expect(cartWithItems?.CartItems).toHaveLength(0)
	})

	it('should not be able to remove an item from cart if cart does not exists', async () => {
		await expect(() =>
			sut.execute({ userId: 'user-1', itemId: 'item-1' }),
		).rejects.toBeInstanceOf(UserHasNoCartError)
	})

	it('should not be able to remove an item from cart if item does not exists', async () => {
		await cartsRepository.create({
			user_id: 'user-1',
		})

		await expect(() =>
			sut.execute({ userId: 'user-1', itemId: 'item-1' }),
		).rejects.toBeInstanceOf(ItemDoesNotExistsOnCartError)
	})
})
