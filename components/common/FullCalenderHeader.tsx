import React from 'react'
import ArrowRightIcon from '../icon/ArrowRightIcon';

interface FullCalenderHeaderProps {
  handleToday: () => void;
  handlePrev: () => void;
  handleNext: () => void;
  currentTitle: string;
}
function FullCalenderHeader({ handleToday, handlePrev, handleNext, currentTitle }: FullCalenderHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToday}
            aria-label='current-day-button'
            className="rounded-md border border-borderColor px-3 py-2 text-base font-semibold text-blackColor bg-grayColor1"
          >
            Today
          </button>
          <button
            type="button"
        
            onClick={handlePrev}
            className="rounded-md p-1.5 text-blackColor hover:bg-grayColor1"
            aria-label="Previous month"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
          </button>
          <p className="min-w-[120px] text-center text-base font-semibold text-blackColor">
            {currentTitle}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-md p-1.5 text-blackColor hover:bg-grayColor1"
            aria-label="Next month"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
    </div>
  )
}

export default FullCalenderHeader
