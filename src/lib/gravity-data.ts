import { 
  Code2, Database, Layout, Smartphone, Server, 
  Globe, Cpu, Zap, Feather, Terminal, Layers, 
  Wifi, Box, Shield, Anchor, Coffee 
} from 'lucide-react';

export const GRAVITY_ICONS = [
  { icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { icon: Database, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { icon: Layout, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { icon: Smartphone, color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  { icon: Server, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { icon: Layers, color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  { icon: Coffee, color: "text-amber-700", bg: "bg-amber-700/10", border: "border-amber-700/20" },

];

export const PHYSICS_CONFIG = {
  ICON_SIZE: 64, 
  WALL_THICKNESS: 60,
  RESTITUTION: 0.8,
  FRICTION: 0.1,
  DENSITY: 0.001,
};