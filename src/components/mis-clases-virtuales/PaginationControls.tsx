'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { URL_ROUTES } from '@/services/api/routes';

type PaginationControlsProps = {
  total: number;
  limit: number;
};

export default function PaginationControls({ total, limit }: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');
  const totalPages = Math.ceil(total / limit);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button asChild disabled={!hasPrev} variant="outline">
        <Link href={`${URL_ROUTES.CLASES_VIRTUALES}?page=${currentPage - 1}`}>
          Anterior
        </Link>
      </Button>

      <span className="text-sm font-medium">
        Página {currentPage} de {totalPages}
      </span>

      <Button asChild disabled={!hasNext} variant="outline">
        <Link href={`${URL_ROUTES.CLASES_VIRTUALES}?page=${currentPage + 1}`}>
          Siguiente
        </Link>
      </Button>
    </div>
  );
}
