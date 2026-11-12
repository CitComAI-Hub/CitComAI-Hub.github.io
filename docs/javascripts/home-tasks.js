// Home, box "In this documentation": it walks through its steps by itself, highlighting one row at a time, one
// step at a time (only the active step shows its description; the list keeps the height of its tallest state, so nothing below moves). The progress bar of the active step (a CSS animation) tells when to
// move on. It stops while the box is hovered or has the focus; with "reduce motion" it does not
// start. Without JavaScript every description stays visible.
document$.subscribe(function () {
  var box = document.querySelector(".cc-tasks");
  if (!box || box.dataset.ccReady) return;
  box.dataset.ccReady = "1";

  var items = Array.prototype.slice.call(box.querySelectorAll("li"));
  var auto = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;

  function show(index) {
    current = index;
    items.forEach(function (item, i) {
      item.classList.remove("is-active");
      item.classList.toggle("is-done", i < index);
      if (i === index) {
        void item.offsetWidth; // restarts the progress bar
        item.classList.add("is-active");
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

  // The list keeps the height of its tallest state (the one with the longest description open),
  // so the page below does not move when the active step changes.
  var list = box.querySelector("ul");
  function fit() {
    var active = items.indexOf(box.querySelector("li.is-active"));
    box.classList.add("is-measuring");
    list.style.height = "";
    var tallest = 0;
    items.forEach(function (item) {
      var detail = item.querySelector("span");
      if (detail) detail.style.setProperty("--cc-h", detail.scrollHeight + "px");
    });
    items.forEach(function (item, i) {
      items.forEach(function (other, j) { other.classList.toggle("is-active", i === j); });
      tallest = Math.max(tallest, list.offsetHeight);
    });
    items.forEach(function (item, i) { item.classList.toggle("is-active", i === active); });
    list.style.height = tallest + "px";
    void list.offsetHeight;
    box.classList.remove("is-measuring");
  }

  box.classList.add("is-js");
  if (auto) box.classList.add("is-auto");
  show(0);
  fit();
  window.addEventListener("resize", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  items.forEach(function (item, i) {
    // only a real movement of the mouse counts: the steps change size, and a still pointer
    // must not select the step that slides under it
    item.addEventListener("mousemove", function (event) {
      pause(true);
      if ((event.movementX || event.movementY) && i !== current) show(i);
    });
    item.addEventListener("focusin", function () { show(i); pause(true); });
    item.addEventListener("animationend", function (event) {
      if (event.animationName.indexOf("cc-tasks-progress") === 0) show((current + 1) % items.length);
    });
  });
  box.addEventListener("mouseleave", function () {
    if (!box.contains(document.activeElement)) pause(false);
  });
  box.addEventListener("focusout", function (event) {
    if (!box.contains(event.relatedTarget)) pause(false);
  });
});
