<script lang="ts">
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext, type Snippet } from 'svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);
</script>

<svelte:head>
  <title>Exercises</title>  	
</svelte:head>

{#snippet header()}
  <h1>Exercises</h1>
  <div role="group">
    <a href={routes.settings.index()} role="button">Settings</a>
    <a href={routes.settings.exercises.new()} role="button">New</a>
  </div>
{/snippet}

<a href={routes.settings.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Settings</a>
<a href={routes.settings.exercises.new()} data-controller="bridge--back" class="hidden">New</a>

{#if data.exercises.length}
  {#each data.exercises as exercise}
    <article class="pill">
      <a href={routes.settings.exercises.edit(exercise.id)}>
        <h2>
          {exercise.name}
        </h2>
        <h3>
          {exercise.exerciseType}
        </h3>
      </a>
    </article>
  {/each}
{:else}
  <p>No exercises yet.</p>
{/if}

<style>

  p {
    text-align: center;
  }

  article {
    :hover {
      /* background-color: lightyellow; */
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
