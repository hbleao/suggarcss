import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	rootDir: '.',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	transform: {
		'^.+\\.(d\\.ts|ts|tsx)$': 'ts-jest',
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|sass|scss)$': 'identity-obj-proxy',
	},
	coverageDirectory: '<rootDir>/jest',
	setupFilesAfterEnv: ['./config/jest/setupTests.ts'],
	coverageThreshold: {
		global: {
			branches: 93,
			functions: 93,
			lines: 93,
			statements: 93,
		},
	},
};

export default createJestConfig(config);
