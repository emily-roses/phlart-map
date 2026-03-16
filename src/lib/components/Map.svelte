<script lang="ts">
	import { mount, onMount, unmount, type Component } from 'svelte';
	import { getAllArt, type Art } from '$lib/utils/api';
	import AddressInput from './AddressInput.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import ArtPopup from './ArtPopup.svelte';

	onMount(async () => {
		const L = await import('leaflet');

		function bindPopup(marker: L.Marker, createFn: (m: Element) => void) {
			let popupComponent: unknown;
			marker.bindPopup(() => {
				let container = L.DomUtil.create('div');
				popupComponent = createFn(container);
				return container;
			});

			marker.on('popupclose', () => {
				if (popupComponent) {
					let old = popupComponent;
					popupComponent = null;
					unmount(old, { outro: true });
				}
			});
		}
		// indy hall location
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
		var map = L.map('map').setView([39.962125, -75.140675], 15);
		map.zoomControl.setPosition('bottomleft');
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		const arts = await getAllArt();
		for (const art of arts) {
			let marker = L.marker([Number(art.location.latitude), Number(art.location.longitude)], {
				icon: landmark
			});

			bindPopup(marker, (m: Element) => {
				return mount(ArtPopup, {
					target: m,
					props: {
						art
					}
				});
			});

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
