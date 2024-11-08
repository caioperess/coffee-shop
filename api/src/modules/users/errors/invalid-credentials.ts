import { CustomError } from '@/shared/errors/index.js'

export class InvalidCredentialsError extends CustomError {
	constructor() {
		super('Invalid credentials', 401)
	}
}
