import { MouseEventHandler, SVGProps } from "react";

interface Props {
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  onClick?: () => {};
}

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.()}
      className="hover:bg-gray-100 group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200"
    >
      <Icon className="h-6 w-6" />
      <p className="hidden text-base font-light group-hover:text-twitter md:inline-flex lg:text-xl">
        {title}
      </p>
    </div>
  );
}

export default SidebarRow;
