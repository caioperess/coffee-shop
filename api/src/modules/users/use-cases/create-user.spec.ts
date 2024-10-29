import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository.js'
import { CreateUserUseCase } from './create-user.use-case.js'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new CreateUserUseCase(usersRepository)
	})

	it('should be able to create a new user', async () => {
		const user = await sut.execute({
			name: 'John Doe',
			email: 'email@test.com',
			password: '123456',
		})

		expect(user).toHaveProperty('id')
		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user password upon registration', async () => {
		const user = await sut.execute({
			name: 'John Doe',
			email: 'email@test.com',
			password: '123456',
		})

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to create a user with same email', async () => {
		await sut.execute({
			name: 'John Doe',
			email: 'email@test.com',
			password: '123456',
		})

		await expect(() =>
			sut.execute({
				name: 'John Doe',
				email: 'email@test.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
