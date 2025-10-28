import { Heart } from "lucide-react";

export const HeartAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-medical opacity-20 blur-3xl animate-pulse-slow" />
      <Heart className="w-32 h-32 text-primary animate-float" strokeWidth={1.5} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 border-2 border-primary/20 rounded-full animate-ping" />
      </div>
    </div>
  );
};
