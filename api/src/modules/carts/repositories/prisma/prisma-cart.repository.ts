import { prisma } from '@/lib/prisma.js'
import type { Cart, Prisma } from '@prisma/client'
import type { ICartsRepository } from '../cart.repository.js'

export class PrismaCartsRepository implements ICartsRepository {
	async create(data: Prisma.CartUncheckedCreateInput): Promise<Cart> {
		const cart = await prisma.cart.create({ data })

		return cart
	}

	async checkout(cartId: string): Promise<void> {
		await prisma.cart.update({
			where: { id: cartId },
			data: { status: 'CHECKOUT' },
		})
	}

	async findActiveCartByUserId(userId: string): Promise<Cart | null> {
		const cart = await prisma.cart.findFirst({
			where: { user_id: userId, status: 'ACTIVE' },
		})

		return cart
	}

	async findById(id: string): Promise<Cart | null> {
		const cart = await prisma.cart.findFirst({ where: { id } })

		return cart
	}
}
