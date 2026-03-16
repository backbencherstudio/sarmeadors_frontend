import ArrowDownIcon from "@/components/icon/ArrowDownIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    question: "Please describe your family schedule.",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    question:
      "Please describe an household tasks our nanny will be expected to perform",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    question:
      "Please describe your family philosophies regarding childcare. discipline, etc.",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    question: "Do you encourage play dates? If so, in your home or away.",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    question: "Please explain any special privileges given to the nanny",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    question: "Describe your home",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance. ",
  },
  {
    question: "Describe your neighborhood",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    question: "Describe your overall experience with nannies",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    question:
      "If family has had a previous nanny. please explain how long each nanny was with your family",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    question: "Do you have pets? If so, please describe them",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
];

function page() {
  return (
    <div className=" space-y-2 text-blackColor">
      <p className="text-lg font-medium">Theresa Webb</p>

      <Accordion
        type="multiple"
        defaultValue={["item-0"]}
        className="w-full change-arrow"
      >
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b-0! py-1"
          >
            <div>
              <AccordionTrigger className="group py-3 text-left text-base  font-medium text-lightblackColor hover:no-underline [&>svg.removed-arrow]:hidden">
                <div className="flex items-center gap-2">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-sm border border-borderColor">
                    <ArrowDownIcon className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                  <span>{item.question}</span>
                </div>
              </AccordionTrigger>
              {item.answer && (
                <AccordionContent className="pb-3 text-sm leading-6 text-secondaryColor">
                  {item.answer}
                </AccordionContent>
              )}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default page;
