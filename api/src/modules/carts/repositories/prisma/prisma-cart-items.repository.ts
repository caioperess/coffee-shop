import { prisma } from '@/lib/prisma.js'
import type { CartItems, Prisma } from '@prisma/client'
import type { ICartItemsRepository } from '../cart-item.repository.js'

export class PrismaCartItemsRepository implements ICartItemsRepository {
	async create(data: Prisma.CartItemsUncheckedCreateInput): Promise<CartItems> {
		const cartItem = await prisma.cartItems.create({ data })

		return cartItem
	}

	async delete(itemId: string): Promise<void> {
		await prisma.cartItems.delete({ where: { id: itemId } })
	}

	async save(data: CartItems): Promise<CartItems> {
		const cartItem = await prisma.cartItems.update({
			where: { id: data.id },
			data,
		})

		return cartItem
	}

	async findById(cartItemId: string): Promise<CartItems | null> {
		const cartItem = await prisma.cartItems.findFirst({
			where: { id: cartItemId },
		})

		return cartItem
	}

	async findByCartIdAndItemId(
		cartId: string,
		itemId: string,
	): Promise<CartItems | null> {
		const cartItem = await prisma.cartItems.findFirst({
			where: { cart_id: cartId, product_id: itemId },
		})

		return cartItem
	}

	async findManyByCartId(cartId: string): Promise<CartItems[]> {
		const cartItems = await prisma.cartItems.findMany({
			where: { cart_id: cartId },
		})

		return cartItems
	}
}
