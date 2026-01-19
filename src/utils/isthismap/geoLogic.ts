import { getDistance } from 'geolib';
import { LAND_LOCATIONS, OCEAN_LOCATIONS } from './location';

export const getSmartRandomCoordinates = () => {
  const dice = Math.random();

  if (dice < 0.70) {
    // 70% LAND
    const target = LAND_LOCATIONS[Math.floor(Math.random() * LAND_LOCATIONS.length)];
    return { ...target, type: 'predefined_land' };
  }
  else if (dice < 0.90) {
    // 20% OCEAN
    const target = OCEAN_LOCATIONS[Math.floor(Math.random() * OCEAN_LOCATIONS.length)];
    return { ...target, type: 'predefined_ocean' };
  }
  else {
    // 10%
    const lat = (Math.random() * 160) - 80;
    const lng = (Math.random() * 360) - 180;
    return { lat, lng, name: "Unknown Coordinates", type: 'random' };
  }
};

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

export const calculateDistance = (fromLat: number, fromLng: number, toLat: number, toLng: number) => {
  return getDistance(
    { latitude: fromLat, longitude: fromLng },
    { latitude: toLat, longitude: toLng }
  );
};