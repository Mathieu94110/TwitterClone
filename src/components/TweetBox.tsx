import {
  MagnifyingGlassCircleIcon,
  FaceSmileIcon,
  CameraIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Tweet, TweetBody } from "../../typings";
import { fetchTweets } from "../../utils/fetchTweets";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  async function postTweet() {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImg:
        session?.user?.image ||
        "https://boutique-lamainbleue.com/wp-content/uploads/2016/09/female-silhouette.jpg",
      image: image,
    };

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast("Tweet Posté!", {
      icon: "🚀",
    });
    return json;
  }

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    postTweet();

    setInput("");
    setImage("");
    setImageUrlBoxIsOpen(false);
  };

  const addImageToTweet = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxIsOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={
          session?.user?.image ||
          "https://boutique-lamainbleue.com/wp-content/uploads/2016/09/female-silhouette.jpg"
        }
        alt=""
        className="mt-4 h-14 w-14 rounded-full"
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder={
              session ? "Que se passe t'il ?" : "Connectez vous pour tweeter..."
            }
          />
          <div className="flex">
            <div className="flex flex-1 space-x-2 text-twitter">
              <CameraIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />

              <MagnifyingGlassCircleIcon className="h-5 w-5" />
              <FaceSmileIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <MapPinIcon className="h-5 w-5" />
            </div>

            <button
              disabled={!input || !session}
              onClick={handleSubmit}
              className="text-white rounded-full bg-twitter px-5 py-2 font-bold disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 px-4 py-2">
              <input
                ref={imageInputRef}
                className="bg-transparent text-white placeholder:text-white flex-1 p-2 outline-none"
                placeholder="Renseigner une url d'image..."
                type="text"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="index:100 bh-white text-white ml-2 font-bold"
              >
                Ajouter l'image
              </button>
            </form>
          )}

          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
