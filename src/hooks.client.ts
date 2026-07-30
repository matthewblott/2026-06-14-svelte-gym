// import '$lib/hotwire/index' // Uncomment when not using the shim 
import { goto } from '$app/navigation';
import type { VisitOptions } from '$lib/hotwire/core/types';

const nav = window.HotwireNavigator;

nav.setStartVisitHandler(async (location: URL, restorationIdentifier: string, options: VisitOptions) => {
  const isSamePage = location.href === window.location.href;

  goto(location, {
    invalidateAll: true,
    replaceState: options?.action === 'replace',
  });

  if (isSamePage) {
    document.dispatchEvent(new Event('native:restore'));
  }
});

document.addEventListener('click', (event) => {
  const link = (event.target as HTMLElement).closest('a');
  if (!link || !link.href) return;

  const url = new URL(link.href);
  if (!nav.canNavigate(url)) return;

  event.preventDefault();

  // nav.visitProposedToLocation(url, { action: 'advance', acceptsStreamResponse: false });
  nav.visitProposedToLocation(url, { action: 'advance' });
}, { capture: true });

// Uncomment when not using the shim
// import { tick } from 'svelte';
// tick().then(() => {
// 	document.dispatchEvent(new Event('turbo:load'));
// });
