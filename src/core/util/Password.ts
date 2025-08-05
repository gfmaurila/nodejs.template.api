// src/core/util/Password.ts

import { createHash } from 'crypto';

export class Password {
  static ComputeSha256Hash(password: string): string {
    const hash = createHash('sha256');
    hash.update(password, 'utf8');
    return hash.digest('hex');
  }
}
