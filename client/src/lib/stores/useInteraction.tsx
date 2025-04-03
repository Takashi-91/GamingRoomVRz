import { create } from "zustand";
import * as THREE from "three";

interface InteractionState {
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  camera: THREE.Camera | null;
  interactiveObjects: THREE.Object3D[];
  hoveredObject: THREE.Object3D | null;
  
  init: () => void;
  setCamera: (camera: THREE.Camera) => void;
  updateMouse: (x: number, y: number) => void;
  registerInteractiveObject: (object: THREE.Object3D, label: string, callback: () => void) => void;
  unregisterInteractiveObject: (object: THREE.Object3D) => void;
  checkIntersections: () => void;
  handleClick: () => boolean;
}

export const useInteraction = create<InteractionState>((set, get) => ({
  raycaster: new THREE.Raycaster(),
  mouse: new THREE.Vector2(),
  camera: null,
  interactiveObjects: [],
  hoveredObject: null,
  
  init: () => {
    // Setup event listeners
    window.addEventListener('mousemove', (event) => {
      const { updateMouse, checkIntersections } = get();
      updateMouse(event.clientX, event.clientY);
      checkIntersections();
    });
    
    window.addEventListener('click', () => {
      get().handleClick();
    });
    
    // On mount, get the camera from Three.js
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
          const threeInstance = (canvas as any).__r3f;
          if (threeInstance && threeInstance.root && threeInstance.root.getState) {
            const state = threeInstance.root.getState();
            if (state.camera) {
              get().setCamera(state.camera);
            }
          }
        }
      }, 1000); // Give time for React Three Fiber to initialize
    });
  },
  
  setCamera: (camera) => set({ camera }),
  
  updateMouse: (x, y) => {
    const { mouse } = get();
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;
  },
  
  registerInteractiveObject: (object, label, callback) => {
    // Store label and callback in object userData
    object.userData.interactiveLabel = label;
    object.userData.interactiveCallback = callback;
    
    set((state) => ({
      interactiveObjects: [...state.interactiveObjects, object]
    }));
  },
  
  unregisterInteractiveObject: (object) => {
    set((state) => ({
      interactiveObjects: state.interactiveObjects.filter(obj => obj !== object)
    }));
  },
  
  checkIntersections: () => {
    const { raycaster, mouse, camera, interactiveObjects } = get();
    
    if (!camera || interactiveObjects.length === 0) return;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, true);
    
    // Find the first intersected object that is or has a parent in our interactive objects list
    let firstInteractive = null;
    
    for (const intersect of intersects) {
      let current = intersect.object;
      
      // Traverse up the parent chain to find an interactive object
      while (current) {
        if (interactiveObjects.includes(current)) {
          firstInteractive = current;
          break;
        }
        current = current.parent as THREE.Object3D;
      }
      
      if (firstInteractive) break;
    }
    
    // Update cursor style
    document.body.style.cursor = firstInteractive ? 'pointer' : 'auto';
    
    // Update hovered object
    set({ hoveredObject: firstInteractive });
  },
  
  handleClick: () => {
    const { hoveredObject } = get();
    
    if (hoveredObject && hoveredObject.userData.interactiveCallback) {
      hoveredObject.userData.interactiveCallback();
      return true;
    }
    
    return false;
  }
}));
