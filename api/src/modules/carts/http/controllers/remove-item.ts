import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { RemoveItemFromCartUseCase } from '../../use-cases/remove-item-from-cart-use-case.js'

export async function RemoveItemFromCartController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const validateCheckInParamsSchema = z.object({
		itemId: z.string().uuid(),
	})

	const { itemId } = validateCheckInParamsSchema.parse(req.params)

	const userId = req.user.sub

	const removeItemFromCartUseCase = container.resolve(RemoveItemFromCartUseCase)

	await removeItemFromCartUseCase.execute({ userId, itemId })

	reply.status(200).send()
}
