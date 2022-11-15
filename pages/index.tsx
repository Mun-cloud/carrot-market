import { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2 p-5">
      <details className="select-none ">
        <summary className="cursor-pointer">What is my fav. food.</summary>
        <span className="selection:bg-cyan-400">김치</span>
      </details>
    </div>
  );
};

export default Home;
