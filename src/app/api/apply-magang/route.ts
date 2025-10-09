/**
 * Apply Magang API (POST /api/apply-magang)
 *
 * Accepts multipart form-data for internship applications and performs:
 * - Schedule enforcement by querying `/api/schedule` (403 on closed)
 * - Server-side validation for fields and uploaded file (422 on invalid)
 *
 * Expected fields:
 * - nama: string (min 2)
 * - nrp: 8–12 digits
 * - kelompokKP: string (required)
 * - mindmap: File (optional), allowed types: pdf/doc/docx/txt, max 10MB
 */
import { NextResponse } from 'next/server';
import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const payloadSchema = z.object({
  nama: z.string().min(2),
  nrp: z.string().regex(/^\d{8,12}$/),
  kelompokKP: z.string().min(1),
});

/**
 * Check if the schedule is currently active by calling `/api/schedule`.
 * Falls back to a relative request if NEXT_PUBLIC_SITE_URL is not defined.
 */
/**
 * Server-safe schedule check: use the current request origin so the
 * server-side fetch targets the same deployment URL. This avoids
 * depending on NEXT_PUBLIC_SITE_URL or unreliable relative fetches.
 */
async function isScheduleActive(req: Request): Promise<boolean> {
  try {
    const origin = new URL(req.url).origin;
    const url = `${origin}/api/schedule`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res || !res.ok) return false;
    const j = await res.json();
    return !!j.active;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const active = await isScheduleActive(req);
  if (!active) {
    return NextResponse.json(
      { error: 'Pendaftaran sedang ditutup' },
      { status: 403 },
    );
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: 'Payload tidak valid' }, { status: 400 });
  }

  const nama = String(form.get('nama') || '');
  const nrp = String(form.get('nrp') || '');
  const kelompokKP = String(form.get('kelompokKP') || '');
  const file = form.get('mindmap');

  const parsed = payloadSchema.safeParse({ nama, nrp, kelompokKP });
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validasi gagal', issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  let fileName: string | null = null;
  let fileSize: number | null = null;
  if (file && file instanceof File) {
    fileName = file.name;
    fileSize = file.size;
    const typeOk =
      ALLOWED_TYPES.includes(file.type) ||
      /\.(pdf|docx?|txt)$/i.test(file.name);
    if (!typeOk) {
      return NextResponse.json(
        { error: 'Tipe file tidak didukung' },
        { status: 422 },
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Ukuran file maksimal 10MB' },
        { status: 422 },
      );
    }
  }

  // TODO: save to storage/DB
  return NextResponse.json({
    message: 'Pendaftaran magang berhasil disubmit.',
    applicant: {
      nama,
      nrp,
      kelompokKP,
      fileName,
      fileSize,
    },
  });
}
