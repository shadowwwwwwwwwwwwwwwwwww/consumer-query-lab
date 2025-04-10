
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const RotatingEarth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const earthTextureUrl = "https://assets.codepen.io/2090674/earth_specular_2048.jpg";
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={earthRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        map={new THREE.TextureLoader().load(earthTextureUrl)}
        metalness={0.2}
        roughness={0.8}
        color="#3498db"
      />
    </Sphere>
  );
};

export default RotatingEarth;
