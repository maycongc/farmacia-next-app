export function Loader() {
  return (
    <div className="relative h-6 w-6">
      <div className="absolute inset-0 animate-ping rounded-full bg-brand-600/40" />
      <div className="absolute inset-[4px] rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
    </div>
  );
}
