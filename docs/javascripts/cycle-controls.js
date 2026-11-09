// The controls of the interactive diagrams that walk through their steps by themselves: previous,
// pause / play and next, in a small group in a corner of the diagram. Each diagram calls
// ccAddControls(box, options) once; this file is loaded before them. Options:
//   prev(), next()   go to the previous / next step (the diagram keeps playing if it was playing)
//   toggle(stopped)  the person paused (true) or resumed (false) the walk
//   auto             false when the diagram does not advance by itself ("reduce motion"): the
//                    pause button is left out
//   parent           the element that receives the controls (default: the diagram itself)
window.ccAddControls = function (box, options) {
  var ICONS = {
    prev: '<path d="M15.5 5 8.5 12l7 7" />',
    next: '<path d="M8.5 5l7 7-7 7" />',
    pause: '<path d="M8 5v14M16 5v14" />',
    play: '<path d="M8 5v14l11-7z" />'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">' +
      ICONS[name] + "</svg>";
  }
  function button(name, label) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "cc-cycle__btn cc-cycle__btn--" + name;
    b.setAttribute("aria-label", label);
    b.title = label;
    b.innerHTML = icon(name);
    return b;
  }

  var group = document.createElement("div");
  group.className = "cc-cycle";
  group.setAttribute("role", "group");
  group.setAttribute("aria-label", "Controls");

  var prev = button("prev", "Previous");
  var next = button("next", "Next");
  var toggle = null;
  var stopped = false;

  prev.addEventListener("click", function () { options.prev(); });
  next.addEventListener("click", function () { options.next(); });
  group.appendChild(prev);

  if (options.auto) {
    toggle = button("pause", "Pause");
    toggle.addEventListener("click", function () {
      stopped = !stopped;
      var name = stopped ? "play" : "pause";
      var label = stopped ? "Play" : "Pause";
      toggle.className = "cc-cycle__btn cc-cycle__btn--" + name;
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
      toggle.innerHTML = icon(name);
      box.classList.toggle("is-stopped", stopped);
      options.toggle(stopped);
    });
    group.appendChild(toggle);
  }

  group.appendChild(next);
  (options.parent || box).appendChild(group);
  return group;
};
