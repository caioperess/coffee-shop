import type { Cart, Prisma } from '@prisma/client'

export interface ICartsRepository {
	create(data: Prisma.CartUncheckedCreateInput): Promise<Cart>
	checkout(cartId: string): Promise<void>
	findActiveCartByUserId(userId: string): Promise<Cart | null>
	findById(id: string): Promise<Cart | null>
}
