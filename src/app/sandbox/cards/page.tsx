import AnggotaCard from '@/components/cards/AnggotaCard';
import KetuaCard from '@/components/cards/KetuaCard';
import { Anggota } from '@/constants/anggota';

export default function CardsSandbox() {
  const sample = Anggota.slice(0, 3).map((a, i) => ({ ...a, index: i }));
  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Cards</h1>
      <section>
        <h2 className='mb-4 font-satoshi text-xl font-semibold'>AnggotaCard</h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {sample.map((a, idx) => (
            <AnggotaCard key={idx} {...a} />
          ))}
        </div>
      </section>
      <section>
        <h2 className='mb-4 font-satoshi text-xl font-semibold'>KetuaCard</h2>
        <div className='flex flex-wrap gap-6'>
          {Array.from({ length: 4 }).map((_, i) => (
            <KetuaCard key={i} imageIndex={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
