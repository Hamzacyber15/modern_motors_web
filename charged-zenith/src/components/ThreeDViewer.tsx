'use client'

import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Html,
  RoundedBox,
  Cylinder,
  Torus,
  Float,
  Stars,
  Text,
  PerspectiveCamera
} from '@react-three/drei'
import * as THREE from 'three'
import { Layers, Rotate3d, Zap, Gauge, Box, Activity, ShieldCheck } from 'lucide-react'

// --- High-Fidelity Forland Components ---

function HeadlightCluster({ position, rotation }: any) {
  return (
    <group position={position} rotation={rotation}>
       {/* Main Housing */}
       <RoundedBox args={[0.5, 0.4, 0.2]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#111" />
       </RoundedBox>
       {/* Internal Reflector */}
       <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.4, 0.3]} />
          <meshStandardMaterial color="#fff" metalness={1} roughness={0} envMapIntensity={5} />
       </mesh>
       {/* LED Core */}
       <mesh position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#fff" emissive="#00e5ff" emissiveIntensity={2} />
       </mesh>
       {/* Glass Lens */}
       <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[0.48, 0.38]} />
          <meshPhysicalMaterial 
             color="#fff" 
             transparent 
             opacity={0.3} 
             transmission={1} 
             thickness={1} 
             metalness={0.5} 
             roughness={0} 
          />
       </mesh>
    </group>
  )
}

function IndustrialMirror({ position, isLeft }: any) {
  return (
    <group position={position}>
       {/* Support Arm */}
       <Cylinder args={[0.02, 0.02, 0.6]} rotation={[0, 0, isLeft ? 0.4 : -0.4]}>
          <meshStandardMaterial color="#111" />
       </Cylinder>
       {/* Main Mirror Body */}
       <group position={[isLeft ? -0.2 : 0.2, 0.3, 0.2]} rotation={[0, isLeft ? 0.3 : -0.3, 0]}>
          <RoundedBox args={[0.1, 0.8, 0.4]} radius={0.05}>
             <meshStandardMaterial color="#111" />
          </RoundedBox>
          <mesh position={[isLeft ? 0.055 : -0.055, 0, 0]} rotation={[0, isLeft ? Math.PI/2 : -Math.PI/2, 0]}>
             <planeGeometry args={[0.35, 0.75]} />
             <meshStandardMaterial color="#fff" metalness={1} roughness={0.05} envMapIntensity={4} />
          </mesh>
       </group>
    </group>
  )
}

function ShowroomStage() {
  return (
    <group position={[0, -1.15, 0]}>
       <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[14, 64]} />
          <meshPhysicalMaterial color="#050505" metalness={1} roughness={0.15} transparent opacity={0.9} envMapIntensity={3} />
       </mesh>
       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[28, 28]} />
          <meshStandardMaterial color="#00e5ff" transparent opacity={0.04} wireframe />
       </mesh>
       <mesh position={[0, 0, 0]}>
          <torusGeometry args={[13.8, 0.02, 16, 120]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={6} />
       </mesh>
    </group>
  )
}

// --- Main Model Component ---

