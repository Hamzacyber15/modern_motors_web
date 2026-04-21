'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stage, OrbitControls, Environment, ContactShadows, Stars } from '@react-three/drei'
import { DetailedTruckModel } from './ThreeDViewer'
import { Layers, Rotate3d, Zap, Box, Activity, ShieldCheck } from 'lucide-react'

function ShowroomStage() {
  return (
    <group position={[0, -2.1, 0]}>
       <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[14, 64]} />
          <meshPhysicalMaterial color="#050505" metalness={1} roughness={0.1} transparent opacity={0.8} />
       </mesh>
       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[28, 28]} />
          <meshStandardMaterial color="#00e5ff" transparent opacity={0.03} wireframe />
       </mesh>
       <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[14, 0.02, 16, 120]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={4} />
       </mesh>
    </group>
  )
}

export default function Truck360Viewer({ truckImage }: any) {
  const [mounted, setMounted] = useState(false)
  const [cabTilted, setCabTilted] = useState(false)
  const [doorsOpen, setDoorsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full h-full relative group bg-black overflow-hidden rounded-[4rem] border border-white/5">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[18, 10, 18]} fov={20} />
        
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
             <group rotation={[0, -Math.PI / 6, 0]}>
                <DetailedTruckModel 
                  cabTilted={cabTilted} 
                  doorsOpen={doorsOpen}
                  onToggleCab={() => setCabTilted(!cabTilted)}
                  onToggleDoors={() => setDoorsOpen(!doorsOpen)}
                />
             </group>
          </Stage>
          
          <ShowroomStage />
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1.2} />

          <OrbitControls 
            enableDamping 
            dampingFactor={0.06} 
            autoRotate={!cabTilted && !doorsOpen} 
            autoRotateSpeed={0.5} 
            enableZoom={false} 
            makeDefault 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.8} 
          />
        </Suspense>

        <ContactShadows position={[0, -2.15, 0]} opacity={0.8} scale={35} blur={4} far={8} />
        
        <ambientLight intensity={1.8} />
        <pointLight position={[20, 15, 20]} color="#00e5ff" intensity={8} />
        <pointLight position={[-20, 15, -20]} color="#ffaa00" intensity={6} />
      </Canvas>

      {/* Industrial Overlay */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-40 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-10 group-hover:translate-x-0">
         <button onClick={() => setCabTilted(!cabTilted)} className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 backdrop-blur-3xl shadow-2xl ${cabTilted ? 'bg-primary border-primary text-brand-secondary shadow-neon scale-110' : 'bg-black/60 border-white/10 text-white hover:border-primary/50'}`}>
            <Box size={28} />
            <span className="text-[10px] font-black uppercase tracking-widest">FORLAND_TILT</span>
         </button>
         <button onClick={() => setDoorsOpen(!doorsOpen)} className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 backdrop-blur-3xl shadow-2xl ${doorsOpen ? 'bg-primary border-primary text-brand-secondary shadow-neon scale-110' : 'bg-black/60 border-white/10 text-white hover:border-primary/50'}`}>
            <Rotate3d size={28} />
            <span className="text-[10px] font-black uppercase tracking-widest">ACCESS_SYNC</span>
         </button>
      </div>

      <div className="absolute bottom-12 right-12 p-10 glass-ultra rounded-[2.5rem] flex flex-col gap-2 pointer-events-none border border-white/20 z-20 transition-transform group-hover:scale-105 duration-700">
         <div className="flex items-center gap-4">
            <ShieldCheck className="text-primary w-5 h-5" />
            <span className="font-industrial text-[12px] font-black tracking-[0.5em] text-white">FORLAND VIRTUAL_TWIN</span>
         </div>
         <span className="font-industrial text-xl font-black text-primary italic uppercase tracking-tighter">PHOTOGRAPHIC SCAN ACTIVE</span>
      </div>
    </div>
  )
}
