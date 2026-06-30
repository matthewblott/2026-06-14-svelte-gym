<script lang="ts">
  import type { PageData } from './$types';
  import type { ActionData } from './$types';

  let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<h1>{data.workout.name}</h1>

<div>
  <span>{data.workout.createdAt}</span>
</div>

<form method="POST">
  {#if form?.error && !form?.field}
    <p class="form-error">{form.message}</p>
  {/if}

  <label>
    Name
    <input
      name="name"
      placeholder="Name"
      value={form?.name ?? data.workout.name ?? ''}
      aria-invalid={form?.field === 'name' ? 'true' : undefined}
    >
    {#if form?.field === 'name'}
      <span class="field-error">{form.message}</span>
    {/if}
  </label>

  <button type="submit">Create</button>
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
