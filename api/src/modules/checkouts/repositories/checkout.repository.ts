import type { Order, Prisma } from '@prisma/client'

export interface ICheckoutsRepository {
	create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
	findManyByUserId(userId: string): Promise<Order[]>
}
