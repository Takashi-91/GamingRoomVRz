import { create } from "zustand";
import * as THREE from "three";
import { gsap } from "gsap";

// Object types that can be interacted with
export type InteractiveObjectType = "pc" | "arcade" | "vr" | "couch" | "poster" | "default";

interface ObjectDetails {
  title: string;
  description: string;
  type: InteractiveObjectType;
  links?: {
    text: string;
    url: string;
    icon?: string;
  }[];
  isMonitor?: boolean;
}

interface InteractionState {
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  camera: THREE.Camera | null;
  controls: any | null; // OrbitControls reference
  interactiveObjects: THREE.Object3D[];
  hoveredObject: THREE.Object3D | null;
  focusedObject: THREE.Object3D | null;
  isInspecting: boolean;
  detailsVisible: boolean;
  currentObjectDetails: ObjectDetails | null;
  originalCameraPosition: THREE.Vector3 | null;
  originalControlsTarget: THREE.Vector3 | null;
  
  init: () => void;
  setCamera: (camera: THREE.Camera) => void;
  setControls: (controls: any) => void;
  updateMouse: (x: number, y: number) => void;
  registerInteractiveObject: (
    object: THREE.Object3D, 
    label: string, 
    type: InteractiveObjectType,
    description: string, 
    callback?: () => void,
    links?: { text: string; url: string; icon?: string }[],
    isMonitor?: boolean
  ) => void;
  unregisterInteractiveObject: (object: THREE.Object3D) => void;
  checkIntersections: () => void;
  handleClick: () => boolean;
  focusOnObject: (object: THREE.Object3D) => void;
  exitFocus: () => void;
  showDetails: (details: ObjectDetails) => void;
  hideDetails: () => void;
}

export const useInteraction = create<InteractionState>((set, get) => ({
  raycaster: new THREE.Raycaster(),
  mouse: new THREE.Vector2(),
  camera: null,
  controls: null,
  interactiveObjects: [],
  hoveredObject: null,
  focusedObject: null,
  isInspecting: false,
  detailsVisible: false,
  currentObjectDetails: null,
  originalCameraPosition: null,
  originalControlsTarget: null,
  
  init: () => {
    // Setup event listeners
    window.addEventListener('mousemove', (event) => {
      const { updateMouse, checkIntersections, isInspecting } = get();
      
      // Only check intersections if not currently inspecting an object
      if (!isInspecting) {
        updateMouse(event.clientX, event.clientY);
        checkIntersections();
      }
    });
    
    window.addEventListener('click', () => {
      const { isInspecting, exitFocus, handleClick } = get();
      
      // If we're inspecting and click, exit inspection mode
      // Otherwise, try to handle the click on an interactive object
      if (isInspecting) {
        exitFocus();
      } else {
        handleClick();
      }
    });
    
    // Add escape key to exit focus mode
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && get().isInspecting) {
        get().exitFocus();
      }
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
  
  setControls: (controls) => set({ controls }),
  
  updateMouse: (x, y) => {
    const { mouse } = get();
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;
  },
  
  registerInteractiveObject: (
    object, 
    label, 
    type, 
    description, 
    callback?,
    links?: { text: string; url: string; icon?: string }[],
    isMonitor?: boolean
  ) => {
    // Store object info in userData
    object.userData.interactiveLabel = label;
    object.userData.interactiveType = type;
    object.userData.interactiveDescription = description;
    object.userData.interactiveCallback = callback;
    object.userData.interactiveLinks = links;
    object.userData.isMonitor = isMonitor;
    
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
    const { hoveredObject, focusOnObject } = get();
    
    if (hoveredObject) {
      // First check if there's a custom callback to run
      if (hoveredObject.userData.interactiveCallback) {
        hoveredObject.userData.interactiveCallback();
      }
      
      // Then focus on the object (zoom in)
      focusOnObject(hoveredObject);
      return true;
    }
    
    return false;
  },
  
  focusOnObject: (object) => {
    const { camera, controls } = get();
    
    if (!camera || !controls) return;
    
    // Store original camera position and controls target for returning later
    const originalPosition = camera.position.clone();
    const originalTarget = controls.target.clone();
    
    // Calculate position to focus on (in front of the object)
    const objectPosition = new THREE.Vector3();
    object.getWorldPosition(objectPosition);
    
    // Get object size to determine zoom distance
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Calculate a position in front of the object based on its orientation
    const objectDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(object.quaternion);
    const focusPosition = objectPosition.clone().add(
      objectDirection.multiplyScalar(maxDim * 1.5) // Position the camera at a distance proportional to the object size
    );
    
    // Create object details to display
    const details: ObjectDetails = {
      title: object.userData.interactiveLabel || "Object",
      description: object.userData.interactiveDescription || "No description available.",
      type: object.userData.interactiveType || "default",
      links: object.userData.interactiveLinks,
      isMonitor: object.userData.isMonitor
    };
    
    // Animate camera position and controls
    gsap.timeline()
      .to(camera.position, {
        x: focusPosition.x,
        y: focusPosition.y,
        z: focusPosition.z,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(controls.target, {
        x: objectPosition.x,
        y: objectPosition.y,
        z: objectPosition.z,
        duration: 1.5,
        ease: "power2.inOut",
        onStart: () => {
          // Disable controls during animation
          controls.enabled = false;
        },
        onComplete: () => {
          // Re-enable controls after animation
          controls.enabled = true;
          
          // Set state to show we're inspecting and show details panel
          set(state => ({ 
            isInspecting: true,
            focusedObject: object,
            originalCameraPosition: originalPosition,
            originalControlsTarget: originalTarget,
          }));
          
          // Show object details with a slight delay
          setTimeout(() => {
            get().showDetails(details);
          }, 300);
        }
      }, "<");
  },
  
  exitFocus: () => {
    const { camera, controls, originalCameraPosition, originalControlsTarget, hideDetails } = get();
    
    if (!camera || !controls || !originalCameraPosition || !originalControlsTarget) return;
    
    // Hide the details panel first
    hideDetails();
    
    // Then animate back to original position
    gsap.timeline()
      .to(camera.position, {
        x: originalCameraPosition.x,
        y: originalCameraPosition.y,
        z: originalCameraPosition.z,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(controls.target, {
        x: originalControlsTarget.x,
        y: originalControlsTarget.y,
        z: originalControlsTarget.z,
        duration: 1.5,
        ease: "power2.inOut",
        onStart: () => {
          // Disable controls during animation
          controls.enabled = false;
        },
        onComplete: () => {
          // Re-enable controls after animation
          controls.enabled = true;
          
          // Reset inspection state
          set({ 
            isInspecting: false,
            focusedObject: null,
            originalCameraPosition: null,
            originalControlsTarget: null
          });
        }
      }, "<");
  },
  
  showDetails: (details) => {
    set({ 
      detailsVisible: true,
      currentObjectDetails: details
    });
  },
  
  hideDetails: () => {
    set({ 
      detailsVisible: false,
      currentObjectDetails: null
    });
  }
}));
