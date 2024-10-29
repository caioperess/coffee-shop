import bcrypt from 'bcrypt'

import type { User } from '@prisma/client'
import type { IUsersRepository } from '../repositories/users.repository.js'

interface CreateUserUseCaseParams {
	name: string
	email: string
	password: string
}

export class CreateUserUseCase {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute({
		name,
		email,
		password,
	}: CreateUserUseCaseParams): Promise<User> {
		const userAlreadyExists = await this.usersRepository.findByEmail(email)

		if (userAlreadyExists) {
			throw new Error('User already exists.')
		}

		const password_hash = await bcrypt.hash(password, 6)

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash,
		})

		return user
	}
}
