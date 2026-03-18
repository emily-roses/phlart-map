<script>
	import AddressInput from '$lib/components/AddressInput.svelte';
	import FilterSet from '$lib/components/FilterSet.svelte';
	import Map from '$lib/components/Map.svelte';
</script>

<div class="navbar">
	<a href="christopher"><img alt="phlart logo" src="phlart.png" /></a>
	<AddressInput />
	<FilterSet />
</div>

<Map />

<style>
	.navbar {
		z-index: 1000;
		position: absolute;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		gap: 4px;
		padding: 8px;
		background: rgba(0, 0, 0, 0.25);

		img {
			max-width: 25vw;
		}
	}
</style>
