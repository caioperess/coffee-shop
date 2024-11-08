import type { CartItems, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'
import type { ICartItemsRepository } from '../cart-item.repository.js'

export class InMemoryCartItemsRepository implements ICartItemsRepository {
	private readonly cartItems: CartItems[] = []

	async create(data: Prisma.CartItemsUncheckedCreateInput): Promise<CartItems> {
		const cartItem: CartItems = {
			id: data.id ?? randomUUID(),
			price: new Decimal(Number(data.price)),
			quantity: data.quantity,
			cart_id: data.cart_id,
			product_id: data.product_id,
		}

		this.cartItems.push(cartItem)

		return cartItem
	}

	async save(data: CartItems): Promise<CartItems> {
		const cartItemIndex = this.cartItems.findIndex(
			(cartItem) => cartItem.id === data.id,
		)

		this.cartItems[cartItemIndex] = data

		return data
	}

	async findByCartIdAndItemId(
		cartId: string,
		itemId: string,
	): Promise<CartItems | null> {
		return (
			this.cartItems.find(
				(cartItem) =>
					cartItem.cart_id === cartId && cartItem.product_id === itemId,
			) ?? null
		)
	}

	async findById(cartItemId: string): Promise<CartItems | null> {
		return this.cartItems.find((cartItem) => cartItem.id === cartItemId) ?? null
	}

	async findManyByCartId(cartId: string): Promise<CartItems[]> {
		return this.cartItems.filter((cartItem) => cartItem.cart_id === cartId)
	}

	async delete(itemId: string): Promise<void> {
		const cartItemIndex = this.cartItems.findIndex(
			(cartItem) => cartItem.id === itemId,
		)

		this.cartItems.splice(cartItemIndex, 1)
	}
}
