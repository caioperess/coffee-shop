import { EntityNotFoundError } from '@/shared/errors/entity-not-found.js'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository.js'
import type { IUsersRepository } from '../repositories/users.repository.js'
import { FetchUserUseCase } from './fetch-user-use-case.js'

let usersRepository: IUsersRepository
let sut: FetchUserUseCase

describe('Fetch User Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new FetchUserUseCase(usersRepository)
	})

	it('should be able to fetch an user', async () => {
		await usersRepository.create({
			id: 'test_id',
			name: 'John Doe',
			email: 'email@test.com',
			password_hash: '123456',
		})

		const { user } = await sut.execute({ userId: 'test_id' })

		expect(user.id).toEqual('test_id')
	})

	it('should not be able to fetch a non existing user', async () => {
		await expect(() =>
			sut.execute({ userId: 'non_existing_user' }),
		).rejects.toBeInstanceOf(EntityNotFoundError)
	})
})
