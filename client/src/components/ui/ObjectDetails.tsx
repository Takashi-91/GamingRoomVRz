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

  // If this is a monitor, render the PC UI
  if (currentObjectDetails?.isMonitor) {
    return (
      <div
        className={cn(
          "fixed inset-0 flex items-center justify-center transition-all duration-500 ease-in-out pointer-events-auto",
          detailsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => exitFocus()} />
        
        <div className="relative bg-gray-900 w-full max-w-4xl h-3/4 rounded-lg overflow-hidden shadow-2xl border border-blue-500/50">
          {/* Monitor Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <h2 className="text-lg font-mono font-bold text-white">Portfolio - Terminal</h2>
            </div>
            
            <button 
              className="bg-transparent hover:bg-white/10 rounded-full p-1 text-white"
              onClick={() => exitFocus()}
              aria-label="Close window"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Monitor Content */}
          <div className="p-6 h-[calc(100%-4rem)] overflow-y-auto font-mono text-green-400 bg-gray-950 space-y-6">
            <div className="border-b border-gray-700 pb-4">
              <p className="text-xl font-bold mb-2">
                <span className="text-blue-400">~ </span>
                <span className="text-green-400">Portfolio</span>
                <span className="animate-pulse">_</span>
              </p>
              
              <div className="animate-typewriter overflow-hidden whitespace-nowrap">
                <p className="text-lg text-blue-300 mb-4">{currentObjectDetails?.title}</p>
                <p className="text-white/80 mb-4">{currentObjectDetails?.description}</p>
              </div>
            </div>
            
            {/* Projects and Links Section */}
            <div className="space-y-6">
              {/* Projects Section */}
              <div>
                <h3 className="text-xl text-purple-400 mb-4">$ ls ~/projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentObjectDetails?.links?.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors border border-gray-700 hover:border-blue-500"
                    >
                      <div className="flex items-center">
                        <span className="mr-2 text-xl">{link.icon || "🔗"}</span>
                        <span className="font-medium text-blue-300">{link.text}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-400 truncate">{link.url}</p>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Console Commands */}
              <div className="pt-4 border-t border-gray-700">
                <p className="text-gray-500 mb-2">Available commands:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex">
                    <span className="w-16 text-pink-400">help</span> 
                    <span className="text-gray-400">Display available commands</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-pink-400">exit</span> 
                    <span className="text-gray-400">Close terminal (ESC)</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-pink-400">view</span> 
                    <span className="text-gray-400">View project details</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-pink-400">contact</span> 
                    <span className="text-gray-400">My contact info</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard details panel for non-monitor objects
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
        
        {/* Links section if available */}
        {currentObjectDetails?.links && currentObjectDetails.links.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
            <h3 className="font-medium text-white/80">Related Links:</h3>
            <div className="space-y-2">
              {currentObjectDetails.links.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-2 bg-white/10 hover:bg-white/20 rounded text-blue-300 hover:text-blue-200 transition-colors"
                >
                  <span className="mr-2">{link.icon || "🔗"}</span>
                  <span>{link.text}</span>
                </a>
              ))}
            </div>
          </div>
        )}
        
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