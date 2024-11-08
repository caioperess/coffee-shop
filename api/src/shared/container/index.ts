import './providers.js'

import { container } from 'tsyringe'

import type { ICartItemsRepository } from '@/modules/carts/repositories/cart-item.repository.js'
import type { ICartsRepository } from '@/modules/carts/repositories/cart.repository.js'
import { PrismaCartItemsRepository } from '@/modules/carts/repositories/prisma/prisma-cart-items.repository.js'
import { PrismaCartsRepository } from '@/modules/carts/repositories/prisma/prisma-cart.repository.js'
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

container.registerSingleton<ICartsRepository>(
	'cartsRepository',
	PrismaCartsRepository,
)

container.registerSingleton<ICartItemsRepository>(
	'cartItemsRepository',
	PrismaCartItemsRepository,
)
