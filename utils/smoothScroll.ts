
export const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>, href: string, callback?: () => void) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);

    if (elem) {
        const start = window.scrollY;
        const end = elem.getBoundingClientRect().top + start;
        const duration = 600; // 600ms - balanced speed
        const startTime = performance.now();

        const scroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeOutQuad - smooth deceleration
            const eased = 1 - (1 - progress) * (1 - progress);

            window.scrollTo(0, start + (end - start) * eased);

            if (progress < 1) {
                requestAnimationFrame(scroll);
            } else if (callback) {
                callback();
            }
        };

        requestAnimationFrame(scroll);
    }
};
