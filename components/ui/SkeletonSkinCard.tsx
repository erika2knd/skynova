export default function SkeletonSkinCard() {
  return (
    <div
      className="animated-border rounded-3xl bg-gradient-to-r from-[#535EFE] via-[#680BE2] to-[#535EFE] p-[1px]"
      aria-busy="true"
      aria-label="Loading item"
    >
      <div className="rounded-3xl bg-[#1F2023] p-4 animate-pulse">
        <span className="sr-only">Loading…</span>

        {/* top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-white/10" />
            <div className="h-3 w-16 rounded bg-white/10" />
          </div>
          <div className="h-3 w-14 rounded bg-white/10" />
        </div>

        {/* image */}
        <div className="mt-6 flex justify-center">
          <div className="h-[70px] w-[170px] rounded-2xl bg-white/10" />
        </div>

        {/* title */}
        <div className="mt-6 space-y-3">
          <div className="h-4 w-40 rounded bg-white/10" />
          <div className="h-4 w-28 rounded bg-white/10" />

          <div className="flex items-center justify-between pt-1">
            <div className="h-3 w-14 rounded bg-white/10" />
            <div className="h-8 w-8 rounded-full bg-white/10" />
          </div>

          <div className="h-4 w-20 rounded bg-white/10" />
          <div className="h-3 w-10 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
