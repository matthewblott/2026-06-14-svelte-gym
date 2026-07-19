<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext, type Snippet } from 'svelte';

  let { form, data }: { form: ActionData, data: PageData } = $props();

  const workoutView = $derived(data.workoutView);
  const workoutId = $derived(workoutView.workoutId!);
  const exerciseId = $derived(workoutView.exerciseId!);
  const workoutExerciseId = $derived(workoutView.id!);
  const routes = $derived(createTenantRoutes(data.user.name));

  let backRoute = $derived(routes.workouts.exercises.sets.index({ workoutId, exerciseId }));
  let backRouteText = $derived('Sets');
  let isFirstSet = $derived(data.isFirstSet);

  if(isFirstSet) {
    backRoute = routes.workouts.exercises.index(workoutId);
    backRouteText = 'Exercises';
  }

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

</script>

{#snippet header()}
  <h1>New Set</h1>
  <div role="group">
    <a href={backRoute} role="button">{backRouteText}</a>
    <button form="new-set-form">Save</button>
  </div>
{/snippet}

<form method="POST" id="new-set-form">
  {#if form?.error && !form?.field}
    <p class="form-error">{form.message}</p>
  {/if}

  <input type="hidden" name="exerciseType" value={workoutView.exerciseType}>
  <input type="hidden" name="workoutId" value={workoutId}>
  <input type="hidden" name="exerciseId" value={exerciseId}>
  <input type="hidden" name="workoutExerciseId" value={workoutExerciseId}>

  {#if workoutView.exerciseType === 'weights' }

    <label>
      Weight
      <input
        name="weight"
        type="number"
        placeholder="Weight"
        value={form?.weight ?? ''}
        aria-invalid={form?.field === 'weight' ? 'true' : undefined}
      >
      {#if form?.field === 'weight'}
        <span class="field-error">{form.message}</span>
      {/if}
    </label>

    <label>
      Reps
      <input
        name="reps"
        type="number"
        placeholder="Reps"
        value={form?.reps ?? ''}
        aria-invalid={form?.field === 'reps' ? 'true' : undefined}
      >
      {#if form?.field === 'reps'}
        <span class="field-error">{form.message}</span>
      {/if}
    </label>

  {:else}

    <label>
      Distance
      <input
        name="distance"
        type="number"
        placeholder="Distance"
        value={form?.distance ?? ''}
        aria-invalid={form?.field === 'distance' ? 'true' : undefined}
      >
      {#if form?.field === 'distance'}
        <span class="field-error">{form.message}</span>
      {/if}
    </label>

    <label>
      Duration
      <input
        name="duration"
        type="time"
        placeholder="00:00:00"
        value={form?.reps?? ''}
        step="1"
        aria-invalid={form?.field === 'duration' ? 'true' : undefined}
      >

      {#if form?.field === 'duration'}
        <span class="field-error">{form.message}</span>
      {/if}
    </label>

  {/if}

</form>
