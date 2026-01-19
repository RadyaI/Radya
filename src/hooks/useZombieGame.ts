import { useState, useEffect, useRef } from 'react';
import { generateZombies, calculateDistance } from '@/utils/isthismap/geoLogic';
import toast from 'react-hot-toast';

const ZOMBIE_COUNT = 15;
const ZOMBIE_SPEED = 0.00003;
const MOVE_COST = 30; 
const MAX_ENERGY = 100;
const ENERGY_REGEN = 5; 
const MAX_HP = 3;
const COLLISION_DIST = 30; 

export const useZombieGame = (gpsLocation: { lat: number; lng: number } | undefined) => {
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  
  const [playerPos, setPlayerPos] = useState<{ lat: number; lng: number } | null>(null);
  const [hp, setHp] = useState(MAX_HP);
  const [energy, setEnergy] = useState(MAX_ENERGY);
  const [score, setScore] = useState(0);
  
  const [zombies, setZombies] = useState<any[]>([]);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const scoreIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    if (!gpsLocation) {
        toast.error("Tunggu sinyal GPS...");
        return;
    }
    setPlayerPos(gpsLocation);
    setZombies(generateZombies(gpsLocation.lat, gpsLocation.lng, ZOMBIE_COUNT));
    setHp(MAX_HP);
    setEnergy(MAX_ENERGY);
    setScore(0);
    setGameState('PLAYING');
    toast("MEREKA DATANG! LARI!", { icon: '🧟' });
  };

  useEffect(() => {
    if (gameState !== 'PLAYING' || !playerPos) return;

    gameLoopRef.current = setInterval(() => {
      setZombies((prevZombies) => {
        let isBit = false;

        const newZombies = prevZombies.map((z) => {
          const dLat = playerPos.lat - z.lat;
          const dLng = playerPos.lng - z.lng;
          
          const magnitude = Math.sqrt(dLat*dLat + dLng*dLng);
          const moveLat = (dLat / magnitude) * ZOMBIE_SPEED;
          const moveLng = (dLng / magnitude) * ZOMBIE_SPEED;

          const newLat = z.lat + moveLat;
          const newLng = z.lng + moveLng;

          const distMeters = calculateDistance(playerPos.lat, playerPos.lng, newLat, newLng);
          
          if (distMeters < COLLISION_DIST) {
            isBit = true;
          }

          return { ...z, lat: newLat, lng: newLng };
        });

        if (isBit) {
           handleDamage();
        }

        return newZombies;
      });
      
      setEnergy((prev) => Math.min(prev + 1, MAX_ENERGY));

    }, 200);

    scoreIntervalRef.current = setInterval(() => {
        setScore(s => s + 1);
    }, 1000);

    return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
    };
  }, [gameState, playerPos]); 

  const handleDamage = () => {
    setHp((prev) => {
        const newHp = prev - 1;
        if (newHp <= 0) {
            setGameState('GAMEOVER');
            toast.error("KAMU JADI ZOMBIE!", { icon: '💀' });
        } else {
             toast("DIGIGIT! NYAWA BERKURANG!", { icon: '🩸', duration: 1000 });
        }
        return newHp;
    });
  };

  const handlePlayerMove = (lat: number, lng: number) => {
    if (gameState !== 'PLAYING') return;

    if (energy < MOVE_COST) {
        toast.error("CAPEK! ISTIRAHAT DULU (Tunggu Energy)", { icon: '😫' });
        return;
    }

    const dist = calculateDistance(playerPos!.lat, playerPos!.lng, lat, lng);
    if (dist > 300) {
        toast.error("TERLALU JAUH!", { icon: '🚫' });
        return;
    }

    setPlayerPos({ lat, lng });
    setEnergy((prev) => prev - MOVE_COST);
  };

  return {
    gameState,
    playerPos,
    zombies,
    hp,
    energy,
    score,
    startGame,
    handlePlayerMove
  };
};