import { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-20 grid gap-10 min-h-screen">
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <span className="font-semibold text-3xl">Select Item</span>
        <ul>
          {[1, 2, 3, 4, 5].map((v) => (
            <div
              key={v}
              className="flex justify-between my-2 odd:bg-blue-50 even:bg-yellow-500"
            >
              <span className="text-gray-500">Grey Chair</span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
        </ul>
        <ul>
          {["a", "b", "c", ""].map((v, i) => (
            <li key={i} className="bg-red-500 py-2 empty:bg-blue-500">
              {v}
            </li>
          ))}
        </ul>
        <div className="pt-2 border-t-2 mt-2 border-dashed flex justify-between">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <button className="mt-5 bg-blue-500 text-white text-center py-3 rounded-xl w-3/5 mx-auto hover:bg-teal-500">
          Checkout
        </button>
      </div>
      <div className="bg-white overflow-hidden rounded-3xl shadow-xl">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-3xl p-6 relative -top-5 bg-white">
          <div className="flex justify-between items-end relative -top-16">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-red-400 rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium"># 340</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-16 -mb-5">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <div className="flex mt-5 mb-3 justify-between items-center">
          <span className="">🔙</span>
          <div className="space-x-3">
            <span className="">⭐ 4.9</span>
            <span className="shadow-xl p-2 rounded-md">❤️</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5" />
        <div className="flex flex-col">
          <span className="font-medium text-xl">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-2">
              <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
              <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
              <button className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-200 rounded-lg flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                -
              </button>
              <span className="">1</span>
              <button className="bg-blue-200 rounded-lg flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-2xl">$450</span>
            <span className="bg-blue-500 py-2 px-8 text-center text-xs text-white rounded-lg">
              Add to cart
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-xl"></div>
    </div>
  );
};

export default Home;
