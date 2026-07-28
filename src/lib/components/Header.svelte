<script lang="ts">
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { page } from "$app/state";

  const headerCtx = getContext<{ set: (s: Snippet | null) => void }>('header')

	let props: { children: Snippet } = $props();

  $effect(() => {
    page.url;
    headerCtx.set(header);
  });

</script>

{#snippet header()}
	{@render props.children()}
{/snippet}
