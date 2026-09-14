'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { saveUtmParams } from '@/lib/utm';

function UtmListener() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      saveUtmParams(searchParams);
    }
  }, [searchParams]);

  return null;
}

export default function UtmTracker() {
  return (
    <Suspense fallback={null}>
      <UtmListener />
    </Suspense>
  );
}