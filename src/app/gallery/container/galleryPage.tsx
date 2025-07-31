'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import Card from '@/app/gallery/components/card';
import NavbarGallery from '@/app/gallery/components/navbarGallery';
import SearchBarGallery from '@/app/gallery/components/searchBar';
import { validateNrp } from '@/app/gallery/hooks/useValidateNrp';
import Loading from '@/app/gallery/loading';
import RestrictedModal from '@/app/landing/components/gallery/nrpModal';
import Typography from '@/components/Typography';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { galleryItems } from '@/contents/gallery';
import { cn } from '@/lib/utils';

const ELLIPSIS = '…' as const;

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const nrpParam = searchParams.get('nrp') || '';

  // AUTH STATE ───────────────────────────────────────────────
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    validateNrp(nrpParam).then((ok) => setIsAuthorized(ok));
  }, [nrpParam]);

  // PAGINATION & SEARCH STATE ───────────────────────────────
  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // debounce the user's typing by 300ms
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedQuery(searchQuery.trim().toLowerCase()),
      300,
    );
    return () => clearTimeout(t);
  }, [searchQuery]);

  // filter once per debouncedQuery
  const filteredItems = useMemo(() => {
    if (!debouncedQuery) return galleryItems;
    return galleryItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(debouncedQuery) ||
        item.date.toLowerCase().includes(debouncedQuery)
      );
    });
  }, [debouncedQuery]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // reset page if our filter shrinks the result set
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  // slice the current page's items
  const currentItems = useMemo(
    () => filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredItems, page],
  );

  // EARLY RETURNS ────────────────────────────────────────────

  // still validating → just show your skeleton
  if (isAuthorized === null) {
    return <Loading />;
  }

  // validation done & NOT authorized → keep the skeleton *and* overlay the modal
  if (isAuthorized === false) {
    return (
      <>
        <Loading />
        <RestrictedModal
          isLandingPage={false}
          initialOpen
          onAuthorized={() => setIsAuthorized(true)}
        />
      </>
    );
  }

  // AUTHORIZED → RENDER GALLERY ─────────────────────────────

  // build a pages array with ellipses
  const pages: (number | typeof ELLIPSIS)[] =
    totalPages <= 7
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [
          1,
          page > 3 ? ELLIPSIS : 2,
          page - 1,
          page,
          page + 1,
          page < totalPages - 2 ? ELLIPSIS : totalPages - 1,
          totalPages,
        ];

  const paginationItems = pages
    .filter((p) => (typeof p === 'number' ? p >= 1 && p <= totalPages : true))
    .map((p, i) =>
      p === ELLIPSIS ? (
        <PaginationItem key={`e${i}`}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={p}>
          <PaginationLink
            onClick={(e) => {
              e.preventDefault();
              setPage(p);
            }}
            className={cn(
              '!mb-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200',
              page === p
                ? '!bg-[#01263C] !text-white'
                : 'bg-transparent text-[#01263C]',
            )}
          >
            <Typography
              variant='h3'
              font='adelphe'
              className='translate-y-0.5 leading-none'
            >
              {p}
            </Typography>
          </PaginationLink>
        </PaginationItem>
      ),
    );

  return (
    <>
      <NavbarGallery />

      <main className='relative min-h-screen bg-white'>
        <div className='mx-auto max-w-7xl px-[60px] py-10 pt-36 pb-10'>
          <div className='mb-7 text-center'>
            <Typography
              variant='s0'
              className='text-[#00AAE7] uppercase'
              weight='medium'
            >
              Gallery HMTC
            </Typography>
            <Typography
              variant='j0'
              font='adelphe'
              className='mt-5 text-black'
              weight='bold'
            >
              From Capturing Moments to Sharing Memories
            </Typography>
          </div>

          <div className='mb-5 flex justify-end'>
            <SearchBarGallery
              value={searchQuery}
              onChange={(q) => setSearchQuery(q)}
            />
          </div>

          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {currentItems.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className='mt-8 cursor-pointer justify-end'>
              <PaginationContent>
                <PaginationItem className='mr-6'>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.max(p - 1, 1));
                    }}
                  >
                    <ChevronLeftIcon color='#01263C' />
                  </PaginationLink>
                </PaginationItem>

                {paginationItems}

                <PaginationItem className='ml-6 cursor-pointer'>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.min(p + 1, totalPages));
                    }}
                  >
                    <ChevronRightIcon color='#01263C' />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
    </>
  );
}
