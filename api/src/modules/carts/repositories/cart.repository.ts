import type { CartItems, Prisma } from '@prisma/client'
import type { ICartWithItemsDAO } from '../dtos/cart-with-items-dao.js'

export interface ICartsRepository {
	create(data: Prisma.CartUncheckedCreateInput): Promise<ICartWithItemsDAO>
	checkout(cartId: string): Promise<void>
	findActiveCartByUserId(userId: string): Promise<ICartWithItemsDAO | null>
	findById(id: string): Promise<ICartWithItemsDAO | null>
	findItemByIdAndCartId(
		productId: string,
		cartId: string,
	): Promise<CartItems | null>
	addItem(data: Prisma.CartItemsUncheckedCreateInput): Promise<CartItems>
	removeItem(cartItemId: string): Promise<void>
	updateItemQuantity(itemId: string, quantity: number): Promise<CartItems>
}
