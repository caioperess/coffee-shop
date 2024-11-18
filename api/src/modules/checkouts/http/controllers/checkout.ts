import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { CheckoutUseCase } from '../../use-cases/checkout-use-case.js'

export async function CheckoutController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const checkoutBodySchema = z.object({
		cartId: z.string(),
		totalPrice: z.number(),
	})

	const { cartId, totalPrice } = checkoutBodySchema.parse(req.body)

	const userId = req.user.sub

	const checkoutUseCase = container.resolve(CheckoutUseCase)

	await checkoutUseCase.execute({ userId, cartId, totalPrice })

	reply.status(200).send()
}
