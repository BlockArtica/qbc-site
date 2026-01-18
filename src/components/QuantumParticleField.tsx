// src/components/QuantumParticleField.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function QuantumParticleField({ count = 18000, tamper = false }: { count?: number, tamper?: boolean }) {
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
        pos[i * 3] = (Math.random() - 0.5) * 32
        pos[i * 3 + 1] = (Math.random() - 0.5) * 32
        pos[i * 3 + 2] = (Math.random() - 0.5) * 32
        vel[i * 3] = (Math.random() - 0.5) * 0.04
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.04
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04
      }
      initialized.current = true
      points.current.geometry.attributes.position.needsUpdate = true
    }

    // Update positions with velocities for animation
    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3] * (tamper ? 2 : 1) // Faster if tampered
      pos[i * 3 + 1] += vel[i * 3 + 1] * (tamper ? 2 : 1)
      pos[i * 3 + 2] += vel[i * 3 + 2] * (tamper ? 2 : 1)

      // Bounce off bounds
      if (Math.abs(pos[i * 3]) > 16) vel[i * 3] *= -1
      if (Math.abs(pos[i * 3 + 1]) > 16) vel[i * 3 + 1] *= -1
      if (Math.abs(pos[i * 3 + 2]) > 16) vel[i * 3 + 2] *= -1

      // Add jitter if tampered
      if (tamper) {
        pos[i * 3] += (Math.random() - 0.5) * 0.1
        pos[i * 3 + 1] += (Math.random() - 0.5) * 0.1
        pos[i * 3 + 2] += (Math.random() - 0.5) * 0.1
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
        size={0.08}
        color={tamper ? "#ff4444" : "#88ccff"}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

export default QuantumParticleField
