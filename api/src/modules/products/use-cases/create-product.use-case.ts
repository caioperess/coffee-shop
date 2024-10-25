import type { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { IProductsRepository } from '../repositories/products.repository'

type ProductCreateBody = Prisma.Args<typeof prisma.product, 'create'>['data']

export class CreateProductUseCase {
	constructor(private readonly productsRepository: IProductsRepository) {}

	async execute({ name, description, photo_url, price }: ProductCreateBody) {
		const product = await this.productsRepository.create({
			name,
			description,
			photo_url,
			price,
		})

		return product
	}
}
