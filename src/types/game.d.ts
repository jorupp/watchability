export interface RootObject {
  app: App;
  ads: Ad;
  analytics: Config;
  routing: Routing;
  page: Page;
  request: Request;
  viewport: Viewport;
  user: Config;
}
export interface Viewport {
  width: number;
  height: number;
}
export interface Request {
  headers: Config;
  httpVersion: string;
  method: string;
  url: string;
  vary: Vary;
}
export interface Vary {
  host: string;
  cached: boolean;
  path: string;
  region: string;
  'forwarded-proto': string;
  device: string;
  country: string;
  edition: string;
  'edition-view': string;
  userab: string;
  dtcAuth: string;
  secure: boolean;
}
export interface Page {
  key: string;
  title: string;
  type: string;
  meta: Meta;
  content: Content;
  transition: Transition;
  subType: null;
  analytics: Analytics2;
  ads: Ads;
  outbrain: Outbrain;
  taboola: Taboola2;
  adProviders: AdProviders;
}
export interface AdProviders {
  gpt: boolean;
  taboola: boolean;
  video: boolean;
}
export interface Taboola2 {
  network: string;
  webviewNetwork: string;
  mode: string;
  type: string;
  targetType: string;
  'right-rail': Rightrail;
  pageTypeOverrides: PageTypeOverrides;
  webviewMode: string;
}
export interface PageTypeOverrides {
  article: Article2;
  preview: Article2;
  recap: Article2;
  gamepackage: Article2;
  longform: Rightrail;
  clubhouse: Rightrail;
  stats: Rightrail;
}
export interface Article2 {
  mode: string;
  webviewMode: string;
  type: string;
  targetType: string;
}
export interface Rightrail {
  type: string;
  mode: string;
  targetType: string;
}
export interface Outbrain {
  id: string;
}
export interface Ads {
  level: string;
  kvps: Kvp[];
}
export interface Analytics2 {
  SWID: string;
  accountID: string;
  site: string;
  section: string;
  categories: string[];
  contentType: string;
  channel: string;
  pageName: string;
  gameInfo: string;
  gameState: string;
  userInfo: UserInfo;
  lang: string;
  country: string;
  countryRegion: string;
  pageURL: string;
  vendors: any[];
  teamName: string;
  edition: string;
  path: string;
  sport: string;
  league: string;
  siteSection: string;
  game_detail: string;
  subPage: string;
}
export interface UserInfo {
  insider: string;
  premium: string;
  year: string;
  regType: string;
  status: string;
}
export interface Transition {
  hide: Hide;
  reload: Reload;
}
export interface Reload {
  rules: Rule2[];
}
export interface Rule2 {
  retValue: boolean;
  conditions: Condition2[];
}
export interface Condition2 {
  type: string;
  path: string;
  val: boolean;
}
export interface Hide {
  rules: Rule[];
}
export interface Rule {
  retValue: boolean;
  conditions: Condition[];
}
export interface Condition {
  type: string;
  path: string;
  val: string;
}
export interface Content {
  wheretowatchmenu: Config;
  teams: Teams;
  navigation: Navigation;
  betConfigSettings: BetConfigSettings;
  isMyBetActive: boolean;
  subNavigation: SubNavigation;
  headerscoreboard: Headerscoreboard;
  streampicker: Config;
  gamepackage: Gamepackage;
}
export interface Gamepackage {
  autoUpdate: AutoUpdate;
  baseURL: string;
  broadcasts: any[];
  compUID: string;
  gmStrp: GmStrp;
  gmSwtchrMta: GmSwtchrMta;
  gpLinks: GpLinks;
  lg: string;
  maxPeriods: number;
  news: News;
  network: string;
  prsdTms: PrsdTms;
  shop: null;
  ssnSrs: any[];
  stndngs: Stndng[];
  inCntStrp: boolean;
  gmInfo: GmInfo;
  links: Link2[];
  medialst: Medialst;
  gameOdds: GameOdds;
  shtChrt: ShtChrt;
  tmStatsGrph: TmStatsGrph;
  gmStry: GmStry;
  fmt: Fmt;
  sbpg: string;
  anlytcsDsclmr: string;
  gmLdrs: GmLdrs;
  gmFlw: GmFlw;
  plys: Ply[];
  wnPrb: WnPrb;
  meta: Meta2;
  allDrives?: Drive[];
}
export interface Drive {
  index: number;
  identifier: string;
  driveDetails: unknown;
  lastPlay: LastPlay;
  playerDetails: unknown;
  participants: unknown[];
  isLastPlay: boolean;
}
export interface LastPlay {
  id: string;
  winProbability: WinProbability;
  playTitle: string;
  timeLabel: string; // something like "14:46 - 1st"
}
export interface WinProbability {
  isTie: false;
  favoredTeamAbbrev: string;
  favoredTeamLogo: string;
  favoredTeamName: string;
  favoredTeamWinPercentage: string; // this is a string like "85.3"
}
export interface Meta2 {
  stndngs: Stndngs;
  gmHilghts: GmHilghts;
  gmStry: GmHilghts;
  injrs: GmHilghts;
  lstPlays: GmHilghts;
  medialst: GmHilghts;
  gmLdrs: GmLdrs2;
  gmStrs: GmHilghts;
  onTheCourt: OnTheCourt;
  tmStats: TmStats;
  pbp: Pbp;
  bxscr: Bxscr;
  oddsHdrs: string[];
  oddsOpnCol: string[];
  oddsStrpHdrs: string[];
  oddsLineMrkt: string;
  compactMarkets: number;
}
export interface Bxscr {
  grp: Grp;
  tabbed: boolean;
  showToggle: boolean;
  filterNonStarterDNP: boolean;
}
export interface Grp {
  types: (Type2 | string)[];
  keys: string[];
  primaryKeys: string[];
  keysToTeamKeys: KeysToTeamKeys;
  keysToSuppressByState: KeysToSuppressByState;
}
export interface KeysToSuppressByState {
  in: string[];
}
export interface KeysToTeamKeys {
  'fieldGoalsMade-fieldGoalsAttempted': string;
  'threePointFieldGoalsMade-threePointFieldGoalsAttempted': string;
  'freeThrowsMade-freeThrowsAttempted': string;
}
export interface Type2 {
  totals: string;
}
export interface Pbp {
  plyFltrs: PlyFltrs;
}
export interface PlyFltrs {
  'All Events': string[];
  'All Shots': string[];
  Goals: string[];
  Shots: string[];
  Hits: string[];
  Penalties: string[];
  Blocks: string[];
  'Clear All Events': any[];
}
export interface TmStats {
  grphHdrs: GrphHdrs;
  mtchupTblHdrs: MtchupTblHdrs;
  tblHdrs: TblHdrs;
  lnk: string;
}
export interface TblHdrs {
  avgPoints: string;
  avgPointsAgainst: string;
  fieldGoalPct: string;
  threePointPct: string;
  avgRebounds: string;
  avgAssists: string;
  avgBlocks: string;
  avgSteals: string;
  streak: string;
  lasttengames: string;
  'Last Ten Games': string;
  'Últimos 10 Juegos': string;
}
export interface MtchupTblHdrs {
  'fieldGoalsMade-fieldGoalsAttempted': string;
  fieldGoalPct: string;
  'threePointFieldGoalsMade-threePointFieldGoalsAttempted': string;
  threePointFieldGoalPct: string;
  'freeThrowsMade-freeThrowsAttempted': string;
  freeThrowPct: string;
  totalRebounds: string;
  offensiveRebounds: string;
  defensiveRebounds: string;
  assists: string;
  steals: string;
  blocks: string;
  totalTurnovers: string;
  turnoverPoints: string;
  fastBreakPoints: string;
  pointsInPaint: string;
  fouls: string;
  technicalFouls: string;
  flagrantFouls: string;
  largestLead: string;
}
export interface GrphHdrs {
  tabs: Tab[];
}
export interface Tab {
  stats: Stat3[];
}
export interface Stat3 {
  key: string;
  isPctStat?: boolean;
  labelOverride?: string;
}
export interface OnTheCourt {
  headers: string[];
  lnk: string;
  useStarters: boolean;
}
export interface GmLdrs2 {
  lnk: string;
  lnkPre: string;
}
export interface GmHilghts {
  lnk: string;
}
export interface Stndngs {
  headers: Header[][][];
}
export interface Header {
  type: string;
  shortDisplayName?: string;
}
export interface WnPrb {
  pts: Pts;
  grph: Grph2;
}
export interface Grph2 {
  xTcks: number[];
}
export interface Pts {
  '401745911113378910': number;
  '401745911113378911': number;
  '401745911113378912': number;
  '401745911113378913': number;
  '401745911113378914': number;
  '401745911113378915': number;
  '401745911113378916': number;
  '401745911113378917': number;
  '401745911113378918': number;
  '401745911113378919': number;
  '401745911113378920': number;
  '401745911113378923': number;
  '401745911113378924': number;
  '401745911113378947': number;
  '401745911113378948': number;
  '401745911113378953': number;
  '401745911113378954': number;
  '401745911113378959': number;
  '401745911113378965': number;
  '401745911113378987': number;
  '401745911113378988': number;
  '401745911113378989': number;
  '401745911113378990': number;
  '401745911113378993': number;
  '401745911113378994': number;
  '401745911113378997': number;
  '401745911113378998': number;
  '401745911113378999': number;
  '401745911113379018': number;
  '401745911113379019': number;
  '401745911113379020': number;
  '401745911113379021': number;
  '401745911113379036': number;
  '401745911113379037': number;
  '401745911113379041': number;
  '401745911113379042': number;
  '401745911113379044': number;
  '401745911113379048': number;
  '401745911113379054': number;
  '401745911113379058': number;
  '401745911113379066': number;
  '401745911113379129': number;
  '401745911113379130': number;
  '401745911113379132': number;
  '401745911113379134': number;
  '401745911113379136': number;
  '401745911113379138': number;
  '401745911113379140': number;
  '401745911113379141': number;
  '401745911113379142': number;
  '401745911113379143': number;
  '401745911113379144': number;
  '401745911113379147': number;
  '401745911113379149': number;
  '401745911113379152': number;
  '401745911113379153': number;
  '401745911113379159': number;
  '401745911113379160': number;
  '401745911113379163': number;
  '401745911113379188': number;
  '401745911113379189': number;
  '401745911113379192': number;
  '401745911113379195': number;
  '401745911113379196': number;
  '401745911113379197': number;
  '401745911113379198': number;
  '401745911113379199': number;
  '401745911113379200': number;
  '401745911113379203': number;
  '401745911113379204': number;
  '401745911113379227': number;
  '401745911113379230': number;
  '401745911113379238': number;
  '401745911113379239': number;
  '401745911113379240': number;
  '401745911113379241': number;
  '401745911113379242': number;
  '401745911113379243': number;
  '401745911113379244': number;
  '401745911113379245': number;
  '401745911113379246': number;
  '401745911113379247': number;
  '401745911113379250': number;
  '401745911113379251': number;
  '401745911113379258': number;
  '401745911113379260': number;
  '401745911113379304': number;
  '401745911113379305': number;
  '401745911113379331': number;
  '401745911113379339': number;
  '401745911113379341': number;
  '401745911113379343': number;
  '401745911113379344': number;
  '401745911113379345': number;
  '401745911113379366': number;
  '401745911113379367': number;
  '401745911113379372': number;
  '401745911113379375': number;
  '401745911113379378': number;
  '401745911113379379': number;
  '401745911113379382': number;
  '401745911113379383': number;
  '401745911113379384': number;
  '401745911113379389': number;
  '401745911113379390': number;
  '401745911113379391': number;
  '401745911113379394': number;
  '401745911113379400': number;
  '401745911113379401': number;
  '401745911113379402': number;
  '401745911113379403': number;
  '401745911113379404': number;
  '401745911113379405': number;
  '401745911113379426': number;
  '401745911113379428': number;
  '401745911113379431': number;
  '401745911113379433': number;
  '401745911113379436': number;
  '401745911113379437': number;
  '401745911113379438': number;
  '401745911113379440': number;
  '401745911113379444': number;
  '401745911113379477': number;
  '401745911113379480': number;
  '401745911113379482': number;
  '401745911113379483': number;
  '401745911113379492': number;
  '401745911113379493': number;
  '401745911113379494': number;
  '401745911113379495': number;
  '401745911113379496': number;
  '401745911113379498': number;
  '401745911113379499': number;
  '401745911113379500': number;
  '401745911113379501': number;
  '401745911113379503': number;
  '401745911113379504': number;
  '401745911113379505': number;
  '401745911113379507': number;
  '401745911113379508': number;
  '401745911113379516': number;
  '401745911113379517': number;
  '401745911113379518': number;
  '401745911113379519': number;
  '401745911113379527': number;
  '401745911113379531': number;
  '401745911113379533': number;
  '401745911113379539': number;
  '401745911113379540': number;
  '401745911113379567': number;
  '401745911113379568': number;
  '401745911113379569': number;
  '401745911113379570': number;
  '401745911113379571': number;
  '401745911113379572': number;
  '401745911113379573': number;
  '401745911113379574': number;
  '401745911113379575': number;
  '401745911113379576': number;
  '401745911113379578': number;
  '401745911113379579': number;
  '401745911113379580': number;
  '401745911113379581': number;
  '401745911113379582': number;
  '401745911113379583': number;
  '401745911113379584': number;
  '401745911113379585': number;
  '401745911113379606': number;
  '401745911113379607': number;
  '401745911113379608': number;
  '401745911113379610': number;
  '401745911113379624': number;
  '401745911113379625': number;
  '401745911113379646': number;
  '401745911113379647': number;
  '401745911113379648': number;
  '401745911113379649': number;
  '401745911113379650': number;
  '401745911113379651': number;
  '401745911113379652': number;
  '401745911113379653': number;
  '401745911113379654': number;
  '401745911113379656': number;
  '401745911113379657': number;
  '401745911113379661': number;
  '401745911113379662': number;
  '401745911113379666': number;
  '401745911113379667': number;
  '401745911113379669': number;
  '401745911113379670': number;
  '401745911113379673': number;
  '401745911113379674': number;
  '401745911113379675': number;
  '401745911113379676': number;
  '401745911113379678': number;
  '401745911113379679': number;
  '401745911113379685': number;
  '401745911113379706': number;
  '401745911113379709': number;
  '401745911113379715': number;
  '401745911113379716': number;
  '401745911113379717': number;
  '401745911113379718': number;
  '401745911113379719': number;
  '401745911113379723': number;
  '401745911113379725': number;
  '401745911113379746': number;
  '401745911113379752': number;
  '401745911113379758': number;
  '401745911113379759': number;
  '401745911113379760': number;
  '401745911113379761': number;
  '401745911113379762': number;
  '401745911113379763': number;
  '401745911113379764': number;
  '401745911113379765': number;
  '401745911113379769': number;
  '401745911113379773': number;
  '401745911113379778': number;
  '401745911113379785': number;
  '401745911113379806': number;
  '401745911113379808': number;
  '401745911113379810': number;
  '401745911113379812': number;
  '401745911113379813': number;
  '401745911113379815': number;
  '401745911113380071': number;
  '401745911113380072': number;
  '401745911113380073': number;
  '401745911113380074': number;
  '401745911113380075': number;
  '401745911113380076': number;
  '401745911113380078': number;
  '401745911113380079': number;
  '401745911113380080': number;
  '401745911113380081': number;
  '401745911113380082': number;
  '401745911113380083': number;
  '401745911113380084': number;
  '401745911113380085': number;
  '401745911113380166': number;
  '401745911113380167': number;
  '401745911113380168': number;
  '401745911113380169': number;
  '401745911113380170': number;
  '401745911113380171': number;
  '401745911113380173': number;
  '401745911113380175': number;
  '401745911113380176': number;
  '401745911113380177': number;
  '401745911113380178': number;
  '401745911113380179': number;
  '401745911113380180': number;
  '401745911113380182': number;
  '401745911113380184': number;
  '401745911113380185': number;
  '401745911113380226': number;
  '401745911113380227': number;
  '401745911113380228': number;
  '401745911113380230': number;
  '401745911113380232': number;
  '401745911113380234': number;
  '401745911113380235': number;
  '401745911113380236': number;
  '401745911113380238': number;
  '401745911113380239': number;
  '401745911113380240': number;
  '401745911113380242': number;
  '401745911113380243': number;
  '401745911113380244': number;
  '401745911113380286': number;
  '401745911113380287': number;
  '401745911113380288': number;
  '401745911113380289': number;
  '401745911113380290': number;
  '401745911113380292': number;
  '401745911113380293': number;
  '401745911113380294': number;
  '401745911113380295': number;
  '401745911113380296': number;
  '401745911113380297': number;
  '401745911113380298': number;
  '401745911113380299': number;
  '401745911113380300': number;
  '401745911113380301': number;
  '401745911113380303': number;
  '401745911113380305': number;
  '401745911113380387': number;
  '401745911113380388': number;
  '401745911113380389': number;
  '401745911113380390': number;
  '401745911113380391': number;
  '401745911113380392': number;
  '401745911113380393': number;
  '401745911113380395': number;
  '401745911113380396': number;
  '401745911113380397': number;
  '401745911113380398': number;
  '401745911113380399': number;
  '401745911113380400': number;
  '401745911113380402': number;
  '401745911113380404': number;
  '401745911113380405': number;
  '401745911113380426': number;
  '401745911113380427': number;
  '401745911113380428': number;
  '401745911113380429': number;
  '401745911113380449': number;
  '401745911113380457': number;
  '401745911113380458': number;
  '401745911113380461': number;
  '401745911113380469': number;
  '401745911113380471': number;
  '401745911113380472': number;
  '401745911113380483': number;
  '401745911113380484': number;
  '401745911113380487': number;
  '401745911113380488': number;
  '401745911113380491': number;
  '401745911113380492': number;
  '401745911113380495': number;
  '401745911113380496': number;
  '401745911113380498': number;
  '401745911113380499': number;
  '401745911113380502': number;
  '401745911113380504': number;
  '401745911113380505': number;
  '401745911113380511': number;
  '401745911113380512': number;
  '401745911113380513': number;
  '401745911113380514': number;
  '401745911113380515': number;
  '401745911113380516': number;
  '401745911113380519': number;
  '401745911113380520': number;
  '401745911113380521': number;
  '401745911113380522': number;
  '401745911113380524': number;
  '401745911113380525': number;
  '401745911113380566': number;
  '401745911113380567': number;
  '401745911113380568': number;
  '401745911113380569': number;
  '401745911113380570': number;
  '401745911113380571': number;
  '401745911113380573': number;
  '401745911113380574': number;
  '401745911113380575': number;
  '401745911113380576': number;
  '401745911113380577': number;
  '401745911113380578': number;
  '401745911113380579': number;
  '401745911113380580': number;
  '401745911113380581': number;
  '401745911113380582': number;
  '401745911113380583': number;
  '401745911113380584': number;
  '401745911113380585': number;
  '401745911113380606': number;
  '401745911113380607': number;
  '401745911113380608': number;
  '401745911113380610': number;
  '401745911113380617': number;
  '401745911113380620': number;
  '401745911113380621': number;
  '401745911113380628': number;
  '401745911113380632': number;
  '401745911113380633': number;
  '401745911113380634': number;
  '401745911113380637': number;
  '401745911113380638': number;
  '401745911113380639': number;
  '401745911113380641': number;
  '401745911113380645': number;
  '401745911113380666': number;
  '401745911113380672': number;
  '401745911113380673': number;
  '401745911113380681': number;
  '401745911113380682': number;
  '401745911113380685': number;
  '401745911113380686': number;
  '401745911113380687': number;
  '401745911113380689': number;
  '401745911113380690': number;
  '401745911113380733': number;
  '401745911113380734': number;
  '401745911113380740': number;
  '401745911113380744': number;
  '401745911113380780': number;
  '401745911113380782': number;
  '401745911113380783': number;
  '401745911113380784': number;
  '401745911113380785': number;
  '401745911113380786': number;
  '401745911113380787': number;
  '401745911113380788': number;
  '401745911113380789': number;
  '401745911113380791': number;
  '401745911113380792': number;
  '401745911113380793': number;
  '401745911113380794': number;
  '401745911113380795': number;
  '401745911113380796': number;
  '401745911113380797': number;
  '401745911113380800': number;
  '401745911113380801': number;
  '401745911113380802': number;
  '401745911113380803': number;
  '401745911113380804': number;
  '401745911113380805': number;
  '401745911113380846': number;
  '401745911113380847': number;
  '401745911113380848': number;
  '401745911113380849': number;
  '401745911113380850': number;
  '401745911113380851': number;
  '401745911113380852': number;
  '401745911113380853': number;
  '401745911113380854': number;
  '401745911113380856': number;
  '401745911113380857': number;
  '401745911113380864': number;
  '401745911113380865': number;
  '401745911113380886': number;
  '401745911113380887': number;
  '401745911113380888': number;
  '401745911113380890': number;
  '401745911113380892': number;
  '401745911113380894': number;
  '401745911113380895': number;
  '401745911113380896': number;
  '401745911113380901': number;
  '401745911113380937': number;
  '401745911113380938': number;
  '401745911113380939': number;
  '401745911113380940': number;
  '401745911113380941': number;
  '401745911113380942': number;
  '401745911113380945': number;
  '401745911113380966': number;
  '401745911113380968': number;
  '401745911113380969': number;
  '401745911113380970': number;
  '401745911113380971': number;
  '401745911113380972': number;
  '401745911113380973': number;
  '401745911113380974': number;
  '401745911113380975': number;
  '401745911113380976': number;
  '401745911113380977': number;
  '401745911113380978': number;
  '401745911113380979': number;
  '401745911113380980': number;
  '401745911113380981': number;
  '401745911113380982': number;
  '401745911113380983': number;
  '401745911113380984': number;
  '401745911113380985': number;
  '401745911113380986': number;
  '401745911113380987': number;
  '401745911113380988': number;
  '401745911113380989': number;
  '401745911113380990': number;
  '401745911113380991': number;
  '401745911113380992': number;
  '401745911113381003': number;
  '401745911113381004': number;
  '401745911113381005': number;
  '401745911113381010': number;
  '401745911113381011': number;
  '401745911113381012': number;
  '401745911113381013': number;
  '401745911113381016': number;
  '401745911113381017': number;
  '401745911113381018': number;
  '401745911113381019': number;
  '401745911113381021': number;
  '401745911113381047': number;
  '401745911113381048': number;
  '401745911113381053': number;
  '401745911113381055': number;
  '401745911113381058': number;
  '401745911113381062': number;
}
export interface Ply {
  clck: string;
  id: string;
  prd: number;
  awyScr: number;
  hmScr: number;
  txt: string;
  sq: number;
  plyTypId: string;
  wnPrb?: number;
  team?: string;
  tm?: string;
  scrng?: boolean;
}
export interface GmFlw {
  grph: Grph;
  gmSt: string;
}
export interface Grph {
  xTcks: number[];
  yTcks: number[];
}
export interface GmLdrs {
  ldrs: Ldr[];
  tm: Tm2[];
}
export interface Tm2 {
  abbrev: string;
  color: string;
  location: string;
  logo: string;
  name: string;
  href: string;
  uid: string;
}
export interface Ldr {
  players: Players;
  label: string;
  name: string;
}
export interface Players {
  away: Away2;
  home: Away2;
}
export interface Away2 {
  nameShort: string;
  nameFull: string;
  playerUid: string;
  playerNumber: string;
  stats: Stat2[];
  teamAbbrev: string;
  playerId: string;
  playerPage: string;
  headshotImg: string;
  headshotImgLg: string;
}
export interface Stat2 {
  label: string;
  value: string;
}
export interface Fmt {
  clckBsd: boolean;
  prds: number;
  prdTp: string;
  prdNm: string;
  prdScnds: number;
  otScnds: number;
  plyTm: number;
}
export interface GmStry {
  modDt: string;
  pubDt: string;
  vids: Vid2[];
  hdln: string;
  desc: string;
  athrs: Athr[];
}
export interface Athr {
  dspNm: string;
}
export interface Vid2 {
  ad: Ad2;
  cerebroId: string;
  id: string;
  description: string;
  duration: string;
  imgSrc: string;
  imgSrcWidth: number;
  imgSrcHeight: number;
  lang: string;
  expirationDate: string;
  lastModified: string;
  publishDate: string;
  source: string;
  headline: string;
  customMetaData: CustomMetaData;
  videoSrc: VideoSrc;
  track: Track;
  imgSrcFull?: string;
  title?: string;
  syndicatable?: boolean;
}
export interface TmStatsGrph {
  footerLink: string;
  teams: Team4[];
  stats: Stat[];
}
export interface Stat {
  data: Datum[];
}
export interface Datum {
  name: string;
  values: string[];
  isPctStat?: boolean;
}
export interface Team4 {
  abbrv: string;
  color: string;
  link: string;
  logo: string;
  uid: string;
}
export interface ShtChrt {
  plays: Play[];
  tms: PrsdTms;
  ntrlSte: boolean;
}
export interface Play {
  id: string;
  period: Period;
  text: string;
  homeAway: string;
  athlete: Athlete;
  coordinate: Coordinate;
  shootingPlay: boolean;
  type: Type;
  scoringPlay?: boolean;
  isFreeThrow?: boolean;
}
export interface Type {
  id: string;
  txt: string;
}
export interface Coordinate {
  x: number;
  y: number;
}
export interface Athlete {
  id: string;
  name: string;
}
export interface Period {
  number: number;
  displayValue: string;
}
export interface GameOdds {
  footerLabel: string;
  footerLinkId: string;
  gameInfo: string;
  gameState: string;
  keys: string[];
  labels: Labels;
  odds: Odd[];
  providerName: string;
  rightHeaderLogo: string;
  headerText: string;
  gameBetLink: string;
}
export interface Odd {
  line: Line;
  open: Open;
  pointSpread: PointSpread;
  total: PointSpread;
  moneyline: Moneyline;
}
export interface Moneyline {
  primary: string;
  linkId: string;
  mktTxt: string;
  outcome: string;
  outcomeIcon?: string;
}
export interface PointSpread {
  primary: string;
  secondary: string;
  linkId: string;
  mktTxt: string;
  outcome: string;
  outcomeIcon?: string;
}
export interface Open {
  primary: string;
  secondary: string;
}
export interface Line {
  isLoser: boolean;
  primaryText: string;
  primaryTextFull: string;
  primaryTextFullWide: string;
  primaryTextExtra: null;
  primaryTextExtraWide: null;
  secondaryText: string;
  secondaryTextFull: string;
  secondaryTextExtra: null;
  link: string;
  uid: string;
}
export interface Labels {
  open: string;
  pointSpread: string;
  total: string;
  moneyline: string;
}
export interface Medialst {
  vids: Vid[];
  cmpttn: Cmpttn;
}
export interface Cmpttn {
  awy: string;
  hme: string;
  ntrlSte: boolean;
}
export interface Vid {
  ad: Ad2;
  cerebroId: string;
  id: string;
  description: string;
  duration: string;
  imgSrc: string;
  imgSrcWidth: number;
  imgSrcHeight: number;
  lang: string;
  expirationDate: string;
  lastModified: string;
  publishDate: string;
  source: string;
  headline: string;
  customMetaData: CustomMetaData;
  videoSrc: VideoSrc;
  track: Track;
}
export interface Track {
  coverageType: string;
  leagueName: string;
  sportName: string;
  trackId: string;
  trackName: string;
}
export interface VideoSrc {
  defaultSrc: string;
  webSrc: string;
}
export interface CustomMetaData {
  ContentType: string;
  Edition: string;
  Embedded: string;
  Language: string;
  League: string;
  Orientation: string;
  Placement: string;
  PlayLocation: string;
  PlayerName: string;
  ReportSuite: string;
  Site: string;
  Sport: string;
  TrackingServer: string;
  VideoType: string;
}
export interface Ad2 {
  sport: string;
  bundle: string;
}
export interface Link2 {
  rel: string[];
  href: string;
  text: string;
  shortText: string;
  isExternal: boolean;
  isPremium: boolean;
}
export interface GmInfo {
  attnd: number;
  broadcasts: Broadcast[];
  cvrg: string;
  oddsAttr: string;
  darkOddsAttr: string;
  gameState: string;
  dtTmVld: boolean;
  dtTm: string;
  refs: Ref[];
  loc: string;
  locImg: string;
  locAddr: LocAddr;
  weatherLink: string;
}
export interface LocAddr {
  city: string;
  state: string;
}
export interface Ref {
  dspNm: string;
  pos: string;
}
export interface Broadcast {
  name: string;
  type: string;
  market: string;
}
export interface Stndng {
  shrtDspNm: string;
  dspNm: string;
  feed: Feed[];
  tmFeat: string[];
  lnk: string;
  lnkTxt: string;
  lgUid: string;
}
export interface Feed {
  entries: Entry[];
  statMap: StatMap;
}
export interface StatMap {
  total: Total;
  vsconf_gamesbehind: Total;
  vsconf: Total;
}
export interface Total {
  t: string;
  d: string;
  a: string;
  i: number;
}
export interface Entry {
  team: Team3;
  stats: string[];
}
export interface Team3 {
  id: string;
  displayName: string;
  shortDisplayName: string;
  uid: string;
  recordSummary: string;
  standingSummary: string;
  links: string;
}
export interface PrsdTms {
  home: Home;
  away: Away;
}
export interface Away {
  id: string;
  abbrev: string;
  displayName: string;
  shortDisplayName: string;
  logo: string;
  teamColor: string;
  altColor: string;
  uid: string;
  recordSummary: string;
  standingSummary: string;
  nickname: string;
  location: string;
  links: string;
  logoDk: string;
  records: Record[];
  isHome: boolean;
  rank: number;
  linescores: Linescore[];
  score: string;
  winner: boolean;
  acsblClr: string;
  ltMdAcsblClr: string;
  logoMd: string;
}
export interface Home {
  id: string;
  abbrev: string;
  displayName: string;
  shortDisplayName: string;
  logo: string;
  teamColor: string;
  altColor: string;
  uid: string;
  recordSummary: string;
  standingSummary: string;
  nickname: string;
  location: string;
  links: string;
  logoDk: string;
  records: Record[];
  isHome: boolean;
  rank: number;
  linescores: Linescore[];
  score: string;
  acsblClr: string;
  ltMdAcsblClr: string;
  logoMd: string;
}
export interface News {
  header: string;
  articles: Article[];
  link: string;
  text: string;
}
export interface Article {
  headline: string;
  byLine: string;
  description: string;
  image: string;
  premium: boolean;
  published: string;
  logoSrc: string;
  images: Image[];
  link: string;
}
export interface Image {
  src: string;
  alt: string;
}
export interface GpLinks {
  links: Link[];
  activePage: ActivePage;
}
export interface ActivePage {
  device: string;
  league: string;
  pageType: null;
  subPageType: string;
}
export interface Link {
  l: L7;
  d: D;
}
export interface D {
  'data-track-nav_layer': string;
  'data-track-nav_item': string;
  className: string;
}
export interface L7 {
  h: string;
  e: boolean;
  p: boolean;
  m: M2;
  t: string;
  w: M2;
}
export interface M2 {
  h: string;
  e: boolean;
  p: boolean;
  t: string;
}
export interface GmSwtchrMta {
  firstPillOverride: FirstPillOverride;
  gameSwitcherExpected: boolean;
  group: string;
  topic: string;
}
export interface FirstPillOverride {
  statusState: string;
  date: string;
  primaryText: string;
  id: number;
  link: string;
  leftSide: LeftSide;
  rightSide: LeftSide;
  selectedMatchupCharacter: string;
  ariaLabel: string;
}
export interface LeftSide {
  score: number;
  uid: string;
  isWinner: boolean;
  homeAway: string;
  hasPossession: boolean;
  logoSrcLight: string;
  logoSrcDark: string;
  logoAlt: string;
}
export interface GmStrp {
  uid: string;
  gid: string;
  dt: string;
  nm: string;
  possAvail: boolean;
  seasonType: number;
  status: Status;
  statusState: string;
  tbd: boolean;
  tms: Tm[];
  isConferenceGame: boolean;
  bxscrSrc: string;
  nte: string;
  neutralSite: boolean;
}
export interface Tm {
  id: string;
  abbrev: string;
  displayName: string;
  shortDisplayName: string;
  logo: string;
  teamColor: string;
  altColor: string;
  uid: string;
  recordSummary: string;
  standingSummary: string;
  nickname: string;
  location: string;
  links: string;
  logoDk: string;
  records: Record[];
  isHome: boolean;
  rank: number;
  linescores: Linescore[];
  score: string;
  acsblClr: string;
  ltMdAcsblClr: string;
  logoMd: string;
  winner?: boolean;
}
export interface Linescore {
  displayValue: string;
}
export interface Record {
  type: string;
  summary: string;
  displayValue: string;
}
export interface Status {
  desc: string;
  det: string;
  id: string;
  state: string;
}
export interface AutoUpdate {
  mode: string;
}
export interface Headerscoreboard {
  isTopEvents: boolean;
  isTopSoccer: boolean;
  sportTopics: SportTopic[];
  collegeConfs: null;
}
export interface SportTopic {
  league: string;
  sportId: number;
  displayName: string;
  slug: string;
  sport?: string;
  href?: string;
  linkText?: string;
  top25Only?: boolean;
}
export interface SubNavigation {
  hideAppSubNav: boolean;
}
export interface BetConfigSettings {
  showBettingLinksText: string;
  myBetsConfig: MyBetsConfig;
}
export interface MyBetsConfig {
  espnBetLinkURL: string;
  espnBetUnLinkURL: string;
  espnBetLogo: string;
  espnBetLogoAlt: string;
  espnLogo: string;
  espnLogoAlt: string;
  linkedPrimaryText: string;
  linkedSecondaryText: string;
  linkedEspnBetLinkText: string;
  unlinkedPrimaryText: string;
  unlinkedSecondaryText: string;
  unlinkedEspnBetLinkText: string;
  myBetsCheckLogo: string;
  myBetsCheckLogoAlt: string;
  myBetsLinkLogo: string;
  myBetsLinkLogoAlt: string;
  showDollarAmountText: string;
}
export interface Navigation {
  lbl: string;
  sports: Sport[];
  pillar: Pillar[];
  singleSport: boolean;
}
export interface Pillar {
  l: L4;
  t: string;
  i: I4[];
  a: A12;
  id: number;
}
export interface A12 {
  root?: string;
  twoColumn?: string;
  betting?: string;
  menu?: string;
}
export interface I4 {
  l?: L5;
  t?: string;
  i?: I3[];
  a?: A11;
  id: number;
}
export interface A11 {
  menu?: string;
  placeholder?: string;
}
export interface I3 {
  l: L6;
  id: number;
}
export interface L6 {
  t: string;
  w: W6;
}
export interface W6 {
  a?: A10;
  h: string;
  p?: boolean;
}
export interface A10 {
  class?: string;
  abbrev?: string;
  route?: string;
}
export interface L5 {
  t: string;
  w: W5;
  m?: M;
}
export interface W5 {
  a?: A9;
  h: string;
}
export interface A9 {
  mobile?: string;
  abbrev?: string;
  tab?: string;
  pagetype?: string;
  breakpoints?: string;
}
export interface L4 {
  t?: string;
  w: W4;
}
export interface W4 {
  a?: A8;
  h: string;
  e?: boolean;
}
export interface A8 {
  logo?: string;
  eplustrack?: string;
  espnbettrack?: string;
  betting?: string;
  icon?: string;
  class?: string;
}
export interface Sport {
  l: L;
  t: string;
  i: I2[];
  a: A7;
  id: number;
  lbl: string;
}
export interface A7 {
  root: string;
  sport_id?: string;
}
export interface I2 {
  l: L2;
  id: number;
  t?: string;
  a?: A4;
  i?: I[];
}
export interface I {
  l: L3;
  id: number;
  t?: string;
  a?: A6;
}
export interface A6 {
  route?: string;
  root?: string;
  sport_id?: string;
  breakpoints?: string;
  betting?: string;
}
export interface L3 {
  t: string;
  w?: W3;
  m?: M;
}
export interface W3 {
  h: string;
  a?: A5;
  e?: boolean;
}
export interface A5 {
  placeholder?: string;
  breakpoints?: string;
  mobile?: string;
  route?: string;
}
export interface A4 {
  root: string;
  sport_id?: string;
  edition?: string;
  sport?: string;
  betting?: string;
}
export interface L2 {
  t: string;
  w: W2;
  m?: M;
}
export interface M {
  a: A3;
  h: string;
}
export interface A3 {
  mobile: string;
}
export interface W2 {
  a?: A2;
  h: string;
  e?: boolean;
  p?: boolean;
}
export interface A2 {
  breakpoints?: string;
  route?: string;
  sportAbbrev?: string;
  'match-url'?: string;
  betting?: string;
  placeholder?: string;
  mobile?: string;
  icon?: string;
  tab?: string;
  pagetype?: string;
  root?: string;
  sport_id?: string;
}
export interface L {
  t: string;
  w: W;
}
export interface W {
  h: string;
  a?: A;
}
export interface A {
  icon?: string;
  mobile?: string;
}
export interface Teams {
  mlb: Mlb[];
  nba: Mlb[];
  nfl: Mlb[];
  nhl: Mlb[];
  wnba: Mlb[];
  soccer: Soccer[];
}
export interface Soccer {
  name: string;
  teams: Team2[];
}
export interface Team2 {
  name: string;
  href: string;
  logo: string;
}
export interface Mlb {
  name: string;
  teams: Team[];
}
export interface Team {
  id: string;
  href: string;
  name: string;
  shortName: string;
  abbrev: string;
  logo: string;
  logoDark: string;
}
export interface Meta {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogMetadata: OgMetadata;
  jsonld: string;
  hrefLangs: HrefLang[];
}
export interface HrefLang {
  key: string;
  region: string;
  url: string;
}
export interface OgMetadata {
  image: string;
  width: number;
  height: number;
}
export interface Routing {
  location: Location;
  params: Params2;
}
export interface Params2 {
  gameId: string;
  sport: string;
  pageType: string;
  rawPageType: string;
  subPageType: null;
  league: string;
}
export interface Location {
  port: string;
  hash: string;
  path: string;
  host: string;
  protocol: string;
  params: Params;
  pathname: string;
  originalPathName: string;
  query: Params;
}
export interface Params {
  gameId: string;
}
export interface App {
  uid: string;
  mode: string;
  apiEnv: string;
  envName: string;
  cdnPath: string;
  allowMocks: boolean;
  mockDataPort: number;
  excludePageCSS: boolean;
  assets: Assets;
  device: string;
  modifier: string;
  edition: Edition;
  flags: Flags;
  tms: Tms;
  toodles: Config;
  requestHeaders: RequestHeaders;
  featureGating: FeatureGating;
  frameAncestors: string[];
  searchConfig: SearchConfig;
  serveStale: string[];
  abScr: string;
  footer: Footer2;
  fastcastConfig: FastcastConfig2;
  exitConfig: ExitConfig[];
  debug: Debug;
  baseURL: string;
  userab: string;
  webpack: Config;
}
export interface Debug {
  on: boolean;
}
export interface FastcastConfig2 {
  maxFastcastGames: number;
}
export interface Footer2 {
  ad: Ad;
  prebid: PreBidConfig;
  taboola: TaboolaConfig;
  videoAd: VideoAdConfig;
  videoOOVAd: VideoOOVAdConfig;
  frameAncestors: string[];
  search: SearchConfig;
  tms: Tms2;
  serveStale: string[];
  ab: Ab;
  footer: Footer[];
  copyright: string;
  disclaimers: string[];
  fastcastConfig: FastcastConfig;
  exitConfig: ExitConfig[];
}
export interface ExitConfig {
  key: string;
  hrefPatterns: string[];
  analytics: Analytics;
  accessibilityLabelButton: string;
  accessibilityLabelCheckbox: string;
  continueLogo: string;
  continueLogoDark: string;
  continueText: string;
  headingFantasyApp: string;
  heading: string;
  headingTournamentChallengeApp: string;
  logo: Logo;
  primaryText: string;
  primaryTextMobile: string;
  remember: Remember;
  webviewType: string;
}
export interface Remember {
  analyticsKey: string;
  text: string;
  ttl: number;
}
export interface Logo {
  light: string;
  dark: string;
  alt: string;
}
export interface Analytics {
  pageName: string;
  section: string;
  league: string;
  sport: string;
  contentType: string;
  eventName: string;
}
export interface FastcastConfig {
  allContributorPostTypes: AllContributorPostTypes;
  gameSwitcherFootball: AllContributorPostTypes;
  gameSwitcherFootball_v4: AllContributorPostTypes;
  gameSwitcherBasketball: AllContributorPostTypes;
  gameSwitcherBaseball: AllContributorPostTypes;
  gameSwitcherHockey: AllContributorPostTypes;
  gameSwitcherSoccer: AllContributorPostTypes;
  gameSwitcherLacrosse: AllContributorPostTypes;
  stickyFooter: AllContributorPostTypes;
  articlesUseContentCore: AllContributorPostTypes;
  isolatedPostPage: AllContributorPostTypes;
  contributorFollowButton: AllContributorPostTypes;
  contributorFeedFollowButton: AllContributorPostTypes;
  contributorContentReactions: AllContributorPostTypes;
  contributorLinkedArticle: AllContributorPostTypes;
  contributorLinkedAuthor: AllContributorPostTypes;
  enableAutoplayTiles: AllContributorPostTypes;
  enableGPLiveOdds: AllContributorPostTypes;
  enableGraceHold: AllContributorPostTypes;
  enablePillMetadata: AllContributorPostTypes;
  enableWebPlayer: AllContributorPostTypes;
  w2w: AllContributorPostTypes;
  w2wSkeletonUI: AllContributorPostTypes;
  refetchWatchSubscriptions: AllContributorPostTypes;
  exploreTiles: AllContributorPostTypes;
  deferAdobePass: AllContributorPostTypes;
  watchButtonV2: AllContributorPostTypes;
  bettingOdds: AllContributorPostTypes;
  contentReactions: AllContributorPostTypes;
  disableUSBettingAds: AllContributorPostTypes;
  enableGameblockOddsStrip: AllContributorPostTypes;
  enableScoresDrawerOddsStrip: AllContributorPostTypes;
  fittVodPlayer: AllContributorPostTypes;
  'mens-college-basketball-bracket-fc': AllContributorPostTypes;
  'womens-college-basketball-bracket-fc': AllContributorPostTypes;
  continueWatching: AllContributorPostTypes;
  mobilePlaylist: AllContributorPostTypes;
  startFromBeginning: AllContributorPostTypes;
  oddsStrip: AllContributorPostTypes;
  oneIDV4: AllContributorPostTypes;
  playerFollowing: AllContributorPostTypes;
  contributorFollowing: AllContributorPostTypes;
  siteBroadcast: SiteBroadcast;
  browerDeprecation: BrowerDeprecation;
  gateFavorites: AllContributorPostTypes;
  newSearchVersion: AllContributorPostTypes;
  enableFastcast: AllContributorPostTypes;
  hudsonPlayer: HudsonPlayer;
  geoFooter: AllContributorPostTypes;
  activeSportsSiteAPI: AllContributorPostTypes;
  usPrivacy: AllContributorPostTypes;
  hudsonPAL: AllContributorPostTypes;
  olyResultsGPWebview: AllContributorPostTypes;
  showTaboolaSportIndex: AllContributorPostTypes;
  showTaboolaArticle: AllContributorPostTypes;
  draftArticleDeeplinks: AllContributorPostTypes;
  enableGameBreaksOnWebview: AllContributorPostTypes;
  enableLeaderboardWatchRow: AllContributorPostTypes;
  enableVisionEvents: AllContributorPostTypes;
  drm: Drm;
  useLatestPaywall: AllContributorPostTypes;
  enableMagnite: AllContributorPostTypes;
  deflateZips: AllContributorPostTypes;
  enablePWA: AllContributorPostTypes;
  disableBet365: AllContributorPostTypes;
  enableMarketplace: AllContributorPostTypes;
  enableGamecastSponsoredAd: AllContributorPostTypes;
  enableHuluPromo: AllContributorPostTypes;
  enableScoreboardPromo: AllContributorPostTypes;
  enableCarouselPromo: AllContributorPostTypes;
  enableWatchHeaderVideoPromo: AllContributorPostTypes;
  disableAmp: AllContributorPostTypes;
  enableFlagship: AllContributorPostTypes;
  enableVenu: AllContributorPostTypes;
  enableNoSpoilerMode: AllContributorPostTypes;
  enableHighVolumeRow: AllContributorPostTypes;
  maxFastcastGames: number;
  fittRoutes: FittRoutes;
  enableCBHLTest: AllContributorPostTypes;
  enableMyBetsModuleIndex: AllContributorPostTypes;
  enableMyBetsSettingsOverlay: AllContributorPostTypes;
  enableSixPackPostState: AllContributorPostTypes;
  enableClipsPrerollAbTest: AllContributorPostTypes;
  enableBettingToggleSettings: AllContributorPostTypes;
  'hsb-polling-college-football': AllContributorPostTypes;
  'hsb-polling-mens-college-basketball': AllContributorPostTypes;
  'hsb-polling-womens-college-basketball': AllContributorPostTypes;
  enableBookworm: AllContributorPostTypes;
  enableMoreFutures: AllContributorPostTypes;
  enableBettingToggle: AllContributorPostTypes;
  'ed-pick-deep-link-espnapp-ios': AllContributorPostTypes;
  'ed-pick-deep-link-espnapp-android': AllContributorPostTypes;
  'ed-pick-deep-link-fantasy-ios': AllContributorPostTypes;
  'ed-pick-deep-link-fantasy-android': AllContributorPostTypes;
  'ed-pick-deep-link-tcmen-android': AllContributorPostTypes;
  'ed-pick-deep-link-tcmen-ios': AllContributorPostTypes;
  enableCatchUpToLive: AllContributorPostTypes;
  enableBetOddsTab: AllContributorPostTypes;
  draftcastBreakingNews: AllContributorPostTypes;
  enableMagicLink: AllContributorPostTypes;
}
export interface FittRoutes {
  local: string[];
  sandbox: string[];
  qa: string[];
  prod: string[];
}
export interface Drm {
  countries: string;
}
export interface HudsonPlayer {
  qa: boolean;
  prod: boolean;
  local: boolean;
}
export interface BrowerDeprecation {
  browser: string;
  active: boolean;
}
export interface SiteBroadcast {
  edition: string;
  config: Config2;
}
export interface Config2 {
  startDate: string;
  endDate: string;
  prod: boolean;
  qa: boolean;
  sandbox: boolean;
  local: boolean;
  en: En;
  pt: En;
  es: En;
}
export interface En {
  active: boolean;
  buttonText: string;
  href: string;
  message: string;
}
export interface AllContributorPostTypes {
  local: boolean;
  sandbox: boolean;
  qa: boolean;
  prod: boolean;
}
export interface Footer {
  label: string;
  href: string;
  className?: string;
}
export interface Ab {
  local: Local3;
  qa: Qa3;
  prod: Qa3;
}
export interface Qa3 {
  target: Target;
  optimizely: Optimizely;
  fastcast: Fastcast2;
}
export interface Fastcast2 {
  enabled: boolean;
  script: string;
  placements: Placements2;
}
export interface Placements2 {
  '/nba/index': string;
  '/ncf/index': string;
  '^/.+$': string;
}
export interface Local3 {
  target: Target;
  optimizely: Optimizely;
  fastcast: Fastcast;
}
export interface Fastcast {
  enabled: boolean;
  script: string;
  placements: Placements;
}
export interface Placements {
  '/nba/index': string;
  '/nfl/index': string;
  '/mlb/index': string;
  '^/.+$': string;
}
export interface Optimizely {
  enabled: boolean;
  oldscript: string;
  script: string;
  placements: any[];
}
export interface Target {
  enabled: boolean;
  script: string;
  placements: Placement[];
}
export interface Placement {
  site: string;
  regexp: string;
  flag: boolean;
}
export interface Tms2 {
  local: Local2;
  sandbox: Local2;
  qa: Local2;
  prod: Local2;
}
export interface Local2 {
  vendor: string;
  scriptTag: string;
  ns: string;
  enabled: boolean;
}
export interface Ad {
  network: string;
  base: string;
  kvps: Kvp[];
  kvpsEspnPlus: Kvp[];
  selector: string;
  override: Override;
  webviewOverride: WebviewOverride;
  sizes: Sizes;
  bettingOnlySizes: BettingOnlySizes;
  sizesEspnPlus: SizesEspnPlus;
  whitelistEspnPlus: string[];
  breakpoints: Breakpoints;
  supportDynamicPageLoad: boolean;
  delayInPageAdSlots: boolean;
  refreshOnBreakpointChange: boolean;
  dynamicKeyValues: DynamicKeyValues;
  id: number;
  disabled: string;
  incontentPositions: IncontentPositions;
  load: Load;
  preBidConfig: PreBidConfig;
  videoAdConfig: VideoAdConfig;
  taboolaConfig: TaboolaConfig;
  videoOOVAdConfig: VideoOOVAdConfig;
}
export interface VideoOOVAdConfig {
  Note: string;
  Storage: string;
}
export interface TaboolaConfig {
  local: Local;
  sandbox: Local;
  qa: Local;
  prod: Local;
}
export interface Local {
  taboola: Taboola;
  outbrain: Taboola;
}
export interface Taboola {
  show: boolean;
}
export interface VideoAdConfig {
  qa: Qa2;
  prod: Prod2;
}
export interface Prod2 {
  google: boolean;
  network: number;
  cms: number;
  showPremVideoAds: boolean;
  allowAdSkip: boolean;
  useNewUI: boolean;
  iphoneplaysinline: boolean;
  disallowAdSkipByEdition: any[];
}
export interface Qa2 {
  google: boolean;
  network: number;
  cms: number;
  showPremVideoAds: boolean;
  allowAdSkip: boolean;
  useNewUI: boolean;
  iphoneplaysinline: boolean;
  disallowAdSkipByEdition: string[];
  disableOnBackgroundedVideoEditions: string[];
}
export interface PreBidConfig {
  timeout: number;
  usePreBid: boolean;
  EUROPE_EXCLUSIONS: string[];
  REGION_MAP: REGIONMAP;
  rubicon: Rubicon;
  aol: Aol;
  appnexus: Appnexus;
  trustx: Trustx;
  ix: Ix;
}
export interface Ix {
  siteId: string;
}
export interface Trustx {
  incontent: number;
  banner: number;
}
export interface Appnexus {
  incontent: Incontent;
  banner: Incontent;
}
export interface Incontent {
  US: number;
  APAC: number;
  BR: number;
  CA: number;
  EMEA: number;
  IS: number;
  LATAM: number;
  ANZ: number;
}
export interface Aol {
  networkId: string;
  incontent: number[];
  banner: Banner4;
}
export interface Banner4 {
  desktop: number[];
  mobile: number[];
}
export interface Rubicon {
  accountId: number;
  desktop: Desktop;
  mobile: Desktop;
}
export interface Desktop {
  zoneId: number;
  siteId: number;
}
export interface REGIONMAP {
  AF: string;
  AL: string;
  DZ: string;
  AS: string;
  AD: string;
  AO: string;
  AI: string;
  AQ: string;
  AG: string;
  AR: string;
  AM: string;
  AW: string;
  AU: string;
  AT: string;
  AZ: string;
  BH: string;
  BD: string;
  BB: string;
  BY: string;
  BE: string;
  BZ: string;
  BJ: string;
  BM: string;
  BT: string;
  BO: string;
  BA: string;
  BW: string;
  BV: string;
  BR: string;
  IO: string;
  VG: string;
  BN: string;
  BG: string;
  BF: string;
  BI: string;
  KH: string;
  CM: string;
  CA: string;
  CV: string;
  BQ: string;
  KY: string;
  CF: string;
  TD: string;
  CL: string;
  CN: string;
  CX: string;
  CC: string;
  CO: string;
  KM: string;
  CK: string;
  CR: string;
  CI: string;
  HR: string;
  CW: string;
  CY: string;
  CZ: string;
  CD: string;
  DK: string;
  DJ: string;
  DM: string;
  DO: string;
  EC: string;
  EG: string;
  SV: string;
  GQ: string;
  ER: string;
  EE: string;
  ET: string;
  FK: string;
  FO: string;
  FM: string;
  FJ: string;
  FI: string;
  FR: string;
  GF: string;
  PF: string;
  TF: string;
  GA: string;
  GE: string;
  DE: string;
  GH: string;
  GI: string;
  GR: string;
  GL: string;
  GD: string;
  GP: string;
  GU: string;
  GT: string;
  GG: string;
  GN: string;
  GW: string;
  GY: string;
  HT: string;
  HM: string;
  HN: string;
  HK: string;
  HU: string;
  IS: string;
  IN: string;
  ID: string;
  IQ: string;
  IE: string;
  IL: string;
  IT: string;
  JM: string;
  JP: string;
  JE: string;
  JO: string;
  KZ: string;
  KE: string;
  KI: string;
  XK: string;
  KW: string;
  KG: string;
  LA: string;
  LV: string;
  LB: string;
  LS: string;
  LR: string;
  LY: string;
  LI: string;
  LT: string;
  LU: string;
  MO: string;
  MK: string;
  MG: string;
  MW: string;
  MY: string;
  MV: string;
  ML: string;
  MT: string;
  MH: string;
  MQ: string;
  MR: string;
  MU: string;
  YT: string;
  MX: string;
  MD: string;
  MC: string;
  MN: string;
  ME: string;
  MS: string;
  MA: string;
  MZ: string;
  MM: string;
  NA: string;
  NR: string;
  NP: string;
  NL: string;
  NC: string;
  NZ: string;
  NI: string;
  NE: string;
  NG: string;
  NU: string;
  NF: string;
  MP: string;
  NO: string;
  OM: string;
  PK: string;
  PW: string;
  PS: string;
  PA: string;
  PG: string;
  PY: string;
  PE: string;
  PH: string;
  PN: string;
  PL: string;
  PT: string;
  PR: string;
  QA: string;
  RE: string;
  RO: string;
  RU: string;
  RW: string;
  SH: string;
  KN: string;
  LC: string;
  PM: string;
  VC: string;
  WS: string;
  SM: string;
  ST: string;
  SA: string;
  SN: string;
  RS: string;
  SC: string;
  SL: string;
  SG: string;
  SX: string;
  SK: string;
  SI: string;
  SB: string;
  SO: string;
  ZA: string;
  GS: string;
  KR: string;
  ES: string;
  LK: string;
  SR: string;
  SJ: string;
  SZ: string;
  SE: string;
  CH: string;
  TW: string;
  TJ: string;
  TZ: string;
  TH: string;
  BS: string;
  GM: string;
  TL: string;
  TG: string;
  TK: string;
  TO: string;
  TT: string;
  TN: string;
  TR: string;
  TM: string;
  TC: string;
  TV: string;
  VI: string;
  UG: string;
  UA: string;
  AE: string;
  GB: string;
  US: string;
  UM: string;
  UY: string;
  UZ: string;
  VU: string;
  VA: string;
  VE: string;
  VN: string;
  WF: string;
  EH: string;
  YE: string;
  ZM: string;
  ZW: string;
}
export interface Load {
  defaults: Defaults2;
  frontpage: Defaults2;
  story: Defaults2;
  index: Defaults2;
  scoreboard: Defaults2;
  standings: Defaults2;
  schedule: Defaults2;
}
export interface Defaults2 {
  desktop: string;
  mobile: string;
  tablet: string;
}
export interface IncontentPositions {
  defaults: Defaults;
  index: Index;
}
export interface Index {
  top: Top;
  nfl: Config;
}
export interface Top {
  favorites: number;
}
export interface Defaults {
  favorites: number;
  now: number;
  news: number;
}
export interface DynamicKeyValues {
  profile: Profile;
}
export interface Profile {
  key: string;
}
export interface Breakpoints {
  xl: number[];
  l: number[];
  m: number[];
  s: number[];
}
export interface SizesEspnPlus {
  banner: Banner3;
  'banner-index': Bannerindex;
  'banner-scoreboard': Bannerscoreboard;
  'native-betting': Native;
  incontent: Overlay;
  'incontent-betting': Overlay;
  gamecast: Overlay;
  instream: Overlay;
}
export interface BettingOnlySizes {
  'incontent-betting': Overlay;
  'native-betting': Native;
}
export interface Sizes {
  overlay: Overlay;
  banner: Banner3;
  'banner-index': Bannerindex;
  'banner-scoreboard': Bannerscoreboard;
  'banner-webview': Bannerscoreboard;
  incontent: Overlay;
  'incontent-betting': Overlay;
  incontent2: Overlay;
  incontentstrip: Incontentstrip;
  wallpaper: Overlay;
  incontentstrip2: Overlay;
  midpage: Overlay;
  presby: Overlay;
  nlbetting: Overlay;
  nlbettingschedule: Overlay;
  presentedbylogo: Overlay;
  instream: Overlay;
  exclusions: Overlay;
  native: Native;
  'native-betting': Native;
  gamecast: Overlay;
}
export interface Native {
  defaultSize: string;
  mappings: Mapping3[];
}
export interface Mapping3 {
  viewport: number[];
  slot: string[];
}
export interface Incontentstrip {
  defaultSize: number[];
  mappings: Mapping2[];
}
export interface Mapping2 {
  viewport: number[];
  slot: number[];
}
export interface Bannerscoreboard {
  defaultSize: number[];
  includedCountries: string[];
  excludedSize: string[];
  mappings: Mapping[];
  pbjs: Pbjs;
}
export interface Bannerindex {
  defaultSize: number[];
  includedCountries: string[];
  excludedProfile: string[];
  excludedSize: string[];
  mappings: Mapping[];
  pbjs: Pbjs;
}
export interface Banner3 {
  defaultSize: number[];
  mappings: Mapping[];
  pbjs: Pbjs;
}
export interface Pbjs {
  xl: number[][];
  l: number[][];
  m: number[][];
  s: number[][];
}
export interface Overlay {
  defaultSize: number[];
  mappings: Mapping[];
}
export interface Mapping {
  viewport: number[];
  slot: number[][];
}
export interface WebviewOverride {
  banner: Banner2;
}
export interface Banner2 {
  standings: string;
  'team/stats': string;
  roster: string;
  'nba/stats': string;
  'nfl/stats': string;
  'cfb/stats': string;
  'mlb/stats': string;
  'ncb/rankings': string;
  'ncaaw/rankings': string;
  'cfb/rankings': string;
}
export interface Override {
  banner: Banner;
}
export interface Banner {
  conversation: string;
  game: string;
  index: string;
  lineups: string;
  match: string;
  preview: string;
  scoreboard: string;
  fightcenter: string;
}
export interface Kvp {
  name: string;
  value: string;
}
export interface SearchConfig {
  qa: Qa;
  prod: Prod;
}
export interface Prod {
  site_espn: string[];
  'editionorigin_espn-en_watch': string[];
  site_espncricinfo: string[];
}
export interface Qa {
  site_espn: string[];
  'editionorigin_espn-en_watch': string[];
  'edition_espn-es-mx': string[];
  site_espncricinfo: string[];
}
export interface FeatureGating {
  allContributorPostTypes: boolean;
  gameSwitcherFootball: boolean;
  gameSwitcherFootball_v4: boolean;
  gameSwitcherBasketball: boolean;
  gameSwitcherBaseball: boolean;
  gameSwitcherHockey: boolean;
  gameSwitcherSoccer: boolean;
  gameSwitcherLacrosse: boolean;
  stickyFooter: boolean;
  articlesUseContentCore: boolean;
  isolatedPostPage: boolean;
  contributorFollowButton: boolean;
  contributorFeedFollowButton: boolean;
  contributorContentReactions: boolean;
  contributorLinkedArticle: boolean;
  contributorLinkedAuthor: boolean;
  enableAutoplayTiles: boolean;
  enableGPLiveOdds: boolean;
  enableGraceHold: boolean;
  enablePillMetadata: boolean;
  enableWebPlayer: boolean;
  w2w: boolean;
  w2wSkeletonUI: boolean;
  refetchWatchSubscriptions: boolean;
  exploreTiles: boolean;
  deferAdobePass: boolean;
  watchButtonV2: boolean;
  bettingOdds: boolean;
  contentReactions: boolean;
  disableUSBettingAds: boolean;
  enableGameblockOddsStrip: boolean;
  enableScoresDrawerOddsStrip: boolean;
  fittVodPlayer: boolean;
  'mens-college-basketball-bracket-fc': boolean;
  'womens-college-basketball-bracket-fc': boolean;
  continueWatching: boolean;
  mobilePlaylist: boolean;
  startFromBeginning: boolean;
  oddsStrip: boolean;
  oneIDV4: boolean;
  playerFollowing: boolean;
  contributorFollowing: boolean;
  siteBroadcast: boolean;
  browerDeprecation: boolean;
  gateFavorites: boolean;
  newSearchVersion: boolean;
  enableFastcast: boolean;
  hudsonPlayer: boolean;
  geoFooter: boolean;
  activeSportsSiteAPI: boolean;
  usPrivacy: boolean;
  hudsonPAL: boolean;
  olyResultsGPWebview: boolean;
  showTaboolaSportIndex: boolean;
  showTaboolaArticle: boolean;
  draftArticleDeeplinks: boolean;
  enableGameBreaksOnWebview: boolean;
  enableLeaderboardWatchRow: boolean;
  enableVisionEvents: boolean;
  drm: boolean;
  useLatestPaywall: boolean;
  enableMagnite: boolean;
  deflateZips: boolean;
  enablePWA: boolean;
  disableBet365: boolean;
  enableMarketplace: boolean;
  enableGamecastSponsoredAd: boolean;
  enableHuluPromo: boolean;
  enableScoreboardPromo: boolean;
  enableCarouselPromo: boolean;
  enableWatchHeaderVideoPromo: boolean;
  disableAmp: boolean;
  enableFlagship: boolean;
  enableVenu: boolean;
  enableNoSpoilerMode: boolean;
  enableHighVolumeRow: boolean;
  fittRoutes: boolean;
  enableCBHLTest: boolean;
  enableMyBetsModuleIndex: boolean;
  enableMyBetsSettingsOverlay: boolean;
  enableSixPackPostState: boolean;
  enableClipsPrerollAbTest: boolean;
  enableBettingToggleSettings: boolean;
  'hsb-polling-college-football': boolean;
  'hsb-polling-mens-college-basketball': boolean;
  'hsb-polling-womens-college-basketball': boolean;
  enableBookworm: boolean;
  enableMoreFutures: boolean;
  enableBettingToggle: boolean;
  'ed-pick-deep-link-espnapp-ios': boolean;
  'ed-pick-deep-link-espnapp-android': boolean;
  'ed-pick-deep-link-fantasy-ios': boolean;
  'ed-pick-deep-link-fantasy-android': boolean;
  'ed-pick-deep-link-tcmen-android': boolean;
  'ed-pick-deep-link-tcmen-ios': boolean;
  enableCatchUpToLive: boolean;
  enableBetOddsTab: boolean;
  draftcastBreakingNews: boolean;
  enableMagicLink: boolean;
}
export interface RequestHeaders {
  host: string;
  'x-real-ip': string;
  'x-forwarded-for': string;
  'x-forwarded-proto': string;
  'x-proxy-timestamp': string;
  'x-forwarded-port': string;
  'x-amzn-trace-id': string;
  'cloudfront-viewer-country': string;
  'user-agent': string;
  via: string;
  'cloudfront-is-desktop-viewer': string;
  'cloudfront-forwarded-proto': string;
  'accept-language': string;
  accept: string;
  'x-amz-cf-id': string;
  'cloudfront-is-smarttv-viewer': string;
  'cloudfront-is-tablet-viewer': string;
  'sec-fetch-mode': string;
  'cloudfront-is-mobile-viewer': string;
  'x-scheme': string;
  traceparent: string;
  'x-original-uri': string;
  'x-original-proto': string;
  'x-environment': string;
  'x-hash': string;
  swid: string;
  'x-region': string;
  'x-connectionspeed': string;
  'x-edition-view': string;
  'x-device': string;
  'x-country': string;
  'x-userab': string;
  'x-edition': string;
  'x-vary': string;
  'x-dtcauth': string;
  'x-uri': string;
  'x-ha-backend': string;
  'x-route': string;
  'x-debug': string;
  'x-varnish-route': string;
  'x-stale-enabled': string;
  'accept-encoding': string;
  'if-modified-since': string;
  'x-varnish': string;
  tracestate: string;
  newrelic: string;
}
export interface Tms {
  enabled: boolean;
  env: string;
  tag: string;
  tagNS: string;
  emitEvent: string;
  loadScript: boolean;
  loadAsync: boolean;
  cmpLoaded: boolean;
  ready: boolean;
}
export interface Flags {
  ads: boolean;
  athLnks: boolean;
  browserSdk: boolean;
  nav: boolean;
  hsb: boolean;
  anltcs: boolean;
  otbrn: boolean;
  qaAPI: boolean;
  sbAPI: boolean;
  liveVideo: boolean;
  localAPI: boolean;
  internalAPI: boolean;
  previewAPI: boolean;
  stagingAPI: boolean;
  gmStrp: boolean;
  gmSwtchr: boolean;
  evtLnks: boolean;
  exLnks: boolean;
  rmLnscr: boolean;
  rtCol: boolean;
  srchOrg: string;
  tier3Nv: boolean;
  tmLnks: boolean;
  footer: boolean;
  video: boolean;
}
export interface Edition {
  config: Config;
  translations: Config;
}
export interface Config {
}
export interface Assets {
  chunks: string[];
  entries: string[];
  css: string[];
}