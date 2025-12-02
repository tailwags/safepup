import { treaty } from '@elysiajs/eden';
import type { SafePupAPI } from '@safepup/server';

export const client = treaty<SafePupAPI>('localhost:3000');
