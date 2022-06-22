import axios from 'axios';
import { test } from './test';

const isDev = process.env.NODE_ENV === 'development';
console.log(process.env.NODE_ENV);
console.log(isDev);

console.log('hello world');
console.log(test);

const res = '1';

exports.res = res;

export const a = '哈哈';
