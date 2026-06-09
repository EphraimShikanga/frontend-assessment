/**
 * Transactions page — placeholder to demonstrate sidebar navigation
 * and TanStack Query's stale-while-revalidate caching.
 *
 * Navigating here and back to Dashboard serves cached product data
 * instantly while refetching in the background.
 */
export default function TransactionsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20 font-poppins sm:px-6 lg:px-8">
      <h1 className="mt-6 text-xl font-bold text-text-primary">
        Transactions
      </h1>
      <p className="mt-2 max-w-sm text-center text-sm text-text-muted">
        This page is under development. Navigate back to the Dashboard to see
        your products — cached data loads instantly while fresh data is fetched
        in the background.
      </p>
    </div>
  );
}
