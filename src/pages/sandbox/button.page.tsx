import { FiArrowRight, FiChevronRight, FiPlus } from 'react-icons/fi';

import Button from '@/components/buttons/Button';

export default function buttonSandbox() {
  return (
    <main className='layout min-h-screen space-y-10 pt-20'>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Primary</h2>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='large'
            variant='primary'
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='base'
            variant='primary'
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='small'
            variant='primary'
          >
            button
          </Button>
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='large'
            variant='primary'
            disabled
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='base'
            variant='primary'
            disabled
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='small'
            variant='primary'
            disabled
          >
            button
          </Button>
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='large'
            variant='primary'
            isLoading
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='base'
            variant='primary'
            isLoading
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='small'
            variant='primary'
            isLoading
          >
            button
          </Button>
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Secondary</h2>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='large'
            variant='secondary'
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='base'
            variant='secondary'
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='small'
            variant='secondary'
          >
            button
          </Button>
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='large'
            variant='secondary'
            disabled
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='base'
            variant='secondary'
            disabled
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='small'
            variant='secondary'
            disabled
          >
            button
          </Button>
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='large'
            variant='secondary'
            isLoading
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='base'
            variant='secondary'
            isLoading
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='small'
            variant='secondary'
            isLoading
          >
            button
          </Button>
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Netral</h2>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='large'
            variant='netral'
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='base'
            variant='netral'
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='small'
            variant='netral'
          >
            button
          </Button>
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='large'
            variant='netral'
            disabled
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='base'
            variant='netral'
            disabled
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='small'
            variant='netral'
            disabled
          >
            button
          </Button>
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='large'
            variant='netral'
            isLoading
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='base'
            variant='netral'
            isLoading
          >
            button
          </Button>
          <Button
            leftIcon={FiPlus}
            rightIcon={FiArrowRight}
            size='small'
            variant='netral'
            isLoading
          >
            button
          </Button>
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Icon</h2>
        <div className='flex flex-wrap items-end gap-4'>
          <Button icon={FiChevronRight} size='large' variant='netral' />
          <Button icon={FiChevronRight} size='base' variant='netral' />
          <Button icon={FiChevronRight} size='small' variant='netral' />
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            icon={FiChevronRight}
            size='large'
            variant='netral'
            disabled
          />
          <Button icon={FiChevronRight} size='base' variant='netral' disabled />
          <Button
            icon={FiChevronRight}
            size='small'
            variant='netral'
            disabled
          />
        </div>
        <div className='flex flex-wrap items-end gap-4'>
          <Button
            icon={FiChevronRight}
            size='large'
            variant='netral'
            isLoading
          />
          <Button
            icon={FiChevronRight}
            size='base'
            variant='netral'
            isLoading
          />
          <Button
            icon={FiChevronRight}
            size='small'
            variant='netral'
            isLoading
          />
        </div>
      </section>
    </main>
  );
}
