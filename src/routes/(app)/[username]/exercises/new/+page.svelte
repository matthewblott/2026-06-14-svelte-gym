<script lang="ts">
  import { resolve } from '$app/paths';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import type { ActionData } from './$types';
  let { form }: { form: ActionData } = $props();
</script>

<PageHeader title="New Exercise">
  <div role="group">
    <a href={resolve('/exercises')} role="button">Exercises</a>
    <button form="new-exercise-form">Save</button>
  </div>
</PageHeader>

<form method="POST" id="new-exercise-form">
  {#if form?.error && !form?.field}
    <p class="form-error">{form.message}</p>
  {/if}

  <label>
    Name
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
    Type
    <select name="exerciseType">
      <option value="" disabled selected>Select a type</option>
      <option value="weights">Weights</option>
      <option value="cardio">Cardio</option>
    </select>
    {#if form?.field === 'exercise_type'}
      <span class="field-error">{form.message}</span>
    {/if}
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
