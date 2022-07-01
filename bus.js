
//mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvcmdlYmVybmFyZDQiLCJhIjoiY2w0eno0cTdkMHNtejNlcDlyZmozcHFpcyJ9.y9uLmG7mDCmnkTuiCaRBQQ';



//checks string for correct lengths between periods and inital characters pk.
//returns true if the string has the correct format
function checkKeyFormat(keyString){
  console.log('checking Key Format of ' + keyString);
  let formatArray = keyString.split('.');
  if( formatArray.length !== 3){
    console.log('fail because format fail length 3')
    return false;
  }
  if( formatArray[0]  !== 'pk'){
    console.log('fail because format expects pk' + formatArray[0] );
    return false;
  }
  if( formatArray[1].length !== 72){
    console.log('fail because format expects lenth 72' + formatArray[1] + 'has length '  +  formatArray[1].length);
    return false;
  }
  if( formatArray[2].length != 22){
    console.log('fail because format expects pk' + formatArray[2] + 'has length '  +  formatArray[2].length);
    return false;
  }
  return true
}
//on load checking if paste file as been used and if so copies it to the submit box
//this way if someone doesn't notice the paste file, and instead hard code a key the index file as input boxes value, it will work as expected
//MapboxKey is what the paste file sets the input to


let tokenInput = document.getElementById('token');
tokenInput.setAttribute('value', MapboxKeyXX);
tokenInput.setAttribute('placeholder', MapboxKeyXX);
//so user can see paste file has been put in inputbox

//Adding trigger funcions to key input button
let tokenSubmitbtn = document.getElementById('tokenSubmit')
tokenSubmitbtn.setAttribute("onclick", "runCheck()");

//sets input box to message: paste key here
let keyformat     = false;
let usingPasteFile = true;
// let keyDisplay = FILL ME IN;

//checks input value formatt, sets response string in offcanvas, if format good call run, identifies where the key was, if blank, leaves response blank,
// if format invalid, ensures using pastefield is set to false, returns invalid API key format
//checks offcanvas box input - if blank responds "nothing pasted", if not format responds invalid format
function runCheck(){
  let inputboxValue = tokenInput.value;
  console.log('usingPasteFile: ' + usingPasteFile);
  console.log('formatValid: ' + keyformat);
  console.log('runCheck...');
  let formatValid = checkKeyFormat(inputboxValue);
  console.log('formatValid: ' + keyformat);
  let keyformatTemp = keyformat;
  let keyDisplay = '';
  if(formatValid){ 
    keyformat = true;
    keyDisplay = 'Key Format Valid';
    if(usingPasteFile)  {
      keyDisplay = keyDisplay + ' in Paste File';
    }
    }else{
    keyformat = false
    usingPasteFile = false;
    keyDisplay = 'Key Format Invalid'
  }
  console.log('usingPasteFile: ' + usingPasteFile);
  console.log('keyDisplay: ' + keyDisplay);

  let fValidChange = !(keyformatTemp === keyformat);
  console.log('fValidChange: ' + fValidChange);
  //connect keyDisplay to be seen by user in offcanvass
  
  if(fValidChange){
    if(formatValid){
      //make changes for when key is valid

    }else{
      //make changes for when key is invalid

    }
  }
  if(formatValid){
   
    run();
  }
}




//must have key defined first

let firstRun       = true;
let glcssloaded    = false;
let gljsLoaded     = false;
let mapRequested   = false;
var bussMarkers    = [];
let timeBetweenChecks = 500;
async function run(){
console.log( 'firstRun: ' + firstRun);  
if( firstRun){
  console.log('first run...')
  //loading GL 
  firstRun = false;
  console.log( 'firstRun: ' + firstRun);  
  addGLcsstoDOM();
  console.log('loading GL css')    
}
if( !glcssloaded){
  console.log( 'glcssloaded: ' + glcssloaded);  
  if( ifglcssloaded('mapbox-gl')){
    glcssloaded = true;
    console.log( 'glcssloaded: ' + glcssloaded);  
    console.log('loading GL J...s');
    addGLjstoDOM();
  }else{
    console.log('1-setting timeout for ' + timeBetweenChecks + ' ms' );    
    setTimeout((run(), timeBetweenChecks));
    return
  }
  
}

if( !glcssloaded){
  console.log('glcssloaded: ' + glcssloaded);
  if( (typeof mapboxgl) === 'undefined'){
    console.log('type of mapboxgl: ' + mapboxgl);
    console.log('is mapboxgl undefined: ' + (typeof mapboxgl) === 'undefined');
    console.log('2-setting timeout for ' + timeBetweenChecks + ' ms' );    
    setTimeout(run(), timeBetweenChecks);
    return
    }else{
      gljsLoaded = true;
      console.log('gljsLoaded: ' + gljsLoaded);
    }
  }
  if( mapRequested){
    console.log('mapRequested: ' + mapRequested);
    mapRequested = true;
    console.log('mapRequested: ' + mapRequested);
    mapboxgl.accessToken = inputboxValue;
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.104081, 42.365554],
      zoom: 14,
    });
//     let blockers = document.getElementsByClassName('mapboxgl-control-container');
// for( i = 0; i< blockers.length ; i++){
//   let blocker = blockers[i]
//   blocker.remove();
//} 
  }
 
  


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
  if(locations )
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




function addGLcsstoDOM(){
  const linkGL = document.createElement('link');
  linkGL.setAttribute('href',"https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css");
  document.getElementsByTagName('body')[0].appendChild(linkGL);
}

function addGLjstoDOM(){
  const scriptGL = document.createElement('script');
  scriptGL.setAttribute('src',"https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js");
  document.getElementsByTagName('body')[0].appendChild(scriptGL); 
}  


//checks if a css sheet is in the dom
function ifglcssloaded(unique_title){
    // for (const sheet of document.styleSheets) {
    //   console.log(JSON.stringify(document.styleSheets[0].keys) )
    //   console.log('ifglcssloaded...');
    //   console.log('sheet.title: ' + sheet.title)
    //   console.log('unique_title ' + unique_title)
    //   if (sheet.title === unique_title) {

    //     return true;
    //   }
    // }
    // return false;
    return true
}



//running in case pastefile already has key
  runCheck();