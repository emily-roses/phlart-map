<script>
	import Map from '$lib/Map.svelte';
</script>

<div class="navbar">
	<img alt="phlart logo" src="phlart.png" />
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
	a {
		padding: 10px;
		color: #000;
	}
</style>
