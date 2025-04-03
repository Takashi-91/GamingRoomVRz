import { useState, useEffect } from "react";
import * as THREE from "three";

type ResourceType = "texture" | "audio" | "model";

interface Resource {
  url: string;
  type: ResourceType;
  loaded: boolean;
  resource?: THREE.Texture | HTMLAudioElement;
}

export function useResources() {
  const [resources, setResources] = useState<Record<string, Resource>>({});
  const [allLoaded, setAllLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const loadTexture = (url: string): Promise<THREE.Texture> => {
    return new Promise((resolve) => {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(url, (texture) => {
        resolve(texture);
      });
    });
  };
  
  const loadAudio = (url: string): Promise<HTMLAudioElement> => {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      audio.addEventListener('canplaythrough', () => {
        resolve(audio);
      });
      audio.load();
    });
  };
  
  const addResource = (url: string, type: ResourceType) => {
    setResources(prev => ({
      ...prev,
      [url]: { url, type, loaded: false }
    }));
  };
  
  const preloadAll = async () => {
    const resourceEntries = Object.entries(resources);
    let loadedCount = 0;
    
    for (const [url, resource] of resourceEntries) {
      if (resource.loaded) continue;
      
      try {
        let loadedResource;
        
        switch (resource.type) {
          case "texture":
            loadedResource = await loadTexture(url);
            break;
          case "audio":
            loadedResource = await loadAudio(url);
            break;
          default:
            continue;
        }
        
        setResources(prev => ({
          ...prev,
          [url]: { ...prev[url], loaded: true, resource: loadedResource }
        }));
        
        loadedCount++;
        setProgress(loadedCount / resourceEntries.length);
      } catch (error) {
        console.error(`Failed to load resource: ${url}`, error);
      }
    }
    
    setAllLoaded(true);
  };
  
  return {
    addResource,
    preloadAll,
    resources,
    allLoaded,
    progress,
    getTexture: (url: string) => resources[url]?.resource as THREE.Texture,
    getAudio: (url: string) => resources[url]?.resource as HTMLAudioElement,
  };
}
