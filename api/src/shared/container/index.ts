import { PrismaProductsRepository } from '@/modules/products/repositories/prisma/prisma-product.repository.js'
import type { IProductsRepository } from '@/modules/products/repositories/products.repository.js'
import { container } from 'tsyringe'

container.registerSingleton<IProductsRepository>(
	'productsRepository',
	PrismaProductsRepository,
)
