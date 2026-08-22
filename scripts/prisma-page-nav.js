(() => {
  const nav = document.querySelector(".prisma-local-nav");
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const entries = links
    .map((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      if (!section) return null;
      return {
        link,
        section,
        start: section.querySelector("[data-scroll-start]") || section
      };
    })
    .filter(Boolean);

  const fixedOffset = () => {
    const rootStyle = getComputedStyle(document.documentElement);
    const header = Number.parseFloat(rootStyle.getPropertyValue("--header-height")) || 0;
    const subnav = Number.parseFloat(rootStyle.getPropertyValue("--subnav-height")) || 0;
    return header + subnav + nav.getBoundingClientRect().height;
  };

  let activeLink = null;

  const setCurrent = (currentLink) => {
    if (activeLink === currentLink) return;
    activeLink = currentLink;
    entries.forEach(({ link }) => {
      if (link === currentLink) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });

    if (nav.scrollWidth > nav.clientWidth) {
      const left = currentLink.offsetLeft - ((nav.clientWidth - currentLink.offsetWidth) / 2);
      nav.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
  };

  const jumpTo = (entry, updateHistory = true) => {
    const top = entry.start.getBoundingClientRect().top + window.scrollY - fixedOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
    if (updateHistory) history.pushState(null, "", entry.link.hash);
    setCurrent(entry.link);
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const entry = entries.find((item) => item.link === link);
      if (!entry) return;
      event.preventDefault();
      jumpTo(entry);
    });
  });

  let ticking = false;
  const updateCurrent = () => {
    const marker = fixedOffset() + 8;
    let current = entries[0];
    entries.forEach((entry) => {
      if (entry.start.getBoundingClientRect().top <= marker) current = entry;
    });
    if (current) setCurrent(current.link);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateCurrent);
  }, { passive: true });

  window.addEventListener("resize", updateCurrent);

  const initialEntry = entries.find(({ link }) => link.hash === window.location.hash);
  if (initialEntry) requestAnimationFrame(() => jumpTo(initialEntry, false));
  else updateCurrent();
})();
