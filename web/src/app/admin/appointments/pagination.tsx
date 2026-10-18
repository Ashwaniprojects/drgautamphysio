import Link from "next/link";

/**
 * Pure-links pagination: the query string is the view, so prev/next just
 * rebuild it. No JS state, works with a disabled mouse, and every page is
 * deep-linkable.
 */
export function Pagination({
  page,
  totalPages,
  params,
  basePath = "/admin/appointments",
}: {
  page: number;
  totalPages: number;
  params: Record<string, string | null | undefined>;
  basePath?: string;
}) {
  if (totalPages <= 1) return null;

  const toHref = (next: number) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v) p.set(k, v);
    }
    if (next <= 0) p.delete("page");
    else p.set("page", String(next));
    return `${basePath}?${p.toString()}`;
  };

  return (
    <div className="mt-5 flex items-center justify-between gap-3">
      <span className="text-[13px] text-ink/45">
        Page {page + 1} of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        {page > 0 && (
          <Link
            href={toHref(page - 1)}
            className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-primary hover:text-primary"
          >
            ← Previous
          </Link>
        )}
        {page < totalPages - 1 && (
          <Link
            href={toHref(page + 1)}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
