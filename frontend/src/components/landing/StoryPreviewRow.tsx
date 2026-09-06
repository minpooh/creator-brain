interface StoryPreviewRowProps {
  label: string;
  content: string;
}

export default function StoryPreviewRow({
  label,
  content,
}: StoryPreviewRowProps) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-lg bg-surface p-3 sm:flex-row sm:items-center sm:gap-3">
      <p className="w-[100px] shrink-0 text-xs font-bold text-primary">{label}</p>
      <p className="min-w-0 flex-1 text-xs text-text-primary">{content}</p>
    </div>
  );
}
