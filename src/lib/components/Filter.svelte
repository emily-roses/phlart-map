<script lang="ts">
	import { filter } from "../utils/filter.ts";

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
		if (filterArray.length !== 0){
		    value = filter(filterArray, value);
		}
	};
</script>

<div id="main-filter-wrapper">
	{#each mainFilterTypes as mainFilter}
		<input
			id={mainFilter}
			onclick={() => {
				filteredSearch(mainFilter, this.checked);
			}}
			type="checkbox"
		/>
		<label for={mainFilter}>{mainFilter}</label>
	{/each}
</div>

<style>
	#main-filter-wrapper {
		display: flex;
		flex-direction: row;
		padding: 0.5em 0.25em;
		align-self: center;
		margin-right: 1em;
		margin-top: 1em;
		background: rgba(0, 0, 0, 0.2);
		z-index: 1000;
		width: fit-content;
	}

	@media (width <= 600px) {
		#main-filter-wrapper {
			flex-direction: column;
		}
	}
</style>
