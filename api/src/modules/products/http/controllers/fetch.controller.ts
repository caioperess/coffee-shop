import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { FetchProductsUseCase } from '../../use-cases/fetch-products-use-case.js'

export async function FetchProductsController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchProductUseCase = container.resolve(FetchProductsUseCase)

	const { products } = await fetchProductUseCase.execute()

	return reply.status(200).send({ products })
}
