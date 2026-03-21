<script lang="ts">
	let { filter, isShowing = $bindable(true) } = $props();
</script>

<input defaultChecked id={filter} bind:checked={isShowing} type="checkbox" />
<label for={filter}>{filter}</label>
