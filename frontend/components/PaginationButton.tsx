interface PaginationProps {
  page: number;
  hasMore: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationButton({ page, hasMore, setPage }: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        Prev
      </button>
      
      <span className="self-center">Page {page}</span>

      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={!hasMore}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>
    </div>
  );
}