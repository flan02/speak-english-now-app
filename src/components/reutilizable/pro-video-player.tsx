import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type ProVideoPlayerProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
};

export default function ProVideoPlayer({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  className,
}: ProVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Solo necesitamos saber si el video "ya arrancó" una vez
  const [hasStarted, setHasStarted] = useState(autoPlay);

  // Autogenerar poster de Cloudinary
  const effectivePoster = poster || (src.includes("cloudinary") ? src.replace(/\.mp4$/i, ".jpg") : undefined);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.volume = 0;
      videoRef.current.play();
      setHasStarted(true); // Marcar que ya inició
    }
  };

  return (
    <div className={cn("relative w-full aspect-video group rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800", className)}>

      {/* 1. IMAGEN DE FONDO Y BOTÓN CUSTOM (Desaparecen juntos al iniciar) */}
      {!hasStarted && (
        <>
          {effectivePoster && (
            <img
              src={effectivePoster}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
          )}

          <div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-all cursor-pointer"
            onClick={handlePlayButtonClick}
          >
            <div className="bg-white/30 backdrop-blur-md p-4 rounded-full shadow-2xl transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/40">
              <Play className="text-white h-8 w-8 md:h-10 md:w-10 fill-current pl-1" />
            </div>
          </div>
        </>
      )}

      {/* 2. EL VIDEO NATIVO (Toma el control absoluto al arrancar) */}
      <video
        ref={videoRef}
        src={src}
        controls={hasStarted} // Muestra controles reales cuando arranca
        preload="metadata"
        autoPlay={autoPlay}
        loop={loop}
        muted={true}
        className="relative z-0 w-full h-full object-contain bg-black"
      />
    </div>
  );
}
// import { useRef, useState } from "react";
// import { Play, Pause } from "lucide-react"; // Asumiendo lucide-react
// import { cn } from "@/lib/utils";

// type ProVideoPlayerProps = {
//   src: string;
//   poster?: string; // Lo hago opcional para autogenerarlo
//   autoPlay?: boolean;
//   loop?: boolean;
//   muted?: boolean;
//   className?: string;
// };

// export default function ProVideoPlayer({
//   src,
//   poster,
//   autoPlay = false,
//   loop = false,
//   muted = false,
//   className,
// }: ProVideoPlayerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isPlaying, setIsPlaying] = useState(autoPlay);
//   const [hasStarted, setHasStarted] = useState(autoPlay);

//   // VIBE MAGIC: Autogenerar poster de Cloudinary si no viene uno explícito
//   // Cambia la extensión .mp4 por .jpg automáticamente
//   const effectivePoster = poster || (src.includes("cloudinary") ? src.replace(/\.mp4$/i, ".jpg") : undefined);

//   const handlePlayButtonClick = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//         setHasStarted(true); // Marcar que ya se inició al menos una vez
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className={cn("relative w-full aspect-video group rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800", className)}>
//       {/* 1. IMAGEN DE FONDO (Fallback visual robusto) */}
//       {/* Se muestra siempre detrás, así si el video tarda en cargar, se ve esto */}
//       {!isPlaying && effectivePoster && (
//         <img
//           src={effectivePoster}
//           alt="Video thumbnail"
//           className="absolute inset-0 w-full h-full object-cover z-10"
//         />
//       )}

//       {/* 2. EL VIDEO */}
//       <video
//         ref={videoRef}
//         src={src}
//         // Quitamos el poster nativo para usar nuestra img controlada
//         // poster={effectivePoster}
//         controls={hasStarted} // Ocultamos controles nativos iniciales para que se vea limpio
//         preload="metadata"
//         autoPlay={autoPlay}
//         loop={loop}
//         muted={muted}
//         onPlay={() => setIsPlaying(true)}
//         onPause={() => setIsPlaying(false)}
//         onEnded={() => setIsPlaying(false)}
//         className="relative z-0 w-full h-full object-contain bg-black"
//       />

//       {/* 3. OVERLAY Y BOTÓN DE PLAY (Z-Index alto para estar encima de la imagen) */}
//       {!isPlaying && (
//         <div
//           className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-all cursor-pointer"
//           onClick={handlePlayButtonClick}
//         >
//           <div className="bg-white/30 backdrop-blur-md p-4 rounded-full shadow-2xl transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/40">
//             <Play className="text-white h-8 w-8 md:h-10 md:w-10 fill-current pl-1" />
//           </div>
//         </div>
//       )}

//       {/* 4. Controles nativos aparecen solo al reproducir si quieres */}
//       {isPlaying && (
//         <div
//           className="absolute inset-0 z-30"
//           onClick={(e) => {
//             // Truco: Permitir clic para pausar, pero dejar pasar eventos a controles
//             // Si prefieres controles nativos del navegador al dar play:
//             videoRef.current?.setAttribute("controls", "true");
//           }}
//         />
//       )}
//     </div>
//   );
// }
