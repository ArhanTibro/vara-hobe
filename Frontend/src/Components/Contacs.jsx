import React, { useState } from "react";
import { CirclePlus } from "lucide-react";
import SearchBar from "./SearchBar";
import profile from "../assets/profile.jpg";

const profiles = [
  {
    images: [profile],
    name: "lorem ipsum1",
    lastChat: "lorem ipsum lorem ipsum lorem ipsum",
  },

  {
    images: [profile],
    name: "lorem ipsum2",
    lastChat: "lorem ipsum lorem ipsum lorem ipsum",
  },
  {
    images: [profile],
    name: "lorem ipsum3",
    lastChat: "lorem ipsum lorem ipsum lorem ipsum",
  },
];

const Contacs = () => {
  return (
    <div className="m-4 rounded-md flex flex-col w-1/4 min-h-screen  bg-[#C0BCB5] ">
      <div>
        <ul className="mx-2 flex justify-between">
          <li>
            <h1 className="my-1 text-[#000000] text-3xl font-bold">Chats</h1>
          </li>
          <li>
            <button className="my-3 hover:opacity-40">
              <CirclePlus />
            </button>
          </li>
        </ul>
      </div>
      <div className="m-1 p-1">
        <SearchBar />
      </div>
      <div className="p-2">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex flex-row items-center bg-white p-2 my-2 rounded-lg w-full"
          >
            <img
              src={profile.images}
              className="w-16 h-16 mx-2 rounded-full object-cover mb-2"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-lg text-gray-800">
                {profile.name}
              </p>
              <p className="text-s text-gray-500">{profile.lastChat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacs;
