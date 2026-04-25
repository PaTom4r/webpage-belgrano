'use client'

import { useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createOrchestratorField } from './particle-shapes'
import type { ParticleTimelineState } from './particle-timeline'

const vertexShader = /* glsl */ `
  attribute vec3 aBase;
  attribute vec3 aIntel;
  attribute vec3 aMedia;
  attribute vec3 aBrand;
  attribute vec3 aStats;
  attribute vec3 aCta;
  attribute float aDepth;
  attribute float aSeed;
  attribute float aRole;

  uniform float uTime;
  uniform float uPageProgress;
  uniform float uBeatProgress;
  uniform float uScrollVelocity;
  uniform float uPointSize;
  uniform float uScatter;
  uniform float uTurbulence;
  uniform float uFormation;

  varying float vDepth;
  varying float vBrightness;
  varying float vRole;

  float formationWeight(float target) {
    return clamp(1.0 - abs(uFormation - target), 0.0, 1.0);
  }

  void main() {
    float intel = formationWeight(1.0);
    float media = formationWeight(2.0);
    float brand = formationWeight(3.0);
    float stats = formationWeight(4.0);
    float cta = formationWeight(5.0);
    float formationPresence = max(max(max(intel, media), max(brand, stats)), cta);
    float assemble = smoothstep(0.02, 0.92, uBeatProgress);

    vec3 target = aBase;
    target = mix(target, aIntel, intel);
    target = mix(target, aMedia, media);
    target = mix(target, aBrand, brand);
    target = mix(target, aStats, stats);
    target = mix(target, aCta, cta);

    vec3 pos = mix(aBase, target, formationPresence * assemble);

    float seedAngle = aSeed * 6.28318530718;
    float motion = sin(uTime * (0.45 + aDepth * 0.35) + seedAngle);
    float orbital = cos(uTime * 0.28 + seedAngle + aRole);
    pos.xy += vec2(motion, orbital) * uTurbulence * (0.16 + aDepth * 0.34);
    pos.z += sin(uTime * 0.35 + seedAngle * 1.7) * uTurbulence;

    float scrollImpulse = min(abs(uScrollVelocity), 0.5);
    pos.y += scrollImpulse * sin(seedAngle) * 0.55;
    pos.x += scrollImpulse * cos(seedAngle) * 0.28;

    vec2 away = normalize(pos.xy + vec2(0.0001));
    float scatterPush = max(uScatter - 0.25, 0.0);
    pos.xy += away * scatterPush * (0.4 + aDepth * 0.5);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uPointSize * (0.62 + aDepth * 1.15) * (42.0 / -mvPosition.z);

    vDepth = aDepth;
    vRole = aRole;
    vBrightness = (0.28 + aDepth * 0.72) * (1.0 + formationPresence * 0.55 + scrollImpulse);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uColorBase;

  varying float vDepth;
  varying float vBrightness;
  varying float vRole;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float core = smoothstep(0.5, 0.04, dist);
    float halo = smoothstep(0.5, 0.24, dist) * 0.35;
    float rolePulse = 0.82 + mod(vRole, 3.0) * 0.08;
    vec3 color = mix(vec3(1.0), uColorBase, 0.78) * vBrightness * rolePulse;
    float alpha = (core + halo) * uOpacity * (0.5 + vDepth * 0.5);

    gl_FragColor = vec4(color, alpha);
  }
`

interface ParticlesMeshProps {
  count?: number
  sceneState: MutableRefObject<ParticleTimelineState>
}

interface ConnectorSegmentsProps {
  positions: Float32Array
  formation: number
  sceneState: MutableRefObject<ParticleTimelineState>
}

