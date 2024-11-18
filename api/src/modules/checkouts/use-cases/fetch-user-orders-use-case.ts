import { inject, injectable } from 'tsyringe'
import type { ICheckoutsRepository } from '../repositories/checkout.repository.js'

interface FetchOrdersUseCaseParams {
	userId: string
}

@injectable()
export class FetchUserOrdersUseCase {
	constructor(
		@inject('checkoutsRepository')
		private readonly checkoutsRepository: ICheckoutsRepository,
	) {}

	async execute({ userId }: FetchOrdersUseCaseParams) {
		const checkouts = await this.checkoutsRepository.findManyByUserId(userId)

		return { checkouts }
	}
}
