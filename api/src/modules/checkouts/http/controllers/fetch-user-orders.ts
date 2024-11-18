import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { FetchUserOrdersUseCase } from '../../use-cases/fetch-user-orders-use-case.js'

export async function FetchUserOrdersController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = req.user.sub

	const fetchUserOrdersUseCase = container.resolve(FetchUserOrdersUseCase)

	const { checkouts } = await fetchUserOrdersUseCase.execute({ userId })

	reply.status(200).send({ orders: checkouts })
}
