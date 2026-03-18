<script lang="ts">
	const { filter } = $props();

	let isShowing = $state(true);
</script>

<input defaultChecked id={filter} bind:checked={isShowing} type="checkbox" />
<label for={filter}>{filter}</label>
