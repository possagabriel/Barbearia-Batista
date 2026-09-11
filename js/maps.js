// The map stays optional. No example address or coordinates are published.
(() => {
  if (!site.address) return;
  const dialog = document.getElementById("locationDialog");
  const mapEl = document.getElementById("map");
  const error = document.getElementById("mapError");
  const query = encodeURIComponent(`${site.name} ${site.address}`);
  document.getElementById("locationAddress").textContent = site.address;
  document.getElementById("mapDirections").href = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  let started = false;
  const fallback = () => { mapEl.hidden = true; error.hidden = false; };
  const observer = new MutationObserver(() => {
    if (!dialog.open || started) return;
    started = true;
    if (!window.BARBEARIA_GMAPS_KEY || !site.coords) { fallback(); return; }
    let ready = false;
    const timeout = setTimeout(() => { if (!ready) fallback(); }, 10000);
    window.gm_authFailure = fallback;
    window.initBarbeariaMap = () => {
      clearTimeout(timeout);
      if (!window.google?.maps) { fallback(); return; }
      ready = true;
      error.hidden = true;
      mapEl.hidden = false;
      const map = new google.maps.Map(mapEl, { center: site.coords, zoom: 16, mapTypeControl: false });
      new google.maps.Marker({ position: site.coords, map, title: site.name });
    };
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(window.BARBEARIA_GMAPS_KEY)}&callback=initBarbeariaMap&loading=async`;
    script.async = true;
    script.onerror = () => { clearTimeout(timeout); fallback(); };
    document.head.appendChild(script);
  });
  observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
})();
