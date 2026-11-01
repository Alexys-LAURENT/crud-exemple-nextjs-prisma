import { getShoppingItems } from './actions/shopping';
import AddItemForm from './components/AddItemForm';
import SearchBar from './components/SearchBar';
import ShoppingList from './components/ShoppingList';
import Stats from './components/Stats';

interface HomeProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const search = (await searchParams).search;
  const items = await getShoppingItems(search);
  
  const totalItems = items.length;
  const purchasedItems = items.filter(item => item.purchased).length;
  const remainingItems = totalItems - purchasedItems;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Liste de courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos achats facilement
          </p>
        </div>

        {/* Stats */}
        <Stats 
          totalItems={totalItems} 
          purchasedItems={purchasedItems} 
          remainingItems={remainingItems} 
        />

        {/* Barre de recherche */}
        <SearchBar />

        {/* Formulaire d'ajout */}
        <AddItemForm />

        {/* Liste des articles */}
        <ShoppingList items={items} />
      </div>
    </div>
  );
}
