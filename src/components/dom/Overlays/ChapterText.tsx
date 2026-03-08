export default function ChapterText({ number, title, text }: { number: string; title: string; text: string }) {
    return (
        <div className="flex flex-col gap-4 max-w-2xl px-8">
            <span className="text-xs tracking-[0.3em] text-ghost font-mono uppercase">Chapter {number}</span>
            <h2 className="text-4xl text-mist font-sans">{title}</h2>
            <p className="text-base text-ghost leading-relaxed">{text}</p>
        </div>
    )
}
