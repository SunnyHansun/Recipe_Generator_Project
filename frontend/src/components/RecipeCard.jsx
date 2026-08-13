import { motion } from 'framer-motion';
import { Heart, RefreshCw, Share2, Clock, UtensilsCrossed } from 'lucide-react';

/**
 * Full recipe view: hero, ingredients, steps, tags, actions.
 */
export function RecipeCard({
  recipe,
  isSaved,
  onSave,
  onRegenerate,
  onShare,
}) {
  if (!recipe) return null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft-lg dark:border-stone-800 dark:bg-stone-900 dark:shadow-none"
    >
      {/* Image placeholder */}
      <div
        className={`relative flex aspect-[21/9] min-h-[140px] items-end justify-start bg-gradient-to-br p-6 sm:aspect-[2.4/1] ${recipe.imageGradient}`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%200L60%2030L30%2060L0%2030z%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.12)%22%2F%3E%3C%2Fsvg%3E')] opacity-40" />
        <div className="relative flex flex-wrap items-center gap-2">
          {recipe.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-sage-700 shadow-sm backdrop-blur dark:bg-stone-900/80 dark:text-sage-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <UtensilsCrossed
          className="absolute right-6 top-6 h-10 w-10 text-white/30"
          aria-hidden
        />
      </div>

      <div className="p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
              {recipe.title}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
              <Clock className="h-4 w-4" />
              Tailored to your pantry & preferences
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSave}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-soft transition-colors ${
                isSaved
                  ? 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400'
                  : 'border border-cream-200 bg-cream-50 text-stone-700 hover:border-sage-200 hover:bg-sage-50 hover:text-sage-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-sage-800 dark:hover:bg-sage-950/40'
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                aria-hidden
              />
              {isSaved ? 'Saved' : 'Save'}
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRegenerate}
              className="inline-flex items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-soft transition-colors hover:border-sage-200 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-sage-700"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onShare}
              className="inline-flex items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-soft transition-colors hover:border-sage-200 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-sage-700"
            >
              <Share2 className="h-4 w-4" />
              Share
            </motion.button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <motion.li
                  key={`${ing}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-2 rounded-xl bg-cream-50 px-3 py-2 text-stone-700 dark:bg-stone-800/80 dark:text-stone-200"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />
                  {ing}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
              Steps
            </h3>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="flex gap-3 text-stone-700 dark:text-stone-300"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-xs font-bold text-sage-700 dark:bg-sage-900/50 dark:text-sage-300">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
