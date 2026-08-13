import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeContext';
import { SavedRecipesProvider } from './context/SavedRecipesContext';
import { Home } from './pages/Home';
import { SavedPage } from './pages/SavedPage';

export default function App() {
  return (
    <ThemeProvider>
      <SavedRecipesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<SavedPage />} />
          </Routes>
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{
              classNames: {
                toast:
                  'rounded-2xl border border-cream-200 bg-white shadow-soft dark:border-stone-700 dark:bg-stone-900',
              },
            }}
          />
        </BrowserRouter>
      </SavedRecipesProvider>
    </ThemeProvider>
  );
}
