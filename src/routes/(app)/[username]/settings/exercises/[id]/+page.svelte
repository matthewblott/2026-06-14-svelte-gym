<script lang="ts">
  import type { PageData, SubmitFunction } from './$types';
  import type { ActionData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext, type Snippet } from 'svelte';
    import { applyAction, enhance } from '$app/forms';
    import { goto } from '$app/navigation';

  let { data, form }: { data: PageData, form: ActionData } = $props();

  const routes = $derived(createTenantRoutes(data.user.name));

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

	const submissionHandler: SubmitFunction = async ({ action }) => {
    return async ({ result }) => {

      if (result.type !== 'redirect') {
        await applyAction(result);
        return;
      }

      const url = new URL(result.location, window.location.origin);

      if (!window.HotwireNavigator.canNavigate(url)) {
        await goto(result.location);
        return;
      }

      window.HotwireNavigator.formSubmissionStarted(action);
      window.HotwireNavigator.visitProposedToLocation(url);
      window.HotwireNavigator.formSubmissionFinished(action);

    };
  }
</script>

<svelte:head>
  <title>{data.exercise.name}</title>  	
</svelte:head>

{#snippet header()}
  <h1>{data.exercise.name}</h1>
  <div role="group">
    <a href={routes.settings.exercises.index()} role="button">Exercises</a>
    <button form="exercise-form">Save</button>
  </div>
{/snippet}

<a href={routes.settings.exercises.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Exercises</a>
<button form="exercise-form" data-controller="bridge--button" class="hidden">Save</button>

<form method="post" use:enhance={submissionHandler} id="exercise-form">
  {#if form?.error && !form?.field}
    <p class="form-error">{form.message}</p>
  {/if}

  <label>
    Name
    <input
      name="name"
      placeholder="Name"
      value={form?.name ?? data.exercise.name ?? ''}
      aria-invalid={form?.field === 'name' ? 'true' : undefined}
    >
    {#if form?.field === 'name'}
      <span class="field-error">{form.message}</span>
    {/if}
  </label>
  <label>
    Type
    <select name="exerciseType">
      <option value="weights" selected={data.exercise.exerciseType === 'weights'}>Weights</option>
      <option value="cardio" selected={data.exercise.exerciseType === 'cardio'}>Cardio</option>
    </select>
  </label>

</form>

<style>
  .form-error {
    color: #b91c1c;
  }
  .field-error {
    display: block;
    color: #b91c1c;
    font-size: 0.875rem;
  }
  [aria-invalid="true"] {
    border-color: #b91c1c;
  }
</style>
