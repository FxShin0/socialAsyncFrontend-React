export const smoothScrollToTop = (mainContainerRef) => {
  const container = mainContainerRef.current;
  if (!container) return;

  const start = container.scrollTop;
  const duration = 500; // ms

  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    // easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3);

    container.scrollTop = start * (1 - ease);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
