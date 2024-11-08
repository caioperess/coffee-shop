import './providers.js'

import { container } from 'tsyringe'

import { PrismaProductsRepository } from '@/modules/products/repositories/prisma/prisma-product.repository.js'
import type { IProductsRepository } from '@/modules/products/repositories/products.repository.js'
import { PrismaUsersRepository } from '@/modules/users/repositories/prisma/users-prisma.repository.js'
import type { IUsersRepository } from '@/modules/users/repositories/users.repository.js'

container.registerSingleton<IProductsRepository>(
	'productsRepository',
	PrismaProductsRepository,
)

container.registerSingleton<IUsersRepository>(
	'usersRepository',
	PrismaUsersRepository,
)
