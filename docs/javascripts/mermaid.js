// Mermaid, pinned and served by the site, loaded only on pages with a diagram.
//
// The theme draws the ```mermaid blocks with the global `mermaid` and, when there is none, loads
// the latest Mermaid 12 from unpkg, which lays out our diagrams differently. This stand-in takes
// that place: it keeps the theme's settings (initialize) and, at the first diagram (render), loads
// assets/vendor/mermaid-10.6.1.min.js, the version the diagrams were drawn with. The real Mermaid
// then replaces the stand-in as the global `mermaid`.
(function () {
  if (typeof window.mermaid !== "undefined") return;

  var src = new URL("../assets/vendor/mermaid-10.6.1.min.js", document.currentScript.src).href;
  var settings = {};
  var ready = null;

  function load() {
    ready = ready || new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.onload = function () {
        window.mermaid.initialize(settings);
        resolve(window.mermaid);
      };
      script.onerror = function () {
        reject(new Error("Could not load " + src));
      };
      document.head.appendChild(script);
    });
    return ready;
  }

  window.mermaid = {
    initialize: function (options) {
      settings = options;
    },
    render: function (id, text) {
      return load().then(function (mermaid) {
        return mermaid.render(id, text);
      });
    },
  };
})();
