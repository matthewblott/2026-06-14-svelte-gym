<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import type { Snippet } from "svelte";
  import type { SubmitFunction } from "@sveltejs/kit";

	let props: { id?:string; children?: Snippet } = $props();

	const submissionHandler: SubmitFunction = async ({ action }) => {
    return async ({ result }) => {

      if (result.type !== 'redirect') {
        await applyAction(result);
        return;
      }

      const url = new URL(result.location, window.location.origin);

      if (!window.HotwireNavigator.canNavigate(url)) {
        await goto(result.location);
        return;
      }
      window.HotwireNavigator.formSubmissionStarted(action);
      window.HotwireNavigator.visitProposedToLocation(url);
      window.HotwireNavigator.formSubmissionFinished(action);
    };
  }

</script>

<form method="post" id={props.id} use:enhance={submissionHandler}>
  {#if props.children}
    {@render props.children()}
  {/if}
</form>
