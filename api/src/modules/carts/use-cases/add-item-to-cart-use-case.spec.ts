import { InMemoryProductsRepository } from '@/modules/products/repositories/in-memory/in-memory-products.repository.js'
import type { IProductsRepository } from '@/modules/products/repositories/products.repository.js'
import { EntityNotFoundError } from '@/shared/errors/entity-not-found.js'
import { CartStatus } from '@prisma/client'
import type { ICartItemsRepository } from '../repositories/cart-item.repository.js'
import type { ICartsRepository } from '../repositories/cart.repository.js'
import { InMemoryCartItemsRepository } from '../repositories/in-memory/in-memory-cart-item.repository.js'
import { InMemoryCartRepository } from '../repositories/in-memory/in-memory-cart.repository.js'
import { AddItemToCartUseCase } from './add-item-to-cart-use-case.js'

let cartItemsRepository: ICartItemsRepository
let cartsRepository: ICartsRepository
let productsRepository: IProductsRepository
let sut: AddItemToCartUseCase

describe('Add Item to Cart Use Case', () => {
	beforeEach(() => {
		cartItemsRepository = new InMemoryCartItemsRepository()
		cartsRepository = new InMemoryCartRepository()
		productsRepository = new InMemoryProductsRepository()
		sut = new AddItemToCartUseCase(
			cartItemsRepository,
			cartsRepository,
			productsRepository,
		)
	})

	it('should be able to add an item to cart', async () => {
		const product = await productsRepository.create({
			name: 'Product 1',
			description: 'Description 1',
			photo_url: 'https://example.com/photo1.jpg',
			price: 10,
		})

		await sut.execute({
			userId: 'user-1',
			item: {
				id: product.id,
				price: Number(product.price),
				quantity: 1,
			},
		})

		const cart = await cartsRepository.findActiveCartByUserId('user-1')

		const cartItems = await cartItemsRepository.findManyByCartId(cart?.id ?? '')

		expect(cartItems).toHaveLength(1)
		expect(cartItems[0].product_id).toEqual(product.id)
		expect(cartItems[0].quantity).toEqual(1)
	})

	it('should be able to update an item quantity if item already exists in cart', async () => {
		const product = await productsRepository.create({
			name: 'Product 1',
			description: 'Description 1',
			photo_url: 'https://example.com/photo1.jpg',
			price: 10,
		})

		await sut.execute({
			userId: 'user-1',
			item: {
				id: product.id,
				price: Number(product.price),
				quantity: 1,
			},
		})

		await sut.execute({
			userId: 'user-1',
			item: {
				id: product.id,
				price: Number(product.price),
				quantity: 4,
			},
		})

		const cart = await cartsRepository.findActiveCartByUserId('user-1')

		const cartItems = await cartItemsRepository.findManyByCartId(cart?.id ?? '')

		expect(cartItems).toHaveLength(1)
		expect(cartItems[0].product_id).toEqual(product.id)
		expect(cartItems[0].quantity).toEqual(5)
	})

	it('should not be able to add an item to cart if product does not exists', async () => {
		await expect(() =>
			sut.execute({
				userId: 'test_user_id',
				item: {
					id: 'test_product_id',
					price: 10,
					quantity: 1,
				},
			}),
		).rejects.toBeInstanceOf(EntityNotFoundError)
	})

	it('should be able to create a cart if user does not have an existent one', async () => {
		const product = await productsRepository.create({
			name: 'Product 1',
			description: 'Description 1',
			photo_url: 'https://example.com/photo1.jpg',
			price: 10,
		})

		await sut.execute({
			userId: 'user-1',
			item: {
				id: product.id,
				price: Number(product.price),
				quantity: 1,
			},
		})

		const cart = await cartsRepository.findActiveCartByUserId('user-1')

		expect(cart).toHaveProperty('id')
		expect(cart?.id).toEqual(expect.any(String))
		expect(cart?.status).toEqual(CartStatus.ACTIVE)
		expect(cart?.user_id).toEqual('user-1')
	})
})
