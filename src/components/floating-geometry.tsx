"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import {
  Float,
  MeshDistortMaterial,
  Icosahedron,
  Torus,
  Octahedron,
  Sphere,
  Points,
  PointMaterial,
} from "@react-three/drei"
import type * as THREE from "three"
import * as random from "maath/random"

function FloatingParticles({ count = 500 }) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sphere = random.inSphere(positions, { radius: 20 })
    return sphere
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.02
      points.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00d4ff" size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  )
}

function FloatingParticlesSecondary({ count = 300 }) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sphere = random.inSphere(positions, { radius: 15 })
    return sphere
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = -state.clock.elapsedTime * 0.015
      points.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#7c3aed" size={0.025} sizeAttenuation={true} depthWrite={false} opacity={0.5} />
    </Points>
  )
}

function GlowingSphere({
  position,
  color,
  size = 0.5,
}: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  )
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[0.8, 0.2, 16, 32]} position={position}>
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} emissive={color} emissiveIntensity={0.3} />
      </Torus>
    </Float>
  )
}

function FloatingIcosahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[0.6]} position={position}>
        <meshStandardMaterial
          color={color}
          wireframe
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </Icosahedron>
    </Float>
  )
}

function FloatingOctahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <Octahedron ref={meshRef} args={[0.5]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.95}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </Octahedron>
    </Float>
  )
}

export default function FloatingGeometry() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7c3aed" />
      <pointLight position={[0, 5, 5]} intensity={0.4} color="#3b82f6" />

      <FloatingParticles count={600} />
      <FloatingParticlesSecondary count={400} />

      {/* Main Spheres */}
      <GlowingSphere position={[-4, 2, -3]} color="#00d4ff" size={0.7} />
      <GlowingSphere position={[5, -2, -4]} color="#7c3aed" size={0.5} />
      <GlowingSphere position={[3, 3, -5]} color="#3b82f6" size={0.4} />

      {/* Torus */}
      <FloatingTorus position={[-5, -3, -6]} color="#00d4ff" />
      <FloatingTorus position={[6, 2, -8]} color="#7c3aed" />

      {/* Icosahedrons */}
      <FloatingIcosahedron position={[4, -3, -4]} color="#00d4ff" />
      <FloatingIcosahedron position={[-3, 3, -7]} color="#3b82f6" />

      {/* Octahedrons */}
      <FloatingOctahedron position={[-6, 0, -5]} color="#7c3aed" />
      <FloatingOctahedron position={[2, 4, -6]} color="#00d4ff" />

      {/* Additional small spheres for depth */}
      <GlowingSphere position={[-2, -4, -8]} color="#3b82f6" size={0.3} />
      <GlowingSphere position={[0, 5, -10]} color="#7c3aed" size={0.25} />
      <GlowingSphere position={[7, 0, -12]} color="#00d4ff" size={0.35} />
    </>
  )
}
