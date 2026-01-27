import InformationIcon from "@/public/icon/InformationIcon";

export default function HoverInfo({ info, side }: { info: string, side: string }) {
    return (
        <div className="relative group cursor-pointer">
            <InformationIcon />
            <div className={`w-48 absolute ${side} mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200  pointer-events-none z-10`}>
                {info}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-4 border-transparent border-t-gray-900"></div>
                </div>
            </div>
        </div>
    )
}
