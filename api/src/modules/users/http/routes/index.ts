import { verifyJwt } from '@/shared/http/middlewares/verify-jwt.js'
import type { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../controllers/authenticate.js'
import { CreateUserController } from '../controllers/create.js'
import { FetchUserController } from '../controllers/fetch-user.js'

export function usersRoutes(app: FastifyInstance) {
	app.post('/session/authenticate', AuthenticateController)
	app.post('/', CreateUserController)
	app.get('/', { preHandler: [verifyJwt] }, FetchUserController)
}
