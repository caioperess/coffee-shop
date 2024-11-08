import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { CreateUserUseCase } from '../../use-cases/create-user-use-case.js'

export async function CreateUserController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const createBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { name, email, password } = createBodySchema.parse(req.body)

	const createUserUseCase = container.resolve(CreateUserUseCase)

	await createUserUseCase.execute({ name, email, password })

	reply.status(201).send()
}
