import { CustomError } from '@/shared/errors/index.js'

export class CartNotFoundError extends CustomError {
	constructor() {
		super('Cart not found', 404)
	}
}
