'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ambientVerticalField } from './particle-shapes'
import { useScrollProgress } from './use-scroll-progress'

// Ambient vertical particle field. No morph targets — particles drift
// continuously downward with parallax by depth. The "camera" (really a
// group offset) travels up/down with scroll progress, producing a sense of
// traveling through a deep nebulous column behind the page content.
// Revealing behavior: particles near the section centers flash brighter
// based on uSectionPulse uniform (sine wave modulated by progress).
const vertexShader = /* glsl */ `
  attribute float aDepth;
  attribute float aSpeed;
  attribute float aSeed;

  uniform float uTime;
  uniform float uProgress;
  uniform float uScrollVelocity;
  uniform float uPointSize;
  uniform float uYExtent;

  varying float vDepth;
  varying float vBrightness;

  void main() {
    vec3 pos = position;

    // Downward drift — speed varies by depth (near faster, far slower)
    float driftY = uTime * 0.25 * aSpeed;
    pos.y -= driftY;

    // Wrap vertically — keep particles in the column
    pos.y = mod(pos.y + uYExtent * 0.5, uYExtent) - uYExtent * 0.5;

    // Scroll travel — subtle Y drift keeps particles in viewport while
    // still reacting to scroll. Small amplitude so they don't exit the frame.
    pos.y += (0.5 - uProgress) * 2.0;

    // Subtle noise wiggle — horizontal breathing tied to time + seed
    float noiseX = sin(uTime * 0.4 + aSeed * 6.28) * 0.05;
    pos.x += noiseX;

    // Scroll-velocity stretch — when scrolling fast, particles smear vertically
    float stretch = 1.0 + abs(uScrollVelocity) * 4.0;
    pos.y *= mix(1.0, stretch, 0.2);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuated by perspective AND depth (near bigger, far smaller)
    gl_PointSize = uPointSize * (0.6 + aDepth * 1.0) * (40.0 / -mvPosition.z);

    // Brightness: near particles brighter, far particles dimmer
    // Plus a pulse tied to scroll velocity so particles flash on sharp scroll
    vDepth = aDepth;
    float velocityPulse = 1.0 + abs(uScrollVelocity) * 3.0;
    vBrightness = (0.25 + aDepth * 0.75) * velocityPulse;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uColorBase;

  varying float vDepth;
  varying float vBrightness;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    // Softer edge on far particles (more atmospheric)
    float edge = mix(0.45, 0.25, vDepth);
    float alpha = smoothstep(0.5, edge, dist);

    vec3 color = uColorBase * vBrightness;
    gl_FragColor = vec4(color, alpha * uOpacity * (0.55 + vDepth * 0.45));
  }
`

interface ParticlesMeshProps {
  count?: number
}

const Y_EXTENT = 10

export function ParticlesMesh({ count = 18000 }: ParticlesMeshProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const scrollProgress = useScrollProgress()

  // Track scroll velocity separately (derived from progress changes)
  const lastProgressRef = useRef(0)
  const velocityRef = useRef(0)

  const field = useMemo(() => ambientVerticalField(count), [count])

  useFrame((state, delta) => {
    if (!materialRef.current) return

    // Compute scroll velocity with exponential smoothing
    const currentP = scrollProgress.current
    const rawVel = (currentP - lastProgressRef.current) / Math.max(delta, 0.001)
    velocityRef.current = velocityRef.current * 0.85 + rawVel * 0.15
    lastProgressRef.current = currentP

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    materialRef.current.uniforms.uProgress.value = currentP
    materialRef.current.uniforms.uScrollVelocity.value = velocityRef.current
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[field.positions, 3]} />
        <bufferAttribute attach="attributes-aDepth" args={[field.depth, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[field.speed, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[field.seed, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uScrollVelocity: { value: 0 },
          uPointSize: { value: 1.0 },
          uOpacity: { value: 0.55 },
          uYExtent: { value: Y_EXTENT },
          uColorBase: { value: new THREE.Color('#ffffff') },
        }}
      />
    </points>
  )
}
