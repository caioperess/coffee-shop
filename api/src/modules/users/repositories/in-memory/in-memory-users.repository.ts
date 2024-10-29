import type { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import type { IUsersRepository } from '../users.repository.js'

export class InMemoryUsersRepository implements IUsersRepository {
	private readonly users: User[] = []

	async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
			updated_at: new Date(),
		}

		this.users.push(user)

		return user
	}

	async findById(id: string): Promise<User | null> {
		return this.users.find((user) => user.id === id) ?? null
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.users.find((user) => user.email === email) ?? null
	}

	async save(data: User): Promise<User> {
		const user = this.users.findIndex((user) => user.id === data.id)

		this.users[user] = { ...data, updated_at: new Date() }

		return this.users[user]
	}
}
