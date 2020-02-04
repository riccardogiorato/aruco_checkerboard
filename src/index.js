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

let colors = true;
const colorParam = findGetParameter("color");
if (colorParam) colors = colorParam === "true";

let circular = false;
const circularParam = findGetParameter("circular");
if (circularParam) circular = circularParam === "true";

let maxColumns = 7;
const colsParam = findGetParameter("cols");
if (colsParam) maxColumns = parseInt(colsParam);

// A4: 793 px x 1000 px
const widthPrint = 793;
const widthMarker = Math.round((widthPrint - maxColumns * 4) / maxColumns);
const heightPrint = 1000;
const maxRows = Math.round(heightPrint / widthMarker);
console.log(
  "Ready for print " +
  maxColumns * maxRows +
  " markers - ID from: " +
  startFrom +
  " to " +
  parseInt(startFrom - 1 + maxColumns * maxRows, 10)
);

function isInverted(number, svg) {
  if (number % 2 != 0) {
    svg.classList.add("invert");
  }
}

document.head.insertAdjacentHTML("beforeend", '<style>span { width: ' + widthMarker + 'px; height:' + widthMarker + 'px; }</style>');


for (var row = 0; row < maxRows; row++) {
  for (var col = 0; col < maxColumns; col++) {
    const incrId = row * maxColumns + col;
    const markerId = startFrom + incrId;

    const myMarker = new ArucoMarker(markerId);
    const svgImage = myMarker.toSVG(widthMarker + "px");

    const srcImage = 'data:image/svg+xml;utf8,' + svgImage;

    var markerSvg = document.createElement("span");
    markerSvg.id = "marker_id_" + (markerId);
    if (colors) {
      if (maxColumns % 2 == 0 && row % 2 == 0) {
        isInverted(incrId + 1, markerSvg);
      } else {
        isInverted(incrId, markerSvg);
      }
    } else {
      markerSvg.classList.add("margin2");
    }

    if (circular) {
      markerSvg.classList.add("borderCircular");
    }

    markerSvg.innerHTML = "<img src='" + srcImage + "' alt='' />";
    markerCont.appendChild(markerSvg);
  }
}

const markers = document.getElementById("markers")
markers.innerHTML = markerCont.innerHTML;
markers.style.maxWidth = 793 + "px";
