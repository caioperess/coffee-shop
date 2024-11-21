import { inject, injectable } from 'tsyringe'
import type { ICartWithItemsDAO } from '../dtos/cart-with-items-dao.js'
import { UserHasNoCartError } from '../errors/user-has-no-cart.js'
import type { ICartsRepository } from '../repositories/cart.repository.js'

interface FetchCartItemsUseCaseParams {
	userId: string
}

interface FetchCartItemsUseCaseResponse {
	cart: ICartWithItemsDAO
}

@injectable()
export class FetchCartItemsUseCase {
	constructor(
		@inject('cartsRepository')
		private readonly cartsRepository: ICartsRepository,
	) {}

	async execute({
		userId,
	}: FetchCartItemsUseCaseParams): Promise<FetchCartItemsUseCaseResponse> {
		const cart = await this.cartsRepository.findActiveCartByUserId(userId)

		if (!cart) {
			throw new UserHasNoCartError()
		}

		return { cart }
	}
}
