const PREFIX = "/games";

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
