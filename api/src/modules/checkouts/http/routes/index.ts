import { verifyJwt } from '@/shared/http/middlewares/verify-jwt.js'
import type { FastifyInstance } from 'fastify'
import { CheckoutController } from '../controllers/checkout.js'
import { FetchUserOrdersController } from '../controllers/fetch-user-orders.js'

export async function checkoutRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/', FetchUserOrdersController)
	app.post('/', CheckoutController)
}
