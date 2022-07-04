
//mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvcmdlYmVybmFyZDQiLCJhIjoiY2w0eno0cTdkMHNtejNlcDlyZmozcHFpcyJ9.y9uLmG7mDCmnkTuiCaRBQQ';
//checking pastefile and 


//putting the paste file's stored key in the off canvas input
let tokenInput = document.getElementById('token');
tokenInput.setAttribute('value', MapboxKeyXX);
tokenInput.setAttribute('placeholder', MapboxKeyXX);

//Adding event to key input button
let tokenSubmitbtn = document.getElementById('tokenSubmit')
tokenSubmitbtn.setAttribute("onclick", "keyCheck('input box')");


let keyValid = false;
let keyLocation = '';


keyCheck('hash');
keyCheck('paste file', true);

// (keylocationstring, ignoreIfalreadyfound=false)=> update src of map, keylocation, keyValid, and associated formating
function keyCheck(location, ignore = false){
  if(ignore && keyValid)return;
  let keyX = '';
  if(location === 'hash'){
    keyX = getHashKey();
  }else if(location === 'paste file'){
    keyX = MapboxKeyXX;
  }else if('input box'){
    keyX = tokenInput.value;
  }else{
    console.log('error keyCheck( unexpected location = : location ');
  }
  
  keyValid = checkKeyFormat(keyX);
  keyLocation = location;
  let keyBlank = ( keyX === '') || ( keyX === 'copy key here' );
  let keyEval = keyValid;
  if( keyBlank){ keyEval = ''};
  let defultMapImg = 'mapimage.png';
  let mapsource = defultMapImg; 
  if( keyValid){
    
    let targetPage = 'https://georgebernard4.github.io/inRealTimeBusTracker/';
    let targetURL = targetPage + '#' + keyX;
    mapsource = targetURL;
    let keyclosebutton = document.getElementById('closeKey');
    keyclosebutton.click();
  } 
  let map2 = document.getElementById('map2');
  map2.src = mapsource;  
  map2.click();

  updateDisplay( keyEval, location)
}
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
//Gets a key from the hash
function getHashKey(){
  return '';
}

//location: 'hash', 'paste file','input box'
//keyEval: true key valid, false key invalid, '' key blank
function updateDisplay( keyEval, location){
  //showing or hiding off-canvas key input
  // let keyInputPanel = document.getElementById('offcanvasKey');
  // if( keyValid === true){
  //   keyInputPanel.classList.remove('show');

  // }else{
  //   keyInputPanel.classList.add('show');
  // }
}