import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products.repository.js'
import type { IProductsRepository } from '../repositories/products.repository.js'
import { FetchProductsUseCase } from './fetch-products-use-case.js'

let productsRepository: IProductsRepository
let sut: FetchProductsUseCase

describe('Fetch Product Use Case', () => {
	beforeEach(() => {
		productsRepository = new InMemoryProductsRepository()
		sut = new FetchProductsUseCase(productsRepository)
	})

	it('should be able to fetch a list of products', async () => {
		await productsRepository.create({
			name: 'Product 1',
			description: 'Description 1',
			photo_url: 'https://example.com/photo1.jpg',
			price: 10,
		})

		const { products } = await sut.execute()

		expect(products).toHaveLength(1)
		expect(products[0].name).toEqual('Product 1')
	})
})
