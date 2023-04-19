import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet } from "../../typings";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ArrowsRightLeftIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { fetchComments } from "../../utils/fetchComments";
import { timeAgo } from "../../utils/timeAgo";

interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToast = toast.loading(
      "Commentaire en cours de publication..."
    );

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || "Utilisateur incoonu",
      profileImg:
        session?.user?.image ||
        "https://boutique-lamainbleue.com/wp-content/uploads/2016/09/female-silhouette.jpg",
    };

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    toast.success("Commentaire Posté !", {
      id: commentToast,
    });

    setInput("");
    setCommentBoxVisible(false);
    refreshComments();
  };

  return (
    <div
      key={tweet._id}
      className="border-gray-100 flex flex-col space-x-3 border-y p-5"
    >
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={
            tweet.profileImg ||
            "https://boutique-lamainbleue.com/wp-content/uploads/2016/09/female-silhouette.jpg"
          }
          alt={tweet.username}
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="text-gray-500 hidden text-sm sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()} ·
            </p>

            <p>{timeAgo(tweet._createdAt)}</p>
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              className="m-5 mb-1 ml-0 max-h-60  rounded-lg object-cover shadow-sm"
              alt={tweet.username}
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div
          onClick={(e) => session && setCommentBoxVisible(!commentBoxVisible)}
          className="text-gray-400 flex cursor-pointer items-center space-x-3"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="text-gray-400 flex cursor-pointer items-center space-x-3">
          <ArrowsRightLeftIcon className="h-5 w-5" />
        </div>
        <div className="text-gray-400 flex cursor-pointer items-center space-x-3">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="text-gray-400 flex cursor-pointer items-center space-x-3">
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-100 flex-1 rounded-lg p-2 outline-none"
            type="text"
            placeholder="Écrire un commentaire..."
          />
          <button
            disabled={!input}
            className="disabled:text-gray-200 text-twitter"
            type="submit"
          >
            Poster
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="border-gray-100 my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="text-gray-500 hidden text-sm lg:inline">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()} ·
                  </p>

                  <p>{timeAgo(comment._createdAt)}</p>
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
