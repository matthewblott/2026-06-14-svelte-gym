import { goto } from '$app/navigation';
// import { tick } from 'svelte';
// import '$lib/hotwire/core';
// import { Application } from '@hotwired/stimulus';
// import { controllers } from '@joemasilotti/bridge-components';

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

// tick().then(() => {
// 	document.dispatchEvent(new Event('turbo:load'));
// });
// const application = Application.start();
// application.load(controllers);
