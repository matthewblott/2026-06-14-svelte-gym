<script lang="ts">
  import PageHeader from "$lib/components/PageHeader.svelte";

  interface Exercise {
    id: number;
    name: string;
    exercise_type: 'cardio' | 'weights';
  }

  interface Props {
    workoutId: number;
    exercises: Exercise[];
  }

  let { workoutId, exercises = $bindable() }: Props = $props();

  let exerciseName = $state('');
  let exerciseType = $state<'cardio' | 'weights' | ''>('');
  let selectedExerciseId = $state<number | null>(null);
  let showSuggestions = $state(false);
  let saving = $state(false);
  let error = $state('');

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
    (selectedExerciseId !== null || isNewExercise)
  );

  $effect(() => {
    if (match) {
      selectedExerciseId = match.id;
      exerciseType = match.exercise_type;
    } else {
      selectedExerciseId = null;
    }
  });

  function selectExercise(exercise: Exercise) {
    exerciseName = exercise.name;
    exerciseType = exercise.exercise_type;
    selectedExerciseId = exercise.id;
    showSuggestions = false;
  }

  function handleInput() {
    showSuggestions = true;
    selectedExerciseId = null;
  }

  function handleBlur() {
    setTimeout(() => { showSuggestions = false; }, 150);
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    saving = true;
    error = '';

    try {
      if (isNewExercise) {
        const res = await fetch('/api/exercises', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: exerciseName.trim(), exercise_type: exerciseType })
        });
        if (!res.ok) throw new Error(await res.text());
        const created: Exercise = await res.json();
        exercises = [...exercises, created];
        selectedExerciseId = created.id;
      }

      const res = await fetch('/api/workout-exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workout_id: workoutId, exercise_id: selectedExerciseId })
      });
      if (!res.ok) throw new Error(await res.text());

      exerciseName = '';
      exerciseType = '';
      selectedExerciseId = null;

    } catch (err) {
      error = err instanceof Error ? err.message : 'An unexpected error occurred';
    } finally {
      saving = false;
    }
  }
</script>

<PageHeader title="New Exercise">
  <div role="group">
    <a href="/workout-exercises" role="button">Exercises</a>
    <button form="new-exercise-form">Save</button>
  </div>
</PageHeader>

<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
  <input type="hidden" name="workout_id" value={workoutId} />
  <input type="hidden" name="exercise_id" value={selectedExerciseId ?? ''} />

  <div class="field">
    <label for="exercise-name">Exercise</label>
    <div class="combobox-wrapper">
      <input
        id="exercise-name"
        type="text"
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
              aria-selected={exercise.id === selectedExerciseId}
              onmousedown={() => selectExercise(exercise)}
            >
              <span class="exercise-name">{exercise.name}</span>
              <span class="exercise-type">{exercise.exercise_type}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    {#if isNewExercise}
      <p class="hint">New exercise — will be added to the list on save.</p>
    {/if}
  </div>

  <fieldset disabled={!isNewExercise && selectedExerciseId !== null}>
    <legend>
      Type
      {#if isNewExercise}<span class="required">*</span>{/if}
    </legend>
    <label>
      <input type="radio" bind:group={exerciseType} value="weights" />
      Weights
    </label>
    <label>
      <input type="radio" bind:group={exerciseType} value="cardio" />
      Cardio
    </label>
  </fieldset>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <button type="submit" disabled={!canSubmit || saving}>
    {saving ? 'Saving...' : 'Add to Workout'}
  </button>
</form>
