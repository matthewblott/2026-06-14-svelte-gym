<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { ActionData, PageData } from './$types';
  import { routes } from '$lib/routes';
  import type { Selectable } from 'kysely';
  import type { WorkoutsView } from '$lib/schema';

  let { form, data }: { form: ActionData, data: PageData } = $props();

  const workoutView : Selectable<WorkoutsView> = data.workoutView;
  const workoutId = workoutView.workoutId!;
  const exerciseId = workoutView.exerciseId!;
  const workoutExerciseId = workoutView.workoutExerciseId!;

</script>

<PageHeader title="New Set">
  <div role="group">
    <a href={
        routes.workouts.exercises.sets.list({ workoutId, exerciseId })
      }
      role="button">
      Sets
    </a>
    <button form="new-set-form">Save</button>
  </div>
</PageHeader>

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
      {#if form?.field === 'name'}
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
      {#if form?.field === 'name'}
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
      {#if form?.field === 'name'}
        <span class="field-error">{form.message}</span>
      {/if}
    </label>

    <label>
      Duration 
      <input
        name="duration"
        type="number"
        placeholder="Duration"
        value={form?.reps?? ''}
        aria-invalid={form?.field === 'duration' ? 'true' : undefined}
      >
      {#if form?.field === 'name'}
        <span class="field-error">{form.message}</span>
      {/if}
    </label>

  {/if}

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
