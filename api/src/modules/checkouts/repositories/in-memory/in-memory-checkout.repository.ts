import type { Order, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'
import type { ICheckoutsRepository } from '../checkout.repository.js'

export class InMemoryCheckoutsRepository implements ICheckoutsRepository {
	private readonly checkouts: Order[] = []

	async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
		const checkout: Order = {
			id: data.id ?? randomUUID(),
			cart_id: data.cart_id,
			user_id: data.user_id,
			total_price: new Decimal(data.total_price.toString()),
			status: 'PENDING',
			created_at: new Date(),
		}

		this.checkouts.push(checkout)

		return checkout
	}

	async findManyByUserId(userId: string): Promise<Order[]> {
		return this.checkouts.filter((checkout) => checkout.user_id === userId)
	}
}
