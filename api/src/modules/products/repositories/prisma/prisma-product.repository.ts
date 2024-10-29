import { prisma } from '@/lib/prisma.js'
import type { Prisma, Product } from '@prisma/client'
import type { IProductsRepository } from '../products.repository.js'

export class PrismaProductsRepository implements IProductsRepository {
	async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
		const product = await prisma.product.create({ data })

		return product
	}

	async findById(id: string): Promise<Product | null> {
		return await prisma.product.findUnique({ where: { id } })
	}

	async findMany(): Promise<Product[]> {
		return await prisma.product.findMany()
	}

	async save(data: Product): Promise<Product> {
		const product = await prisma.product.update({
			where: { id: data.id },
			data,
		})

		return product
	}
}
