const aboutBtn = document.getElementById("about")
const aboutPopup = document.getElementById("aboutPopup")
const closeAbout = document.getElementById("closeAbout")

window.onload = async function fetchCovidData() {
  try {
    await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => showInMap(data));
  } catch (err) {
    console.error(err);
  }
};

function showInMap(data) {
  const Map = L.map("mapdiv").setView([-1.28333, 36.81667], 3);
  Map.options.minZoom = 3;

  L.esri.Vector.vectorBasemapLayer("ArcGIS:DarkGray", {
    apikey:
      "AAPKf2b8d3e6dc294dd284c1c7cd64ca81acP3m2qEpZ1nXLbIrKfvRuT-kQ76E56-z8umEeb5EXfxA2kRWmu5NTAoJV9FZfgCCR",
  noWrap: true}).addTo(Map);

  data.forEach((nation) => {
    const lat = nation.countryInfo.lat;
    const lng = nation.countryInfo.long;
    const flag = nation.countryInfo.flag;
    const countryName = nation.country;

    const population = nation.population.toLocaleString();
    const cases = nation.cases.toLocaleString();
    const critical = nation.critical.toLocaleString();
    const criticalPerMillion = nation.criticalPerOneMillion.toLocaleString();
    const deathsPerMillion = nation.deathsPerOneMillion.toLocaleString();
    const deaths = nation.deaths.toLocaleString();
    const recovered = nation.recovered.toLocaleString();
    const tests = nation.tests.toLocaleString();

    const customIcon = L.icon({
      iconUrl: "./custom-icons/COVIDRed.svg",

      iconSize: [38, 95],
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(Map);

    const popups = L.popup({ keepInView: true, closeButton: true }).setContent(
      `
      <h4><span class="popupContent">Country:</span> ${countryName}</h4> <br>
      <img class='flags' src=${flag}></img> <br>
      <h6><span class="popupContent">population:</span> ${population}</h6>
      <h6><span class="popupContent">cases:</span> ${cases}</h6>
      <h6><span class="popupContent">critical:</span> ${critical}</h6>
      <h6><span class="popupContent">critical Per Million:</span> ${criticalPerMillion}</h6>
      <h6><span class="popupContent">deaths:</span> ${deaths}</h6>
      <h6><span class="popupContent">deaths Per Million:</span> ${deathsPerMillion}</h6>
      <h6><span class="popupContent">recovered:</span> ${recovered}</h6>
      <h6><span class="popupContent">tests:</span> ${tests}</h6>
    `
    );

    marker.bindPopup(popups);
     marker.on("mouseover", function (e) {
       this.openPopup();
     });
     marker.on("mouseout", function (e) {
       this.closePopup();
     });
  });

}

aboutBtn.addEventListener('click', () => {
  aboutPopup.classList.toggle("show")
})

closeAbout.addEventListener('click', () => {
  aboutPopup.classList.remove("show");
})