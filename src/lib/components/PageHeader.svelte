<script lang="ts">
	let { title, children } = $props<{
		title: string;
		children?: any;
	}>();
</script>

<header class="page-header">
	<h1>{title}</h1>

	{#if children}
		<div class="actions">
			{@render children()}
		</div>
	{/if}
</header>
