import { cartRoutes } from '@/modules/carts/http/routes/index.js'
import { checkoutRoutes } from '@/modules/checkouts/http/routes/index.js'
import { productsRoutes } from '@/modules/products/http/routes/index.js'
import { usersRoutes } from '@/modules/users/http/routes/index.js'
import type { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
	app.register(productsRoutes, { prefix: '/products' })
	app.register(usersRoutes, { prefix: '/users' })
	app.register(cartRoutes, { prefix: '/carts' })
	app.register(checkoutRoutes, { prefix: '/orders' })
}
