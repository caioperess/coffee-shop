import type { ICheckoutsRepository } from '../repositories/checkout.repository.js'
import { InMemoryCheckoutsRepository } from '../repositories/in-memory/in-memory-checkout.repository.js'
import { FetchUserOrdersUseCase } from './fetch-user-orders-use-case.js'

let checkoutsRepository: ICheckoutsRepository
let sut: FetchUserOrdersUseCase

describe('Fetch User Orders Use Case', () => {
	beforeEach(() => {
		checkoutsRepository = new InMemoryCheckoutsRepository()
		sut = new FetchUserOrdersUseCase(checkoutsRepository)
	})

	it('should be able to fetch user orders', async () => {
		await checkoutsRepository.create({
			id: 'checkout-1',
			user_id: 'user-1',
			cart_id: 'cart-1',
			total_price: 10,
		})

		const { checkouts } = await sut.execute({
			userId: 'user-1',
		})

		expect(checkouts).toHaveLength(1)
		expect(Number(checkouts[0].total_price)).toEqual(10)
	})
})
