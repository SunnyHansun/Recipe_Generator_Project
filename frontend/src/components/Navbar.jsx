import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, ChefHat } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const linkClass =
  'rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-cream-200/80 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100';

const activeClass =
  'bg-white text-sage-600 shadow-soft dark:bg-stone-800 dark:text-sage-300';

/**
 * Top navigation: brand, routes, theme toggle.
 */
export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-cream-200/80 bg-cream-50/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className="group flex items-center gap-2 text-stone-900 dark:text-stone-100"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-100 text-sage-600 shadow-soft transition-transform group-hover:scale-105 dark:bg-sage-900/40 dark:text-sage-300">
            <ChefHat className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-semibold tracking-tight">RecipeAI</span>
        </NavLink>

        <nav className="flex flex-1 items-center justify-center gap-1 sm:justify-end sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Saved Recipes
          </NavLink>
        </nav>

        <motion.button
          type="button"
          onClick={toggleTheme}
          whileTap={{ scale: 0.94 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-200 bg-white text-stone-600 shadow-soft transition-colors hover:border-sage-200 hover:text-sage-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-sage-700 dark:hover:text-sage-400"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}
