'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  sphereShape,
  clustersShape,
  waveShape,
  ringShape,
} from './particle-shapes'
import { useScrollProgress } from './use-scroll-progress'

// Custom shader — interpolates between 4 shapes based on uProgress (0..1).
// 3 morph segments: 0→0.33 (sphere→clusters), 0.33→0.66 (clusters→wave),
// 0.66→1 (wave→ring). smoothstep eases each transition.
const vertexShader = /* glsl */ `
  attribute vec3 aTarget1;
  attribute vec3 aTarget2;
  attribute vec3 aTarget3;
  uniform float uProgress;
  uniform float uTime;
  uniform float uPointSize;

  void main() {
    vec3 shape0 = position;
    vec3 shape1 = aTarget1;
    vec3 shape2 = aTarget2;
    vec3 shape3 = aTarget3;

    // Rebalanced segments — wave lands on Stats (dark bg), ring compresses
    // into the final 15% where screen blend over CTA's white bg softens naturally.
    float t01 = smoothstep(0.05, 0.25, uProgress);
    float t12 = smoothstep(0.28, 0.55, uProgress);
    float t23 = smoothstep(0.70, 0.90, uProgress);

    vec3 morph01 = mix(shape0, shape1, t01);
    vec3 morph12 = mix(morph01, shape2, t12);
    vec3 finalPos = mix(morph12, shape3, t23);

    // Gentle breathing — subtle time-based noise offset per particle
    float noise = sin(uTime * 0.6 + finalPos.x * 1.8 + finalPos.y * 1.2) * 0.025;
    finalPos += normalize(finalPos + vec3(0.001)) * noise;

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    // Perspective-attenuated point size — kept small so particles read as dots,
    // not blobs. 30.0 / -z yields ~5px at z=-6 with uPointSize=1.0.
    gl_PointSize = uPointSize * (30.0 / -mvPosition.z);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uOpacity;

  void main() {
    // Round soft point
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.2, dist);
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * uOpacity);
  }
`

interface ParticlesMeshProps {
  count?: number
}

export function ParticlesMesh({ count = 12000 }: ParticlesMeshProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const scrollProgress = useScrollProgress()

  // Pre-generate all 4 shape buffers once
  const shapes = useMemo(
    () => ({
      shape0: sphereShape(count, 3),
      shape1: clustersShape(count),
      shape2: waveShape(count),
      shape3: ringShape(count),
    }),
    [count],
  )

  useFrame((state) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uProgress.value = scrollProgress.current
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025
    }
  })

  return (
    <points ref={pointsRef} scale={0.5} position={[-1.8, 0.3, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[shapes.shape0, 3]} />
        <bufferAttribute attach="attributes-aTarget1" args={[shapes.shape1, 3]} />
        <bufferAttribute attach="attributes-aTarget2" args={[shapes.shape2, 3]} />
        <bufferAttribute attach="attributes-aTarget3" args={[shapes.shape3, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uPointSize: { value: 1.2 },
          uOpacity: { value: 0.55 },
        }}
      />
    </points>
  )
}
