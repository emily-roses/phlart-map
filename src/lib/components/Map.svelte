<script lang="ts">
	import { mount, onMount, unmount } from 'svelte';
	import { getAllArt, type Art } from '$lib/utils/api';
	import ArtPopup from './ArtPopup.svelte';

	const arts = $state(getAllArt());

	onMount(async () => {
		const L = await import('leaflet');

		function bindPopup(marker: L.Marker, art: Art) {
			let popupComponent: Record<string, any>;
			marker.bindPopup(() => {
				let container = L.DomUtil.create('div');
				popupComponent = mount(ArtPopup, {
					target: container,
					props: {
						art
					}
				});
				return container;
			});

			marker.on('popupclose', async () => {
				if (popupComponent) {
					await unmount(popupComponent, { outro: true });
				}
			});
		}
		const iconSize: [number, number] = [19, 30];
		const iconAnchor: [number, number] = [iconSize[0] / 2, iconSize[1]];
		const popupAnchor: [number, number] = [0, iconSize[1] * -1];
		const architecture = L.icon({
			iconUrl: 'icons/architecture.png',
			iconSize: iconSize,
			iconAnchor: iconAnchor,
			popupAnchor: popupAnchor
		});
		const landmark = L.icon({
			iconUrl: 'icons/landmark.png',
			iconSize: iconSize,
			iconAnchor: iconAnchor,
			popupAnchor: popupAnchor
		});

		// indy hall location
		var map = L.map('map').setView([39.962125, -75.140675], 15);
		map.zoomControl.setPosition('bottomleft');
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);

		for (const art of arts) {
			let marker = L.marker([Number(art.location.latitude), Number(art.location.longitude)], {
				icon: landmark
			});

			bindPopup(marker, art);

			marker.addTo(map);
		}
	});
</script>

<link
	rel="stylesheet"
	href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
	integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
	crossorigin=""
/>
<div id="map"></div>

<style>
	#map {
		height: 100vh;
	}
</style>
