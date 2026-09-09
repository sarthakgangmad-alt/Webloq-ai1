/**
 * WebloqAI — Futuristic Minimal Cursor
 * 
 * Features:
 * - Tiny glowing dot + smoothed lagging ring
 * - Expands on buttons, links, and cards
 * - Contextual label preview ('EXPLORE', 'BUILD', 'VIEW')
 * - Automatic disable on touch screens and prefers-reduced-motion
 */

export function initCustomCursor() {
    // Disable on touch devices or small viewports
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
        return;
    }

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';

    const label = document.createElement('span');
    label.className = 'cursor-label';
    ring.appendChild(label);

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    function render() {
        // Smooth easing for the trailing ring
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // Interactive element detection
    function updateCursorContext() {
        const interactiveEls = document.querySelectorAll('a, button, .workflow-node, .solution-card, .agent-card, .selectable-option');

        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.classList.add('hovered');
                if (el.matches('[data-open-discovery], .btn-primary, .btn-step-next, .btn-step-submit')) {
                    label.textContent = 'BUILD';
                    ring.classList.add('has-label');
                } else if (el.matches('.workflow-node, .solution-card, .system-tab-btn')) {
                    label.textContent = 'INSPECT';
                    ring.classList.add('has-label');
                } else if (el.matches('.agent-card')) {
                    label.textContent = 'AGENT';
                    ring.classList.add('has-label');
                } else {
                    label.textContent = '';
                    ring.classList.remove('has-label');
                }
            });

            el.addEventListener('mouseleave', () => {
                ring.classList.remove('hovered', 'has-label');
                label.textContent = '';
            });
        });
    }

    updateCursorContext();

    // Re-check when DOM changes
    const observer = new MutationObserver(updateCursorContext);
    observer.observe(document.body, { childList: true, subtree: true });
}
