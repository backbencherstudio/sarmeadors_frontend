import StarIcon from "@/components/icon/StarIcon";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

function ReviewCard({ item }) {
  function Rating({ value }: { value: number }) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <StarIcon className="h-4 w-4 md:w-5 md:h-5 fill-ratingColor text-ratingColor" />
        <span className="text-base font-medium">({value.toFixed(1)})</span>
      </div>
    );
  }
  return (
    <div>
      <Card
        key={item.id}
        className="p-4 md:p-6 shadow-none border border-borderColor"
      >
        <CardContent className="space-y-4 px-0">
          <div className="flex items-start gap-3">
            <div className="relative h-10 w-10 md:w-14 md:h-14 shrink-0 overflow-hidden rounded-full border bg-muted">
              {item.avatarUrl ? (
                <Image
                  src={item.avatarUrl}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full "
                />
              ) : null}
            </div>

            <div className="min-w-0">
              <div className="truncate text-base md:text-lg font-medium">
                {item.name}
              </div>
              <div className="truncate text-sm text-descriptionColor">
                {item.role}
              </div>
            </div>
          </div>

          <p className="text-sm md:text-base line-clamp-4 xl:pr-10 text-muted-foreground pb-4 ">
            {item.message}
          </p>

          <div className="flex items-center justify-between">
            <Rating value={item.rating} />
            <span className="text-base font-medium">{item.date}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReviewCard;
