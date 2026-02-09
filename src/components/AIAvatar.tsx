import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface AIAvatarProps {
  mood: 'neutral' | 'angry' | 'happy' | 'thinking';
}

const AvatarMesh: React.FC<{ mood: AIAvatarProps['mood'] }> = ({ mood }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Color mapping based on mood
  const getColor = () => {
    switch (mood) {
      case 'angry': return '#EF4444'; // Red (AI Lost/User Won)
      case 'happy': return '#10B981'; // Green (AI Won/User Lost)
      case 'thinking': return '#F59E0B'; // Orange (Processing)
      case 'neutral': default: return '#836EF9'; // Monad Purple
    }
  };

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate slowly
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Pulse effect based on mood
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color={getColor()}
          attach="material"
          distort={mood === 'angry' ? 0.6 : 0.3} // More distortion when angry
          speed={mood === 'thinking' ? 4 : 1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

export const AIAvatar: React.FC<AIAvatarProps> = ({ mood }) => {
  return (
    <div className="w-full h-[300px] md:h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color={mood === 'angry' ? '#ff0000' : '#836EF9'} intensity={0.5} />
        <AvatarMesh mood={mood} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
      
      {/* AI Speech Bubble Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center w-full px-4">
        <div className={`inline-block px-6 py-2 rounded-full backdrop-blur-md border ${
          mood === 'angry' ? 'bg-red-500/20 border-red-500/50 text-red-200' :
          mood === 'happy' ? 'bg-green-500/20 border-green-500/50 text-green-200' :
          mood === 'thinking' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-200' :
          'bg-purple-500/20 border-purple-500/50 text-purple-200'
        } transition-all duration-300`}>
          <span className="font-mono text-sm md:text-base font-bold">
            {mood === 'neutral' && "WAITING FOR OPPONENT..."}
            {mood === 'thinking' && "ANALYZING YOUR PATTERN..."}
            {mood === 'angry' && "ERROR: IMPOSSIBLE OUTCOME"}
            {mood === 'happy' && "PREDICTABLE HUMAN BEHAVIOR"}
          </span>
        </div>
      </div>
    </div>
  );
};
