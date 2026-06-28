import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import DeferredCursorSparkles from './components/DeferredCursorSparkles';

import { LazyMotion, domMax } from 'framer-motion';

createRoot(document.getElementById("root")!).render(
  <LazyMotion features={domMax}>
    <App />
    <DeferredCursorSparkles />
  </LazyMotion>
);
