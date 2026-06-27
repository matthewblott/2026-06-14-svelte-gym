<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<h1>{data.exercise.name}</h1>

<form method="POST">
  <label>
    Name
    <input name="name" value={data.exercise.name} required>
  </label>
  <label>
    Type
    <select name="exerciseType">
      <option value="weights" selected={data.exercise.exerciseType === 'weights'}>Weights</option>
      <option value="cardio" selected={data.exercise.exerciseType === 'cardio'}>Cardio</option>
    </select>
  </label>
  <button type="submit">Save</button>
</form>
