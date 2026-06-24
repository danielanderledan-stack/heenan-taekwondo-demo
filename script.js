/* ============================================================
   Heenan Tae Kwon Do — loader + scroll-driven kick sequence
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Loading screen ----------
     White screen, logo spins. Minimum 2s, but holds until the
     page (incl. the kick frames) has fully loaded, then lifts up. */
  var loader = document.getElementById('loader');
  var MIN_TIME = 2000;
  var start = performance.now();

  function reveal() {
    loader.classList.add('is-done');
    document.body.style.overflow = '';
  }

  // Lock scroll while loading
  document.body.style.overflow = 'hidden';

  window.addEventListener('load', function () {
    var elapsed = performance.now() - start;
    window.setTimeout(reveal, Math.max(0, MIN_TIME - elapsed));
  });

  /* ---------- Scroll-driven frame crossfade ----------
     Maps scroll progress through the track (0 → 1) onto three
     kick frames. 0 → frame1, 0.5 → frame2, 1 → frame3.
     Clamped so it never loops back to frame1. */
  var track = document.querySelector('.scroll-track');
  var frames = Array.prototype.slice.call(document.querySelectorAll('.frame'));
  var hint = document.querySelector('.scroll-hint');
  var ticking = false;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function update() {
    ticking = false;

    var rect = track.getBoundingClientRect();
    var distance = rect.height - window.innerHeight; // scrollable range of the pinned stage
    var progress = clamp(-rect.top / distance);      // 0 at top, 1 when track ends

    // seg goes 0 → 2 across the three frames
    var seg = progress * (frames.length - 1);

    // Triangular crossfade: each frame peaks at its own index
    var o1 = clamp(1 - seg);
    var o2 = clamp(1 - Math.abs(seg - 1));
    var o3 = clamp(seg - 1);

    frames[0].style.opacity = o1;
    frames[1].style.opacity = o2;
    frames[2].style.opacity = o3;

    // Fade the scroll hint out once the user starts moving
    if (hint) hint.classList.toggle('is-hidden', progress > 0.04);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
