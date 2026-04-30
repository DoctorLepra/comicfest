export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Bienvenido al Panel de Control</h1>
        <p className="text-white/60 text-sm">Aquí podrás administrar todos los aspectos de Comicfest.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
        <div className="w-16 h-16 rounded-full bg-cf-yellow/10 flex items-center justify-center mb-4">
          <span className="text-cf-yellow text-2xl">📊</span>
        </div>
        <h2 className="text-xl font-display font-semibold text-white/80 mb-2">Métricas y Resumen</h2>
        <p className="text-white/50 text-sm max-w-md text-center">
          Próximamente aquí verás los gráficos de ventas de entradas, volumen de formularios recibidos y estadísticas clave.
        </p>
      </div>
    </div>
  );
}
