import { jwtConfig } from '@/config/jwt.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AuthenticateUseCase } from '../../use-cases/authenticate-use-case.js'

export async function AuthenticateController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { email, password } = authenticateBodySchema.parse(req.body)

	const authenticateUseCase = container.resolve(AuthenticateUseCase)

	const { user } = await authenticateUseCase.execute({ email, password })

	const token = await reply.jwtSign(
		{},
		{
			sign: { sub: user.id },
		},
	)

	const refreshToken = await reply.jwtSign(
		{},
		{
			sign: { sub: user.id, expiresIn: jwtConfig.refresh_expiration_time },
		},
	)

	reply
		.setCookie('refreshToken', refreshToken, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.status(200)
		.send({ token })
}
