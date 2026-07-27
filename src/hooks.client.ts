// import '$lib/hotwire/index' // Uncomment when not using the shim 
import { goto } from '$app/navigation';

const nav = window.HotwireNavigator;

nav.setStartVisitHandler(async (location, restorationId, options) => {
  const isSamePage = location.href === window.location.href;
  await goto(location, { replaceState: options.action === 'replace' });
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
  nav.visitProposedToLocation(url, { action: 'advance', acceptsStreamResponse: false });
}, { capture: true });

// Uncomment when not using the shim
// import { tick } from 'svelte';
// tick().then(() => {
// 	document.dispatchEvent(new Event('turbo:load'));
// });
