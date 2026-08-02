<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import type { ActionData, PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  import { untrack } from 'svelte';

  let { form, data }: { form: ActionData, data: PageData } = $props();

  const workoutView = $derived(data.workoutView);
  const workoutId = $state(untrack(() => workoutView.workoutId!));
  const exerciseId = $derived(workoutView.exerciseId!);
  const workoutExerciseId = $derived(workoutView.id!);
  const routes = $state(untrack(() => createTenantRoutes(data.user.name)));

  let backRoute = $derived(routes.workouts.exercises.sets.index({ workoutId, exerciseId }));
  let backRouteText = $derived('Sets');
  let isFirstSet = $state(untrack(() => data.isFirstSet));

  if(isFirstSet) {
    backRoute = routes.workouts.exercises.index(workoutId);
    backRouteText = 'Exercises';
  }
</script>

<svelte:head>
  <title>New Set</title>  	
</svelte:head>

<Header>
  <h1>New Set</h1>
  <div role="group">
    <a href={backRoute} role="button">{backRouteText}</a>
    <button form="new-set-form">Save</button>
  </div>
</Header>

<a href={backRoute} data-controller="bridge--back" data-bridge-side="left" class="hidden">{backRouteText}</a>
<button form="new-set-form" data-controller="bridge--button" class="hidden">Save</button>

<Form id="new-set-form">
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
      <span>Distance in meters</span>
      <input
        name="distance"
        type="number"
        inputmode="numeric"
        placeholder="Distance (meters)"
        value={form?.distance ?? ''}
        aria-invalid={form?.field === 'distance' ? 'true' : undefined}
        required
      >
      {#if form?.field === 'distance'}
        <span class="field-error">{form.message}</span>
      {/if}
    </label>
    <label>
      <span>Duration</span>
      <div class="input-group">
        <input
          name="hours"
          inputmode="numeric"
          minlength="2"
          maxlength="2"
          pattern={"[0-9]{1,2}"}
          placeholder="HH"
          value="00" required>
        <span>:</span>
        <input
          name="minutes"
          inputmode="numeric"
          minlength="2"
          maxlength="2"
          pattern={"[0-9]{1,2}"}
          placeholder="mm"
          required>
        <span>:</span>
        <input
          name="seconds"
          inputmode="numeric"
          minlength="2"
          maxlength="2"
          pattern={"[0-9]{1,2}"}
          placeholder="ss"
          required>
      </div>
    </label>


  {/if}

</Form>

<style>
  label {
    span {
      margin-left: 0.5rem;
    }
    input, div {
      margin-top: 0.5rem;
    }
  }

  .input-group {
    display: flex;
    align-items: baseline;
    border: 1px solid #ccc;
    border-radius: 999em;
    overflow: hidden; /* so children respect the rounded corners */
    padding: 0 8px; /* so the colons don't touch the outer edge */

    &:focus-within {
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74,144,226,0.2);
    }

    input {
      border: none;
      outline: none;
      padding: 0;
      padding-bottom: 0.4rem; 
      background: transparent;
      font-size: x-large;

      &:focus {
        background: #f0f6ff;
      }

      &::placeholder {
        color: #bbb;
      }

      &:first-child {
        width: 2.5rem;
        text-align: right;
        padding: 0;
        margin: 0;
      }
      &:nth-of-type(2) {
        width: 2.25rem;
        text-align: right;
        padding: 0;
        margin: 0;
      }
      &:last-child {
        width: 2.5rem;
        padding-left: 0.5rem;
        text-align: left;
      }
    }

    span {
      /* font-size: x-large; */
      color: #888;
      &:first-child {
        padding: 0;
        margin: 0;
      }
      &:last-child {
        padding: 0;
        margin: 0;
      }
    }
  }

  /* Remove arrows from input number fields */
  /* Chrome, Edge, Safari */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    appearance: textfield;
  }

</style>
