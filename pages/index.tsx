import { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <form className="flex flex-col space-y-2 p-5">
      <input
        type={"text"}
        required
        placeholder="Username"
        className="border p-1 peer border-gray-400"
      />
      <span className="hidden peer-invalid:block peer-invalid:text-red-500">
        This input is invalid
      </span>
      <input type={"submit"} value="Login" className="bg-white" />
    </form>
  );
};

export default Home;
