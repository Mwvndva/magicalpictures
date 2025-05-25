import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CursorSparkles from './components/CursorSparkles';

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <CursorSparkles />
  </>
);
