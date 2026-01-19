import { getDistance } from 'geolib';

export const HARDCODED_LOCATIONS = [
  { name: "Point Nemo", lat: -48.8767, lng: -123.3933, icon: "🌊", desc: "The closest humans to you are astronauts." },
  { name: "Mount Everest", lat: 27.9881, lng: 86.9250, icon: "🏔️", desc: "The highest land on Earth." },
  { name: "Null Island", lat: 0, lng: 0, icon: "📍", desc: "(0°N 0°E)." },
  { name: "North Pole", lat: 90, lng: 0, icon: "🎅", desc: "The sun doesn’t change as the planet rotates." },
  { name: "South Pole", lat: -90, lng: 0, icon: "🐧", desc: "The driest, coldest, and windiest continent." },
  { name: "Area 51", lat: 37.2431, lng: -115.7930, icon: "👽", desc: "Bbzzbzbzz." },
  { name: "Bermuda Triangle", lat: 25.0000, lng: -71.0000, icon: "⚠️", desc: "One of the busiest shipping routes in the world." },
  { name: "Mariana Trench", lat: 11.3493, lng: 142.4329, icon: "🦑", desc: "The deepest part of the ocean." },
  { name: "Chernobyl", lat: 51.3890, lng: 30.0997, icon: "☢️", desc: "A radioactive city." },
  { name: "Snake Island (Ilha da Queimada)", lat: -24.4869, lng: -46.6756, icon: "🐍", desc: "A small island with 2,000–4,000 snakes." },
  { name: "Hollywood Sign", lat: 34.1341, lng: -118.3215, icon: "🎬", desc: "Hollyweeeeee." },
  { name: "Mecca (Kaaba)", lat: 21.4225, lng: 39.8262, icon: "🕋", desc: "The area around the Kaaba has a strong magnetic pull, so no birds or planes are allowed to fly over it." },
];


export const calculateDistance = (fromLat: number, fromLng: number, toLat: number, toLng: number) => {
  return getDistance(
    { latitude: fromLat, longitude: fromLng },
    { latitude: toLat, longitude: toLng }
  );
};

export const getRandomCoordinates = () => {
  const lat = (Math.random() * 160) - 80;
  const lng = (Math.random() * 360) - 180;
  return { lat, lng };
};

export const OCEAN_QUOTES = [
  "Glub glub... You are under water.",
  "No Wi-Fi here, only whales.",
  "Captain? I think we are lost.",
  "Detecting massive sea monster signature.",
  "Perfect place to hide a treasure.",
  "SpongeBob is your neighbor now."
];

export const LAND_QUOTES = [
  "Civilization detected!",
  "You might find a human here.",
  "Safe ground. Probably.",
  "Good spot for a vacation?",
  "Touch some grass.",
];

export const ZOMBIE_TYPES = [
    { name: "Fast Runner", icon: "🧟‍♂️", speed: "High" },
    { name: "Karen Zombie", icon: "👱‍♀️", speed: "Loud" },
    { name: "Boomer", icon: "🤢", speed: "Slow" },
    { name: "Tax Collector", icon: "💼", speed: "Unstoppable" },
    { name: "The Lurker", icon: "🥷", speed: "Invisible" },
];


export const generateZombies = (centerLat: number, centerLng: number, count: number = 5) => {
    const zombies = [];
    for (let i = 0; i < count; i++) {
        const latOffset = (Math.random() - 0.5) * 0.015;
        const lngOffset = (Math.random() - 0.5) * 0.015;
        
        const type = ZOMBIE_TYPES[Math.floor(Math.random() * ZOMBIE_TYPES.length)];
        
        zombies.push({
            id: i,
            lat: centerLat + latOffset,
            lng: centerLng + lngOffset,
            ...type
        });
    }
    return zombies;
};