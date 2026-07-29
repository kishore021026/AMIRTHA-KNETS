import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WaveMesh({ theme }) {
  const meshRef = useRef()
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (!meshRef.current) return

    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.03)
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.03)

    const geometry = meshRef.current.geometry
    const positionAttribute = geometry.attributes.position

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i)
      const y = positionAttribute.getY(i)

      const wave1 = Math.sin(x * 0.3 + time * 0.4) * 0.5
      const wave2 = Math.cos(y * 0.3 + time * 0.5) * 0.5
      const microDetail = Math.sin((x * 0.8) + (y * 0.8) + time * 0.8) * 0.1

      const distanceToMouse = Math.sqrt(
        Math.pow(x - mouse.current.x * 15, 2) +
        Math.pow(y - mouse.current.y * 10, 2)
      )
      
      const mousePull = Math.exp(-distanceToMouse * 0.25) * 1.5

      positionAttribute.setZ(i, wave1 + wave2 + microDetail + mousePull)
    }

    positionAttribute.needsUpdate = true
    
    meshRef.current.rotation.x = -Math.PI / 2.8 + mouse.current.y * 0.08
    meshRef.current.rotation.y = mouse.current.x * 0.08
  })

  return (
    <mesh ref={meshRef} position={[0, -1, -3]}>
      <planeGeometry args={[30, 20, 90, 90]} />
      <meshStandardMaterial 
        color={theme.meshColor} 
        wireframe 
        transparent 
        opacity={0.3} 
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  )
}

export default function FabricCanvas({ theme }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Dynamic theme background and fog */}
        <color attach="background" args={[theme.hexBg]} />
        <fog attach="fog" args={[theme.hexBg, 3, 10]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color={theme.meshColor} />
        
        <WaveMesh theme={theme} />
      </Canvas>
    </div>
  )
}