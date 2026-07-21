/* Sazid Rahman Simanto — portfolio interactions */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- current year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduced) {
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = Math.min(i * 70, 280) + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- card spotlight follows cursor ---------- */
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  /* ---------- point-cloud background ---------- */
  var canvas = document.getElementById("bg-canvas");
  if (!canvas || reduced) return;
  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var pts = [];
  var w = 0, h = 0;
  var pointer = { x: -1e4, y: -1e4 };

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.round(Math.min(110, Math.max(34, (w * h) / 17000)));
    pts = [];
    for (var i = 0; i < count; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.5 + 0.6
      });
    }
  }

  window.addEventListener("pointermove", function (e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }, { passive: true });

  var LINK = 132;

  function frame() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          var a = (1 - Math.sqrt(d2) / LINK) * 0.19;
          ctx.strokeStyle = "rgba(120, 200, 235," + a + ")";
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      var mdx = p.x - pointer.x, mdy = p.y - pointer.y;
      var md = Math.sqrt(mdx * mdx + mdy * mdy);
      var near = md < 170;
      ctx.fillStyle = near
        ? "rgba(34, 211, 238," + (0.85 - md / 260) + ")"
        : "rgba(150, 205, 235, 0.42)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, near ? p.r * 1.7 : p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(resize, 160);
  });

  resize();
  requestAnimationFrame(frame);
})();
