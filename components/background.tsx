export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="animate-float absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="absolute top-[40%] -left-40 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-fuchsia-600/10 blur-[130px]" />
    </div>
  );
}
