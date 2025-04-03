import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { useInteraction, InteractiveObjectType } from "../../lib/stores/useInteraction";

// This component displays detailed information about objects when focused
export function ObjectDetails() {
  const detailsVisible = useInteraction((state) => state.detailsVisible);
  const currentObjectDetails = useInteraction((state) => state.currentObjectDetails);
  const exitFocus = useInteraction((state) => state.exitFocus);

  // State for animation
  const [isShowing, setIsShowing] = useState(false);
  
  // Set up animation trigger based on details visibility
  useEffect(() => {
    if (detailsVisible) {
      setIsShowing(true);
    } else {
      const timer = setTimeout(() => {
        setIsShowing(false);
      }, 300); // Delay to allow for fade-out animation
      return () => clearTimeout(timer);
    }
  }, [detailsVisible]);

  // Don't render anything if we have no details to show
  if (!isShowing) return null;

  // Get icon and color based on object type
  const { icon, color } = getObjectTypeStyles(currentObjectDetails?.type);

  return (
    <div
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white rounded-lg overflow-hidden transition-all duration-500 ease-in-out pointer-events-auto max-w-md w-full shadow-lg backdrop-blur-sm",
        detailsVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
      )}
    >
      {/* Header with object title and type */}
      <div 
        className="p-4 flex items-center border-b border-white/10"
        style={{ backgroundColor: color }}
      >
        <div className="mr-3 text-2xl">{icon}</div>
        <h2 className="text-lg font-bold">{currentObjectDetails?.title}</h2>
        
        <button 
          className="ml-auto bg-white/20 hover:bg-white/30 rounded-full p-1"
          onClick={() => exitFocus()}
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {/* Main content with description */}
      <div className="p-4">
        <p className="text-white/90 leading-relaxed">
          {currentObjectDetails?.description}
        </p>
        
        {/* Instructions */}
        <div className="mt-4 text-sm text-white/70 border-t border-white/10 pt-4">
          <p>Click anywhere or press Escape to exit focus mode.</p>
        </div>
      </div>
    </div>
  );
}

// Helper function to get icon and color based on object type
function getObjectTypeStyles(type?: InteractiveObjectType) {
  switch(type) {
    case "pc":
      return {
        icon: "💻",
        color: "rgba(52, 101, 164, 0.8)"
      };
    case "arcade":
      return {
        icon: "🕹️",
        color: "rgba(215, 55, 55, 0.8)"
      };
    case "vr":
      return {
        icon: "🥽",
        color: "rgba(173, 127, 168, 0.8)"
      };
    case "couch":
      return {
        icon: "🛋️",
        color: "rgba(78, 154, 6, 0.8)"
      };
    case "poster":
      return {
        icon: "🖼️",
        color: "rgba(196, 160, 0, 0.8)"
      };
    default:
      return {
        icon: "📌",
        color: "rgba(85, 87, 83, 0.8)"
      };
  }
}