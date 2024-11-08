import { EntityNotFoundError } from '@/shared/errors/entity-not-found.js'
import { inject, injectable } from 'tsyringe'
import type { IUsersRepository } from '../repositories/users.repository.js'

interface FetchUserUseCaseParams {
	userId: string
}

@injectable()
export class FetchUserUseCase {
	private readonly usersRepository: IUsersRepository

	constructor(
		@inject('usersRepository')
		usersRepository: IUsersRepository,
	) {
		this.usersRepository = usersRepository
	}

	async execute({ userId }: FetchUserUseCaseParams) {
		const user = await this.usersRepository.findById(userId)

		if (!user) {
			throw new EntityNotFoundError()
		}

		return { user }
	}
}
