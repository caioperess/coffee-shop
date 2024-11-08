import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { FetchCartItemsUseCase } from '../../use-cases/fetch-cart-items-use-case.js'

export async function FetchCartItemController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = req.user.sub

	const fetchCartItemsUseCase = container.resolve(FetchCartItemsUseCase)

	const { cartItems } = await fetchCartItemsUseCase.execute({ userId })

	reply.status(200).send({ cartItems })
}
