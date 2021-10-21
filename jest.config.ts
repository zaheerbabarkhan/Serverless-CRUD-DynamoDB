import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',

	testEnvironment: 'node',
	moduleNameMapper: {
		'@functions/(.*)': '<rootDir>/src/functions/$1',
		'@libs/(.*)': '<rootDir>/src/libs/$1',
	},
};
export default config;
