import type { prisma } from '@/lib/prisma.js'
import type { Prisma } from '@prisma/client'

import { inject, injectable } from 'tsyringe'
import type { IProductsRepository } from '../repositories/products.repository.js'

type ProductCreateBody = Prisma.Args<typeof prisma.product, 'create'>['data']

@injectable()
export class CreateProductUseCase {
	constructor(
		@inject('productsRepository')
		private readonly productsRepository: IProductsRepository,
	) {}

	async execute({ name, description, photo_url, price }: ProductCreateBody) {
		const product = await this.productsRepository.create({
			name,
			description,
			photo_url,
			price,
		})

		return { product }
	}
}
