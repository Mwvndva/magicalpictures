import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Instant scroll — let page transition handle the visual smoothness
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
