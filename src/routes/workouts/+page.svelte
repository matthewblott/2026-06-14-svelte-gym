<script lang="ts">
  import type { PageData } from './$types';
  import { routes } from '$lib/routes/index';
  import barbell from '$lib/assets/images/icons/barbell-2.svg';
  import cardio from '$lib/assets/images/icons/cardio.svg';
  import cycle from '$lib/assets/images/icons/cycle.svg';
  import runner from '$lib/assets/images/icons/runner.svg';
  import { getContext, type Snippet } from 'svelte';

  let { data }: { data: PageData } = $props();

  const icons = [cycle, runner, cardio, barbell];
  const locale = $state(navigator.language);

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

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

</script>

{#snippet header()}
  <h1>Workouts</h1>
  <div role="group">
    <a href={routes.home()} role="button">Home</a>
    <button form="new-workout-form">New</button>
  </div>
{/snippet}

<form method="post" id="new-workout-form">
  <input type="hidden" name="locale" value={navigator.language}>
</form>

{#if data.workouts.length}
  {#each data.workouts as workout, i}

    <article class="pill">
      <a href={routes.workouts.exercises.index(workout.id)}>
        <h2>
          {dayFormatter.format(new Date(workout.createdAt))}          
        </h2>
        <h3>
          {dateFormatter.format(new Date(workout.createdAt))} @
          {timeFormatter.format(new Date(workout.createdAt))}          
        </h3>
        <img src={icons[i % icons.length]} alt={workout.name} width="48" height="48">
      </a>
    </article>
  {/each}
{:else}
  <p>No workouts yet.</p>
{/if}

<style>

  article {
    :hover {
      background-color: lightyellow;
    }
    a {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      align-items: center;

      h2 {
        /* color: var(--color-primary); */
        color: color-mix(in srgb, var(--color-primary), black 30%);
        font-size: xx-large;
      }
      h3 {
        font-size: large;
        color: grey;
      }
    }
  }

</style>
