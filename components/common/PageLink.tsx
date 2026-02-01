import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import Link from "next/link";

function PageLink({ path, title }: { path: string; title: string }) {
  return (
    <div>
      <Link
        href={path}
        className="flex items-center gap-2 text-lg md:text-xl font-semibold  "
      >
        <ArrowLeftIcon className="w-3.5 h-3.5" /> {title}
      </Link>
    </div>
  );
}

export default PageLink;
