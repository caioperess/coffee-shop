import { randomUUID } from 'node:crypto'

import type { Cart, CartItems, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import type { ICartWithItemsDAO } from '../../dtos/cart-with-items-dao.js'
import type { ICartsRepository } from '../cart.repository.js'

export class InMemoryCartRepository implements ICartsRepository {
	private readonly carts: Cart[] = []
	private readonly cartItems: CartItems[] = []

	async create(
		data: Prisma.CartUncheckedCreateInput,
	): Promise<ICartWithItemsDAO> {
		const cart: Cart = {
			id: data.id ?? randomUUID(),
			status: data.status ?? 'ACTIVE',
			user_id: data.user_id,
			created_at: new Date(),
			updated_at: new Date(),
		}

		this.carts.push(cart)

		return { ...cart, CartItems: [] }
	}

	async checkout(cartId: string): Promise<void> {
		const cartIndex = this.carts.findIndex((cart) => cart.id === cartId)

		this.carts[cartIndex].status = 'CHECKOUT'
	}

	async findActiveCartByUserId(
		userId: string,
	): Promise<ICartWithItemsDAO | null> {
		const cart = this.carts.find(
			(cart) => cart.user_id === userId && cart.status === 'ACTIVE',
		)

		if (!cart) return null

		const cartItems = this.cartItems.filter(
			(cartItem) => cartItem.cart_id === cart.id,
		)

		return { ...cart, CartItems: cartItems }
	}

	async findById(id: string): Promise<ICartWithItemsDAO | null> {
		const cart = this.carts.find((cart) => cart.id === id)

		if (!cart) return null

		const cartItems = this.cartItems.filter(
			(cartItem) => cartItem.cart_id === cart.id,
		)

		return { ...cart, CartItems: cartItems }
	}

	async findItemByIdAndCartId(
		productId: string,
		cartId: string,
	): Promise<CartItems | null> {
		const cartItem = this.cartItems.find(
			(item) => item.product_id === productId && item.cart_id === cartId,
		)

		return cartItem ?? null
	}

	async addItem(
		data: Prisma.CartItemsUncheckedCreateInput,
	): Promise<CartItems> {
		const cartItem: CartItems = {
			id: data.id ?? randomUUID(),
			price: new Decimal(data.price.toString()),
			cart_id: data.cart_id,
			product_id: data.product_id,
			quantity: data.quantity,
		}

		this.cartItems.push(cartItem)

		return cartItem
	}

	async removeItem(cartItemId: string): Promise<void> {
		const cartItemIndex = this.cartItems.findIndex(
			(item) => item.id === cartItemId,
		)

		this.cartItems.splice(cartItemIndex, 1)
	}

	async updateItemQuantity(
		itemId: string,
		quantity: number,
	): Promise<CartItems> {
		const cartItemIndex = this.cartItems.findIndex((item) => item.id === itemId)

		this.cartItems[cartItemIndex] = {
			...this.cartItems[cartItemIndex],
			quantity,
		}

		return this.cartItems[cartItemIndex]
	}
}
