import type { FastifyInstance } from 'fastify'
import { createProductController } from '../controllers/create.controller.js'

export async function productsRoutes(app: FastifyInstance) {
	app.post('/', createProductController)
}
