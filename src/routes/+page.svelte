<script>
	import Map from '$lib/components/Map.svelte';
</script>

<div class="navbar">
	<a href="christopher"><img alt="phlart logo" src="phlart.png" /></a>
</div>

<Map />

<style>
	.navbar {
		z-index: 1000;

		opacity: 50;
		position: absolute;
		left: 8px;
		top: 8px;
		gap: 4px;
		border-radius: 15px;
	}
</style>
