import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

const CUISINES = [
  'Italian',
  'Asian',
  'Mexican',
  'Mediterranean',
  'French',
  'Indian',
  'American',
];

const DIETARY = ['None', 'Vegan', 'Vegetarian', 'Halal', 'Gluten-free', 'Keto'];

const MEALS = ['breakfast', 'lunch', 'dinner', 'drinks'];

const selectClass =
  'mt-1.5 w-full cursor-pointer appearance-none rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 shadow-sm outline-none transition-colors focus:border-sage-400 focus:ring-2 focus:ring-sage-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-sage-600 dark:focus:ring-sage-900';

/**
 * Cuisine, dietary, meal type, and max cooking time.
 */
export function PreferencesPanel({ prefs, onChange }) {
  const update = (key, value) => onChange({ ...prefs, [key]: value });

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08, duration: 0.4 }}
      className="rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-soft dark:border-stone-800 dark:bg-stone-900/80 dark:shadow-none"
    >
      <div className="mb-5 flex items-center gap-2 text-stone-900 dark:text-stone-100">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream-100 text-sage-600 dark:bg-stone-800 dark:text-sage-400">
          <SlidersHorizontal className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-semibold tracking-tight">Preferences</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
          Cuisine
          <select
            className={selectClass}
            value={prefs.cuisine}
            onChange={(e) => update('cuisine', e.target.value)}
          >
            {CUISINES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
          Dietary
          <select
            className={selectClass}
            value={prefs.dietary}
            onChange={(e) => update('dietary', e.target.value)}
          >
            {DIETARY.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
          Meal type
          <select
            className={selectClass}
            value={prefs.mealType}
            onChange={(e) => update('mealType', e.target.value)}
          >
            {MEALS.map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Max cooking time
            <span className="ml-2 font-semibold text-sage-600 dark:text-sage-400">
              {prefs.maxTime} min
            </span>
          </label>
          <input
            type="range"
            min={10}
            max={120}
            step={5}
            value={prefs.maxTime}
            onChange={(e) => update('maxTime', Number(e.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-cream-200 accent-sage-500 dark:bg-stone-700 dark:accent-sage-500"
          />
        </div>
      </div>
    </motion.section>
  );
}
