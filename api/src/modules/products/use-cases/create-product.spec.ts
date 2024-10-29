import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products.repository.js'
import { CreateProductUseCase } from './create-product.use-case.js'

let productsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Case', () => {
	beforeEach(() => {
		productsRepository = new InMemoryProductsRepository()
		sut = new CreateProductUseCase(productsRepository)
	})

	it('should be able to create a new product', async () => {
		const product = await sut.execute({
			name: 'Product 1',
			description: 'Description 1',
			photo_url: 'https://example.com/photo1.jpg',
			price: 10,
		})

		expect(product).toHaveProperty('id')
		expect(product.id).toEqual(expect.any(String))
	})
})
