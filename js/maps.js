// maps.js — Localização com a Google Maps JavaScript API.
// A chave vem de js/config.js (variável VITE_GOOGLE_MAPS_API_KEY), nunca fica no código.
// Se o mapa não carregar, mostramos uma mensagem amigável + botão para o Google Maps.

(function () {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const address =
    (typeof site !== "undefined" && site.address) ||
    "Barbearia Batista, São Paulo - SP";
  const coords =
    (typeof site !== "undefined" && site.coords) ||
    { lat: -23.55052, lng: -46.633309 };
  const placeName = (typeof site !== "undefined" && site.name) || "Barbearia Batista";

  const mapsSearchUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(placeName + " " + address);
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(placeName + " " + address);

  function setFallback() {
    const msg = document.getElementById("mapError");
    if (msg) msg.hidden = false;
    const fallbackLink = document.getElementById("mapFallbackLink");
    if (fallbackLink) fallbackLink.href = mapsSearchUrl;
  }

  function ready() {
    const addressEl = document.getElementById("locationAddress");
    if (addressEl) addressEl.textContent = address;

    const openBtn = document.getElementById("mapOpen");
    if (openBtn) openBtn.href = mapsSearchUrl;
    const dirBtn = document.getElementById("mapDirections");
    if (dirBtn) dirBtn.href = directionsUrl;
    const fallbackLink = document.getElementById("mapFallbackLink");
    if (fallbackLink) fallbackLink.href = mapsSearchUrl;
  }

  const apiKey = window.BARBEARIA_GMAPS_KEY || "";

  if (!apiKey) {
    ready();
    setFallback();
    console.warn("[maps] VITE_GOOGLE_MAPS_API_KEY não configurada.");
    return;
  }

  const callbackName = "initBarbeariaMap";
  window[callbackName] = function () {
    if (!window.google || !window.google.maps) {
      setFallback();
      return;
    }
    ready();

    const map = new google.maps.Map(mapEl, {
      center: coords,
      zoom: 15,
      mapTypeId: "roadmap"
    });

    const marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: placeName
    });

    const info = new google.maps.InfoWindow({
      content:
        "<strong>" + placeName + "</strong><br>" + address
    });

    marker.addListener("click", function () {
      info.open(map, marker);
    });
  };

  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=" +
    encodeURIComponent(apiKey) +
    "&callback=" +
    callbackName +
    "&loading=async&v=weekly";
  script.async = true;
  script.defer = true;
  script.onerror = function () {
    ready();
    setFallback();
  };
  document.head.appendChild(script);
})();