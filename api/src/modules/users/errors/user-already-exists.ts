import { CustomError } from '@/shared/errors/index.js'

export class UserAlreadyExistsError extends CustomError {
	constructor() {
		super('User already exists.', 409)
	}
}
