import type { FastifyInstance } from 'fastify'
import { createProductController } from '../controllers/create.controller'

export async function productsRoutes(app: FastifyInstance) {
	app.post('/', createProductController)
}
