// components/DeviceGate.tsx
import { useEffect, useState } from "react";

interface DeviceGateProps {
  children: React.ReactNode;
}

export default function DeviceGate({ children }: DeviceGateProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isMobileDevice = /android|iphone|ipad|iPod|opera mini|iemobile|mobile/i.test(userAgent.toLowerCase());
    setIsMobile(isMobileDevice);
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-center px-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Desktop Required</h1>
          <p>
            This immersive experience is only available on desktop or laptop devices.
            <br />
            Please switch to a compatible device for the best experience.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
