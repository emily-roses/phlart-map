<script lang="ts">
	import { filterArt } from '../utils/filter.ts';
	import Filter from './Filter.svelte';

	let { value = $bindable() } = $props();

	type filterTypes = 'landmark' | 'architecture' | 'exhibits';
	const filterMap: Record<filterTypes, boolean> = $state({
		landmark: false,
		architecture: false,
		exhibits: false
	});
	const checkedFilters = $derived(
		Object.entries(filterMap)
			.filter(([_, val]) => val)
			.map(([key]) => key as filterTypes)
	);
	$effect(() => {
		if (checkedFilters.length !== 0) {
			value = filterArt(checkedFilters, value);
		}
	});
	$inspect(filterMap);
</script>

<div id="main-filter-wrapper">
	<h4>Show</h4>
	<div class="inputs">
		{#each Object.entries(filterMap) as [filter, isShowing]}
			<Filter {filter} {isShowing} />
		{/each}
	</div>
</div>

<style>
	#main-filter-wrapper {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		padding: 0.5em 0.25em;
		color: black;
		background-color: rgb(255, 255, 255, 80%);
		align-items: center;

		h4 {
			margin: 0;
		}

		.inputs {
			display: flex;
		}
	}
</style>
