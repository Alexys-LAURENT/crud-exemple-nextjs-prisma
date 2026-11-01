'use client';

import { createShoppingItem } from '@/app/actions/shopping';
import { useState } from 'react';

export default function AddItemForm() {
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    setLoading(true);
    try {
      const result = await createShoppingItem(newItemName, newItemQuantity);
      
      if (result.success) {
        setNewItemName('');
        setNewItemQuantity(1);
      } else if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addItem} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Ajouter un article..."
          className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <input
          type="number"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
          min="1"
          className="w-20 px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
        >
          {loading ? 'Ajout...' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}
