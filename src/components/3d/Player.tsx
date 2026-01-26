import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useRapier, RigidBody } from '@react-three/rapier'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function Player({ setIsLocked }: { setIsLocked: (val: boolean) => void }) {
  const body = useRef<any>(null)
  const [subscribeKeys, getKeys] = useKeyboardControls()
  const { world, rapier } = useRapier()
  
  const cameraState = useRef({ yaw: 0, pitch: 0.5 })
  const smoothedCameraPos = useRef(new THREE.Vector3(0, 10, 10))
  const smoothedTargetPos = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump, 
      (value) => {
        if (value && body.current) {
            const bodyPos = body.current.translation()
            const rayOrigin = bodyPos
            const rayDir = { x: 0, y: -1, z: 0 }
            const ray = new rapier.Ray(rayOrigin, rayDir)
            
            const hit = world.castRay(ray, 0.6, true)
            
            if (hit) {
                const jumpStrength = 9
                const linvel = body.current.linvel()
                body.current.setLinvel({ x: linvel.x, y: jumpStrength, z: linvel.z }, true)
            }
        }
      }
    )

    return () => {
        unsubscribeJump()
    }
  }, [subscribeKeys, world, rapier]) 

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement) {
        const sensitivity = 0.002
        cameraState.current.yaw -= e.movementX * sensitivity
        cameraState.current.pitch += e.movementY * sensitivity
        cameraState.current.pitch = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, cameraState.current.pitch))
      }
    }
    const onLockChange = () => setIsLocked(!!document.pointerLockElement)
    
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('pointerlockchange', onLockChange)
    
    return () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('pointerlockchange', onLockChange)
    }
  }, [setIsLocked])

  useFrame((state, delta) => {
    if (!body.current) return

    const { forward, backward, left, right } = getKeys()
    const impulseStrength = 30 * delta

    const camYaw = cameraState.current.yaw
    const forwardX = -Math.sin(camYaw)
    const forwardZ = -Math.cos(camYaw)
    const rightX = -Math.cos(camYaw)
    const rightZ = Math.sin(camYaw)

    let impulseX = 0
    let impulseZ = 0

    if (forward) {
        impulseX += forwardX * impulseStrength
        impulseZ += forwardZ * impulseStrength
    }
    if (backward) {
        impulseX -= forwardX * impulseStrength
        impulseZ -= forwardZ * impulseStrength
    }
    if (right) { 
        impulseX -= rightX * impulseStrength 
        impulseZ -= rightZ * impulseStrength
    }
    if (left) { 
        impulseX += rightX * impulseStrength
        impulseZ += rightZ * impulseStrength
    }

    body.current.applyImpulse({ x: impulseX, y: 0, z: impulseZ }, true)


    const bodyPos = body.current.translation()
    const cameraDist = 8 
    const targetCamX = bodyPos.x + cameraDist * Math.sin(cameraState.current.yaw) * Math.cos(cameraState.current.pitch)
    const targetCamY = bodyPos.y + cameraDist * Math.sin(cameraState.current.pitch)
    const targetCamZ = bodyPos.z + cameraDist * Math.cos(cameraState.current.yaw) * Math.cos(cameraState.current.pitch)

    const lerpFactor = 0.25 
    smoothedCameraPos.current.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), lerpFactor)
    smoothedTargetPos.current.lerp(new THREE.Vector3(bodyPos.x, bodyPos.y, bodyPos.z), lerpFactor)

    state.camera.position.copy(smoothedCameraPos.current)
    state.camera.lookAt(smoothedTargetPos.current)
  })

  return (
    <RigidBody 
      ref={body} 
      colliders="ball" 
      restitution={0.2}
      friction={1.5} 
      linearDamping={0.6}
      angularDamping={0.5}
      gravityScale={2.5}
      position={[0, 5, 0]}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ff0055" roughness={0.4} />
      </mesh>
    </RigidBody>
  )
}