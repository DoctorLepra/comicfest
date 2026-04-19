import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RegistroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistroModal({ isOpen, onClose }: RegistroModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Submit logic here
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/50 hover:text-white transition-colors"
          >
            <X size={40} strokeWidth={1} />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full max-w-2xl max-h-[100vh] overflow-y-auto hide-scrollbar"
          >
            <div className="flex flex-col items-center">
              {/* Optional top spacer or logo container */}
              <div className="w-full max-w-sm h-16 bg-white mb-8 hidden"></div>

              <div className="text-center mb-10">
                <h2 className="text-cf-yellow text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase mb-1">
                  REGISTRO DE EXPOSITORES
                </h2>
                <p className="text-white text-sm sm:text-base font-body">
                  Registro valido unicamente para expositores nuevos.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white font-display font-bold text-sm">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="bg-transparent border border-cf-yellow rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cf-yellow/50 transition-shadow"
                    />
                  </div>

                  {/* Apellidos */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white font-display font-bold text-sm">
                      Apellidos <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="bg-transparent border border-cf-yellow rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cf-yellow/50 transition-shadow"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex flex-col gap-2">
                  <label className="text-white font-display font-bold text-sm">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="bg-transparent border border-cf-yellow rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cf-yellow/50 transition-shadow w-full"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Link Instagram */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white font-display font-bold text-sm">
                      Link Instagram <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      className="bg-transparent border border-cf-yellow rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cf-yellow/50 transition-shadow"
                    />
                  </div>

                  {/* Nombre de marca */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white font-display font-bold text-sm">
                      Nombre de marca <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="bg-transparent border border-white/20 focus:border-red-500 rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-shadow"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-white font-display font-bold text-sm">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="bg-transparent border border-cf-yellow rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cf-yellow/50 transition-shadow w-full"
                  />
                </div>

                {/* Contraseña */}
                <div className="flex flex-col gap-2 mb-8">
                  <label className="text-white font-display font-bold text-sm">
                    Contraseña <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    className="bg-transparent border border-cf-yellow rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cf-yellow/50 transition-shadow w-full"
                  />
                </div>

                <p className="text-white text-xs font-body mt-8 leading-relaxed max-w-[95%] text-left">
                  Enviado el formulario, nuestro equipo comercial revisará tu registro como expositor, una vez aprobado, recibirás la confirmación a tu correo electrónico y así tener acceso a los beneficios de la plataforma de reservas de stands.
                </p>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-cf-yellow text-black font-display font-black px-12 py-4 rounded-full hover:bg-cf-yellow-light transition-all duration-200 hover:scale-105"
                  >
                    {loading ? "ENVIANDO..." : "ENVIAR REGISTRO"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
