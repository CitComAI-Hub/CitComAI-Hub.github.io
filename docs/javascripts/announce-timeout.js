// The announcement bar (first visit to a main section) closes by itself after a few seconds, and the
// bar of time left (CSS) empties meanwhile. While the pointer is over it, or it has the keyboard focus,
// the time stops, and it goes on when the pointer leaves. At the end it presses the theme's own close
// button, so the section is remembered exactly as if the reader had closed it. Moving to another page
// cancels the timer; the next page starts its own.
(function () {
  var SECONDS = 8;
  var KEY = "cc-announce-seen"; // sections whose bar was already closed: the theme remembers only the last one
  var FADE = 400; // ms, as the opacity transition in citcom.css
  var timer = null;
  var left = 0;      // ms left
  var started = 0;   // when the timer was last (re)started
  var bar = null;
  var button = null;

  function seenList() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function markSeen(id) {
    var list = seenList();
    if (list.indexOf(id) !== -1) return;
    list.push(id);
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
  }

  function finish() {
    bar.classList.add("is-leaving");
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer = setTimeout(function () { button.click(); }, reduce ? 0 : FADE);
  }

  function run() {
    clearTimeout(timer);
    started = Date.now();
    timer = setTimeout(finish, left);
  }

  function pause() {
    if (!bar || bar.classList.contains("is-leaving") || bar.classList.contains("is-paused")) return;
    clearTimeout(timer);
    left = Math.max(0, left - (Date.now() - started));
    bar.classList.add("is-paused");
  }

  function resume() {
    if (!bar || bar.classList.contains("is-leaving") || !bar.classList.contains("is-paused")) return;
    bar.classList.remove("is-paused");
    run();
  }

  function arm() {
    clearTimeout(timer);
    bar = document.querySelector("[data-md-component=announce]");
    var link = bar && bar.querySelector(".cc-announce__link");
    if (!link) { if (bar) bar.hidden = true; return; } // no message on this page
    var id = link.getAttribute("href");
    if (seenList().indexOf(id) !== -1) { bar.hidden = true; return; } // this section: already seen
    bar.hidden = false; // the theme may have hidden it because of the last bar it remembers
    button = bar.querySelector(".md-banner__button");
    if (!button) return;
    if (!button.dataset.ccSeen) {
      button.dataset.ccSeen = "1";
      button.addEventListener("click", function () { markSeen(id); });
    }
    // the bar of time left (CSS) lasts as long as the timer
    bar.style.setProperty("--cc-announce-time", SECONDS + "s");
    bar.classList.remove("is-counting", "is-paused", "is-leaving");
    void bar.offsetWidth; // restart the animation
    bar.classList.add("is-counting");
    left = SECONDS * 1000;
    run();
    if (!bar.dataset.ccPause) {
      bar.dataset.ccPause = "1";
      bar.addEventListener("mouseenter", pause);
      bar.addEventListener("mouseleave", resume);
      bar.addEventListener("focusin", pause);
      bar.addEventListener("focusout", resume);
    }
  }

  if (window.document$) window.document$.subscribe(arm);
  else document.addEventListener("DOMContentLoaded", arm);
})();
