import { prisma } from '@/lib/prisma.js'
import type { Prisma, User } from '@prisma/client'
import type { IUsersRepository } from '../users.repository.js'

export class PrismaUsersRepository implements IUsersRepository {
	async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
		const user = await prisma.user.create({ data })

		return user
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { id } })

		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { email } })

		return user
	}

	async save(data: User): Promise<User> {
		const user = await prisma.user.update({ where: { id: data.id }, data })

		return user
	}
}
