interface StatsProps {
  totalItems: number;
  purchasedItems: number;
  remainingItems: number;
}

export default function Stats({ totalItems, purchasedItems, remainingItems }: StatsProps) {
  if (totalItems === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalItems}</p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Achetés</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{purchasedItems}</p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Restants</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{remainingItems}</p>
      </div>
    </div>
  );
}
