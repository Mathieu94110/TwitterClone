import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

const Home = () => {
  return (
    <div className="w-full h-screen mx-auto max-h-screen overflow-hidden ">
      <Head>
        <title>Twitter 2.0</title>
      </Head>
      <main className="h-full grid grid-cols-9">
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;
