'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sphereShape } from './particle-shapes'

interface ParticlesMeshProps {
  count?: number
}

// Fase 1: single shape (sphere) + slow continuous rotation.
// Fase 2+ will add morph targets + scroll-driven uProgress.
export function ParticlesMesh({ count = 20000 }: ParticlesMeshProps) {
  const pointsRef = useRef<THREE.Points>(null)

  // Pre-generate positions once
  const positions = useMemo(() => sphereShape(count, 3), [count])

  // Slow idle rotation so the sphere feels alive even without scroll input
  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.05
    pointsRef.current.rotation.x += delta * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
