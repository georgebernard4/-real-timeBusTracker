
var bussMarkers = [];


var map = new mapboxgl.Map({
  container: 'Map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
});
async function run(){
  mapboxgl.accessToken = pk.eyJ1IjoiZ2VvcmdlYmVybmFyZDQiLCJhIjoiY2w0emd0d2E0MzF5azNkczh4MzBoNmV1YiJ9.hsvfLiYcLslymRbHHiQG9Q;
  let inputbox = document.getElementById(token);
  mapboxgl.accessToken = inputbox.value
  // get bus data    
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);
  //console.log(locations[0]['attributes']['longitude'])
  
  // timer
  setTimeout(run, 15000);
  
  //remove buss markers
  for( let i = 0; i < bussMarkers.length; i++ ){
    let bussToRemove = bussMarkers[i];
    bussToRemove.remove();
  }
  bussMarkers = [];
  
  for (let i = 0; i <locations.length; i++){
    
    let markerLongitude = locations[i]['attributes']['longitude'];
    let markerLatitude  = locations[i]['attributes']['latitude'];
    var marker = new mapboxgl.Marker()
    .setLngLat( [markerLongitude, markerLatitude])
    .addTo(map);
    bussMarkers.push(marker);
    
  }
  
}

// Request bus data from MBTA
async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json     = await response.json();
  return json.data;
}
run();