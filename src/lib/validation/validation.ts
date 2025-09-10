// src/lib/validation/validation.ts
import { z } from 'zod';

/** ---------- Primitive Builders ---------- */

/** String wajib (auto-trim) dengan opsi max length */
export const requiredString = (label = 'Field', max?: number) => {
  let s = z.string().trim().min(1, `${label} tidak boleh kosong`);
  if (Number.isFinite(max))
    s = s.max(Number(max), `${label} maksimal ${max} karakter`);
  return s;
};

/** Angka (coerce dari string) dengan opsi batasan & integer/positif */
export const numberCoerced = ({
  label = 'Angka',
  integer = false,
  min,
  max,
  positive = false,
}: {
  label?: string;
  integer?: boolean;
  min?: number;
  max?: number;
  positive?: boolean;
} = {}) => {
  let schema = z.coerce.number().refine((n) => Number.isFinite(n), {
    message: `${label} harus berupa angka`,
  });

  if (Number.isFinite(min))
    schema = schema.min(Number(min), `${label} minimal ${min}`);
  if (Number.isFinite(max))
    schema = schema.max(Number(max), `${label} maksimal ${max}`);
  if (positive) schema = schema.positive(`${label} harus bernilai positif`);
  if (integer)
    schema = schema.refine(Number.isInteger, `${label} harus bilangan bulat`);

  return schema;
};

/** Boolean yang harus true (mis. checkbox persetujuan) */
export const mustBeTrue = (label = 'Persetujuan') =>
  z.literal(true, { message: `${label} harus disetujui` });

/** ---------- Teks Spesifik ---------- */

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email tidak boleh kosong')
  .email('Format email tidak valid');

/** Password policy ketat (default): min 8, 1 upper, 1 lower, 1 number, 1 symbol */
export const passwordPolicy = ({
  label = 'Kata sandi',
  min = 8,
  upper = true,
  lower = true,
  number = true,
  symbol = true,
}: {
  label?: string;
  min?: number;
  upper?: boolean;
  lower?: boolean;
  number?: boolean;
  symbol?: boolean;
} = {}) =>
  z
    .string()
    .min(min, `${label} minimal ${min} karakter`)
    .superRefine((val, ctx) => {
      if (upper && !/[A-Z]/.test(val))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Harus mengandung 1 huruf besar',
        });
      if (lower && !/[a-z]/.test(val))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Harus mengandung 1 huruf kecil',
        });
      if (number && !/[0-9]/.test(val))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Harus mengandung 1 angka',
        });
      if (symbol && !/[!@#$%^&*()[\]{}\-_+=;:'",.<>/?\\|`~]/.test(val))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Harus mengandung 1 simbol',
        });
    });

/** Alias untuk kebijakan default (mengganti passwordSchema lama) */
export const passwordSchema = passwordPolicy();

export const confirmPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Konfirmasi kata sandi tidak cocok',
  });

/** Username: huruf/angka/underscore, 3–32 char */
export const usernameSchema = z
  .string()
  .trim()
  .min(3, 'Username minimal 3 karakter')
  .max(32, 'Username maksimal 32 karakter')
  .regex(/^[a-zA-Z0-9_]+$/, 'Hanya huruf, angka, dan underscore');

/** Slug: huruf kecil/angka/tanda minus, tanpa minus ganda & tanpa minus di awal/akhir */
export const slugSchema = z
  .string()
  .min(1, 'Slug tidak boleh kosong')
  .regex(
    /^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/,
    'Slug hanya huruf kecil, angka, dan "-" (tidak boleh --, awal/akhir "-")',
  );

/** URL */
export const urlSchema = z.string().url('URL tidak valid');

/** Nomor telepon Indonesia: +62/62/0 diikuti 8xxxxxxxx (umum) */
export const phoneIdSchema = z
  .string()
  .regex(
    /^(\+62|62|0)8[1-9][0-9]{6,11}$/,
    'Nomor telepon Indonesia tidak valid',
  );

