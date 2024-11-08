import 'reflect-metadata'

import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths()],

	test: {
		setupFiles: ['./src/test/index.ts'],
		globals: true,
		coverage: {
			all: false,
		},
	},
})
