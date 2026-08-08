<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
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

<svelte:head>
  <title>New Exercise</title>  	
</svelte:head>

<Header>
  <h1>New Exercise</h1>
  <div role="group">
    <a href={routes.workouts.exercises.index(data.workoutId)} role="button">Exercises</a>
    <button form="new-workout-exercise-form" disabled={!canSubmit}>Save</button>
  </div>
</Header>

{#if !data.isAndroid}
  <a href={routes.workouts.exercises.index(data.workoutId)} data-controller="bridge--back" data-bridge-side="left" class="hidden">Exercises</a>
{/if}
<button form="new-workout-exercise-form" disabled={!canSubmit} data-controller="bridge--button" class="hidden">Save</button>

<Form id="new-workout-exercise-form">

  <fieldset>
    <input type="hidden" name="workoutId" value={data.workoutId} />
    <input type="hidden" name="exerciseId" value={match?.id ?? ''} />

    <form-field>
      <label>
        <span>Exercise Name</span>
        <input
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
                <span>({exercise.exerciseType})</span>
              </li>
            {/each}
            {#if isNewExercise}
              <li class="new-exercise">New exercise (added on save)</li>
            {/if}
          </ul>
        {/if}
      </label>
    </form-field>
    <form-field disabled={!isNewExercise && !!match}>
      <legend>
        <span>Exercise Type</span>
        {#if isNewExercise}<span class="required">*</span>{/if}
      </legend>
      <div>
        <label>
          <input type="radio" name="exerciseType" bind:group={exerciseType} value="weights">
          Weights
        </label>
        <label>
          <input type="radio" name="exerciseType" bind:group={exerciseType} value="cardio">
          Cardio
        </label>
      </div>
    </form-field>
  </fieldset>
</Form>

<style>
  legend {
    span {
      margin-left: 0.5rem;
    }
    margin-bottom: 0.25rem;
  }
  label {
    span {
      margin-left: 0.5rem;
    }
    input {
      margin-top: 0.5rem;
    }
  }
  form-field {
    div {
      display: flex;
      gap: 1rem;
      border-radius: var(--border-radius-pill);
      border: 0.05rem solid darkgray;
      padding: 0.7rem 1.2rem;
    }
  }

  form-field {
    ul {
      border-radius: var(--border-radius-pill);
      padding: 0.5rem 0.4rem;

      border: 0.05rem solid darkgray;
      li {
        padding: 0 0.6rem;

        &:hover {
          background-color: lightyellow; 
        }
        &.new-exercise {
          font-style: italic;
          margin-left: 0.5rem;
        }
      }
    }
  }
</style>
