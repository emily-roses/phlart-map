<script lang="ts">
	import type { Art } from '$lib/utils/api';

	const { art }: { art: Art } = $props();
</script>

<ul>
	<li><img loading="lazy" src={art.pictures[0].large.url} alt={art.title.display} /></li>
	<li><h2>{art.title.display}</h2></li>
	<li>
		{#if art.artists?.length == 1}
			<h3>Artist:</h3>
			<span>{art.artists[0].name}</span>
		{:else if (art.artists?.length || 0) > 1}
			<h3>Artists:</h3>
			<ul>
				{#each art.artists as artist}
					<li><span>{artist.name} </span></li>
				{/each}
			</ul>
		{/if}
	</li>
</ul>

<style>
	ul {
		padding: 0;
		list-style: none;
	}
	img {
		max-width: 100%;
	}
	h3 {
		margin: 0;
		display: inline;
	}
</style>
