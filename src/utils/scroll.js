export const smoothScrollTo = (targetId, duration = 1500) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const headerOffset = 80;
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let start = null;

  const animation = (currentTime) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const ease = progress < 0.5 
      ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};
