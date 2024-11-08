export class ItemDoesNotExistsOnCartError extends Error {
	constructor() {
		super('Item does not exists on cart.')
	}
}
