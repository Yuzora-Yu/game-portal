const PREFIX = "/games";
const LEGACY_PAGE_REDIRECTS = new Map([
  [`${PREFIX}/game-prisma-abyss.html`, `${PREFIX}/GAME01_prisma-abyss.html`],
  [`${PREFIX}/game-kanji-crash-keyboard.html`, `${PREFIX}/GAME02_kanji-crash-keyboard.html`]
]);

export default {
  async fetch(request, env) {
    const incomingUrl = new URL(request.url);

    if (incomingUrl.pathname === PREFIX) {
      incomingUrl.pathname = `${PREFIX}/`;
      return Response.redirect(incomingUrl.toString(), 308);
    }

    if (!incomingUrl.pathname.startsWith(`${PREFIX}/`)) {
      return new Response("Not Found", { status: 404 });
    }

    const redirectTarget = LEGACY_PAGE_REDIRECTS.get(incomingUrl.pathname);
    if (redirectTarget) {
      incomingUrl.pathname = redirectTarget;
      return Response.redirect(incomingUrl.toString(), 308);
    }

    const assetUrl = new URL(request.url);
    assetUrl.pathname = incomingUrl.pathname.slice(PREFIX.length) || "/";

    return env.ASSETS.fetch(
      new Request(assetUrl.toString(), {
        method: request.method,
        headers: request.headers
      })
    );
  }
};
