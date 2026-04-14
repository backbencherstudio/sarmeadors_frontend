"use client";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function BroadcastTopBar() {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="">
          <button
            onClick={() => router.back()}
            className="font-semibold capitalize leading-[160%] flex items-center cursor-pointer"
          >
            <IoIosArrowBack />
            <span className="inline-block">
              Nanny House Manager Needed in McLean,VA
            </span>
          </button>
          <p className="text-[#778593]">
            Please select which candidates you would like to broadcast job to
          </p>
        </div>
        <div>
          <ButtonReuseable
            title="View Broadcast Record"
            className="bg-[#111927]! px-4 font-semibold rounded-md tex-sm py-[10.5px]! border border-borderColor text-white!"
          />
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-[#111927] text-lg font-medium">Hide Candidates</h1>
        <div className="flex items-center py-1.5">
          <input
            type="checkbox"
            id="noMatchList"
            className="h-4 w-4 cursor-pointer rounded border border-gray-300 accent-[#111927] focus:ring-0 focus:ring-offset-0"
          />
          <label
            htmlFor="noMatchList"
            className="ml-2 text-[#111927] font-medium"
          >
            Who are on Do Not Match list
          </label>
        </div>
        <div className="flex items-center py-1.5">
          <input
            type="checkbox"
            id="noMatchList"
            className="h-4 w-4 cursor-pointer rounded border border-gray-300 accent-[#111927] focus:ring-0 focus:ring-offset-0"
          />
          <label
            htmlFor="noMatchList"
            className="ml-2 text-[#111927] font-medium"
          >
            Exclude candidates who have already applied
          </label>
        </div>
        <div className="flex items-center py-1.5">
          <input
            type="checkbox"
            id="noMatchList"
            className="h-4 w-4 cursor-pointer rounded border border-gray-300 accent-[#111927] focus:ring-0 focus:ring-offset-0"
          />
          <label
            htmlFor="noMatchList"
            className="ml-2 text-[#111927] font-medium"
          >
            Exclude everyone this job was broadcasted previously
          </label>
        </div>
        <div className="mt-1.5 pl-6">
          <p className="text-[#778593]">
            (Magdalena Wiatr, Sandra Bashou, Aline De Freitas, Bailey Benton,
            Linda Rivera, Ashleigh Fitzpatrick, JIMIN KATIE JO, Khayla Edwards,
            Kristina Cassin, Tree Caridi, Christie Matthews, Ana Grasso,
            Carolina Albarracin Lugo, Emma valerio, Susan Pop, Violet
            Szypulinski, Miriam Hernandez, Maria Baylon, Loredana Olaru, Laura
            Nebor, Leticia Hernandez, Lesly Orellana, Haelee Bogue, Wellen
            Andrade, Joseline Palacios, Alexandra Pascut, Sarah Tallman, Kelly
            Beucher, Cameron Watson, Mary Grace Kaholokula, Aleksandra Lukic,
            Anna Arteaga, Niquee Dawson, Karen Rosas, Lilliana Wands-Calderon,
            Valeria Gonzalez, Tanya Dawson, Angelica Ortega, Violet Ghershin,
            Soledad Burciaga, Gloria Velasquez, Vashti Abrams, Mariana Garcia,
            Alga Oklinska, Alicja Oklinska, Dons Adutum, Carla Popper, Carla
            Popper Noppharat (Amy) Rodleng, Gladis Gonzales, Lourdes Salazar,
            Grace Fosuah, Lilli Pulido-Thomas, Hannah Stefan, Lucy Baron, Basia
            Burzynska, Rosmery Smith, Sirichan Yaiyod, Dana Muresan, Annie
            DiMattina, Araceli Urbano, Esther Kumi, Svitlana Grysko, wwwww wwww,
            Menghua Du, Jana Ehlert, Margaret Ennin, Silvia Anieu, Emma Alegre,
            Afua Asiedua, Julia Mana, Alisa Tillett, Veronica Delgado, Debralee
            Smith, Callie Gackowski, Ashanti Evans, Zoryana Pinchuk, Mariela
            Argueta, Sara Luedloff, Kierra Miller, Lilian Pillacela, Leticia
            Jimenez, Christiana Mansa, Lisa Hinton, Alice Haylock, Ilqura Khan,
            Elizabeth Mardis, Kotche Agnidom, Test Enginehire Last, Test
            enginehire Last name, Saray Mahmud, Maggie Maloney, Carmen Lopez,
            Mihaela Cobirzant Qadira Mustaf, Chartamia Turner, Sussan Piril,
            Saijai Janeworakij, Rowena Mendoza, Catherine Costigan, Evelyn
            Rosario, Marin Lord, Bridget Roden, Dimitrina Petrova, Claire
            Glover, Iwona Kurdej, Jessica Bowman, Shaha Salih, Anita Garay,
            Megan Promisco)
          </p>
        </div>
      </div>
    </div>
  );
}
