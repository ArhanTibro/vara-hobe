import React from "react";

const ChatContents = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <ul>
          <li>
            <h1 className="mx-2 font-semibold">Azad Ragib Nehal</h1>
          </li>
          <li>
            <div className="flex bg-slate-300 rounded-md ">
              <p className="flex m-2 px-2 py-1 text-[#000000] text-2xl">
                Hello
              </p>
            </div>
          </li>
          <li>
            <h1 className="mx-2 text-sm">10:00 AM</h1>
          </li>
        </ul>
      </div>
      <div className="flex justify-start">
        <ul>
          <li>
            <h1 className="mx-2 font-semibold">Arhan Tibro</h1>
          </li>
          <li>
            <div className="flex bg-blue-300 rounded-md ">
              <p className="flex m-2 px-2 py-1 text-[#000000] text-2xl">
                Are you interested in the property?
              </p>
            </div>
          </li>
          <li>
            <h1 className="mx-2 text-sm">10:01 AM</h1>
          </li>
        </ul>
      </div>
      <div className="flex justify-end">
        <ul>
          <li>
            <h1 className="mx-2 font-semibold">Azad Ragib Nehal</h1>
          </li>
          <li>
            <div className="flex bg-slate-300 rounded-md ">
              <p className="flex m-2 px-2 py-1 text-[#000000] text-2xl">
                Yes, I am
              </p>
            </div>
          </li>
          <li>
            <h1 className="mx-2 text-sm">10:02 AM</h1>
          </li>
        </ul>
      </div>
      <div className="flex justify-end">
        <ul>
          <li>
            <h1 className="mx-2 font-semibold">Azad Ragib Nehal</h1>
          </li>
          <li>
            <div className="flex bg-slate-300 rounded-md ">
              <p className="flex m-2 px-2 py-1 text-[#000000] text-2xl">
                Is the price negotiable?
              </p>
            </div>
          </li>
          <li>
            <h1 className="mx-2 text-sm">10:02 AM</h1>
          </li>
        </ul>
      </div>
      <div className="flex justify-start">
        <ul>
          <li>
            <h1 className="mx-2 font-semibold">Arhan Tibro</h1>
          </li>
          <li>
            <div className="flex bg-blue-300 rounded-md ">
              <p className="flex m-2 px-2 py-1 text-[#000000] text-2xl">
                Sorry, it is not
              </p>
            </div>
          </li>
          <li>
            <h1 className="mx-2 text-sm">10:05 AM</h1>
          </li>
        </ul>
      </div>
      <div className="flex justify-end">
        <ul>
          <li>
            <h1 className="mx-2 font-semibold">Azad Ragib Nehal</h1>
          </li>
          <li>
            <div className="flex bg-slate-300 rounded-md ">
              <p className="flex m-2 px-2 py-1 text-[#000000] text-2xl">
                I am a student. Can you consider?
              </p>
            </div>
          </li>
          <li>
            <h1 className="mx-2 text-sm">10:05 AM</h1>
          </li>
        </ul>
      </div>
      <div className="flex justify-start">
        <ul>
          <li>
            <h1 className="mx-2 font-semibold">Arhan Tibro</h1>
          </li>
          <li>
            <div className="flex bg-blue-300 rounded-md ">
              <p className="flex m-2 px-2 py-1 text-[#000000] text-2xl">No</p>
            </div>
          </li>
          <li>
            <h1 className="mx-2 text-sm">10:10 AM</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatContents;
