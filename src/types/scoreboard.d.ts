export interface RootObject {
  leagues: League[];
  groups: string[];
  day: Day;
  events: Event[];
  eventsDate: EventsDate;
}
export interface EventsDate {
  date: string;
  seasonType: number;
}
export interface Event {
  id: string;
  uid: string;
  date: string;
  name: string;
  shortName: string;
  season: Season2;
  competitions: Competition[];
  links: Link3[];
  status: Status;
  weather?: Weather;
}
export interface Weather {
  displayValue: string;
  temperature: number;
  highTemperature: number;
  conditionId: string;
  link: Link3;
}
export interface Link3 {
  language: string;
  rel: string[];
  href: string;
  text: string;
  shortText: string;
  isExternal: boolean;
  isPremium: boolean;
}
export interface Competition {
  id: string;
  uid: string;
  date: string;
  attendance: number;
  type: Type2;
  timeValid: boolean;
  neutralSite: boolean;
  conferenceCompetition: boolean;
  playByPlayAvailable: boolean;
  recent: boolean;
  venue: Venue;
  competitors: Competitor[];
  notes: Note[];
  situation?: Situation;
  status: Status;
  broadcasts: Broadcast[];
  tournamentId: number;
  format: Format;
  startDate: string;
  broadcast: string;
  geoBroadcasts: GeoBroadcast[];
  highlights: (Highlight | Highlights2)[];
  headlines?: Headline[];
  tickets?: Ticket[];
  odds?: Odd[];
}
export interface Odd {
  provider: Provider;
  details: string;
  overUnder: number;
  spread: number;
  awayTeamOdds: AwayTeamOdds;
  homeTeamOdds: AwayTeamOdds;
  open: Open;
  current: Current;
}
export interface Current {
  over: Over2;
  under: Over2;
  total: Total;
}
export interface Total {
  alternateDisplayValue: string;
  american: string;
}
export interface Over2 {
  value: number;
  displayValue: string;
  alternateDisplayValue: string;
  decimal: number;
  fraction: string;
  american: string;
  outcome: Outcome;
}
export interface Outcome {
  type: string;
}
export interface Open {
  over: Over;
  under: Over;
  total: Over;
}
export interface Over {
  value: number;
  displayValue: string;
  alternateDisplayValue: string;
  decimal: number;
  fraction: string;
  american: string;
}
export interface AwayTeamOdds {
  favorite: boolean;
  underdog: boolean;
  team: Team2;
}
export interface Team2 {
  id: string;
  uid: string;
  abbreviation: string;
  name: string;
  displayName: string;
  logo: string;
}
export interface Provider {
  id: string;
  name: string;
  priority: number;
}
export interface Ticket {
  summary: string;
  numberAvailable: number;
  links: Self[];
}
export interface Headline {
  type: string;
  description: string;
  shortLinkText: string;
  video: Video[];
}
export interface Video {
  id: number;
  source: string;
  headline: string;
  thumbnail: string;
  duration: number;
  tracking: Tracking;
  deviceRestrictions: DeviceRestrictions;
  links: Links3;
}
export interface Links3 {
  web: Web3;
  mobile: Mobile;
  api: Api;
  source: Source;
  sportscenter: Self;
}
export interface Web3 {
  href: string;
  self: Self3;
  seo: Self;
}
export interface Self3 {
  href: string;
  dsi?: Self;
}
export interface Highlights2 {
  id: number;
  cerebroId: string;
  source: string;
  headline: string;
  description: string;
  lastModified: string;
  originalPublishDate: string;
  duration: number;
  timeRestrictions: TimeRestrictions;
  deviceRestrictions: DeviceRestrictions;
  thumbnail: string;
  links: Links2;
  ad: Ad;
  tracking: Tracking;
}
export interface Links2 {
  web: Web2;
  mobile: Mobile;
  api: Api;
  source: Source;
  sportscenter: Self;
}
export interface Web2 {
  href: string;
  self: Self2;
  seo: Self;
}
export interface Self2 {
  href: string;
  dsi: Self;
}
export interface Highlight {
  id: number;
  cerebroId: string;
  source: string;
  headline: string;
  description: string;
  lastModified: string;
  originalPublishDate: string;
  duration: number;
  timeRestrictions: TimeRestrictions;
  deviceRestrictions: DeviceRestrictions;
  thumbnail: string;
  links: Links;
  ad: Ad;
  tracking: Tracking;
}
export interface Tracking {
  sportName: string;
  leagueName: string;
  coverageType: string;
  trackingName: string;
  trackingId: string;
}
export interface Ad {
  sport: string;
  bundle: string;
}
export interface Links {
  web: Web;
  mobile: Mobile;
  api: Api;
  source: Source;
  sportscenter: Self;
}
export interface Source {
  href: string;
  mezzanine: Self;
  flash: Self;
  hds: Self;
  HLS: HLS;
  HD: Self;
  full: Self;
}
export interface HLS {
  href: string;
  HD: Self;
}
export interface Api {
  self: Self;
  artwork: Self;
}
export interface Mobile {
  href: string;
  source: Self;
  alert: Self;
  streaming: Self;
  progressiveDownload: Self;
}
export interface Web {
  href: string;
  self: Self;
  seo: Self;
}
export interface Self {
  href: string;
}
export interface DeviceRestrictions {
  type: string;
  devices: string[];
}
export interface TimeRestrictions {
  embargoDate: string;
  expirationDate: string;
}
export interface GeoBroadcast {
  type: Type5;
  market: Market;
  media: Media;
  lang: string;
  region: string;
}
export interface Media {
  shortName: string;
}
export interface Market {
  id: string;
  type: string;
}
export interface Type5 {
  id: string;
  shortName: string;
}
export interface Format {
  regulation: Regulation;
}
export interface Regulation {
  periods: number;
}
export interface Broadcast {
  market: string;
  names: string[];
}
export interface Status {
  clock: number;
  displayClock: string;
  period: number;
  type: Type4;
}
export interface Type4 {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}
export interface Situation {
  lastPlay: LastPlay;
}
export interface LastPlay {
  id: string;
  type: Type3;
  text: string;
  scoreValue: number;
  team?: Venue2;
  probability?: Probability;
  athletesInvolved?: AthletesInvolved[];
}
export interface AthletesInvolved {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  links: Link2[];
  headshot: string;
  jersey: string;
  position: string;
  team: Venue2;
}
export interface Probability {
  tiePercentage: number;
  homeWinPercentage: number;
  awayWinPercentage: number;
}
export interface Type3 {
  id: string;
  text: string;
}
export interface Note {
  type: string;
  headline: string;
}
export interface Competitor {
  id: string;
  uid: string;
  type: string;
  order: number;
  homeAway: string;
  team: Team;
  score: string;
  linescores?: Linescore[];
  statistics: Statistic[];
  leaders: Leader2[];
  curatedRank: CuratedRank;
  records: Record[];
  winner?: boolean;
}
export interface Record {
  name: string;
  abbreviation?: string;
  type: string;
  summary: string;
}
export interface CuratedRank {
  current: number;
}
export interface Leader2 {
  name: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  leaders: Leader[];
}
export interface Leader {
  displayValue: string;
  value: number;
  athlete: Athlete;
  team: Venue2;
}
export interface Athlete {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  links: Link2[];
  headshot: string;
  jersey: string;
  position: Position;
  team: Venue2;
  active: boolean;
}
export interface Position {
  abbreviation: string;
}
export interface Link2 {
  rel: string[];
  href: string;
}
export interface Statistic {
  name: string;
  abbreviation: string;
  displayValue: string;
  rankDisplayValue?: string;
}
export interface Linescore {
  value: number;
}
export interface Team {
  id: string;
  uid: string;
  location: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  venue: Venue2;
  links: Link[];
  logo: string;
  conferenceId: string;
}
export interface Link {
  rel: string[];
  href: string;
  text: string;
  isExternal: boolean;
  isPremium: boolean;
}
export interface Venue2 {
  id: string;
}
export interface Venue {
  id: string;
  fullName: string;
  address: Address;
  indoor: boolean;
}
export interface Address {
  city: string;
  state: string;
}
export interface Type2 {
  id: string;
  abbreviation: string;
}
export interface Season2 {
  year: number;
  type: number;
  slug: string;
}
export interface Day {
  date: string;
}
export interface League {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  midsizeName: string;
  slug: string;
  season: Season;
  logos: Logo[];
  calendarType: string;
  calendarIsWhitelist: boolean;
  calendarStartDate: string;
  calendarEndDate: string;
  calendar: string[];
}
export interface Logo {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel: string[];
  lastUpdated: string;
}
export interface Season {
  year: number;
  startDate: string;
  endDate: string;
  displayName: string;
  type: Type;
}
export interface Type {
  id: string;
  type: number;
  name: string;
  abbreviation: string;
}