import EditeIcon from "@/components/icon/EditeIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import DeleteIcon from "@/public/icon/DeleteIcon";
import documentBlackIcon from "@/public/icon/RequiredBalackIcon.png";
import documentGreenIcon from "@/public/icon/requiredGreenIcon.png";
import Image from "next/image";
import CandidateDocumentCardSkeleton from "./CandidateDocumentCardSkeleton";

export type CandidateDocumentItem = {
  id: number;
  title: string;
  subtitle: string;
  isUploaded: boolean;
};

function CandidateDocumentCard({
  item,
  isLoading = false,
}: {
  item: CandidateDocumentItem;
  isLoading?: boolean;
}) {
  if (isLoading) return <CandidateDocumentCardSkeleton />;

  return (
    <div className="rounded-xl border border-borderColor hover:shadow-lg transition-shadow duration-200 bg-bgColor px-6 py-10">
      <div className="mx-auto flex w-full  flex-col items-center text-center">
        <Image
          src={item.isUploaded ? documentGreenIcon : documentBlackIcon}
          alt="Document status"
          width={82}
          height={82}
          priority={false}
        />

        <h3 className="mt-4 text-xl font-semibold text-headerColor">
          {item.title}
        </h3>
        <p className="mt-1 text-base text-secondaryColor">{item.subtitle}</p>

        <div className="mt-5 flex items-center gap-2">
          {item.isUploaded ? (
            <>
              <ButtonReuseable
                type="button"
                title=" View"
                className=" rounded-lg bg-headerColor px-6! py-2.5! text-sm! font-medium text-whiteColor hover:bg-headerColor/90"
              />

              <ButtonReuseable
                type="button"
                icon={<EditeIcon className="w-4 h-4 !text-headerColor" />}
                className="px-6! py-3! rounded-lg border border-borderColor bg-whiteColor text-headerColor"
              />

              <ButtonReuseable
                type="button"
                icon={
                  <DeleteIcon className="w-4 h-4 text-redColor fill-headerColor " />
                }
                className="px-6! py-3! rounded-lg border border-borderColor bg-whiteColor "
              />
            </>
          ) : (
            <ButtonReuseable
              type="button"
              title="Upload"
              className="px-6! py-2.5! "
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateDocumentCard;
