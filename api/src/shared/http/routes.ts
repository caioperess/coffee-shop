import { productsRoutes } from '@/modules/products/http/routes/index.js'
import { usersRoutes } from '@/modules/users/http/routes/index.js'
import type { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
	app.register(productsRoutes, { prefix: '/products' })
	app.register(usersRoutes, { prefix: '/users' })
}
