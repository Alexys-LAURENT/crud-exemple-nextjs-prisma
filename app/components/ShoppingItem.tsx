'use client';

import { deleteShoppingItem, updateShoppingItem } from '@/app/actions/shopping';
import { useState } from 'react';

interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
}

interface ShoppingItemProps {
  item: ShoppingItem;
}

export default function ShoppingItemComponent({ item }: ShoppingItemProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);

  const handleUpdate = async (id: number, updates: Partial<ShoppingItem>) => {
    try {
      const result = await updateShoppingItem(id, updates);
      
      if (result.success) {
        setEditingId(null);
      } else if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    try {
      const result = await deleteShoppingItem(id);
      
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const togglePurchased = () => {
    handleUpdate(item.id, { purchased: !item.purchased });
  };

  const startEdit = () => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      handleUpdate(editingId, { name: editName, quantity: editQuantity });
    }
  };

  if (editingId === item.id) {
    return (
      <li className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="number"
            value={editQuantity}
            onChange={(e) => setEditQuantity(parseInt(e.target.value) || 1)}
            min="1"
            className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={saveEdit}
            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium cursor-pointer"
          >
            Sauver
          </button>
          <button
            onClick={() => setEditingId(null)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer"
          >
            Annuler
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-4">
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={item.purchased}
            onChange={togglePurchased}
            className="w-5 h-5 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded focus:ring-gray-900 dark:focus:ring-gray-100 bg-white dark:bg-gray-800 cursor-pointer"
          />
        </label>
        <div className="flex-1 min-w-0">
          <p className={`text-base ${item.purchased ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-white'}`}>
            {item.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">
            Quantité: {item.quantity}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={startEdit}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
            title="Modifier"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors cursor-pointer"
            title="Supprimer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
