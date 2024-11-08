import { BcryptHashProvider } from '@/shared/providers/hash/implementations/bcrypt.js'
import type { IHashProvider } from '@/shared/providers/hash/index.js'
import { InvalidCredentialsError } from '../errors/invalid-credentials.js'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository.js'
import type { IUsersRepository } from '../repositories/users.repository.js'
import { AuthenticateUseCase } from './authenticate-use-case.js'

let hashProvider: IHashProvider
let usersRepository: IUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate User Use Case', () => {
	beforeEach(async () => {
		hashProvider = new BcryptHashProvider()
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(usersRepository, hashProvider)

		await usersRepository.create({
			name: 'John Doe',
			email: 'email@test.com',
			password_hash: await hashProvider.hash('123456', 1),
		})
	})

	it('should be able to authenticate an user', async () => {
		const createdUser = await usersRepository.findByEmail('email@test.com')

		const { user } = await sut.execute({
			email: 'email@test.com',
			password: '123456',
		})

		expect(user.id).toEqual(createdUser?.id)
	})

	it('should not be able to authenticate with wrong email', async () => {
		expect(() =>
			sut.execute({
				email: 'email@wrong.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		expect(() =>
			sut.execute({
				email: 'email@test.com',
				password: 'wrong_password',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
