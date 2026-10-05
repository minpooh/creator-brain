export function getContentThumbnailUrl(url: string): string | undefined {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return undefined;
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function getYouTubeVideoId(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0];
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const fromQuery = parsed.searchParams.get("v");
      if (fromQuery) return fromQuery;

      const [kind, id] = parsed.pathname.split("/").filter(Boolean);
      if (
        (kind === "shorts" || kind === "embed" || kind === "live") &&
        id
      ) {
        return id;
      }
    }
  } catch {
    return undefined;
  }

  return undefined;
}
