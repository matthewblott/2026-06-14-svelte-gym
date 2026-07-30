<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import Header from "$lib/components/Header.svelte";
  import type { ActionData, PageData } from './$types';
  import { createTenantRoutes } from '$lib/routes/tenant';
  let { data, form }: { data: PageData; form: ActionData } = $props();
  const routes = $derived(createTenantRoutes(data.user.name));
</script>

<svelte:head>
  <title>New Exercise</title>  	
</svelte:head>

<Header>
  <h1>New Exercise</h1>
  <div role="group">
    <a href={routes.settings.exercises.index()} role="button">Exercises</a>
    <button form="new-exercise-form">Save</button>
  </div>
</Header>

<a href={routes.settings.exercises.index()} data-controller="bridge--back" class="hidden" data-bridge-side="left">Exercises</a>
<button form="new-exercise-form" data-controller="bridge--button" class="hidden">Save</button>

<Form id="new-exercise-form">
  {#if form?.error && !form?.field}
    <p class="form-error">{form.message}</p>
  {/if}

  <label>
    <span>Name</span>
    <input
      name="name"
      placeholder="Name"
      value={form?.name ?? ''}
      aria-invalid={form?.field === 'name' ? 'true' : undefined}
    >
    {#if form?.field === 'name'}
      <span class="field-error">{form.message}</span>
    {/if}
  </label>

  <label>
    <span>Type</span>
    <select name="exerciseType">
      <option value="" disabled selected>Select a type</option>
      <option value="weights">Weights</option>
      <option value="cardio">Cardio</option>
    </select>
    {#if form?.field === 'exercise_type'}
      <span class="field-error">{form.message}</span>
    {/if}
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
