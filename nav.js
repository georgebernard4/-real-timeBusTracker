//this js file replaces html elements with the entire contents of an html file
//as such usually the html file should lack the usual preambles of code found in html files such as <html> 
//
//To make it work with multiple insertions
//the variable HTMLinsertName identifies the name of the file to be inserted

fetch('nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})

