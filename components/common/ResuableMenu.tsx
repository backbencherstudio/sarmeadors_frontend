"use client";
import { usePathname } from "next/navigation";
import LinkReuseable from "../reusable/CustomLink";

function ResuableMenu({
  menuData,
  initialPath,
}: {
  menuData: { id: number; title: string; href: string }[];
  initialPath?: string;
}) {
  const pathName = usePathname();
  const isActive = (href: string): boolean => {
    if (href === initialPath) {
      return pathName === initialPath;
    }
    return pathName.startsWith(href);
  };
  return (
    <div className=" overflow-x-auto">
      <div className=" mt-2 max-w-[100%] md:max-w-auto w-full flex items-center  border-b border-borderColor">
        {menuData.map((menu) => (
          <LinkReuseable
            key={menu.id}
            href={menu.href}
            title={menu.title}
            className={`text-base font-medium hover:text-headerColor  pb-2 px-3 ${isActive(menu.href) ? "text-headerColor transition-all duration-200   border-b border-headerColor" : "text-lightblackColor"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ResuableMenu;
