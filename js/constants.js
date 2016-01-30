// train data setup
var trains = {
  J: {img: "img/155px-J_Church_logo.svg.png", selected: false},
  K: {img: "img/100px-K_Ingleside_logo.svg.png", selected: false},
  L: {img: "img/100px-L_Taraval_logo.svg.png", selected: false},
  M: {img: "img/100px-M_Ocean_View_logo.svg.png", selected: false},
  N: {img: "img/100px-N_Judah_logo.svg.png", selected: false}
};

var muniToken = "16893372-8b5c-4bb9-be7c-b2b1d11de84c";

// to get list
// http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?token=16893372-8b5c-4bb9-be7c-b2b1d11de84c&routeIDF=SF-MUNI~L~INBOUND

var stations = {
  outbound : {
    Embarcadero: {id: "Embarcadero Station Outbound", name: "Embarcadero", stopCode: "17217", welcomeVids: ["embarcadero.mp4", "embarcadero-2.mp4"], img: "embarcadero.png", mp3: "embarcadero.mp3"},
    Montgomery: {id: "Montgomery Station Outbound", name: "Montgomery", stopCode: "16994", welcomeVids: ["montgomery.mp4"], img: "montgomery.png", mp3: "montgomery.mp3"},
    Powell: {id: "Powell Station Outbound", name: "Powell", stopCode: "16995", welcomeVids: ["powell.mp4"], img: "powell.png", mp3: "powell.mp3"},
    CivicCenter: {id: "Civic Center Station Outbound", name: "Civic Center", stopCode: "16997", welcomeVids: ["civiccenter.mp4"], img: "civiccenter.png", mp3: "civiccenter.mp3"},
    VanNess: {id: "Van Ness Station OB", name: "Van Ness", stopCode: "16996", welcomeVids: ["vanness.mp4"], img: "vanness.png", mp3: "vanness.mp3"}
  },
  inbound: {
    Embarcadero: {id: "Embarcadero Station Inbound", name: "Embarcadero", stopCode: "16992", welcomeVids: ["nope-4.mp4"], img: "embarcadero.png", mp3: "embarcadero.mp3"},
    Montgomery: {id: "Montgomery Station Inbound", name: "Montgomery", stopCode: "15731", welcomeVids: ["nope-4.mp4"], img: "montgomery.png", mp3: "montgomery.mp3"},
    Powell: {id: "Powell Station Inbound", name: "Powell", stopCode: "15417", welcomeVids: ["nope-4.mp4"], img: "powell.png", mp3: "powell.mp3"},
    CivicCenter: {id: "Civic Center Station Inbound", name: "Civic Center", stopCode: "15727", welcomeVids: ["nope-4.mp4"], img: "civiccenter.png", mp3: "civiccenter.mp3"},
    VanNess: {id: "Van Ness Station Inbound", name: "Van Ness", stopCode: "15419", welcomeVids: ["nope-4.mp4"], img: "vanness.png", mp3: "vanness.mp3"}
  }
}

var levels = [
  {name: "Tiny Human", points: 0, img: "commuter.jpg", class: "green-level"},
  {name: "Doctor of Flavor", points: 15, img: "flavor.jpg", class: "red-level"},
  {name: "Butter time", points: 35, img: "playa.jpg", class: "blue-level"},
  {name: "Chester", points: 75, img: "chester.jpg", class: "green-level"},
  {name: "Beloved Donut", points: 125, img: "cattime.jpg", class: "red-level"},
  {name: "Challenging Beard", points: 350, img: "conductor.jpg", class: "blue-level"},
  {name: "Impossible Beard", points: 10000, img: "unicorn.jpg", class: "red-level"}
]

var coinSound = "mp3/smw_coin_cut.mp3";
var levelUpSound = "mp3/smb_1-up.mp3";
var startingBackgroundMenuImg = "img/4483503986_b5bd7b2de9_z.jpg"

var downtownMap = "downtown.png";
var mapImgTimeout = 200;
var mapImgDir = "img/map/";
var stationAudioDir = "mp3/station-names/";

var whispersDir = "mp3/whispers/";
var whisperWait = 10000;

var menuBackgroundTimeout = 1000 * 4;

var nopeVideos = ["nope-1.mp4", "nope-2.mp4", "nope-3.mp4", "nope-4.mp4", "nope-6.mp4", "nope-5.mp4", "nope-7.mp4", "nope-8.mp4"];
var yesVideos = ["yes-2.mp4", "yes-3.mp4", "yes-4.mp4", "yes-1.mp4" ];

var correctVideos = ["5ymIJPv.webm", "JwzTj4n.webm", "LkqN9bu.webm"];

var flickr_rest_endpoint = "https://api.flickr.com/services/rest/";
var flickr_api_key = "196b8e20be976ae8864fde2111d355b0";

var x2js = new X2JS();

// shuffle the yes/nope videos
shuffleList(nopeVideos);
shuffleList(yesVideos);
