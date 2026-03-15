<script lang="ts">
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<title>PhlArt Near You</title>
	<meta name="description" content="Find public art in your Philly neighborhood!" />
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
