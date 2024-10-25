import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import z from 'zod'
import { CreateProductUseCase } from '../../use-cases/create-product.use-case'

export async function createProductController(
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

	const createCarUseCase = container.resolve(CreateProductUseCase)

	const product = await createCarUseCase.execute({
		name,
		description,
		photo_url,
		price,
	})

	return reply.status(201).send(product)
}
