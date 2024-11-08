import fastify from 'fastify'

import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { jwtConfig } from './config/jwt.js'
import { env } from './env/index.js'
import { CustomError } from './shared/errors/index.js'
import { appRoutes } from './shared/http/routes.js'

const app = fastify()

app.register(appRoutes)
app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: { expiresIn: jwtConfig.expiration_time },
})
app.register(fastifyCookie)

app.setErrorHandler((err, _, reply) => {
	if (err instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error.',
			issues: err.format(),
		})
	}

	if (err instanceof CustomError) {
		return reply.status(err.statusCode).send({
			message: err.message,
		})
	}

	if (env.NODE_ENV !== 'production') {
		console.error(err)
	}

	return reply.status(500).send({
		message: 'Internal server error.',
	})
})

export { app }