function connectorPositions(kind: 'intelligence' | 'media' | 'brand' | 'stats') {
  const lines: number[] = []
  const add = (a: [number, number, number], b: [number, number, number]) => {
    lines.push(...a, ...b)
  }

  if (kind === 'intelligence') {
    const nodes: [number, number, number][] = [
      [2.55, 1.1, -4.2],
      [3.4, 0.55, -4.1],
      [4.05, 1.0, -4.4],
      [3.2, -0.2, -4.0],
      [4.3, -0.65, -4.3],
      [0.85, 0.95, -4.6],
      [1.3, 0.2, -4.5],
    ]
    add(nodes[0], nodes[1])
    add(nodes[1], nodes[2])
    add(nodes[1], nodes[3])
    add(nodes[3], nodes[4])
    add(nodes[5], nodes[6])
    add(nodes[6], nodes[3])
  }

  if (kind === 'media') {
    for (let i = 0; i < 9; i++) {
      const x = 0.2 + i * 0.68
      add([x, -1.55, -4.7], [x + 0.45, 1.25 + Math.sin(i) * 0.25, -4.7])
    }
  }

  if (kind === 'brand') {
    const centers: [number, number, number][] = [
      [1.0, 0.95, -4.2],
      [2.25, -0.55, -4.1],
      [3.75, 0.4, -4.3],
      [5.0, -1.0, -4.4],
    ]
    add(centers[0], centers[1])
    add(centers[1], centers[2])
    add(centers[2], centers[3])
    add(centers[0], centers[2])
  }

  if (kind === 'stats') {
    const centers: [number, number, number][] = [
      [-3.45, 0.38, -4.1],
      [-1.15, 0.38, -4.1],
      [1.15, 0.38, -4.1],
      [3.45, 0.38, -4.1],
    ]
    for (const center of centers) {
      add([center[0] - 0.65, center[1], center[2]], [center[0] + 0.65, center[1], center[2]])
      add([center[0], center[1] - 0.65, center[2]], [center[0], center[1] + 0.65, center[2]])
    }
  }

  return new Float32Array(lines)
}

function ConnectorSegments({ positions, formation, sceneState }: ConnectorSegmentsProps) {
  const materialRef = useRef<THREE.LineBasicMaterial>(null)

  useFrame(() => {
    if (!materialRef.current) return
    const currentState = sceneState.current
    const weight = Math.max(1 - Math.abs(currentState.formation - formation), 0)
    materialRef.current.opacity = currentState.connectionOpacity * weight
    materialRef.current.color.set(currentState.accent)
  })

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        opacity={0}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}

export function ParticlesMesh({ count = 14000, sceneState }: ParticlesMeshProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const lastProgressRef = useRef(0)
  const velocityRef = useRef(0)

  const field = useMemo(() => createOrchestratorField(count), [count])
  const connectors = useMemo(
    () => ({
      intelligence: connectorPositions('intelligence'),
      media: connectorPositions('media'),
      brand: connectorPositions('brand'),
      stats: connectorPositions('stats'),
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!materialRef.current) return

    const currentState = sceneState.current
    const rawVelocity =
      (currentState.pageProgress - lastProgressRef.current) / Math.max(delta, 0.001)
    velocityRef.current = velocityRef.current * 0.88 + rawVelocity * 0.12
    lastProgressRef.current = currentState.pageProgress

    const uniforms = materialRef.current.uniforms
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uPageProgress.value = currentState.pageProgress
    uniforms.uBeatProgress.value = currentState.beatProgress
    uniforms.uScrollVelocity.value = velocityRef.current
    uniforms.uOpacity.value = currentState.opacity
    uniforms.uPointSize.value = currentState.pointSize
    uniforms.uScatter.value = currentState.scatter
    uniforms.uTurbulence.value = currentState.turbulence
    uniforms.uFormation.value = currentState.formation
    uniforms.uColorBase.value.set(currentState.accent)
  })

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.base, 3]} />
          <bufferAttribute attach="attributes-aBase" args={[field.base, 3]} />
          <bufferAttribute attach="attributes-aIntel" args={[field.intelligence, 3]} />
          <bufferAttribute attach="attributes-aMedia" args={[field.media, 3]} />
          <bufferAttribute attach="attributes-aBrand" args={[field.brand, 3]} />
          <bufferAttribute attach="attributes-aStats" args={[field.stats, 3]} />
          <bufferAttribute attach="attributes-aCta" args={[field.cta, 3]} />
          <bufferAttribute attach="attributes-aDepth" args={[field.depth, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[field.seed, 1]} />
          <bufferAttribute attach="attributes-aRole" args={[field.role, 1]} />
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
            uPageProgress: { value: 0 },
            uBeatProgress: { value: 0 },
            uScrollVelocity: { value: 0 },
            uPointSize: { value: 0.82 },
            uOpacity: { value: 0.18 },
            uScatter: { value: 0.78 },
            uTurbulence: { value: 0.08 },
            uFormation: { value: 0 },
            uColorBase: { value: new THREE.Color('#ffffff') },
          }}
        />
      </points>
      <ConnectorSegments positions={connectors.intelligence} formation={1} sceneState={sceneState} />
      <ConnectorSegments positions={connectors.media} formation={2} sceneState={sceneState} />
      <ConnectorSegments positions={connectors.brand} formation={3} sceneState={sceneState} />
      <ConnectorSegments positions={connectors.stats} formation={4} sceneState={sceneState} />
    </>
  )
}
