import { UserHasNoCartError } from '../errors/user-has-no-cart.js'
import type { ICartsRepository } from '../repositories/cart.repository.js'
import { InMemoryCartRepository } from '../repositories/in-memory/in-memory-cart.repository.js'
import { FetchCartItemsUseCase } from './fetch-cart-items-use-case.js'

let cartsRepository: ICartsRepository
let sut: FetchCartItemsUseCase

describe('Fetch Cart Items Use Case', () => {
	beforeEach(() => {
		cartsRepository = new InMemoryCartRepository()
		sut = new FetchCartItemsUseCase(cartsRepository)
	})

	it('should be able to fetch cart items', async () => {
		const cart = await cartsRepository.create({
			id: 'cart-1',
			user_id: 'user-1',
		})

		await cartsRepository.addItem({
			id: 'cart-item-1',
			price: 10,
			quantity: 1,
			cart_id: cart.id,
			product_id: 'product-1',
		})

		const { cart: cartWithItems } = await sut.execute({ userId: 'user-1' })

		expect(cartWithItems.CartItems).toHaveLength(1)
		expect(cartWithItems.CartItems[0].id).toEqual('cart-item-1')
	})

	it('should return error if user has no active cart', async () => {
		await expect(() =>
			sut.execute({ userId: 'user-1' }),
		).rejects.toBeInstanceOf(UserHasNoCartError)
	})
})
