import type { Prisma } from '@prisma/client'

export type ICartWithItemsDAO = Prisma.CartGetPayload<{
	include: { CartItems: true }
}>
