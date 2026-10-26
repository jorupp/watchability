'use client';

import { useEffect } from 'react';

export function DevIndicatorPosition() {
    useEffect(() => {
        const styles = new Map<ShadowRoot, HTMLStyleElement>();

        function positionIndicator() {
            // Next.js renders its indicator inside a shadow root, beyond app CSS.
            document.querySelectorAll('nextjs-portal').forEach(portal => {
                const root = portal.shadowRoot;
                if (!root || styles.has(root)) return;
                const style = document.createElement('style');
                style.textContent = '[data-nextjs-toast]:has([data-nextjs-dev-tools-button]) { top: 8px !important; }';
                root.appendChild(style);
                styles.set(root, style);
            });
        }

        positionIndicator();
        const observer = new MutationObserver(positionIndicator);
        observer.observe(document.body, { childList: true });

        return () => {
            observer.disconnect();
            styles.forEach(style => style.remove());
        };
    }, []);

    return null;
}
