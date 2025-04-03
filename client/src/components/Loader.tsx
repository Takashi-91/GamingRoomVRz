import { useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-white mt-4 font-light text-sm">
        {Math.round(progress)}% loaded
      </div>
    </div>
  );
}
