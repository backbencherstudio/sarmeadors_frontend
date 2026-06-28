import EditeIcon from "@/components/icon/EditeIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import DeleteIcon from "@/public/icon/DeleteIcon";
import documentBlackIcon from "@/public/icon/RequiredBalackIcon.png";
import documentGreenIcon from "@/public/icon/requiredGreenIcon.png";
import { RequiredDocument } from "@/types";
import Image from "next/image";

function CandidateDocumentCard({
  item,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  onUpload,
}: {
  item: RequiredDocument;
  isLoading?: boolean;
  onView?: (item: RequiredDocument) => void;
  onEdit?: (item: RequiredDocument) => void;
  onDelete?: (item: RequiredDocument) => void;
  onUpload?: (item: RequiredDocument) => void;
}) {
  return (
    <div className="rounded-xl border border-borderColor hover:shadow-lg transition-shadow duration-200 bg-bgColor px-6 py-10">
      <div className="mx-auto flex w-full  flex-col items-center text-center">
        <Image
          src={!item.can_upload ? documentGreenIcon : documentBlackIcon}
          alt="Document status"
          width={82}
          height={82}
          priority={false}
        />

        <h3 className="mt-4 text-xl font-semibold text-headerColor">
          {item.title}
        </h3>
        <p className="mt-1 text-base text-secondaryColor">{item.description}</p>

        {/* {item.previewUrl && !item.previewType?.startsWith("image/") && (
          <p className="mt-2 max-w-[240px] truncate text-sm text-secondaryColor">
            {item.previewName}
          </p>
        )} */}

        <div className="mt-5 flex items-center gap-2">
          {!item.can_upload ? (
            <>
              <ButtonReuseable
                type="button"
                title=" View"
                onClick={() => onView?.(item)}
                className=" rounded-lg bg-headerColor px-6! py-2.5! text-sm! font-medium text-whiteColor hover:bg-headerColor/90"
              />

              <ButtonReuseable
                type="button"
                icon={<EditeIcon className="w-4 h-4 !text-headerColor" />}
                onClick={() => onEdit?.(item)}
                className="px-6! py-3! rounded-lg border border-borderColor bg-whiteColor text-headerColor"
              />

              <ButtonReuseable
                type="button"
                icon={
                  <DeleteIcon className="w-4 h-4 text-redColor fill-headerColor " />
                }
                onClick={() => onDelete?.(item)}
                className="px-6! py-3! rounded-lg border border-borderColor bg-whiteColor "
              />
            </>
          ) : (
            <ButtonReuseable
              type="button"
              title="Upload"
              onClick={() => onUpload?.(item)}
              className="px-6! py-2.5! "
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateDocumentCard;
