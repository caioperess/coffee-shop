import { prisma } from '@/lib/prisma.js'
import type { Order, Prisma } from '@prisma/client'
import type { ICheckoutsRepository } from '../checkout.repository.js'

export class PrismaCheckoutsRepository implements ICheckoutsRepository {
	async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
		const order = await prisma.order.create({ data })

		return order
	}

	async findManyByUserId(userId: string): Promise<Order[]> {
		const checkouts = await prisma.order.findMany({
			where: { user_id: userId },
		})

		return checkouts
	}
}
