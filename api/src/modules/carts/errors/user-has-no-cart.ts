export class UserHasNoCartError extends Error {
	constructor() {
		super('User has no active cart.')
	}
}
