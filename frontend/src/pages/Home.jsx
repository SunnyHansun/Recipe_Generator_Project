import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/Navbar';
import { IngredientInput } from '../components/IngredientInput';
import { PreferencesPanel } from '../components/PreferencesPanel';
import { RecipeCard } from '../components/RecipeCard';
import { buildMockRecipe } from '../data/mockRecipes';
import { useSavedRecipes } from '../context/SavedRecipesContext';

const defaultPrefs = {
  cuisine: 'Italian',
  dietary: 'None',
  mealType: 'dinner',
  maxTime: 45,
};

/**
 * Main flow: ingredients → preferences → mock generate → recipe card.
 */
export function Home() {
  const location = useLocation();
  const [ingredientItems, setIngredientItems] = useState([]);
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const { saveRecipe, removeRecipe, isSaved } = useSavedRecipes();

  // Open a recipe when navigated from Saved page with state
  useEffect(() => {
    const preview = location.state?.previewRecipe;
    if (preview) {
      setRecipe(preview);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const ingredientStrings = ingredientItems.map((i) => i.value);

  const runGenerate = useCallback(async () => {
    if (ingredientStrings.length === 0) {
      toast.error('Add at least one ingredient to generate a recipe.');
      return;
    }
    setLoading(true);
    // Simulate network / model latency
    await new Promise((r) => setTimeout(r, 1600));
    const next = buildMockRecipe(ingredientStrings, prefs);
    setRecipe(next);
    setLoading(false);
    toast.success('Your recipe is ready!');
  }, [ingredientStrings, prefs]);

  const handleSave = useCallback(() => {
    if (!recipe) return;
    if (isSaved(recipe.id)) {
      removeRecipe(recipe.id);
      toast.message('Removed from saved');
    } else {
      saveRecipe(recipe);
      toast.success('Recipe saved!');
    }
  }, [recipe, isSaved, saveRecipe, removeRecipe]);

  const handleShare = useCallback(async () => {
    if (!recipe) return;
    const text = `${recipe.title}\n\nIngredients:\n${recipe.ingredients.join('\n')}\n\nSteps:\n${recipe.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: recipe.title, text });
        toast.success('Shared!');
        return;
      } catch {
        /* fall through */
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Recipe copied to clipboard');
    } catch {
      toast.error('Could not copy — try again');
    }
  }, [recipe]);

  const showEmpty = !loading && !recipe;

  return (
    <div className="min-h-svh pb-16">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sage-600 dark:text-sage-400">
            AI-powered kitchen
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl md:text-5xl">
            Turn what you have into{' '}
            <span className="text-sage-600 dark:text-sage-400">something delicious</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-stone-500 dark:text-stone-400">
            Add ingredients, set your preferences, and get a tailored recipe — no
            waste, more flavor.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-soft dark:border-stone-800 dark:bg-stone-900/80"
          >
            <h2 className="mb-4 text-lg font-semibold text-stone-900 dark:text-stone-100">
              What&apos;s in your kitchen?
            </h2>
            <IngredientInput items={ingredientItems} onItemsChange={setIngredientItems} />
          </motion.section>

          <PreferencesPanel prefs={prefs} onChange={setPrefs} />

          <motion.div className="flex justify-center">
            <motion.button
              type="button"
              disabled={loading}
              onClick={runGenerate}
              whileHover={loading ? {} : { scale: 1.02 }}
              whileTap={loading ? {} : { scale: 0.98 }}
              className="relative inline-flex min-h-[56px] min-w-[240px] items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-sage-500 to-sage-600 px-10 text-lg font-semibold text-white shadow-soft-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-70 dark:from-sage-600 dark:to-sage-500"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Cooking something delicious…
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Recipe
                </>
              )}
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.p
                key="loading-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-stone-500 dark:text-stone-400"
              >
                Mixing flavors and ideas…
              </motion.p>
            )}
          </AnimatePresence>

          {showEmpty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-dashed border-cream-300 bg-cream-50/50 py-16 text-center dark:border-stone-700 dark:bg-stone-900/30"
            >
              <p className="mx-auto max-w-sm text-stone-500 dark:text-stone-400">
                Your recipe will show up here. Add a few ingredients and tap{' '}
                <span className="font-semibold text-sage-600 dark:text-sage-400">
                  Generate Recipe
                </span>{' '}
                to get started.
              </p>
            </motion.div>
          )}

          {recipe && (
            <RecipeCard
              recipe={recipe}
              isSaved={isSaved(recipe.id)}
              onSave={handleSave}
              onRegenerate={runGenerate}
              onShare={handleShare}
            />
          )}
        </div>
      </main>
    </div>
  );
}
