<script lang="ts">
  import type { ActionData } from './$types';
  let { form }: { form: ActionData } = $props();
</script>

<h1>New Workout</h1>

<form method="POST">
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

  <!-- <label> -->
  <!--   Type -->
  <!--   <select name="exerciseType" aria-invalid={form?.field === 'exerciseType' ? 'true' : undefined}> -->
  <!--     <option value="weight" selected={form?.exerciseType === 'weight'}>Weight</option> -->
  <!--     <option value="cardio" selected={form?.exerciseType === 'cardio'}>Cardio</option> -->
  <!--   </select> -->
  <!--   {#if form?.field === 'exerciseType'} -->
  <!--     <span class="field-error">{form.message}</span> -->
  <!--   {/if} -->
  <!-- </label> -->

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
