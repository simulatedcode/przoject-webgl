export default function ScrollHint() {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="uppercase text-[10px] tracking-[0.2em] font-mono">Scroll to explore</span>
            <div className="w-px h-8 bg-linear-to-b from-white to-transparent" />
        </div>
    )
}
