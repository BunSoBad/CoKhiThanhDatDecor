type Props = {
  kicker?: string;
  title: string;
  description?: string;
  /** Dùng trên nền tối (ví dụ khối dự án tiêu biểu). */
  variant?: "default" | "onDark";
};

export default function SectionTitle({
  kicker,
  title,
  description,
  variant = "default",
}: Props) {
  const wrap =
    variant === "onDark" ? "section-title--dark" : "";
  return (
    <div className={`flex flex-col gap-3 ${wrap}`}>
      {kicker ? (
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          {kicker}
        </div>
      ) : null}
      <div
        className={`section-heading relative text-3xl font-semibold tracking-tight sm:text-4xl ${
          variant === "onDark" ? "text-slate-50" : "text-slate-950"
        }`}
      >
        {title}
      </div>
      {description ? (
        <div className="max-w-2xl text-sm leading-relaxed text-slate-500">
          {description}
        </div>
      ) : null}
    </div>
  );
}
