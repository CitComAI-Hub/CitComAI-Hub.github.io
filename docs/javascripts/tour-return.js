// Guided tour: when the reader leaves it for another page of the site (a section of the menu, a
// link in the text), a temporary button lets them go back to the step they left. It only exists
// for that: pages opened on their own never show it. The step is saved at the moment of the click
// that leaves the step (a link of the text or of the menu), wherever it goes, even to another page of
// the tour. The button shows on the pages that follow, except on the home. It goes away when pressing
// its cross, when coming back to that step, when moving with the bar of the tour and when reaching
// the home (also "Leave the tour"). Without sessionStorage or JavaScript there is no button.
(function () {
  var KEY = "cc-tour-return";

  function read() {
    try { return JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function write(value) {
    try {
      if (value) sessionStorage.setItem(KEY, JSON.stringify(value));
      else sessionStorage.removeItem(KEY);
    } catch (e) { /* no storage: no button */ }
  }

  function currentStep() {
    var bar = document.querySelector(".cc-tour:not(.cc-tour--end)");
    var current = bar && bar.querySelector(".is-current a");
    if (!current) return null;
    return {
      url: current.href, // absolute: it is opened from other pages
      n: current.querySelector("small").textContent,
      title: current.querySelector("span").textContent
    };
  }

  // The section of the page being read: the last heading that has passed the top of the screen, so
  // that coming back lands there and not at the top of the page.
  function currentSection() {
    var found = null;
    var heads = document.querySelectorAll(".md-content h2[id], .md-content h3[id]");
    Array.prototype.forEach.call(heads, function (h) {
      if (h.getBoundingClientRect().top <= 140) found = h;
    });
    if (!found) return null;
    var copy = found.cloneNode(true);
    var anchor = copy.querySelector(".headerlink");
    if (anchor) anchor.remove();
    return { hash: "#" + found.id, name: copy.textContent.trim() };
  }

  // One listener for the whole session (the page does not reload with instant navigation): a click
  // on a link of the site that leaves a page of the tour saves the step to come back to.
  document.addEventListener("click", function (event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    var link = event.target.closest && event.target.closest("a[href]");
    var step = currentStep();
    if (!link || !step || link.target === "_blank" || link.origin !== location.origin) return;
    // the bar of the tour moves along it on purpose: nothing to come back to
    if (link.closest(".cc-tour-return")) return; // the button itself
    if (link.closest(".cc-tour") && !link.classList.contains("cc-tour__exit")) { write(null); return; }
    if (link.pathname === location.pathname) return; // an anchor of the same page
    var section = currentSection();
    if (section) {
      step.url = step.url.split("#")[0] + section.hash;
      step.section = section.name;
    }
    write(step);
  }, true); // capture: runs before the instant navigation of the theme takes the click over

  document$.subscribe(function () {
    var old = document.querySelector(".cc-tour-return");
    if (old) old.remove();

    var saved = read();
    var here = currentStep();
    // at the home (where "Leave the tour" ends), or back on the step that was left: nothing to go back to
    if (document.querySelector(".cc-intro") || (here && saved && here.url === saved.url.split("#")[0])) {
      write(null);
      return;
    }
    // a page of the tour reached with a link of the text (not with its bar) shows it too
    if (!saved) return;

    var box = document.createElement("div");
    box.className = "cc-tour-return";
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", "Guided tour");
    var link = document.createElement("a");
    link.href = saved.url;
    var label = document.createElement("small");
    label.textContent = "Back to the tour";
    var title = document.createElement("strong");
    title.textContent = "Step " + saved.n + " · " + saved.title;
    link.appendChild(label);
    link.appendChild(title);
    if (saved.section) {
      var where = document.createElement("span");
      where.textContent = saved.section;
      link.appendChild(where);
    }
    var close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "Dismiss");
    close.textContent = "×";
    close.addEventListener("click", function () { write(null); box.remove(); });
    box.appendChild(link);
    box.appendChild(close);
    document.body.appendChild(box);
  });
})();
