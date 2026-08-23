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
