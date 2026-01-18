// src/components/QuantumParticleField.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  count?: number
}

export default function QuantumParticleField({ count = 18000 }: Props) {
  const points = useRef<THREE.Points>(null!)
  const velocities = useRef<Float32Array>(new Float32Array(count * 3))
  const initialized = useRef(false)

  useEffect(() => {
    velocities.current = new Float32Array(count * 3)
    initialized.current = false
  }, [count])

  useFrame(({ clock }) => {
    if (!points.current) return

    const pos = points.current.geometry.attributes.position.array as Float32Array
    const vel = velocities.current

    if (!initialized.current) {
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 28
        pos[i * 3 + 1] = (Math.random() - 0.5) * 28
        pos[i * 3 + 2] = (Math.random() - 0.5) * 28

        vel[i * 3]     = (Math.random() - 0.5) * 0.035
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.035
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.035
      }
      initialized.current = true
      points.current.geometry.attributes.position.needsUpdate = true
    }

    const t = clock.getElapsedTime() * 0.3

    for (let i = 0; i < count; i++) {
      pos[i * 3]     += vel[i * 3]     + Math.sin(t + i * 0.7) * 0.004
      pos[i * 3 + 1] += vel[i * 3 + 1] + Math.cos(t + i * 0.9) * 0.004
      pos[i * 3 + 2] += vel[i * 3 + 2] + Math.sin(t + i * 1.1) * 0.004

      const dist = Math.hypot(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
      if (dist > 16) {
        const factor = 0.975
        pos[i * 3]     *= factor
        pos[i * 3 + 1] *= factor
        pos[i * 3 + 2] *= factor
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.068}
        color="#00f0ff"
        transparent
        opacity={0.78}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
