import bcrypt from 'bcrypt'
import type { IHashProvider } from '../index.js'

export class BcryptHashProvider implements IHashProvider {
	async hash(value: string, salt: string | number) {
		return await bcrypt.hash(value, salt)
	}

	async compare(value: string, hash: string) {
		return await bcrypt.compare(value, hash)
	}
}
