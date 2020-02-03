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
let widthMarker = widthPrint / maxColumns;
if (!colors) widthMarker = (widthPrint - maxColumns * 2 * 2) / maxColumns;
const heightPrint = 1000;
const maxRows = Math.round(heightPrint / widthMarker);
alert(
  "Ready for print " +
  maxColumns * maxRows +
  " markers - ID from: " +
  startFrom +
  " to " +
  parseInt(startFrom - 1 + maxColumns * maxRows, 10)
);

document.head.insertAdjacentHTML("beforeend", '<style>span { width: ' + widthMarker + 'px; height:' + widthMarker + 'px; }</style>');


for (var j = 0; j < maxColumns; j++) {
  for (var i = 0; i < maxRows; i++) {
    const markerId = startFrom + i + j * maxRows;
    const myMarker = new ArucoMarker(markerId);
    const svgImage = myMarker.toSVG(widthMarker + "px"); // the size is optional

    const srcImage = 'data:image/svg+xml;utf8,' + svgImage;

    var markerSvg = document.createElement("span");
    markerSvg.id = "marker_id_" + (markerId);
    if (colors) {
      if ((j % 2 && (i + 1) % 2) || ((j + 1) % 2 && i % 2))
        markerSvg.classList.add("invert");
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

document.getElementById("marker").innerHTML = markerCont.innerHTML;
