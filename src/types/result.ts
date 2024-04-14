import type { DBError } from './dbError';

export type Result<T> = [T, undefined] | [undefined, DBError[]];
