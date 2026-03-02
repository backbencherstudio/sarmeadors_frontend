import Image from "next/image";

export default function Page() {
    return (
        <div className="h-screen">
            <div className="h-full bg-white rounded-2xl shadow flex overflow-hidden">

                {/* Sidebar */}
                <div className="w-[300px] border-r flex flex-col">
                    <div className="p-4 border-b">
                        <input
                            type="text"
                            placeholder="Search Message"
                            className="w-full px-3 py-2 rounded-lg border text-sm"
                        />
                    </div>

                    <div className="flex px-4 gap-6 border-b text-sm">
                        <button className="py-2 border-b-2 border-black font-medium">
                            Admin
                        </button>
                        <button className="py-2 text-gray-500">
                            Candidate(2)
                        </button>
                    </div>

                    {/* User */}
                    <div className="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                        <Image
                            src="https://i.pravatar.cc/40"
                            width={40}
                            height={40}
                            className="rounded-full"
                            alt=""
                        />
                        <div className="flex-1">
                            <p className="font-medium text-sm">Davis Rosser</p>
                            <p className="text-xs text-gray-500 truncate">
                                Sure let me tell you about what we...
                            </p>
                        </div>
                        <span className="text-xs text-gray-400">2m</span>
                        <span className="bg-red-500 text-white text-xs px-2 rounded-full">
                            2
                        </span>
                    </div>
                </div>

                {/* Chat Section */}
                <div className="flex-1 flex flex-col">

                    {/* Header */}
                    <div className="p-4 border-b flex items-center gap-3">
                        <Image
                            src="https://i.pravatar.cc/40?img=5"
                            width={40}
                            height={40}
                            className="rounded-full"
                            alt=""
                        />
                        <div>
                            <p className="font-semibold">Marilyn George</p>
                            <p className="text-xs text-gray-400">Last Seen 09:40</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">

                        {/* Sender */}
                        <div className="max-w-xs bg-gray-200 p-3 rounded-xl text-sm">
                            Fames eros urna, felis morbi a est est.
                        </div>

                        {/* Voice */}
                        <div className="max-w-xs bg-gray-200 p-3 rounded-xl text-sm flex items-center gap-3">
                            ▶️ ▮▮▮▮▮ 00:24
                        </div>

                        {/* My Message */}
                        <div className="ml-auto max-w-xs bg-gray-800 text-white p-3 rounded-xl text-sm">
                            Hello Marilyn! consectetur adipiscing elit ames.
                            <p className="text-xs text-gray-300 text-right mt-1">09:10 ✓✓</p>
                        </div>

                        {/* Reaction */}
                        <div className="ml-auto bg-white shadow px-4 py-2 rounded-full text-xl w-fit">
                            😍 😮 ❤️ 👍 👏
                        </div>

                        {/* Image Message */}
                        <div className="ml-auto max-w-sm bg-white p-2 rounded-xl shadow">
                            <Image
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                                width={300}
                                height={200}
                                className="rounded-lg"
                                alt=""
                            />
                            <p className="text-sm mt-2">
                                Find out who is in charge of this portion of the process.
                            </p>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Write message here..."
                            className="flex-1 px-4 py-2 border rounded-lg"
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