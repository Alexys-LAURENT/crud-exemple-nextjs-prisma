> **Republication du projet.** Première activité Git conservée : **2025-10-14**. Ce projet a été republié le **2 novembre 2026**, après retrait des identifiants suivis, revue des données de démonstration et création d’un nouvel historique Git. La date de ce dépôt ne représente pas le début du projet.

# Liste de Courses - Next.js & Prisma

Une application de liste de courses moderne construite avec Next.js 15, Prisma ORM et PostgreSQL.

## Fonctionnalités

- ✅ CRUD complet (Créer, Lire, Modifier, Supprimer)
- 🔍 Recherche en temps réel avec debounce
- 📊 Statistiques des articles (total, achetés, restants)
- 🎨 Design moderne et responsive
- ⚡ Server-Side Rendering (SSR) avec Server Actions
- 🔄 Mises à jour automatiques de la page

## Prérequis

- Node.js 20+ installé
- PostgreSQL installé et en cours d'exécution

## Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer PostgreSQL

Assurez-vous que PostgreSQL est installé et démarré sur votre machine.

Créez une nouvelle base de données :

```sql
CREATE DATABASE crud;
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet et collez le contenu du fichier `.env.example` :

```env
DATABASE_URL=
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Remplacez `username` et `password` par vos identifiants PostgreSQL.

### 4. Lancer les migrations Prisma

Appliquez les migrations pour créer les tables dans votre base de données :

```bash
npx prisma migrate dev
```

Cette commande va :
- Créer les tables dans la base de données
- Générer le client Prisma

### 5. Lancer l'application

Démarrez le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

## Structure du Projet

```
nextjs-prisma/
├── app/
│   ├── actions/          # Server Actions (CRUD)
│   ├── components/       # Composants React
│   ├── lib/             # Utilitaires (instance Prisma)
│   └── page.tsx         # Page principale (SSR)
├── prisma/
│   ├── schema.prisma    # Schéma de base de données
│   └── migrations/      # Migrations SQL
```

## Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build l'application pour la production
- `npm run start` - Démarre le serveur de production
- `npm run lint` - Vérifie le code avec ESLint
- `npx prisma studio` - Ouvre l'interface Prisma Studio pour visualiser les données

## Technologies Utilisées

- **Next.js 15** - Framework React avec SSR et Server Actions
- **Prisma** - ORM moderne pour TypeScript
- **PostgreSQL** - Base de données relationnelle
- **Tailwind CSS** - Framework CSS utilitaire
- **TypeScript** - Typage statique

## Qu'est-ce qu'une Server Action ?

Les **Server Actions** sont une fonctionnalité de Next.js qui permet d'exécuter du code côté serveur directement depuis vos composants React, sans avoir besoin de créer des routes API séparées.

### Avantages des Server Actions

- **Simplicité** : Pas besoin de créer des endpoints API (`/api/...`)
- **Sécurité** : Le code s'exécute uniquement côté serveur, jamais exposé au client
- **Performance** : Réduction de la taille du bundle JavaScript côté client
- **Type-safe** : Support complet de TypeScript avec inférence des types
- **Intégration native** : Fonctionne automatiquement avec les formulaires et les composants

### Comment ça fonctionne ?

Dans cette application, les Server Actions sont définies dans `app/actions/shopping.ts` avec la directive `'use server'` :

```typescript
'use server'

export async function addItem(formData: FormData) {
  // Code exécuté côté serveur uniquement
  const item = await prisma.shoppingItem.create({...})
  revalidatePath('/') // Rafraîchit la page automatiquement
}
```

Les composants clients peuvent ensuite appeler ces fonctions comme des fonctions JavaScript normales :

```typescript
import { addItem } from '@/app/actions/shopping'

// Dans un composant
await addItem(formData)
```

Next.js gère automatiquement la sérialisation, l'envoi de la requête HTTP, et la mise à jour de l'interface utilisateur.

## Fonctionnalités de l'Application

### Gestion des Articles
- Ajouter un article avec nom et quantité
- Modifier le nom et la quantité
- Marquer un article comme acheté
- Supprimer un article

### Recherche
- Barre de recherche avec debounce (300ms)
- Recherche insensible à la casse
- URL mise à jour avec les paramètres de recherche

### Statistiques
- Nombre total d'articles
- Nombre d'articles achetés
- Nombre d'articles restants

## Historique du projet et contributions

État de l’ancien dépôt relevé le 2 novembre 2026 : **5 commits** sur la branche locale de référence, **0 étoile(s)** et **0 fork(s)**. Ces compteurs décrivent l’ancien dépôt, pas le nouvel historique.

Contributeurs GitHub de l’ancien dépôt : [Alexys-LAURENT](https://github.com/Alexys-LAURENT). Leur travail est conservé dans le code republié ; le nouvel historique ne reproduit pas leurs anciens commits.
