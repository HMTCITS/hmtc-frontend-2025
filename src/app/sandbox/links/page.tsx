import BaseLink from '@/components/links/BaseLink';
import ButtonLink from '@/components/links/ButtonLink';

export default function LinksSandbox() {
  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Links</h1>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>BaseLink</h2>
        <div className='flex flex-col gap-3'>
          <BaseLink href='/'>Internal Link</BaseLink>
          <BaseLink href='https://hmtc-its.com' openNewTab>
            External Link (force new tab)
          </BaseLink>
          <BaseLink href='https://hmtc-its.com'>External Auto</BaseLink>
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>ButtonLink</h2>
        <div className='flex flex-wrap gap-4'>
          <ButtonLink href='/' variant='primary'>
            Home
          </ButtonLink>
          <ButtonLink href='https://example.com' openNewTab variant='secondary'>
            External
          </ButtonLink>
          <ButtonLink href='/sandbox/buttons' variant='netral'>
            To Buttons
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
