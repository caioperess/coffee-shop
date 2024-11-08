import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import z from 'zod'

import { CreateProductUseCase } from '../../use-cases/create-product.use-case.js'

export async function CreateProductController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const createBodySchema = z.object({
		name: z.string(),
		description: z.string(),
		photo_url: z.string(),
		price: z.number(),
	})

	const { name, description, photo_url, price } = createBodySchema.parse(
		req.body,
	)

	const createProductUseCase = container.resolve(CreateProductUseCase)

	await createProductUseCase.execute({
		name,
		description,
		photo_url,
		price,
	})

	return reply.status(201).send()
}
