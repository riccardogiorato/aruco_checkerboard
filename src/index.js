import "./styles.css";

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  var items = window.location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

const ArucoMarker = require("aruco-marker");

let markerCont = document.createElement("div");

let startFrom = 0;

const startParam = parseInt(findGetParameter("start"), 10);
if (startParam) startFrom = startParam;

// A4: 793 px x 1000 px
const widthPrint = 793;
const maxWidth = 7;
const widthMarker = widthPrint / maxWidth;
const heightPrint = 1000;
const maxHeight = Math.round(heightPrint / widthMarker);
alert(
  "PRINTED: " +
    maxWidth * maxHeight +
    " markers - from: " +
    startFrom +
    " to " +
    parseInt(startFrom + maxWidth * maxHeight, 10)
);
for (var j = 0; j < maxWidth; j++) {
  for (var i = 0; i < maxHeight; i++) {
    const markerId = startFrom + i + j * maxHeight;
    //console.log(markerId);
    const myMarker = new ArucoMarker(markerId);
    const svgImage = myMarker.toSVG(widthMarker + "px"); // the size is optional
    var markerSvg = document.createElement("span");
    markerSvg.id = "marker1";
    if ((j % 2 && (i + 1) % 2) || ((j + 1) % 2 && i % 2))
      markerSvg.style.filter = "invert(1)";
    markerSvg.innerHTML = svgImage;
    markerCont.appendChild(markerSvg);
  }
}

document.getElementById("marker").innerHTML = markerCont.innerHTML;
