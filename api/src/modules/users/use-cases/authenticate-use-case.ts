import type { IHashProvider } from '@/shared/providers/hash/index.js'
import { inject, injectable } from 'tsyringe'
import { InvalidCredentialsError } from '../errors/invalid-credentials.js'
import type { IUsersRepository } from '../repositories/users.repository.js'

interface AuthenticateUseCaseParams {
	email: string
	password: string
}

@injectable()
export class AuthenticateUseCase {
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

	async execute({ email, password }: AuthenticateUseCaseParams) {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await this.hashProvider.compare(
			password,
			user.password_hash,
		)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return { user }
	}
}
