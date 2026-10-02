/* Massachusetts-only add-on (port of the Tennessee tnlinks.js; not part of the shared KY/TN/MA app code): links the main map to the Phase 5 city page (city.html).
   - a "Boston homes by neighborhood" link at the top of the Layers panel
   - a link block under the heading of the Boston town card
   Pure DOM, loaded after app.js; does nothing if the elements are missing. */
(function () {
  "use strict";
  const CITY = { "Boston, Massachusetts": ["boston", "Boston"] };
  const css = document.createElement("style");
  css.textContent = ".macity{display:block;margin:8px 0;padding:9px 11px;border-radius:10px;background:#eef4fb;border:1px solid #c9dbef;color:#1f3b57;text-decoration:none;font-weight:600;line-height:1.3}" +
    ".macity small{display:block;font-weight:400;color:#4a5b6b}";
  document.head.appendChild(css);
  const lp = document.getElementById("layerList");
  if (lp && lp.parentNode) {
    const a = document.createElement("a"); a.className = "macity"; a.href = "city.html#boston"; a.id = "maCityLink";
    a.innerHTML = "🏙 Boston homes by neighborhood<small>Houses, condos and townhomes in 23 neighborhoods, with median prices and ER drive minutes</small>";
    lp.parentNode.insertBefore(a, lp);
  }
  const body = document.getElementById("cardBody"); if (!body) return;
  const add = () => {
    const h = body.querySelector("h2"); if (!h || body.querySelector(".macity")) return;
    const k = body.querySelector(".kicker"); if (!k || k.textContent.trim() !== "Town") return;
    const c = CITY[h.textContent.trim()]; if (!c) return;
    const a = document.createElement("a"); a.className = "macity"; a.href = "city.html#" + c[0];
    a.innerHTML = `🏙 ${c[1]} homes by neighborhood →<small>Houses, condos and townhomes in each of 23 neighborhoods: counts, median price, $/sq ft and ER drive minutes</small>`;
    h.insertAdjacentElement("afterend", a);
  };
  new MutationObserver(add).observe(body, { childList: true, subtree: false });
})();
