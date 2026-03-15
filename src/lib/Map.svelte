<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
<<<<<<< HEAD
<div id="map"></div>
=======
<div id="map">
  <div class="nav-header">
    <input class="search-box" type="text" placeholder="enter an address..." style="z-index: 1000; position: relative;" id="search">
    <Filter />
  </div>
</div>
>>>>>>> 4b937e5 (main checkboxes)

<script>
	import Filter from "$lib/components/Filter.svelte"
  import { onMount } from 'svelte';
  onMount(async () => {
    const L = await import('leaflet')

    const artJson = await fetch('https://www.philart.net/api/landmarks.json', {
      method: 'GET'
    })
    console.log(artJson);
    // indy hall location
    var architecture = L.icon({
	iconUrl: 'icons/architecture.png',
	iconSize: [38, 60],
	iconAnchor: [17, 60],
	popupAnchor: [0,-60],
    });
    var landmark = L.icon({
	iconUrl: 'icons/landmark.png',
	iconSize: [38, 60],
	iconAnchor: [17, 60],
	popupAnchor: [0,-60],
    });
    var map = L.map('map').setView([39.962125, -75.140675], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let marker = L.marker([39.96164917971281, -75.14149386089039], {icon: landmark}); 
    let list = document.createElement('ul');
    let contentJson = {
      image: '/image.jpg',
      name: 'Guy Person',
      address: '21 Jump Street',
    }
    let listitem, listitemTextContent;
    for (const key in contentJson) {
      if (contentJson.hasOwnProperty(key)) {
	listitem = document.createElement('li');
	listitemTextContent = document.createTextNode(contentJson[key]);
	listitem.appendChild(listitemTextContent);
	list.appendChild(listitem);
      }
    }
    let popup = L.popup().setContent(list);
    marker.bindPopup(popup).openPopup();
    marker.addTo(map);
  });
</script>

<style>
  #map {height: 100vh; }
  .search-box{
    width: 20%;
    min-width: 200px;
    margin-top: 1em;
    margin-left: 5em;
    height: 20px;
  }
  .nav-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
