import ButtonLink from '@/components/links/ButtonLink';

export default function Sandbox() {
  return (
    <main className='grid min-h-screen place-items-center'>
      <section className='space-y-6 text-center'>
        <h1 className='font-secondary text-3xl font-bold'>Sandbox</h1>
        <div className='flex flex-wrap justify-center gap-4'>
          <ButtonLink href='/sandbox/button' size='base'>
            Button
          </ButtonLink>
          <ButtonLink href='/sandbox/button' size='base'>
            Button
          </ButtonLink>
          <ButtonLink href='/sandbox/button' size='base'>
            Button
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
