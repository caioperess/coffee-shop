import { CustomError } from '@/shared/errors/index.js'

export class UserHasNoCartError extends CustomError {
	constructor() {
		super('User has no active cart.', 404)
	}
}
