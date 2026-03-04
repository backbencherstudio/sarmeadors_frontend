import ButtonReuseable from '@/components/reusable/CustomButton'
import { PlusIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function ClientHeroSection() {
  return (
    <div>
      <div className="bg-gradient-to-t px-3 lg:px-8 from-[#049EC0]/5 to-[#049EC0]/30 rounded-2xl  mb-8 flex items-center justify-between">
        <div>
          <h2 className="md:text-xl text-lg lg:text-2xl font-bold text-blackColor mb-2">
            All your nannies needs in one place
          </h2>
          <p className="text-gray-600 mb-6">
            Source, discover, manage, and pay your flexible workforce.
          </p>
          <div className="flex gap-4">
            <ButtonReuseable
              title="Post a job"
              icon={<PlusIcon className="inline w-4 h-4 lg:w-5 lg:h-5" />}
              className="px-4! py-2.5! lg:px-5! lg:py-3 lg:rounded-lg! rounded-sm! text-sm! lg:text-base! font-medium transition"
            />
            <ButtonReuseable
              title=" Discover Candaidates"
              icon={<SearchIcon className="inline w-4 h-4 lg:w-5 lg:h-5 " />}
              className=" text-blackColor! px-4! py-2.5! lg:px-5! lg:py-3 lg:rounded-lg! text-sm! lg:text-base! rounded-sm! font-medium bg-whiteColor! transition"
            />
          </div>
        </div>
        <div className="max-w-[551px] h-[190px]">
          <Image
            src="/client/client-dashboard.png"
            alt="Hero illustration"
            width={500}
            height={550}
            className="w-full h-full "
          />
        </div>
      </div>
    </div>
  )
}

export default ClientHeroSection
