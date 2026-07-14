<script lang="ts">
  import { enhance } from '$app/forms';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { PageData } from './$types';
  import type { ExerciseList } from './+page.server.ts';
  import { createTenantRoutes } from '$lib/routes/tenant';
  
  const { data }: { data: PageData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));

  let exercises = $derived<ExerciseList[]>(data.exercises);
  let exerciseName = $state('');
  let exerciseType = $state<'cardio' | 'weights' | ''>('');
  let showSuggestions = $state(false);

  const match = $derived(
    exercises.find(e => e.name.toLowerCase() === exerciseName.toLowerCase())
  );

  const isNewExercise = $derived(
    exerciseName.trim().length > 0 && !match
  );

  const filteredExercises = $derived(
    exerciseName.trim()
      ? exercises.filter(e =>
          e.name.toLowerCase().includes(exerciseName.toLowerCase())
        )
      : []
  );

  const canSubmit = $derived(
    exerciseName.trim().length > 0 &&
    exerciseType !== '' &&
    (!!match || isNewExercise)
  );

  function selectExercise(exercise: ExerciseList) {
    exerciseName = exercise.name;
    exerciseType = exercise.exerciseType;
    showSuggestions = false;
  }

  function handleInput() {
    showSuggestions = true;
  }

  function handleBlur() {
    setTimeout(() => { showSuggestions = false; }, 150);
  }
</script>

<PageHeader title="Exercises">
  <div role="group">
    <a href={routes.workouts.exercises.index(data.workoutId)} role="button">Exercises</a>
    <button form="new-workout-exercise-form" disabled={!canSubmit}>Save</button>
  </div>
</PageHeader>

<form method="POST" use:enhance id="new-workout-exercise-form">
  <input type="hidden" name="workoutId" value={data.workoutId} />
  <input type="hidden" name="exerciseId" value={match?.id ?? ''} />

  <div class="field">
    <label for="exercise-name">Exercise</label>
    <div class="combobox-wrapper">
      <input
        id="exercise-name"
        type="text"
        name="exerciseName"
        bind:value={exerciseName}
        oninput={handleInput}
        onblur={handleBlur}
        onfocus={() => showSuggestions = true}
        placeholder="Search or add new..."
        autocomplete="off"
      />

      {#if showSuggestions && filteredExercises.length > 0}
        <ul class="suggestions" role="listbox">
          {#each filteredExercises as exercise (exercise.id)}
            <li
              role="option"
              aria-selected={exercise.id === match?.id}
              onmousedown={() => selectExercise(exercise)}
            >
              <span class="exercise-name">{exercise.name}</span>
              <span class="exercise-type">{exercise.exerciseType}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    {#if isNewExercise}
      <p class="hint">New exercise — will be added to the list on save.</p>
    {/if}
  </div>

  <fieldset disabled={!isNewExercise && !!match}>
    <legend>
      Type
      {#if isNewExercise}<span class="required">*</span>{/if}
    </legend>
    <label>
      <input type="radio" name="exerciseType" bind:group={exerciseType} value="weights" />
      Weights
    </label>
    <label>
      <input type="radio" name="exerciseType" bind:group={exerciseType} value="cardio" />
      Cardio
    </label>
  </fieldset>
</form>
