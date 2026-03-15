<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllArt, type Art } from '$lib/utils/api';
	import AddressInput from './components/AddressInput.svelte';
	import Filter from '$lib/components/Filter.svelte';

	function artistLi(artistArray: Art['artists'] = []) {
		let listContainer = document.createElement('li');
		if (artistArray.length == 1) {
			let strong = document.createElement('strong');
			let strongContent = document.createTextNode('Artist');
			strong.appendChild(strongContent);
			let text = document.createTextNode(': ' + artistArray[0]['name']);
			listContainer.appendChild(strong);
			listContainer.appendChild(text);
			return listContainer;
		}
		let strong = document.createElement('strong');
		let strongContent = document.createTextNode('Artists:');
		strong.append(strongContent);
		listContainer.append(strong);
		let list = document.createElement('ul');
		for (const artist of artistArray) {
			let listitem = document.createElement('li');
			let text = document.createTextNode(artist.name);
			listitem.appendChild(text);
			list.appendChild(listitem);
		}
		listContainer.appendChild(list);
		return listContainer;
	}

	function pictureLi(pictureArray: Art['pictures']) {
		const pictureUrl = pictureArray[0]['small']['url'];
		let listContainer = document.createElement('li');
		let img = document.createElement('img');
		img.setAttribute('src', pictureUrl);
		listContainer.appendChild(img);
		return listContainer;
	}

	onMount(async () => {
		const L = await import('leaflet');

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
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		const arts = getAllArt();
		for (const art of arts) {
			let marker = L.marker([Number(art.location.latitude), Number(art.location.longitude)], {
				icon: landmark
			});
			let list = document.createElement('ul');
			if (art.pictures && art.pictures.length) {
				let pictureHtml = pictureLi(art.pictures);
				list.append(pictureHtml);
			}
			if (art.artists) {
				let artistHtml = artistLi(art.artists);
				list.append(artistHtml);
			}
			let popup = L.popup().setContent(list);
			marker.bindPopup(popup).openPopup();
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
<div id="map">
	<div class="nav-header">
		<AddressInput></AddressInput>
		<Filter />
	</div>
</div>

<style>
	#map {
		height: 100vh;
	}
	.nav-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
