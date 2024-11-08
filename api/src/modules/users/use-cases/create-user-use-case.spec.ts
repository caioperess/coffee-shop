import { BcryptHashProvider } from '@/shared/providers/hash/implementations/bcrypt.js'
import type { IHashProvider } from '@/shared/providers/hash/index.js'
import { UserAlreadyExistsError } from '../errors/user-already-exists.js'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository.js'
import type { IUsersRepository } from '../repositories/users.repository.js'
import { CreateUserUseCase } from './create-user-use-case.js'

let hashProvider: IHashProvider
let usersRepository: IUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
	beforeEach(() => {
		hashProvider = new BcryptHashProvider()
		usersRepository = new InMemoryUsersRepository()
		sut = new CreateUserUseCase(usersRepository, hashProvider)
	})

	it('should be able to create a new user', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'email@test.com',
			password: '123456',
		})

		expect(user).toHaveProperty('id')
		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'email@test.com',
			password: '123456',
		})

		const isPasswordCorrectlyHashed = await hashProvider.compare(
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
		).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})
