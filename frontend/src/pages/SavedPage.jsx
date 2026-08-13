import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { SavedRecipes } from '../components/SavedRecipes';
import { useSavedRecipes } from '../context/SavedRecipesContext';

/**
 * Saved recipes route — reads same localStorage as Home save action.
 */
export function SavedPage() {
  const { saved, removeRecipe } = useSavedRecipes();

  return (
    <div className="min-h-svh pb-16">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Saved recipes
          </h1>
          <p className="mt-2 text-stone-500 dark:text-stone-400">
            {saved.length} {saved.length === 1 ? 'recipe' : 'recipes'} in your
            collection
          </p>
        </motion.div>
        <SavedRecipes saved={saved} onDelete={removeRecipe} />
      </main>
    </div>
  );
}
