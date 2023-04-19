import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { TwitterTimelineEmbed } from "react-twitter-embed";

function Widgets() {
  return (
    <div className="col-span-2 mt-2 hidden items-start px-2 lg:inline">
      {/* Search */}
      <div className="bg-gray-100 flex items-center space-x-2 rounded-full p-3">
        <MagnifyingGlassIcon className="text-gray-400 h-5 w-5 flex-shrink-0" />
        <input
          className="bg-transparent outline-none"
          type="text"
          placeholder="Rechercher sur twitter"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widgets;
