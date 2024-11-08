import { verifyJwt } from '@/shared/http/middlewares/verify-jwt.js'
import type { FastifyInstance } from 'fastify'
import { CreateProductController } from '../controllers/create.controller.js'
import { FetchProductsController } from '../controllers/fetch.controller.js'

export async function productsRoutes(app: FastifyInstance) {
	app.get('/', FetchProductsController)
	app.post('/', { preHandler: [verifyJwt] }, CreateProductController)
}
