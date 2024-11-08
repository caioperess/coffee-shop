import { env } from '@/env/index.js'

export const jwtConfig = {
	secret: env.JWT_SECRET,
	expiration_time: '7d',
	refresh_expiration_time: '7d',
}
