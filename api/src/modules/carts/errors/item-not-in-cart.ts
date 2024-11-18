import { CustomError } from '@/shared/errors/index.js'

export class ItemDoesNotExistsOnCartError extends CustomError {
	constructor() {
		super('Item does not exists on cart.', 404)
	}
}
