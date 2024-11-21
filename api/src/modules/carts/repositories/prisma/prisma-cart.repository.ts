import { prisma } from '@/lib/prisma.js'
import type { CartItems, Prisma } from '@prisma/client'
import type { ICartWithItemsDAO } from '../../dtos/cart-with-items-dao.js'
import type { ICartsRepository } from '../cart.repository.js'

export class PrismaCartsRepository implements ICartsRepository {
	async create(
		data: Prisma.CartUncheckedCreateInput,
	): Promise<ICartWithItemsDAO> {
		return await prisma.cart.create({ data, include: { CartItems: true } })
	}

	async checkout(cartId: string): Promise<void> {
		await prisma.cart.update({
			where: { id: cartId },
			data: { status: 'CHECKOUT' },
		})
	}

	async findActiveCartByUserId(
		userId: string,
	): Promise<ICartWithItemsDAO | null> {
		const cart = await prisma.cart.findFirst({
			where: { user_id: userId, status: 'ACTIVE' },
			include: { CartItems: true },
		})

		return cart
	}

	async findById(id: string): Promise<ICartWithItemsDAO | null> {
		const cart = await prisma.cart.findUnique({
			where: { id },
			include: { CartItems: true },
		})

		return cart
	}

	async findItemByIdAndCartId(
		productId: string,
		cartId: string,
	): Promise<CartItems | null> {
		return prisma.cartItems.findFirst({
			where: { product_id: productId, cart_id: cartId },
		})
	}

	async addItem(
		data: Prisma.CartItemsUncheckedCreateInput,
	): Promise<CartItems> {
		const cart_item = await prisma.cartItems.create({ data })

		return cart_item
	}

	async removeItem(cartItemId: string): Promise<void> {
		await prisma.cartItems.delete({ where: { id: cartItemId } })
	}

	async updateItemQuantity(
		itemId: string,
		quantity: number,
	): Promise<CartItems> {
		const cart_item = await prisma.cartItems.update({
			where: { id: itemId },
			data: { quantity },
		})

		return cart_item
	}
}
