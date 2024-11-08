import type { IHashProvider } from '@/shared/providers/hash/index.js'
import { inject, injectable } from 'tsyringe'
import { UserAlreadyExistsError } from '../errors/user-already-exists.js'
import type { IUsersRepository } from '../repositories/users.repository.js'

interface CreateUserUseCaseParams {
	name: string
	email: string
	password: string
}

@injectable()
export class CreateUserUseCase {
	private readonly usersRepository: IUsersRepository
	private readonly hashProvider: IHashProvider

	constructor(
		@inject('usersRepository')
		usersRepository: IUsersRepository,
		@inject('hashProvider')
		hashProvider: IHashProvider,
	) {
		this.usersRepository = usersRepository
		this.hashProvider = hashProvider
	}

	async execute({ name, email, password }: CreateUserUseCaseParams) {
		const userAlreadyExists = await this.usersRepository.findByEmail(email)

		if (userAlreadyExists) {
			throw new UserAlreadyExistsError()
		}

		const password_hash = await this.hashProvider.hash(password, 6)

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash,
		})

		return { user }
	}
}
