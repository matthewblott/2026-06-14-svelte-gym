<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import type { PageData } from './$types';
  import type { ActionData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data, form }: { data: PageData, form: ActionData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>{data.exercise.name}</title>  	
</svelte:head>

<Header>
  <h1>{data.exercise.name}</h1>
  <div role="group">
    <a href={routes.settings.exercises.index()} role="button">Exercises</a>
    <button form="exercise-form">Save</button>
  </div>
</Header>

<a href={routes.settings.exercises.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Exercises</a>
<button form="exercise-form" data-controller="bridge--button" class="hidden">Save</button>

<Form id="exercise-form">
  {#if form?.error && !form?.field}
    <p class="form-error">{form.message}</p>
  {/if}

  <label>
    <span>Name</span>
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
    <span>Type</span>
    <select name="exerciseType">
      <option value="weights" selected={data.exercise.exerciseType === 'weights'}>Weights</option>
      <option value="cardio" selected={data.exercise.exerciseType === 'cardio'}>Cardio</option>
    </select>
  </label>

</Form>

<style>
  label {
    span {
      margin-left: 0.5rem;
    }
    input, select {
      margin-top: 0.5rem;
    }
  }

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
