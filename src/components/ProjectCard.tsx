import Link from "next/link";
import type { ProjectLite } from "@/lib/data";

type CardVariant = "tall" | "wide";

function ProjectImage({
  coverImageUrl,
  name,
  variant,
}: {
  coverImageUrl?: string | null;
  name: string;
  variant: CardVariant;
}) {
  const frameClass =
    variant === "wide"
      ? "aspect-[16/10] w-full"
      : "h-80 w-full md:h-96";

  if (coverImageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <div className={`overflow-hidden rounded-2xl ${frameClass}`}>
        <img
          src={coverImageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`flex items-end overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-700 p-4 text-white ${frameClass}`}
    >
      <div className="text-sm font-semibold leading-snug">{name}</div>
    </div>
  );
}

export default function ProjectCard({
  project,
  variant = "tall",
}: {
  project: ProjectLite;
  variant?: CardVariant;
}) {
  const titleClass =
    variant === "wide"
      ? "text-lg font-bold tracking-tight transition-colors duration-200 hover:!text-amber-500 sm:text-xl"
      : "text-base font-bold tracking-tight transition-colors duration-200 hover:!text-amber-500 sm:text-lg";

  const cardMinHeight =
    variant === "wide" ? "min-h-[22rem] sm:min-h-[26rem]" : "min-h-[26rem] md:min-h-[34rem]";
  const paddingClass = variant === "wide" ? "p-4 sm:p-5" : "p-3 sm:p-4";

  return (
    <div
      className={`card-glow flex h-full ${cardMinHeight} flex-col overflow-hidden border border-slate-200/90 bg-white text-slate-950 antialiased`}
    >
      <ProjectImage
        coverImageUrl={project.coverImageUrl}
        name={project.nameVi}
        variant={variant}
      />
      <div className={`flex min-h-0 flex-1 flex-col ${paddingClass}`}>
        <Link
          href={`/du-an/${project.slug}`}
          className={titleClass}
        >
          {project.nameVi}
        </Link>
        {project.summary ? (
          <div className="mt-2 text-sm leading-relaxed text-slate-700 line-clamp-2">
            {project.summary}
          </div>
        ) : null}

        <div className="mt-auto">
          <Link
            href={`/du-an/${project.slug}`}
            className="btn-primary px-4 py-3 text-sm font-semibold"
          >
            Xem case
          </Link>
        </div>
      </div>
    </div>
  );
}
