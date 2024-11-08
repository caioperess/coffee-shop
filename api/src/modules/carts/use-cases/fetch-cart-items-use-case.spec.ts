import type { ICartItemsRepository } from '../repositories/cart-item.repository.js'
import type { ICartsRepository } from '../repositories/cart.repository.js'
import { InMemoryCartItemsRepository } from '../repositories/in-memory/in-memory-cart-item.repository.js'
import { InMemoryCartRepository } from '../repositories/in-memory/in-memory-cart.repository.js'
import { FetchCartItemsUseCase } from './fetch-cart-items-use-case.js'

let cartItemsRepository: ICartItemsRepository
let cartsRepository: ICartsRepository
let sut: FetchCartItemsUseCase

describe('Fetch Cart Items Use Case', () => {
	beforeEach(() => {
		cartItemsRepository = new InMemoryCartItemsRepository()
		cartsRepository = new InMemoryCartRepository()
		sut = new FetchCartItemsUseCase(cartItemsRepository, cartsRepository)
	})

	it('should be able to fetch cart items', async () => {
		const cart = await cartsRepository.create({
			id: 'cart-1',
			user_id: 'user-1',
		})

		await cartItemsRepository.create({
			id: 'cart-item-1',
			price: 10,
			quantity: 1,
			cart_id: cart.id,
			product_id: 'product-1',
		})

		const { cartItems } = await sut.execute({ userId: 'user-1' })

		expect(cartItems).toHaveLength(1)
		expect(cartItems[0].id).toEqual('cart-item-1')
	})

	it('should return an empty array if user does not have an active cart', async () => {
		const { cartItems } = await sut.execute({ userId: 'user-1' })

		expect(cartItems).toHaveLength(0)
	})
})
