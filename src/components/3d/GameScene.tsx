'use client'

import { Canvas } from '@react-three/fiber'
import { KeyboardControls, PointerLockControls, Environment } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { useState } from 'react'
import { Player } from './Player'
import { Level } from './Level'
import { Overlay } from './Overlay'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
  { name: 'jump', keys: ['Space'] },
]

export default function GameScene() {
  const [isLocked, setIsLocked] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ fov: 60, position: [0, 5, 10] }}>

          <ambientLight intensity={0.5} />
          <pointLight position={[20, 30, 10]} intensity={1.5} castShadow />

          <Environment preset="city" background />

          <Physics gravity={[0, -30, 0]}>
            <Player setIsLocked={setIsLocked} />
            <Level />
          </Physics>

          <PointerLockControls />
        </Canvas>

        <Overlay isLocked={isLocked} />
      </KeyboardControls>
    </div>
  )
}