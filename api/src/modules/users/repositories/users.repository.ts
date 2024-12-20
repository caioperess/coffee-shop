import type { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
	create(data: Prisma.UserUncheckedCreateInput): Promise<User>
	findById(id: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	save(data: User): Promise<User>
}
