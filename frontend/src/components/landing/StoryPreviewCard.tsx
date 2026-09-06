import StoryPreviewRow from "./StoryPreviewRow";

interface StorySegment {
  label: string;
  content: string;
}

interface StoryPreviewCardProps {
  title?: string;
  segments: readonly StorySegment[];
}

export default function StoryPreviewCard({
  title = "스토리 구조 미리보기",
  segments,
}: StoryPreviewCardProps) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-[28px] bg-white p-8 shadow-[0_8px_12px_rgba(15,23,42,0.04)] lg:w-[500px] lg:shrink-0">
      <p className="text-base font-extrabold text-text-primary">{title}</p>
      <div className="flex flex-col gap-3">
        {segments.map((segment) => (
          <StoryPreviewRow
            key={segment.label}
            label={segment.label}
            content={segment.content}
          />
        ))}
      </div>
    </div>
  );
}
