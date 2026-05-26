import { GripVertical, Lock } from "lucide-react";

function BlocksList({
  block,
  handleMove,
  isFixed = false,
}: {
  block: { id: string; name: string; describe: string };
  handleMove: () => void;
  isFixed?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <div className="w-5 flex items-center justify-center shrink-0">
          {isFixed ? (
            <Lock size={12} className="text-secondaryColor" />
          ) : (
            <button onClick={handleMove} className="cursor-pointer">
              <GripVertical className="md:w-5 w-4 h-4 md:h-5 text-secondaryColor" />
            </button>
          )}
        </div>
        <div className="px-4 py-2 flex-1 rounded-sm bg-bgColor border border-borderColor">
          <h3 className="text-headerColor text-sm font-medium">{block.name}</h3>
          <p className="text-secondaryColor line-clamp-1 text-xs">
            {block.describe}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlocksList;