export function DetailedTruckModel({ cabTilted, doorsOpen, onToggleCab, onToggleDoors }: any) {
  const cabGroup = useRef<THREE.Group>(null!)
  const leftDoorGroup = useRef<THREE.Group>(null!)
  const rightDoorGroup = useRef<THREE.Group>(null!)
  
  useFrame((state, delta) => {
    const targetCabRotation = cabTilted ? -Math.PI / 3.4 : 0
    cabGroup.current.rotation.x = THREE.MathUtils.lerp(cabGroup.current.rotation.x, targetCabRotation, delta * 3)
    
    const targetDoorRotation = doorsOpen ? Math.PI / 2.6 : 0
    leftDoorGroup.current.rotation.y = THREE.MathUtils.lerp(leftDoorGroup.current.rotation.y, targetDoorRotation, delta * 3.5)
    rightDoorGroup.current.rotation.y = THREE.MathUtils.lerp(rightDoorGroup.current.rotation.y, -targetDoorRotation, delta * 3.5)
  })

  // Forland Metallic Blue/Silver Material
  const bodyMat = useMemo(() => new THREE.MeshPhysicalMaterial({ 
    color: '#1a3a5f', // Forland Signature Metallic Blue
    metalness: 0.9, 
    roughness: 0.15, 
    clearcoat: 1, 
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.5 
  }), [])

  const plasticMat = useMemo(() => new THREE.MeshStandardMaterial({ 
     color: '#111', roughness: 0.8, metalness: 0.2 
  }), [])

  return (
    <group>
      {/* 1. CHASSIS SYSTEM */}
      <group position={[0, -0.4, 0]}>
         {[ -0.65, 0.65 ].map((x, i) => (
            <mesh key={i} position={[x, 0.4, -0.5]} castShadow>
               <boxGeometry args={[0.2, 0.45, 7.8]} />
               <meshStandardMaterial color="#111" metalness={1} roughness={0.6} />
            </mesh>
         ))}
         {/* Central Drive Axis */}
         <mesh position={[0, 0.4, -0.5]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 5.5]} />
            <meshStandardMaterial color="#111" metalness={1} />
         </mesh>
      </group>

      {/* 2. FORLAND NARROW-DUTY CABIN */}
      <group ref={cabGroup} position={[0, 0.6, 2.0]}>
         <group position={[0, 0.25, 0]}>
            {/* Main Cab Shell (Narrow & Tall profile) */}
            <RoundedBox args={[2.0, 2.2, 1.8]} radius={0.15} smoothness={8} castShadow>
               <primitive object={bodyMat} attach="material" />
            </RoundedBox>

            {/* Aerodynamic Roof Deflector (Signature Forland Look) */}
            <group position={[0, 1.1, -0.1]}>
               <mesh rotation={[-0.2, 0, 0]}>
                  <boxGeometry args={[2.1, 0.8, 1.6]} />
                  <meshStandardMaterial color="#fafafa" roughness={0.5} />
               </mesh>
               <mesh position={[0, 0.4, -0.7]} rotation={[0.4, 0, 0]}>
                  <boxGeometry args={[2.1, 0.1, 1.2]} />
                  <meshStandardMaterial color="#fafafa" />
               </mesh>
            </group>

            {/* Front Mask: Ding-Shaped Grill */}
            <group position={[0, -0.3, 0.95]}>
               <RoundedBox args={[1.9, 1.5, 0.08]} radius={0.05} castShadow>
                  <meshStandardMaterial color="#fff" metalness={1} roughness={0.1} />
               </RoundedBox>
               {/* Grill Slats */}
               {[0.5, 0.2, -0.1, -0.4, -0.7].map((y, i) => (
                  <mesh key={i} position={[0, y, 0.05]}>
                     <boxGeometry args={[1.7, 0.04, 0.02]} />
                     <meshStandardMaterial color="#222" metalness={1} />
                  </mesh>
               ))}
               {/* Foton/Forland Badge */}
               <group position={[0, 0.85, 0.06]}>
                  <mesh>
                     <circleGeometry args={[0.18, 32]} />
                     <meshStandardMaterial color="#fff" metalness={1} emissive="#00e5ff" emissiveIntensity={0.5} />
                  </mesh>
                  <Text position={[0, 0, 0.01]} fontSize={0.06} color="#000" font="/fonts/Inter-Black.otf">FORLAND</Text>
               </group>
            </group>

            {/* Eagle-Eye Headlight Clusters */}
            <HeadlightCluster position={[-0.8, -0.6, 0.9]} rotation={[0, -0.2, 0]} />
            <HeadlightCluster position={[0.8, -0.6, 0.9]} rotation={[0, 0.2, 0]} />

            {/* Doors & Mirrors */}
            <group ref={leftDoorGroup} position={[-1.05, -0.1, 0.2]}>
               <RoundedBox args={[0.1, 1.8, 1.3]} radius={0.1} castShadow>
                  <primitive object={bodyMat} attach="material" />
               </RoundedBox>
               <IndustrialMirror position={[-0.1, 0.5, 0.4]} isLeft={true} />
               
               <Html position={[-0.6, 0.2, 0.4]} center distanceFactor={10}>
                  <button onClick={(e) => { e.stopPropagation(); onToggleDoors(); }} className="w-12 h-12 rounded-2xl bg-primary/20 hover:bg-primary border border-primary/40 flex items-center justify-center text-white transition-all shadow-neon backdrop-blur-3xl group/btn">
                     <Rotate3d size={24} className="group-hover/btn:rotate-180 transition-transform duration-700" />
                  </button>
               </Html>
            </group>

            <group ref={rightDoorGroup} position={[1.05, -0.1, 0.2]}>
               <RoundedBox args={[0.1, 1.8, 1.3]} radius={0.1} castShadow>
                  <primitive object={bodyMat} attach="material" />
               </RoundedBox>
               <IndustrialMirror position={[0.1, 0.5, 0.4]} isLeft={false} />
            </group>

            {/* Engine Revealed (Enhanced Mechanicals) */}
            {cabTilted && (
               <group position={[0, -0.2, 0]} scale={0.85}>
                  <RoundedBox args={[1.4, 1.5, 1.8]} radius={0.1}>
                     <meshStandardMaterial color="#1a1a1a" metalness={1} envMapIntensity={0.5} />
                  </RoundedBox>
                  {/* Intake & Fan */}
                  <mesh position={[0, 0.5, 1.0]} rotation={[Math.PI/2, 0, 0]}>
                     <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
                     <meshStandardMaterial color="#333" />
                  </mesh>
                  <Html position={[0, 1.8, 0]} center distanceFactor={12}>
                     <div className="bg-primary/95 text-brand-secondary px-6 py-4 rounded-full font-industrial font-black flex items-center gap-4 animate-in fade-in zoom-in slide-in-from-bottom-5 shadow-[0_0_50px_var(--primary-glow)] border border-white/20">
                        <Activity className="animate-pulse" />
                        FORLAND_TURBO_DIESEL_GO
                     </div>
                  </Html>
               </group>
            )}
         </group>
         
         <Html position={[0, 3.6, 0]} center distanceFactor={10}>
            <button onClick={(e) => { e.stopPropagation(); onToggleCab(); }} className="px-12 py-6 rounded-[2.5rem] bg-black/80 backdrop-blur-3xl border border-primary/50 text-primary font-industrial font-black text-xl tracking-[0.2em] hover:bg-primary hover:text-brand-secondary transition-all shadow-neon scale-110">
               {cabTilted ? 'LOCK_CABIN' : 'SCAN_MECHANICALS'}
               <Zap className="inline ml-4 animate-pulse" />
            </button>
         </Html>
      </group>

      {/* 3. REAR BOX MODULE */}
      <group position={[0, 1.0, -2.2]}>
         <RoundedBox args={[2.1, 2.2, 4.8]} radius={0.1} castShadow>
            <meshStandardMaterial color="#fafafa" roughness={0.4} />
         </RoundedBox>
         {/* Cargo Latches */}
         {[ -2.4, 0, 2.4 ].map((z, j) => (
            <mesh key={j} position={[1.1, 0, z]}>
               <boxGeometry args={[0.02, 1.0, 0.05]} />
               <meshStandardMaterial color="#aaa" />
            </mesh>
         ))}
      </group>

      {/* 4. INDUSTRIAL WHEEL ASSEMBLY */}
      {[[-1.0, -0.5, 2.0], [1.0, -0.5, 2.0], [-1.0, -0.5, -1.5], [1.0, -0.5, -1.5], [-1.0, -0.5, -3.5], [1.0, -0.5, -3.5]].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
           <group rotation={[0, 0, Math.PI / 2]}>
              <Cylinder args={[0.55, 0.55, 0.7, 32]} castShadow>
                 <meshStandardMaterial color="#080808" roughness={1} />
              </Cylinder>
              <Cylinder args={[0.38, 0.38, 0.72, 16]}>
                 <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.1} envMapIntensity={3} />
              </Cylinder>
           </group>
        </group>
      ))}
    </group>
  )
}

