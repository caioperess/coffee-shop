import { verifyJwt } from '@/shared/http/middlewares/verify-jwt.js'
import type { FastifyInstance } from 'fastify'
import { AddItemToCartController } from '../controllers/add-item.js'
import { FetchCartItemController } from '../controllers/fetch-cart-item.js'
import { RemoveItemFromCartController } from '../controllers/remove-item.js'

export async function cartRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/', FetchCartItemController)
	app.post('/', AddItemToCartController)
	app.delete('/:itemId', RemoveItemFromCartController)
}
