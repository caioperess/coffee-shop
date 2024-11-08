import { inject, injectable } from 'tsyringe'
import type { IProductsRepository } from '../repositories/products.repository.js'

@injectable()
export class FetchProductsUseCase {
	constructor(
		@inject('productsRepository')
		private readonly productsRepository: IProductsRepository,
	) {}

	async execute() {
		const products = await this.productsRepository.findMany()

		return { products }
	}
}
