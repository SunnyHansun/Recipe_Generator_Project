import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Eye, Bookmark } from 'lucide-react';

/**
 * Grid of saved recipes with view / delete actions.
 */
export function SavedRecipes({ saved, onDelete }) {
  const navigate = useNavigate();

  if (saved.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-dashed border-cream-300 bg-cream-50/80 px-8 py-16 text-center dark:border-stone-700 dark:bg-stone-900/40"
      >
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sage-400 shadow-soft dark:bg-stone-800 dark:text-sage-500">
          <Bookmark className="h-8 w-8" />
        </span>
        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
          No saved recipes yet
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          Generate a recipe on Home, then tap Save — your favorites will appear
          here for quick access.
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="mt-8 rounded-full bg-sage-500 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-sage-600"
        >
          Go to Home
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {saved.map((recipe, index) => (
          <motion.article
            key={recipe.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ delay: index * 0.05 }}
            className="group overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-soft transition-shadow hover:shadow-soft-lg dark:border-stone-800 dark:bg-stone-900 dark:hover:shadow-none"
          >
            <div
              className={`relative aspect-[4/3] bg-gradient-to-br ${recipe.imageGradient || 'from-sage-200 to-cream-200 dark:from-sage-900 dark:to-stone-800'}`}
            >
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5" />
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2 font-semibold leading-snug text-stone-900 dark:text-stone-100">
                {recipe.title}
              </h3>
              <div className="mt-4 flex gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/', { state: { previewRecipe: recipe } })}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-sage-500 py-2.5 text-sm font-semibold text-white hover:bg-sage-600"
                >
                  <Eye className="h-4 w-4" />
                  View
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onDelete(recipe.id)}
                  className="inline-flex items-center justify-center rounded-xl border border-cream-200 px-3 py-2.5 text-stone-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-stone-700 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                  aria-label="Delete recipe"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </div>
  );
}
