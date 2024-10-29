import { Prisma, type Product } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import type { IProductsRepository } from '../products.repository.js'

export class InMemoryProductsRepository implements IProductsRepository {
	private readonly products: Product[] = []

	async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
		const product = {
			id: randomUUID(),
			name: data.name,
			description: data.description,
			photo_url: data.photo_url,
			price: new Prisma.Decimal(data.price.toString()),
			created_at: new Date(),
			updated_at: new Date(),
		}

		this.products.push(product)

		return product
	}

	async findById(id: string): Promise<Product | null> {
		return this.products.find((product) => product.id === id) ?? null
	}

	async findMany(): Promise<Product[]> {
		return this.products
	}

	async save(data: Product): Promise<Product> {
		const productIndex = this.products.findIndex(
			(product) => product.id === data.id,
		)

		this.products[productIndex] = data

		return this.products[productIndex]
	}
}
