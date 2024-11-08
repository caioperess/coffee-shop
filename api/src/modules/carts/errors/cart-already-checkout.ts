export class CartAlreadyCheckoutError extends Error {
	constructor() {
		super('Cart already checkout')
	}
}
