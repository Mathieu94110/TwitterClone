import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { Tweet } from "../../typings";
import { fetchTweets } from "../../utils/fetchTweets";
import TweetComponent from "./Tweet";
import TweetBox from "./TweetBox";

interface Props {
  tweets: Tweet[];
}

function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Rafraichissement des données ...");

    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success("Contenu mis à jour !", {
      id: refreshToast,
    });
  };

  return (
    <div className="scrollbar-hide col-span-7 max-h-screen overflow-scroll border-x lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <TweetBox setTweets={setTweets} />
      </div>

      {/* Feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
      <Toaster />
    </div>
  );
}

export default Feed;
