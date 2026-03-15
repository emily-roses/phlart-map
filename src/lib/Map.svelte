<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
<div id="map"></div>

<script>
  import { onMount } from 'svelte';
  onMount(async () => {
    console.log(window.innerWidth);
    const L = await import('leaflet')
    // indy hall location
    var map = L.map('map').setView([39.962125, -75.140675], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([39.96164917971281, -75.14149386089039]).addTo(map);
  });
</script>

<style>
  #map { height: 100vh; }
</style>
