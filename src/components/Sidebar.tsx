import SidebarRow from "./SideBarRow";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  ShoppingBagIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

function Sidebar() {
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img
        src="https://ra.ac.ae/wp-content/uploads/2020/01/logo-twitter-icon-symbol-0.png"
        className="m-3 h-10 w-10"
      />
      <SidebarRow Icon={HomeIcon} title="Accueil" />
      <SidebarRow Icon={HashtagIcon} title="Explorer" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={EnvelopeIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Signets" />
      <SidebarRow Icon={ShoppingBagIcon} title="Listes" />
      <SidebarRow Icon={UserIcon} title="Se connecter" />
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="Plus" />
    </div>
  );
}

export default Sidebar;
