<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<h1>{data.workout.name}</h1>

<div>
  <span>{data.workout.createdAt}</span>

</div>

<form method="POST">
  <input name="name" value={data.workout.name} required>
  <button type="submit">Save</button>
</form>
