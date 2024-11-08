import type { Cart, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import type { ICartsRepository } from '../cart.repository.js'

export class InMemoryCartRepository implements ICartsRepository {
	private readonly carts: Cart[] = []

	async create(data: Prisma.CartUncheckedCreateInput): Promise<Cart> {
		const cart: Cart = {
			id: data.id ?? randomUUID(),
			status: 'ACTIVE',
			created_at: new Date(),
			updated_at: new Date(),
			user_id: data.user_id,
		}

		this.carts.push(cart)

		return cart
	}

	async checkout(cartId: string): Promise<void> {
		const cartIndex = this.carts.findIndex((cart) => cart.id === cartId)

		this.carts[cartIndex].status = 'CHECKOUT'
	}

	async findActiveCartByUserId(userId: string): Promise<Cart | null> {
		const cart = this.carts.find(
			(cart) => cart.status === 'ACTIVE' && cart.user_id === userId,
		)

		return cart ?? null
	}

	async findById(id: string): Promise<Cart | null> {
		const cart = this.carts.find((cart) => cart.id === id)

		return cart ?? null
	}
}
