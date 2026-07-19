// import { Application } from '@hotwired/stimulus';
// import { controllers } from '@joemasilotti/bridge-components';
// const application = Application.start();

// import '$lib/hotwire'; // sets window.Turbo, window.HotwireNavigator
import { goto } from '$app/navigation';

const nav = window.HotwireNavigator;

nav.setStartVisitHandler(async (location, restorationId, options) => {
  await goto(location, { replaceState: options.action === 'replace' });
});

document.addEventListener('click', (event) => {
  const link = (event.target as HTMLElement).closest('a');
  if (!link || !link.href) return;

  const url = new URL(link.href);
  if (!nav.canNavigate(url)) return; // external link, file download, etc. — let the browser handle it

  event.preventDefault();
  nav.visitProposedToLocation(url);
}, { capture: true }); // capture phase, so this runs before SvelteKit's own link handler/ application.load(controllers);
