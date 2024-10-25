import { InMemoryProductsRepository } from '@/modules/products/repositories/in-memory/in-memory-products.repository'
import type { IProductsRepository } from '@/modules/products/repositories/products.repository'
import { container } from 'tsyringe'

container.registerSingleton<IProductsRepository>(
	'productsRepository',
	InMemoryProductsRepository,
)
