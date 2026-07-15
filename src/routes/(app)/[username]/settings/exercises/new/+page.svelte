{#snippet header()}
  <div role="group">
    <a href={routes.settings.exercises.index()} role="button">Exercises</a>
    <button form="new-exercise-form">Save</button>
  </div>
{/snippet}

<script lang="ts">
  import type { ActionData, PageData } from './$types';
  let { data, form }: { data: PageData; form: ActionData } = $props();
  import { createTenantRoutes } from '$lib/routes/tenant';
  const routes = $derived(createTenantRoutes(data.user.name));
  import { getPageHeader } from '$lib/components/page-header.svelte';
  const pageHeader = getPageHeader();
  pageHeader.title = 'New Exercise';
  pageHeader.content = header;
</script>

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
