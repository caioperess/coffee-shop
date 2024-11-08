import { CustomError } from './index.js'

export class EntityNotFoundError extends CustomError {
	constructor() {
		super('Entity not found', 404)
	}
}
