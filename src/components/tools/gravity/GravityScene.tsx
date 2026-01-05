'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { GRAVITY_ICONS, PHYSICS_CONFIG } from '@/lib/gravity-data';
import { RefreshCcw, Move, MousePointer2 } from 'lucide-react';

export default function GravityScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const itemsRef = useRef<Map<string, HTMLDivElement>>(new Map()); 
  
  const [isZeroGravity, setIsZeroGravity] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [isReady, setIsReady] = useState(false); 

  useEffect(() => {
    const initialItems = Array.from({ length: 20 }).map((_, i) => ({
      id: `icon-${i}`,
      ...GRAVITY_ICONS[Math.floor(Math.random() * GRAVITY_ICONS.length)],
      x: Math.random() * 300,
      y: -Math.random() * 500
    }));
    setItems(initialItems);
    
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady || !sceneRef.current || items.length === 0) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Events = Matter.Events;

    const engine = Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const wallOptions = { 
        isStatic: true, 
        render: { visible: false },
        friction: 0.5 
    };
    const walls = [
      Bodies.rectangle(width / 2, height + 30, width, PHYSICS_CONFIG.WALL_THICKNESS, wallOptions), // Lantai
      Bodies.rectangle(width / 2, -300, width, PHYSICS_CONFIG.WALL_THICKNESS, wallOptions), // Atap (tinggi biar bisa spawn dari atas)
      Bodies.rectangle(width + 30, height / 2, PHYSICS_CONFIG.WALL_THICKNESS, height * 2, wallOptions), // Kanan
      Bodies.rectangle(-30, height / 2, PHYSICS_CONFIG.WALL_THICKNESS, height * 2, wallOptions), // Kiri
    ];
    Composite.add(world, walls);

    const iconBodies = items.map(item => {
        const randomX = Math.random() * (width - 100) + 50;
        const randomY = -Math.random() * 500 - 50; 

        return Bodies.rectangle(randomX, randomY, PHYSICS_CONFIG.ICON_SIZE, PHYSICS_CONFIG.ICON_SIZE, {
            label: item.id, 
            restitution: PHYSICS_CONFIG.RESTITUTION,
            friction: PHYSICS_CONFIG.FRICTION,
            chamfer: { radius: 12 },
            render: { visible: false }
        });
    });
    Composite.add(world, iconBodies);

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false
      }
    });

    const mouse = Mouse.create(render.canvas);
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(world, mouseConstraint);

    Events.on(engine, 'afterUpdate', () => {
        const allBodies = Composite.allBodies(engine.world);
        
        allBodies.forEach(body => {
            if (body.label && body.label.startsWith('icon-')) {
                const domNode = itemsRef.current.get(body.label);
                if (domNode) {
                    const { x, y } = body.position;
                    const angle = body.angle;
                    domNode.style.transform = `translate3d(${x - PHYSICS_CONFIG.ICON_SIZE/2}px, ${y - PHYSICS_CONFIG.ICON_SIZE/2}px, 0) rotate(${angle}rad)`;
                    domNode.style.opacity = '1'; 
                }
            }
        });
    });

    Runner.run(Runner.create(), engine);
    Render.run(render);

    return () => {
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, [isReady, items]);

  const toggleGravity = () => {
      if(!engineRef.current) return;
      setIsZeroGravity(!isZeroGravity);
      engineRef.current.gravity.y = isZeroGravity ? 1 : 0;
      
      if (!isZeroGravity) {
          Matter.Composite.allBodies(engineRef.current.world).forEach(body => {
              if(body.label?.startsWith('icon-')) {
                  Matter.Body.setVelocity(body, { 
                      x: (Math.random() - 0.5) * 15, 
                      y: (Math.random() - 0.5) * 15 
                  });
              }
          });
      }
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="relative w-full h-[80vh] bg-neutral-50 dark:bg-neutral-900 overflow-hidden border-b border-neutral-200 dark:border-neutral-800 touch-none">
      
      <div ref={sceneRef} className="absolute inset-0 cursor-grab active:cursor-grabbing z-10" />

      <div className="absolute inset-0 pointer-events-none z-20">
        {items.map((item) => {
            const IconComp = item.icon;
            return (
                <div
                    key={item.id}
                    ref={(el) => {
                        if (el) itemsRef.current.set(item.id, el);
                    }}
                    className={`absolute flex items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm border-2 ${item.bg} ${item.border} opacity-0 transition-opacity duration-300`}
                    style={{
                        width: PHYSICS_CONFIG.ICON_SIZE,
                        height: PHYSICS_CONFIG.ICON_SIZE,
                        willChange: 'transform',
                        top: 0, left: 0
                    }}
                >
                    <IconComp size={32} className={item.color} />
                </div>
            );
        })}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-30 select-none">
        <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-xl hover:scale-105 transition-all active:scale-95 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium"
        >
            <RefreshCcw size={18} />
            Reset
        </button>
        
        <button 
            onClick={toggleGravity}
            className={`flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full shadow-xl hover:scale-105 transition-all active:scale-95 border font-medium ${
                isZeroGravity 
                ? 'bg-indigo-500 text-white border-indigo-400' 
                : 'bg-white/80 dark:bg-black/80 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700'
            }`}
        >
            <Move size={18} />
            {isZeroGravity ? 'Gravity: OFF' : 'Gravity: ON'}
        </button>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-0 opacity-40 pointer-events-none select-none">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold tracking-widest uppercase text-neutral-500">
             <MousePointer2 size={14} /> Drag & Throw
          </p>
      </div>

    </div>
  );
}