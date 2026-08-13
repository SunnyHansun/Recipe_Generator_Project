import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const STORAGE_KEY = 'recipeai_saved_v1';

const SavedRecipesContext = createContext(null);

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Global saved recipes (localStorage) — shared by Home and Saved routes.
 */
export function SavedRecipesProvider({ children }) {
  const [saved, setSaved] = useState(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  const saveRecipe = useCallback((recipe) => {
    setSaved((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      if (exists) return prev;
      return [recipe, ...prev];
    });
  }, []);

  const removeRecipe = useCallback((id) => {
    setSaved((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const isSaved = useCallback(
    (id) => saved.some((r) => r.id === id),
    [saved]
  );

  const value = { saved, saveRecipe, removeRecipe, isSaved };

  return (
    <SavedRecipesContext.Provider value={value}>
      {children}
    </SavedRecipesContext.Provider>
  );
}

export function useSavedRecipes() {
  const ctx = useContext(SavedRecipesContext);
  if (!ctx) {
    throw new Error('useSavedRecipes must be used within SavedRecipesProvider');
  }
  return ctx;
}
