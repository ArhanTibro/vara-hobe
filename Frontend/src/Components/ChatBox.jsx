import React from "react";
import Contacs from "./Contacs";
import { EllipsisVertical } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import ChatContents from "./ChatContents";

const InputField = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center p-2">
      <div className="relative w-full">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full py-2 pl-10 pr-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
          <CirclePlus />
        </span>
      </div>
    </div>
  );
};

const ChatBox = () => {
  return (
    <div className="m-4 rounded-md flex w-3/4 min-h-screen flex-col bg-[#C0BCB5] justify-end">
      <ul className="p-2 flex justify-between items-center">
        <li>
          <h1 className=" text-[#000000] text-2xl font-bold">Arhan Tibro</h1>
        </li>
        <li>
          <button className="hover:opacity-40">
            <EllipsisVertical />
          </button>
        </li>
      </ul>
      <div className="mx-2 bg-white flex-grow rounded-md p-2">
        <ChatContents />
      </div>
      <div>
        <InputField />
      </div>
    </div>
  );
};

export default ChatBox;
