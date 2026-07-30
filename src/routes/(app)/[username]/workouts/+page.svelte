<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import type { PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import barbell from '$lib/assets/images/icons/barbell-2.svg';
  import cardio from '$lib/assets/images/icons/cardio.svg';
  import cycle from '$lib/assets/images/icons/cycle.svg';
  import runner from '$lib/assets/images/icons/runner.svg';
	import { onMount, untrack } from 'svelte';
  import { browser } from '$app/environment';

  const locale = $state(browser ? navigator.language : 'en-US');

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));
  const icons = [cycle, runner, cardio, barbell];

  const dayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
  });

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  let items = $state(untrack(() => data.workouts));
	let nextCursor = $state(untrack(() => data.nextCursor));

	let loading = $state(false);
	let sentinel: HTMLElement;

	async function loadMore() {
		if (loading || !nextCursor) return;
		loading = true;

    const route = routes.api.workouts.index();
		const res = await fetch(`${route}?cursor=${encodeURIComponent(nextCursor)}`);
		const json = await res.json();

		items = [...items, ...json.workouts];
		nextCursor = json.nextCursor;
		loading = false;
	}
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) loadMore();
			},
			{ rootMargin: '400px' } // start loading before it's fully visible
		);
		observer.observe(sentinel);
		return () => observer.disconnect();
	});

</script>

<svelte:head>
  <title>Workouts</title>  	
</svelte:head>

<Header>
  <h1>Workouts</h1>
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
    <button form="new-workout-form">New</button>
  </div>
</Header>

<a href={routes.home()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Home</a>
<button form="new-workout-form" data-controller="bridge--button" class="hidden">New</button>

<Form id="new-workout-form">
  <input type="hidden" name="locale" value={navigator.language}>
</Form>

{#each items as workout, i}
  <article class="pill">
    <a href={routes.workouts.exercises.index(workout.id)}>
      <div>
        <h2>
          {dayFormatter.format(new Date(workout.createdAt))}          
        </h2>
        <h3>
          {dateFormatter.format(new Date(workout.createdAt))} @
          {timeFormatter.format(new Date(workout.createdAt))}          
        </h3>
      </div>
      <img src={icons[i % icons.length]} alt={workout.name} width="48" height="48">
    </a>
  </article>
{/each}

<div bind:this={sentinel} aria-hidden="true"></div>

{#if loading}
	<p>Loading…</p>
{/if}

{#if !nextCursor && items.length}
	<p>You've reached the end.</p>
{/if}

<style>
  article {
    a {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        h2 {
          color: color-mix(in srgb, var(--color-primary), black 30%);
          font-size: xx-large;
        }
        h3 {
          font-size: large;
          color: grey;
        }
      }
    }
  }
  p {
    text-align: center;
  }
</style>
