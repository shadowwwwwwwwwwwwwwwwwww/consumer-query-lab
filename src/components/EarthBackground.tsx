
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotatingEarth from './RotatingEarth';

interface EarthBackgroundProps {
  className?: string;
}

const EarthBackground: React.FC<EarthBackgroundProps> = ({ className }) => {
  return (
    <div className={`fixed inset-0 z-0 opacity-30 ${className}`}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <RotatingEarth />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default EarthBackground;
