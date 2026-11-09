// Interoperability levels: the diagram highlights its three levels one after another and only the
// active card shows its explanation. The bar on top of the active card (a CSS animation) tells when
// to move on. It stops while the diagram is hovered or has the focus, a click or a link to #level-N
// selects a level, and with "reduce motion" it does not start. Without JavaScript every card shows
// its explanation. The diagram keeps the height of its tallest state, so nothing below moves.
document$.subscribe(function () {
  var box = document.querySelector(".cc-levels");
  if (!box || box.dataset.ccReady) return;
  box.dataset.ccReady = "1";

  var flow = box.querySelector(".cc-levels__flow");
  var nodes = Array.prototype.slice.call(box.querySelectorAll(".cc-levels__node"));
  if (!nodes.length) return;
  var auto = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;

  function show(index) {
    current = index;
    nodes.forEach(function (node, i) {
      node.classList.remove("is-active");
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
    box.classList.toggle("is-paused", hover || stopped);
  }
  function pause(on) {
    hover = on;
    sync();
  }

  function setActiveOnly(index) {
    nodes.forEach(function (node, i) { node.classList.toggle("is-active", i === index); });
  }

  // measures every explanation (for a smooth open) and the tallest state of the whole diagram
  function fit() {
    var active = nodes.findIndex(function (n) { return n.classList.contains("is-active"); });
    box.classList.add("is-measuring");
    flow.style.height = "";
    var tallest = 0;
    nodes.forEach(function (node, i) {
      setActiveOnly(i);
      var text = node.querySelector(".cc-levels__text");
      if (text) text.style.setProperty("--cc-h", text.offsetHeight + "px");
      tallest = Math.max(tallest, flow.offsetHeight);
    });
    setActiveOnly(active < 0 ? 0 : active);
    flow.style.height = tallest + "px";
    void flow.offsetHeight;
    box.classList.remove("is-measuring");
  }

  function fromHash() {
    var i = nodes.findIndex(function (n) { return "#" + n.id === window.location.hash; });
    if (i >= 0) { show(i); pause(true); }
  }

  box.classList.add("is-js");
  if (auto) box.classList.add("is-auto");
  show(0);
  window.ccAddControls(box, {
    auto: auto,
    prev: function () { show((current + nodes.length - 1) % nodes.length); },
    next: function () { show((current + 1) % nodes.length); },
    toggle: function (s) { stopped = s; sync(); }
  });
  fit();
  window.addEventListener("resize", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener("hashchange", fromHash);
  fromHash();

  nodes.forEach(function (node, i) {
    // only a real movement of the mouse counts: the cards change size, and a still pointer must
    // not select the card that slides under it
    node.addEventListener("mousemove", function (event) {
      pause(true);
      if ((event.movementX || event.movementY) && i !== current) show(i);
    });
    node.addEventListener("click", function () { show(i); pause(true); });
    node.addEventListener("focusin", function () { show(i); pause(true); });
    node.addEventListener("animationend", function (event) {
      if (event.animationName === "cc-levels-progress") show((current + 1) % nodes.length);
    });
  });
  box.addEventListener("mouseleave", function () {
    if (!box.contains(document.activeElement)) pause(false);
  });
  box.addEventListener("focusout", function (event) {
    if (!box.contains(event.relatedTarget)) pause(false);
  });
});
