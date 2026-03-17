<script lang="ts">
	import { filter } from '../utils/filter.ts';

	let { value = $bindable() } = $props();

	const mainFilterTypes = ['landmark', 'architecture', 'exhibits'];
	const filterConfiguration: { [key: string]: boolean } = {
		landmark: false,
		architecture: false,
		exhibits: false
	};
	const fetchCheckedFilters = (filterConfiguration: { [key: string]: boolean }) => {
		var filterArray: string[] = [];
		Object.keys(filterConfiguration).forEach((filter) => {
			if (filterConfiguration[filter]) {
				filterArray.push(filter);
			}
		});
		return filterArray;
	};
	const filteredSearch = (filterName: string, filterChecked: boolean) => {
		filterConfiguration[filterName] = filterChecked;
		const filterArray = fetchCheckedFilters(filterConfiguration);
		if (filterArray.length !== 0) {
			value = filter(filterArray, value);
		}
	};
</script>

<div id="main-filter-wrapper">
	{#each mainFilterTypes as mainFilter}
		<input
			id={mainFilter}
			bind:checked={() => value, (v) => filteredSearch(mainFilter, v)}
			type="checkbox"
		/>
		<label for={mainFilter}>{mainFilter}</label>
	{/each}
</div>

<style>
	#main-filter-wrapper {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 0.5em 0.25em;
		color: black;
		background-color: rgb(255, 255, 255, 80%);
	}
</style>
