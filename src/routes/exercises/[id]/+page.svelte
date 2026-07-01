<script lang="ts">
  import type { PageData } from './$types';
  import type { ActionData } from './$types';
  import PageHeader from '$lib/components/PageHeader.svelte';
  let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<PageHeader title={data.exercise.name}>
  <div role="group">
    <a href="/exercises" role="button">Exercises</a>
    <button form="exercise-form">Save</button>
  </div>
</PageHeader>

<form method="POST" id="exercise-form">
  {#if form?.error && !form?.field}
    <p class="form-error">{form.message}</p>
  {/if}

  <label>
    Name
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
    Type
    <select name="exerciseType">
      <option value="weights" selected={data.exercise.exerciseType === 'weights'}>Weights</option>
      <option value="cardio" selected={data.exercise.exerciseType === 'cardio'}>Cardio</option>
    </select>
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
