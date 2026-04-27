// GLSL shaders inlined as TypeScript modules.
// Inlined (not imported via `?raw`) because Turbopack in Next 16 does not
// register a default loader for `.glsl` files. Inlining keeps the build
// portable across dev and production with zero config changes.

export const heroVertexShader = /* glsl */ `
uniform float uTime;
uniform float uMorphProgress;
uniform float uPointSize;
uniform float uPixelRatio;

attribute vec3 aBase;
attribute vec3 aMid;
attribute vec3 aEnd;
attribute float aSeed;
attribute float aSize;

varying float vSeed;
varying vec2 vScreenPos;

void main() {
  // Two-stage morph (smoothstep keeps the joins gentle so the shape never snaps).
  float t1 = smoothstep(0.0, 0.5, uMorphProgress);
  float t2 = smoothstep(0.5, 1.0, uMorphProgress);
  vec3 stage1 = mix(aBase, aMid, t1);
  vec3 pos    = mix(stage1, aEnd, t2);

  // Per-particle wobble — entity breathes when scroll is still.
  float wobblePhase = aSeed * 6.2831853 + uTime * (0.6 + aSeed * 0.4);
  vec3 wobble = vec3(
    sin(wobblePhase) * 0.020,
    cos(wobblePhase * 1.3) * 0.020,
    sin(wobblePhase * 0.7) * 0.012
  );
  pos += wobble;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  // Perspective-attenuated point size; the constant matches Three.js point sprites.
  gl_PointSize = uPointSize * aSize * uPixelRatio * (300.0 / max(-mvPos.z, 0.001));

  vSeed = aSeed;
  vScreenPos = gl_Position.xy / max(gl_Position.w, 0.0001);
}
`

export const heroFragmentShader = /* glsl */ `
precision mediump float;

uniform vec3 uColor;
uniform vec3 uBgColor;
uniform vec2 uCursor;
uniform float uCursorRadius;
uniform float uOpacity;
uniform float uHasCursor;

varying float vSeed;
varying vec2 vScreenPos;

void main() {
  // Circular sprite mask — soft alpha falloff at edge.
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);
  float alpha = smoothstep(0.5, 0.35, dist);
  if (alpha <= 0.001) discard;

  // Cursor repulsion by color — distance in NDC.
  float cursorDist = distance(vScreenPos, uCursor);
  float cursorMix = uHasCursor * (1.0 - smoothstep(0.0, uCursorRadius, cursorDist));

  vec3 color = mix(uColor, uBgColor, cursorMix);

  // Slight per-particle brightness variation so the cloud doesn't read as a flat fill.
  color *= (0.85 + 0.15 * vSeed);

  gl_FragColor = vec4(color, alpha * uOpacity);
}
`