/** NRP: default 10 digit (sesuaikan jika perlu) */
export const nrpSchema = (len = 10) =>
  z
    .string()
    .trim()
    .regex(new RegExp(`^\\d{${len}}$`), `NRP harus ${len} digit`);

export const digitsOnly = (s: string) => s.replace(/\D+/g, '');

/** ---------- Tanggal & Waktu ---------- */

export const dateCoerced = (label = 'Tanggal') =>
  z.coerce
    .date({ message: `${label} tidak valid` })
    .refine((d) => !Number.isNaN(d.getTime()), `${label} tidak valid`);

/** ISO date string → Date */
export const isoDateString = (label = 'Tanggal') =>
  z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), `${label} tidak valid`)
    .transform((s) => new Date(s));

/** ---------- File Upload (client-side) ---------- */

/**
 * Validasi File (gunakan di client; di SSR, tipe File mungkin tidak ada)
 * @param opts.maxSize bytes (default 5MB)
 * @param opts.accept mime types (contoh: ['image/png','image/jpeg'])
 */
export const fileSchema = ({
  label = 'Berkas',
  maxSize = 5 * 1024 * 1024,
  accept,
}: {
  label?: string;
  maxSize?: number;
  accept?: string[];
} = {}) =>
  z
    .unknown()
    .refine(
      (f: any) => f && typeof f === 'object' && 'size' in f && 'type' in f,
      `${label} tidak valid`,
    )
    .refine((f: any) => f.size > 0, `${label} tidak boleh kosong`)
    .refine(
      (f: any) => f.size <= maxSize,
      `${label} maksimal ${Math.round(maxSize / (1024 * 1024))}MB`,
    )
    .superRefine((f: any, ctx) => {
      if (accept && !accept.includes(f.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} harus bertipe: ${accept.join(', ')}`,
        });
      }
    });

/** ---------- Uang (IDR) ---------- */

/** Normalisasi string uang: dukung '.'/',' sebagai pemisah ribuan/desimal.
 * Aturan: jika ada lebih dari satu pemisah, pemisah TERAKHIR dianggap sebagai desimal.
 * Contoh:
 *  - "1.234.567"        → 1234567
 *  - "1.234.567,89"     → 1234567.89
 *  - "1,234,567.89"     → 1234567.89
 *  - "Rp 1.000"         → 1000
 */
function normalizeMoneyToNumber(raw: string): number {
  let s = raw.replace(/[^\d.,-]/g, '').trim();
  if (!s) return NaN;

  // handle minus
  const neg = s.includes('-');
  s = s.replace(/-/g, '');

  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  let decimalSep: ',' | '.' | null = null;

  if (lastComma >= 0 || lastDot >= 0) {
    decimalSep = lastComma > lastDot ? ',' : '.';
  }

  if (decimalSep) {
    const parts = s.split(decimalSep);
    const intPart = parts[0].replace(/[.,]/g, '');
    const decPart = parts.slice(1).join('').replace(/[.,]/g, '');
    s = intPart + (decPart ? '.' + decPart : '');
  } else {
    // tidak ada pemisah → anggap integer IDR
    s = s.replace(/[.,]/g, '');
  }

  const n = Number((neg ? '-' : '') + s);
  return n;
}

/** Validasi string uang → number (IDR), dengan batas min/max opsional */
export const moneyStringToNumber = (
  label = 'Nominal',
  { min, max }: { min?: number; max?: number } = {},
) =>
  z
    .string()
    .min(1, `${label} wajib diisi`)
    .transform((s) => normalizeMoneyToNumber(s))
    .superRefine((val, ctx) => {
      if (!Number.isFinite(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} harus berupa angka`,
        });
        return;
      }
      if (Number.isFinite(min) && val < Number(min)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} minimal ${min}`,
        });
      }
      if (Number.isFinite(max) && val > Number(max)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} maksimal ${max}`,
        });
      }
    });