export default function ThreeDViewer() {
  const [isClient, setIsClient] = useState(false)
  const [cabTilted, setCabTilted] = useState(false)
  const [doorsOpen, setDoorsOpen] = useState(false)

  useEffect(() => setIsClient(true), [])

  if (!isClient) return null

  return (
    <div className="w-full h-full min-h-[800px] relative overflow-hidden bg-black rounded-[4rem] border border-white/5">
      <Suspense fallback={null}>
        <Canvas shadows gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
          <PerspectiveCamera makeDefault position={[18, 12, 18]} fov={18} />
          
          <ambientLight intensity={1.8} />
          <spotLight position={[30, 40, 30]} angle={0.2} penumbra={1} intensity={12} castShadow />
          <pointLight position={[20, 10, -20]} intensity={8} color="#00e5ff" />
          <Environment preset="city" />
          
          <ShowroomStage />
          <DetailedTruckModel cabTilted={cabTilted} doorsOpen={doorsOpen} onToggleCab={() => setCabTilted(!cabTilted)} onToggleDoors={() => setDoorsOpen(!doorsOpen)} />
          
          <OrbitControls 
             enablePan={false} 
             enableZoom={false} 
             enableDamping 
             dampingFactor={0.06} 
             autoRotate={!cabTilted && !doorsOpen} 
             autoRotateSpeed={0.4} 
             minPolarAngle={Math.PI / 4} 
             maxPolarAngle={Math.PI / 1.8} 
          />
          <ContactShadows position={[0, -1.15, 0]} opacity={0.8} scale={35} blur={4} far={8} />
          <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.2} />
        </Canvas>
      </Suspense>

      {/* Industrial Brand Overlay */}
      <div className="absolute right-16 top-16 flex flex-col gap-4 text-right z-30 pointer-events-none">
         <div className="flex items-center gap-4 justify-end">
            <ShieldCheck className="text-primary w-8 h-8" />
            <span className="text-white font-industrial text-3xl font-black italic tracking-[0.5em] uppercase">FORLAND ANALYSIS_v2</span>
         </div>
         <span className="text-primary/40 text-xs font-black uppercase tracking-[0.8em]">PHOTOGRAPHIC_DETAIL_ACTIVE</span>
      </div>

      <div className="absolute left-16 top-1/2 -translate-y-1/2 flex flex-col gap-10 z-40">
         <button onClick={() => setCabTilted(!cabTilted)} className={`p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 backdrop-blur-3xl ${cabTilted ? 'bg-primary border-primary text-brand-secondary shadow-[0_0_60px_var(--primary-glow)] scale-110' : 'bg-black/50 border-white/10 text-white hover:border-primary/50'}`}>
            <Box size={32} />
            <span className="text-[11px] font-black uppercase tracking-widest">CABIN_TILT</span>
         </button>
         <button onClick={() => setDoorsOpen(!doorsOpen)} className={`p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 backdrop-blur-3xl ${doorsOpen ? 'bg-primary border-primary text-brand-secondary shadow-[0_0_60px_var(--primary-glow)] scale-110' : 'bg-black/50 border-white/10 text-white hover:border-primary/50'}`}>
            <Rotate3d size={32} />
            <span className="text-[11px] font-black uppercase tracking-widest">ACCESS_PORTS</span>
         </button>
      </div>
    </div>
  )
}
