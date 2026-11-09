// TEF network: the map highlights its three super-nodes one after another and the definition of the
// active one shows under it. The bar on top of the active card (a CSS animation) tells when to move
// on. It stops while the map is hovered or has the focus; with "reduce motion" it does not start.
// Without JavaScript the three definitions are listed under the map.
document$.subscribe(function () {
  var map = document.querySelector(".cc-tef");
  if (!map || map.dataset.ccReady) return;
  map.dataset.ccReady = "1";

  var nodes = Array.prototype.slice.call(map.querySelectorAll(".cc-tef__node"));
  var defs = Array.prototype.slice.call(map.querySelectorAll(".cc-tef__def"));
  if (!nodes.length || nodes.length !== defs.length) return;
  var auto = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;

  function show(index) {
    current = index;
    nodes.forEach(function (node, i) {
      node.classList.remove("is-active");
      defs[i].classList.toggle("is-active", i === index);
      if (i === index) {
        void node.offsetWidth; // restarts the progress bar
        node.classList.add("is-active");
      }
    });
  }

  // two reasons to stand still: the pointer is over the diagram (hover), or the person pressed pause
  var hover = false;
  var stopped = false;
  function sync() {
    map.classList.toggle("is-paused", hover || stopped);
  }
  function pause(on) {
    hover = on;
    sync();
  }

  map.classList.add("is-js");
  if (auto) map.classList.add("is-auto");
  show(0);
  window.ccAddControls(map, {
    auto: auto,
    prev: function () { show((current + nodes.length - 1) % nodes.length); },
    next: function () { show((current + 1) % nodes.length); },
    toggle: function (s) { stopped = s; sync(); }
  });

  nodes.forEach(function (node, i) {
    // only a real movement of the mouse counts, so a still pointer never changes the step
    node.addEventListener("mousemove", function (event) {
      pause(true);
      if ((event.movementX || event.movementY) && i !== current) show(i);
    });
    node.addEventListener("focusin", function () { show(i); pause(true); });
    node.addEventListener("animationend", function (event) {
      if (event.animationName === "cc-tef-progress") show((current + 1) % nodes.length);
    });
  });
  map.addEventListener("mouseleave", function () {
    if (!map.contains(document.activeElement)) pause(false);
  });
  map.addEventListener("focusout", function (event) {
    if (!map.contains(event.relatedTarget)) pause(false);
  });
});
