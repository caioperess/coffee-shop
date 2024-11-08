import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AddItemToCartUseCase } from '../../use-cases/add-item-to-cart-use-case.js'

export async function AddItemToCartController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const addItemBodySchema = z.object({
		id: z.string(),
		quantity: z.number(),
		price: z.number(),
	})

	const item = addItemBodySchema.parse(req.body)

	const userId = req.user.sub

	const addItemToCartUseCase = container.resolve(AddItemToCartUseCase)

	await addItemToCartUseCase.execute({ userId, item })

	reply.status(200).send()
}
