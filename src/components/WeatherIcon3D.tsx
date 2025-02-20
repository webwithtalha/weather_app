'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function WeatherModel({ weatherType }: { weatherType: string }) {
  const { scene } = useGLTF(`/models/${weatherType}.glb`);
  return <primitive object={scene} />;
}

export default function WeatherIcon3D({ weather }: { weather: string }) {
  return (
    <div className="h-40 w-40">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <WeatherModel weatherType={weather} />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
} 