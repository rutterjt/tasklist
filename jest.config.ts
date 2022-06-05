import type { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/jest-dom',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', path.resolve(__dirname, './src/utils')],
  testEnvironment: 'jest-environment-jsdom',
};
export default config;
