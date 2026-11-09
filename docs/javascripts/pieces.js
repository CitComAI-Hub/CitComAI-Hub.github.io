// Data spaces, "The pieces": the diagram walks through the phases of a data exchange (registration,
// publication and the four steps of a read). The pieces and arrows that take part in the current
// phase are highlighted and its sentence shows above the diagram. The bar of segments (a CSS
// animation on the active one) tells when to move on. Only the controls (previous, pause / play,
// next) and the segments change what it shows. The pointer over the diagram only holds the walk
// (it does not move on to the next phase while it is there) and never changes the phase.
// With "reduce motion" it does not start. Without JavaScript the diagram is static and every
// sentence is listed.
document$.subscribe(function () {
  var box = document.querySelector(".cc-pieces");
  if (!box || box.dataset.ccReady) return;
  box.dataset.ccReady = "1";

  var texts = Array.prototype.slice.call(box.querySelectorAll(".cc-pieces__text"));
  var segs = Array.prototype.slice.call(box.querySelectorAll(".cc-pieces__bar li"));
  var parts = Array.prototype.slice.call(box.querySelectorAll("[data-steps]"));
  if (!texts.length || texts.length !== segs.length) return;
  var auto = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;

  function takesPart(el, step) {
    return (" " + el.getAttribute("data-steps") + " ").indexOf(" " + step + " ") >= 0;
  }

  function show(index) {
    current = index;
    texts.forEach(function (t, i) { t.classList.toggle("is-active", i === index); });
    parts.forEach(function (el) { el.classList.toggle("is-on", takesPart(el, index)); });
    segs.forEach(function (seg, i) {
      seg.classList.remove("is-active");
      seg.classList.toggle("is-done", i < index);
      if (i === index) {
        void seg.offsetWidth; // restarts the progress bar
        seg.classList.add("is-active");
      }
    });
  }

  // two reasons to stand still: the pointer is over the diagram (it only stops the walk, it never
  // changes the phase), or the person pressed pause
  var hover = false;
  var stopped = false;
  function sync() {
    box.classList.toggle("is-paused", hover || stopped);
  }

  box.classList.add("is-js");
  if (auto) box.classList.add("is-auto");
  show(0);
  window.ccAddControls(box, {
    auto: auto,
    prev: function () { show((current + segs.length - 1) % segs.length); },
    next: function () { show((current + 1) % segs.length); },
    toggle: function (s) { stopped = s; sync(); }
  });

  segs.forEach(function (seg, i) {
    var button = seg.querySelector("button");
    button.addEventListener("click", function () { show(i); });
    seg.addEventListener("animationend", function (event) {
      if (event.animationName === "cc-pieces-progress") show((current + 1) % segs.length);
    });
  });
  box.addEventListener("mouseenter", function () { hover = true; sync(); });
  box.addEventListener("mouseleave", function () { hover = false; sync(); });
});
