'use server';

import { prisma } from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getShoppingItems(search?: string) {
  const items = await prisma.shoppingItem.findMany({
    where: search ? {
      name: {
        contains: search,
        mode: 'insensitive',
      }
    } : undefined,
    orderBy: { createdAt: 'desc' }
  });
  
  return items.map(item => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
}

export async function createShoppingItem(name: string, quantity: number) {
  try {
    if (!name || name.trim() === '') {
      return { error: 'Le nom est requis' };
    }

    const item = await prisma.shoppingItem.create({
      data: {
        name: name.trim(),
        quantity: quantity || 1,
      }
    });

    revalidatePath('/');
    
    return { 
      success: true, 
      item: {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      }
    };
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    return { error: 'Erreur lors de la création de l\'article' };
  }
}

export async function updateShoppingItem(
  id: number, 
  data: { name?: string; quantity?: number; purchased?: boolean }
) {
  try {
    if (!id) {
      return { error: 'L\'ID est requis' };
    }

    const item = await prisma.shoppingItem.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.quantity !== undefined && { quantity: data.quantity }),
        ...(data.purchased !== undefined && { purchased: data.purchased }),
      }
    });

    revalidatePath('/');
    
    return { 
      success: true, 
      item: {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      }
    };
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return { error: 'Erreur lors de la mise à jour de l\'article' };
  }
}

export async function deleteShoppingItem(id: number) {
  try {
    if (!id) {
      return { error: 'L\'ID est requis' };
    }

    await prisma.shoppingItem.delete({
      where: { id }
    });

    revalidatePath('/');
    
    return { success: true, message: 'Article supprimé avec succès' };
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return { error: 'Erreur lors de la suppression de l\'article' };
  }
}
