<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
<div id="map">
  <input type="text" placeholder="enter an address..." style="z-index: 1000; position: relative;" id="search">
</div>

<script>
  import { onMount } from 'svelte';
  onMount(async () => {
    const L = await import('leaflet')

    const artJson = await fetch('https://www.philart.net/api/art.json', {
      method: 'GET'
    })
    console.log(artJson);
    // indy hall location
    var architecture = L.icon({
	iconUrl: 'icons/architecture.png',
	iconSize: [38, 60],
	iconAnchor: [17, 60],
	popupAnchor: [-3, -76],
    });
    var art = L.icon({
	iconUrl: 'icons/art.png',
	iconSize: [38, 60],
	iconAnchor: [17, 60],
	popupAnchor: [0,-60],
    });
    var landmark = L.icon({
	iconUrl: 'icons/landmark.png',
	iconSize: [38, 60],
	iconAnchor: [17, 60],
	popupAnchor: [-3, -76],
    });
    var map = L.map('map').setView([39.962125, -75.140675], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let marker = L.marker([39.96164917971281, -75.14149386089039], {icon: art}); 
    let popup = L.popup().setContent("I am a standalone popup.");
    marker.bindPopup(popup).openPopup();
    marker.addTo(map);
  });
</script>

<style>
  #map { height: 100vh; }
</style>
