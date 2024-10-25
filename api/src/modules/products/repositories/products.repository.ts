import type { Prisma, Product } from '@prisma/client'

export interface IProductsRepository {
	create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
	findById(id: string): Promise<Product | null>
	findMany(): Promise<Product[]>
	save(data: Product): Promise<Product>
}
