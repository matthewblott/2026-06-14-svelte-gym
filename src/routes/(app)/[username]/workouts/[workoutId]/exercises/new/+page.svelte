<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import type { ExerciseList } from './+page.server.ts';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { getContext, type Snippet } from 'svelte';

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

  getContext<{ set: (s: Snippet | null) => void }>('header').set(header);

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

{#snippet header()}
  <h1>New Exercise</h1>
  <div role="group">
    <a href={routes.workouts.exercises.index(data.workoutId)} role="button">Exercises</a>
    <button form="new-workout-exercise-form" disabled={!canSubmit}>Save</button>
  </div>
{/snippet}

<form method="POST" use:enhance id="new-workout-exercise-form">
  <fieldset>
    <input type="hidden" name="workoutId" value={data.workoutId} />
    <input type="hidden" name="exerciseId" value={match?.id ?? ''} />

    <form-field>
      <label for="exercise-name">Exercise Name</label>
      <input
        id="exercise-name"
        name="exerciseName"
        bind:value={exerciseName}
        oninput={handleInput}
        onblur={handleBlur}
        onfocus={() => showSuggestions = true}
        placeholder="Search or add new..."
        autocomplete="off"
      >

      {#if showSuggestions && filteredExercises.length > 0}
        <ul>
          {#each filteredExercises as exercise (exercise.id)}
            <li
              role="option"
              aria-selected={exercise.id === match?.id}
              onmousedown={() => selectExercise(exercise)}
            >
              <span>{exercise.name}</span>
              <span>{exercise.exerciseType}</span>
            </li>
          {/each}
          {#if isNewExercise}
            <li>New exercise — will be added to the list on save.</li>
          {/if}
        </ul>
      {/if}
    </form-field>
    <form-field disabled={!isNewExercise && !!match}>
      <legend>
        Exercise Type
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
    </form-field>
  </fieldset>
</form>

<style>

  form-field {
    ul {
      border-radius: var(--border-radius-pill);
      padding: 0.5rem 0.4rem;

      border: 0.05rem solid darkgray;
      li {
        padding: 0 0.6rem;
      }
      li:hover {
        background-color: lightyellow; 
      }
    }
  }

</style>
