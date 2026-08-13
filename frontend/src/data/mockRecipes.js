/**
 * Mock recipe builder — simulates AI output from ingredients + preferences.
 * Replace with API call when backend is wired.
 */

const CUISINE_FLAIR = {
  Italian: 'rustic Italian',
  Asian: 'bright Asian-inspired',
  Mexican: 'zesty Mexican-style',
  Mediterranean: 'sun-kissed Mediterranean',
  French: 'classic French',
  Indian: 'aromatic Indian',
  American: 'comfort American',
};

const MEAL_PREFIX = {
  breakfast: 'Morning',
  lunch: 'Midday',
  dinner: 'Evening',
  drinks: 'Refreshing',
};

function titleCase(s) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * @param {string[]} ingredients
 * @param {{ cuisine: string, dietary: string, mealType: string, maxTime: number }} prefs
 */
export function buildMockRecipe(ingredients, prefs) {
  const main =
    ingredients[0]?.trim() || 'Pantry';
  const flair = CUISINE_FLAIR[prefs.cuisine] || 'chef-style';
  const prefix = MEAL_PREFIX[prefs.mealType] || 'Delicious';
  const dietaryNote =
    prefs.dietary !== 'None' ? ` (${prefs.dietary})` : '';

  const title = `${prefix} ${titleCase(main)} — ${flair}${dietaryNote}`;

  const extraIngredients = [
    'Olive oil',
    'Sea salt',
    'Fresh black pepper',
    ...(ingredients.length < 4 ? ['Lemon zest', 'Fresh herbs'] : []),
  ];

  const mergedIngredients = [
    ...ingredients.map((i) => titleCase(i.trim())),
    ...extraIngredients.slice(0, 5),
  ];

  const steps = [
    `Prep all ingredients and set a timer for under ${prefs.maxTime} minutes.`,
    `Heat a pan over medium heat. Sear or soften ${ingredients.slice(0, 2).join(' and ') || 'your base ingredients'} until fragrant.`,
    `Layer ${prefs.cuisine.toLowerCase()} flavors: balance acid, fat, and seasoning to taste.`,
    `Combine components and simmer gently until textures meld — about ${Math.min(prefs.maxTime, 25)} minutes.`,
    `Taste, adjust salt, and finish with fresh herbs or a drizzle of good oil. Serve warm.`,
  ];

  const tags = [
    prefs.dietary !== 'None' ? prefs.dietary : 'Balanced',
    prefs.maxTime <= 30 ? 'Quick' : 'Weekend',
    prefs.mealType === 'drinks' ? 'Beverage' : 'High flavor',
  ].filter(Boolean);

  return {
    id: crypto.randomUUID(),
    title,
    imageGradient: 'from-sage-200 via-cream-200 to-sage-100 dark:from-sage-800 dark:via-stone-800 dark:to-sage-900',
    ingredients: mergedIngredients,
    steps,
    tags,
    createdAt: new Date().toISOString(),
  };
}

/** Static sample for Storybook-style previews or tests */
export const SAMPLE_RECIPE = buildMockRecipe(
  ['chicken', 'rice', 'tomato'],
  {
    cuisine: 'Italian',
    dietary: 'None',
    mealType: 'dinner',
    maxTime: 45,
  }
);
