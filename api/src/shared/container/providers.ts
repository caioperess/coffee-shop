import { container } from 'tsyringe'
import { BcryptHashProvider } from '../providers/hash/implementations/bcrypt.js'
import type { IHashProvider } from '../providers/hash/index.js'

container.registerSingleton<IHashProvider>('hashProvider', BcryptHashProvider)
