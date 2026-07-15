import { getContext, setContext, type Snippet } from 'svelte';

const KEY = Symbol('page-header');

export function createPageHeaderState() {
  let title = $state('');
  let menu = $state<{ label: string; href: string; current?: boolean }[]>([]);
  let content = $state<Snippet | null>(null);

  const state = {
    get title() { return title; },
    set title(value: string) { title = value; },
    get menu() { return menu; },
    set menu(value) { menu = value; },
    get content() { return content; },
    set content(value: Snippet | null) { content = value; }
  };

  setContext(KEY, state);
  return state;
}

export function getPageHeader() {
  return getContext<ReturnType<typeof createPageHeaderState>>(KEY);
}
