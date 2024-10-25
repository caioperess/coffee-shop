import type { FastifyInstance } from 'fastify'

import { productsRoutes } from '@/modules/products/http/routes'

export async function appRoutes(app: FastifyInstance) {
	app.register(productsRoutes, { prefix: '/products' })
}
