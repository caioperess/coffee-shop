import type { ICartsRepository } from '@/modules/carts/repositories/cart.repository.js'
import { InMemoryCartRepository } from '@/modules/carts/repositories/in-memory/in-memory-cart.repository.js'
import { CartNotFoundError } from '../errors/cart-not-found.js'
import type { ICheckoutsRepository } from '../repositories/checkout.repository.js'
import { InMemoryCheckoutsRepository } from '../repositories/in-memory/in-memory-checkout.repository.js'
import { CheckoutUseCase } from './checkout-use-case.js'

let checkoutsRepository: ICheckoutsRepository
let cartsRepository: ICartsRepository
let sut: CheckoutUseCase

describe('Checkout Use Case', () => {
	beforeEach(() => {
		checkoutsRepository = new InMemoryCheckoutsRepository()
		cartsRepository = new InMemoryCartRepository()
		sut = new CheckoutUseCase(checkoutsRepository, cartsRepository)
	})

	it('should be able to create a checkout', async () => {
		const cart = await cartsRepository.create({
			id: 'cart-1',
			user_id: 'user-1',
		})

		const { checkout } = await sut.execute({
			cartId: cart.id,
			userId: 'user-1',
			totalPrice: 10,
		})

		expect(checkout).toHaveProperty('id')
		expect(checkout.id).toEqual(expect.any(String))
	})

	it('should not be able to create a checkout if cart does not exist', async () => {
		await expect(() =>
			sut.execute({
				cartId: 'cart-1',
				userId: 'user-1',
				totalPrice: 10,
			}),
		).rejects.toBeInstanceOf(CartNotFoundError)
	})
})
