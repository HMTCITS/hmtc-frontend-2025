import Typography from '@/components/Typography';

export default function TypographySandbox() {
  const variants = [
    'k0',
    'k1',
    'k2',
    'j0',
    'j1',
    'j2',
    'i1',
    'i2',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    's0',
    's1',
    's2',
    's3',
    's4',
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'c0',
    'c1',
    'c2',
  ] as const;
  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Typography</h1>
      <div className='grid gap-4 md:grid-cols-2'>
        {variants.map((v) => (
          <div key={v} className='rounded border p-3'>
            <Typography variant={v}>
              Variant {v} - The quick brown fox jumps over the lazy dog.
            </Typography>
          </div>
        ))}
      </div>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>Font Families</h2>
        <div className='grid gap-4 md:grid-cols-3'>
          {[
            'poppins',
            'satoshi',
            'adelphe',
            'libre',
            'inter',
            'playfair',
            'helveticaNeue',
          ].map((f) => (
            <Typography key={f} font={f as any} variant='h3'>
              Font: {f}
            </Typography>
          ))}
        </div>
      </section>
    </main>
  );
}
