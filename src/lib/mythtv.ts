import mythTvChannels from "@/config/mythtv-channels.json";

const channelIds: Record<string, number> = mythTvChannels;

/**
 * Build a MythWeb program-detail URL when the installation and channel are known.
 */
export function getMythTvProgramUrl(
  baseUrl: string | undefined,
  network: string | undefined,
  date: string,
): string | undefined {
  if (!baseUrl || !network) return undefined;

  const channelId = channelIds[network];
  const startTime = new Date(date).getTime();

  if (channelId === undefined || !Number.isFinite(startTime)) return undefined;

  const unixStartTime = Math.floor(startTime / 1000);
  return `${baseUrl.replace(/\/+$/, "")}/tv/detail/${channelId}/${unixStartTime}`;
}

/**
 * Build a MythWeb title search for a matchup when the installation is known.
 */
export function getMythTvSearchUrl(
  baseUrl: string | undefined,
  teamNames: Array<string | undefined>,
): string | undefined {
  if (!baseUrl) return undefined;

  const searchTerms = teamNames
    .map((teamName) => teamName?.trim())
    .filter((teamName): teamName is string => Boolean(teamName));

  if (searchTerms.length !== 2) return undefined;

  const query = new URLSearchParams({
    type: "q",
    s: searchTerms.join(" "),
    search: "Search",
  });

  return `${baseUrl.replace(/\/+$/, "")}/tv/search?${query.toString()}`;
}
