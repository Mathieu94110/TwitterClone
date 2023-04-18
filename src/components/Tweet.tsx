import { Tweet } from "../../typings";

interface Props {
  tweet: Tweet;
}

export function TweetComponent({ tweet }: Props) {
  return (
    <div className="border-gray-100 flex flex-col space-x-3 border-y p-5 ">
      <div className="flex space-x-3">
        <img
          src={tweet.profileImg}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="text-gray-500 hidden text-sm sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>
            <p className="text-sm">Il y a {tweet._createdAt}</p>
          </div>
          <p>{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 mb-1 ml-0 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}
