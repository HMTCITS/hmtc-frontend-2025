import { z } from 'zod';

import { nrpSchema, requiredString } from '@/lib/validation/validation';

/**
 * LOGIN (NRP only)
 * curl --location 'http://localhost:3000/api/auth/login' \
 * --data-urlencode 'nrp=5053231014'
 */
export const loginSchema = z.object({
  nrp: nrpSchema(10),
});

/**
 * REGISTER (NRP + departement_name)
 * curl --location 'http://localhost:3000/api/user/register' \
 * --data-urlencode 'nrp=5053231014' \
 * --data-urlencode 'departement_name=CMI'
 */
export const registerSchema = z.object({
  nrp: nrpSchema(10),
  // bebas huruf/angka/spasi; jika perlu batas panjang, atur max (mis. 100)
  departement_name: requiredString('Nama departemen', 100),
});

/** Alias eksplisit jika tetap ingin schema bernama loginWithNrpSchema */
export const loginWithNrpSchema = loginSchema;
