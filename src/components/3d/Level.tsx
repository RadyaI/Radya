import { RigidBody } from '@react-three/rapier'
import { Text } from '@react-three/drei'

export function Level() {
  return (
    <>
       
      <RigidBody type="fixed" friction={1} name="floor">
         
        <mesh receiveShadow position={[0, -2, 0]}>
          <boxGeometry args={[100, 4, 100]} />
          <meshStandardMaterial color="#6ad476" />
        </mesh>
        
         
        <mesh position={[0, 1, -50]}>
             <boxGeometry args={[100, 2, 1]} />
             <meshStandardMaterial color="#44a34e" />
        </mesh>
        <mesh position={[0, 1, 50]}>
             <boxGeometry args={[100, 2, 1]} />
             <meshStandardMaterial color="#44a34e" />
        </mesh>
      </RigidBody>

       
      {[...Array(6)].map((_, i) => (
        <RigidBody key={i} type="fixed" position={[15, i * 0.8, i * 2 - 5]}>
          <mesh receiveShadow>
            <boxGeometry args={[5, 0.5, 2]} />
            <meshStandardMaterial color={`hsl(${i * 60}, 100%, 50%)`} />
          </mesh>
        </RigidBody>
      ))}

       
       
      {[...Array(10)].map((_, i) => (
         <RigidBody key={`box-${i}`} position={[-5, 5 + i, -5]} colliders="cuboid" restitution={0.5}>
            <mesh castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh>
         </RigidBody>
      ))}

       
      <RigidBody type="fixed" position={[-10, -1, 10]} rotation={[0.5, 0, 0]}>
         <mesh receiveShadow>
            <boxGeometry args={[5, 1, 20]} />
            <meshStandardMaterial color="#ff0055" />
         </mesh>
      </RigidBody>

       
      <RigidBody type="fixed" position={[0, 2, 15]}>
         <mesh castShadow receiveShadow>
            <cylinderGeometry args={[2, 2, 6]} />
            <meshStandardMaterial color="cyan" />
         </mesh>
      </RigidBody>

       
      <Text 
        position={[0, 5, -10]} 
        color="white" 
        fontSize={3}
        anchorX="center"
        anchorY="middle"
      >
        PLAYGROUND
      </Text>
    </>
  )
}