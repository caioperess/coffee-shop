import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { FetchUserUseCase } from '../../use-cases/fetch-user-use-case.js'

export async function FetchUserController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = req.user.sub

	const fetchUserUseCase = container.resolve(FetchUserUseCase)

	const { user } = await fetchUserUseCase.execute({ userId })

	reply.status(200).send({ user: { ...user, password_hash: undefined } })
}
