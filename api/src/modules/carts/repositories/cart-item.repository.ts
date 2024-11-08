import type { CartItems, Prisma } from '@prisma/client'

export interface ICartItemsRepository {
	create(data: Prisma.CartItemsUncheckedCreateInput): Promise<CartItems>
	delete(itemId: string): Promise<void>
	save(data: CartItems): Promise<CartItems>
	findById(cartItemId: string): Promise<CartItems | null>
	findByCartIdAndItemId(
		cartId: string,
		itemId: string,
	): Promise<CartItems | null>
	findManyByCartId(cartId: string): Promise<CartItems[]>
}
