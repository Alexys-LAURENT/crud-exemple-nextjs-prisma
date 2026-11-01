'use client';

import ShoppingItemComponent from './ShoppingItem';

interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ShoppingListProps {
  items: ShoppingItem[];
}

export default function ShoppingList({ items }: ShoppingListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Votre liste est vide
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Ajoutez votre premier article ci-dessus
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {items.map((item) => (
          <ShoppingItemComponent key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
