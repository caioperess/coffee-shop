import { CustomError } from '@/shared/errors/index.js'

export class CartAlreadyCheckoutError extends CustomError {
	constructor() {
		super('Cart already checkout', 400)
	}
}
