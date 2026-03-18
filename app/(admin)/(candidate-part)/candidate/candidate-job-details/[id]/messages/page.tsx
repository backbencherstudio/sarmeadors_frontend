"use client";

import MessageUserSection from "@/components/common/message/MessageUserSection";
import Image from "next/image";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import MessageReactEmojiAction from "@/components/common/message/MessageReactEmojiAction";
import dynamic from "next/dynamic";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const chatMessages = [
  {
    id: 1,
    receiver_user: "Utso Sarkar",
    avatar: "https://i.pravatar.cc/40?img=5",
    last_seen: "Last Seen 09:40",
    message: [
      { type: "sender", content: "Hi", id: 1 },
      { type: "receiver", content: "Hello ", id: 2 },
      { type: "sender", content: "How are you?", id: 3 },
      {
        type: "receiver",
        content: "I'm doing well, thank you! How about you?",
        id: 4,
      },
      {
        type: "sender",
        content: "Fames eros urna, felis morbi a est est.",
        id: 5,
      },
      {
        type: "receiver",
        content: "Fames eros urna, felis morbi a est est.",
        id: 6,
      },
    ],
  },
  {
    id: 2,
    receiver_user: "Marilyn George",
    avatar: "https://i.pravatar.cc/40?img=10",
    last_seen: "Last Seen 10:20",
    message: [
      {
        type: "sender",
        content: "Fames eros urna, felis morbi a est est.",
        id: 7,
      },
      {
        type: "receiver",
        content: "Fames eros urna, felis morbi a est est.",
        id: 8,
      },
    ],
  },
];

function page() {
  const [selectedId, setSelectedId] = useState(chatMessages[0].id);
  const [inputValue, setInputValue] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState({ emoji: "", id: null });
  const activeChat = chatMessages.find((c) => c.id === selectedId)!;

  return (
    <div>
      <div className="h-full bg-white rounded-2xl border flex">
        {/* Sidebar */}
        <div className="max-w-[300px] w-full border-r flex flex-col">
          <MessageUserSection
            chatMessages={chatMessages}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            user={"client"}
          />
        </div>

        {/* Chat Section */}
        <div className="border-l w-full flex flex-col">
          {/* Header */}
          <div className="flex p-4! w-full items-center justify-between">
            <div className=" flex items-center gap-3">
              <Image
                src={activeChat.avatar}
                width={40}
                height={40}
                className="rounded-full"
                alt=""
              />
              <div>
                <p className="font-semibold text-lg text-headerColor">
                  {activeChat.receiver_user}
                </p>
                <p className="text-xs text-secondaryColor!">
                  {activeChat.last_seen}
                </p>
              </div>
            </div>
            <button className="cursor-pointer text-secondaryColor!">
              <BsThreeDotsVertical />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[540px] border-t overflow-y-auto p-6 space-y-4">
            {activeChat.message.map((msg, index) =>
              msg.type === "sender" ? (
                <div className="flex group items-center gap-2">
                  <div
                    key={index}
                    className="max-w-xs relative bg-bgColor border border-[#F3F4F6]! p-3 rounded-b-xl rounded-tr-xl text-sm"
                  >
                    {msg.content}
                    {selectedEmoji.id === msg.id && (
                      <p className="p-0.5 rounded-full shadow-md absolute -bottom-3 -right-2 bg-whiteColor">
                        {selectedEmoji.emoji}
                      </p>
                    )}
                  </div>
                  <div>
                    <MessageReactEmojiAction
                      setSelectedEmoji={setSelectedEmoji}
                      id={msg.id}
                    />
                  </div>
                </div>
              ) : (
                <div className="max-w-xs ml-auto">
                  <div className="flex items-center justify-end w-full   gap-2">
                    <div>
                      <MessageReactEmojiAction
                        setSelectedEmoji={setSelectedEmoji}
                        id={msg.id}
                      />
                    </div>
                    <div
                      key={index}
                      className="  border relative border-[#E5E7EB] bg-[#F3F4F6] text-headerColor p-3 rounded-b-xl rounded-tl-xl text-sm"
                    >
                      {msg.content}
                      {selectedEmoji.id === msg.id && (
                        <p className="p-0.5 rounded-full shadow-md absolute -bottom-3 -left-2 bg-whiteColor">
                          {selectedEmoji.emoji}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-3 mt-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write message here..."
              className="flex-1 px-4 py-2 focus:outline-none rounded-lg"
            />
            <button className="bg-black text-white px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
