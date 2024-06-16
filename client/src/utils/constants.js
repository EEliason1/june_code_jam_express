const cityList = [
  {
    city: "Atlanta",
    state: "GA",
    image:
      "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXRsYW50YXxlbnwwfHwwfHx8MA%3D%3D",
    funThings: {
      1: "Georgia Aquarium",
      2: "World of Coca-Cola",
      3: "Atlanta Zoo",
      4: "Fernbank Football Hall of Fame",
      5: "College Football Hall of Fame",
      6: "National Center for Civil and Human Rights",
    },
    cityLink: "https://www.citypass.com/atlanta",
    _id: 1,
  },
  {
    city: "Chicago",
    state: "IL",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2Fnb3xlbnwwfHwwfHx8MA%3D%3D",
    funThings: {
      1: "Skydeck Chicago",
      2: "Field Museum",
      3: "360 CHICAGO Observation Deck",
      4: "Adler Planetarium",
      5: "Art Institute of Chicago",
      6: "Centennial Ferris Wheel at Navy Pier",
    },
    cityLink: "https://www.citypass.com/chicago-comparison",
    _id: 2,
  },
  {
    city: "Dallas",
    state: "TX",
    image:
      "https://images.unsplash.com/photo-1563219125-60d10ffe8877?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFsbGFzfGVufDB8fDB8fHww",
    funThings: {
      1: "Perot Museum of Nature and Science",
      2: "Reunion Tower GeO-Deck",
      3: "Dallas Zoo",
      4: "George W. Bush Presidential Museum",
      5: "Dallas Holocaust and Human Rights Museum",
      6: "Sample local BBQ",
    },
    cityLink: "https://www.citypass.com/dallas",
    _id: 3,
  },
  {
    city: "Denver",
    state: "CO",
    image:
      "https://images.unsplash.com/photo-1620248742445-ce3a0de4b2b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVudmVyfGVufDB8fDB8fHww",
    funThings: {
      1: "Denver Downtown Aquarium",
      2: "Denver Museum of Nature & Science",
      3: "Denver Botanic Gardens",
      4: "Children's Museum of Denver at Marsico Campus",
      5: "Wings Over the Rockies™ Air & Space Museum",
      6: "Denver Art Museum",
    },
    cityLink: "https://www.citypass.com/denver",
    _id: 4,
  },
  {
    city: "Las Angeles",
    state: "CA",
    image:
      "https://images.unsplash.com/photo-1594220673602-74bf25a60870?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFzJTIwYW5nZWxlc3xlbnwwfHwwfHx8MA%3D%3D",
    funThings: {
      1: "Disneyland® Resort",
      2: "Universal Studios Hollywood™",
      3: "SeaWorld®",
      4: "LEGOLAND® California Resort",
      5: "Santa Monica Pier",
      6: "Griffith Park",
    },
    cityLink: "https://www.citypass.com/southern-california",
    _id: 5,
  },
  {
    city: "New York City",
    state: "NY",
    image:
      "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D",
    funThings: {
      1: "Top of the Rock Observation Deck",
      2: "Circle Line Sightseeing Cruisesa",
      3: "The Museum of Modern Art (MoMA)",
      4: "Edge at Hudson Yards",
      5: "Intrepid Museum",
      6: "9/11 Memorial & Museum",
    },
    cityLink: "https://www.citypass.com/new-york-comparison",
    _id: 6,
  },
  {
    city: "Seattle",
    state: "WA",
    image:
      "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhdHRsZXxlbnwwfHwwfHx8MA%3D%3D",
    funThings: {
      1: "Space Needle",
      2: "Chihuly Garden and Glass",
      3: "Argosy Cruises Harbor Tour",
      4: "Museum of Pop Culture (MoPOP)",
      5: "Pacific Science Center",
      6: "Sky View Observatory",
    },
    cityLink: "https://www.citypass.com/seattle-comparison",
    _id: 7,
  },
  {
    city: "Tampa",
    state: "FL",
    image:
      "https://images.unsplash.com/photo-1613318632229-425f908f0345?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGFtcGF8ZW58MHx8MHx8fDA%3D",
    funThings: {
      1: "The Tropics Boat Tours (Dolphin Tour OR Sunset Cruise)",
      2: "Clearwater Marine Aquarium",
      3: "Museum of Science & Industry",
      4: "Glazer Children's Museum",
      5: "Visit the beach",
      6: "Watch a sporting event",
    },
    cityLink: "https://www.citypass.com/tampa",
    _id: 8,
  },
];

import danImage from "../assets/linkedin_profile/Dan_Pocock.jpg";
import mikeImage from "../assets/linkedin_profile/Mike_Velasco.jpg";
import evanImage from "../assets/linkedin_profile/Evan_Eliason.jpg";
import yiImage from "../assets/linkedin_profile/Yi_Hui_Lin.jpg";

const linkedInInfo = [
  {
    name: "Dan Pocock",
    image: danImage,
    link: "https://www.linkedin.com/in/danpocock/",
  },
  {
    name: "Mike Velasco",
    image: mikeImage,
    link: "https://www.linkedin.com/in/mike-velasco-148b5a50/",
  },
  {
    name: "Evan Eliason",
    image: evanImage,
    link: "https://www.linkedin.com/in/evan-eliason/",
  },
  {
    name: "Yi Hui Lin",
    image: yiImage,
    link: "https://www.linkedin.com/in/yihuilinrosa",
  },
];

export { cityList, linkedInInfo };
