import { create } from "zustand";

type LightMode = "standard" | "rgb";

interface LightingState {
  lightMode: LightMode;
  rgbColor: string;
  rgbColorIndex: number;
  rgbColors: string[];
  
  toggleLightMode: () => void;
  cycleColor: () => void;
  setColor: (index: number) => void;
}

export const useLighting = create<LightingState>((set) => ({
  lightMode: "rgb",
  rgbColorIndex: 0,
  rgbColors: [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FF00FF", // Purple
    "#00FFFF", // Cyan
    "#FFFF00", // Yellow
    "#FF6600", // Orange
  ],
  rgbColor: "#FF0000", // Initialize with red
  
  toggleLightMode: () => set((state) => ({
    lightMode: state.lightMode === "standard" ? "rgb" : "standard"
  })),
  
  cycleColor: () => set((state) => {
    const nextIndex = (state.rgbColorIndex + 1) % state.rgbColors.length;
    return {
      rgbColorIndex: nextIndex,
      rgbColor: state.rgbColors[nextIndex]
    };
  }),
  
  setColor: (index) => set((state) => ({
    rgbColorIndex: index % state.rgbColors.length,
    rgbColor: state.rgbColors[index % state.rgbColors.length]
  }))
}));
