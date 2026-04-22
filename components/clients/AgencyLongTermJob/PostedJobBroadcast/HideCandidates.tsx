"use client";

import { useState } from "react";

const excludedCandidates = [
  "Magdalena Wiatr",
  "Sandra Bashou",
  "Alina De Freitas",
  "Bailey Benton",
  "Linda Rivera",
  "Ashleigh Fitzpatrick",
  "JIMIN KATIE JO",
  "Khayla Edwards",
  "Kristina Cassin",
  "Tree Caridi",
  "Christie Matthews",
  "Ana Grasso",
  "Carolina Albarracin Lugo",
  "Emma valerio",
  "Susan Pop",
  "Violet Szypulinski",
  "Miriam Hernandez",
  "Maria Baylon",
  "Loredana Olaru",
  "Laura Nebor",
  "Leticia Hernandez",
  "Lesly Orellana",
  "Haelee Bogue",
  "Wellen Andrade",
  "Joseline Palacios",
  "Alexandra Pascut",
  "Sarah Tallman",
  "Kelly Beucher",
  "Cameron Watson",
  "Mary Grace Kahololuka",
  "Aleksandra Lukic",
  "Anna Arteaga",
  "Niquee Dawson",
  "Karen Rosas",
  "Lilliana Wands-Calderon",
  "Valeria Gonzalez",
  "Tanya Dawson",
  "Angelica Ortega",
  "Violet Ghershin",
  "Soledad Burciaga",
  "Gloria Velasquez",
  "Vashti Abrams",
  "Mariana Garcia",
  "Alga Oklinska",
  "Alicja Oklinska",
  "Dons Adutum",
  "Carla Popper",
  "Carla Popper Nopppharat (Amy) Rodleng",
  "Gladis Gonzales",
  "Lourdes Salazar",
  "Grace Fosuah",
  "Lilli Pulido-Thomas",
  "Hannah Stefan",
  "Lucy Baron",
  "Basia Burzynska",
  "Rosmery Smith",
  "Sirichan Yaiyod",
  "Dana Muresan",
  "Annie DiMattina",
  "Araceli Urbano",
  "Esther Kumi",
  "Svitlana Grysko",
  "wwwww wwwww",
  "Menghua Du",
  "Jana Ehlert",
  "Margaret Ennin",
  "Silvia Anleu",
  "Emma Alegre",
  "Afua Asiedua",
  "Julia Mana",
  "Alisa Tillett",
  "Veronica Delgado",
  "Debralee Smith",
  "Callie Gackowski",
  "Ashanti Evans",
  "Zoryana Pinchuk",
  "Mariela Argueta",
  "Sara Luedloff",
  "Kierra Miller",
  "Lilian Pillacela",
  "Leticia Jimenez",
  "Christiana Mansa",
  "Lisa Hinton",
  "Alice Haylock",
  "Iqura Khan",
  "Elizabeth Mardis",
  "Kotche Agnidom",
  "Test Enginehire Last",
  "Test enginehire Last name",
  "Saray Mahmud",
  "Maggie Maloney",
  "Carmen Lopez",
  "Mihaela Cobirzant Qadira Mustaf",
  "Chartamia Turner",
  "Sussan Piril",
  "Sajjai Janeworksi",
  "Rowena Mendoza",
  "Catherine Costigan",
  "Evelyn Rosario",
  "Marin Lord",
  "Bridget Roden",
  "Dimitrina Petrova",
  "Claire Glover",
  "Iwona Kurdej",
  "Jessica Bowman",
  "Shaha Salih",
  "Anita Garay",
  "Megan Promisco",
];

export default function HideCandidates() {
  const [doNotMatch, setDoNotMatch] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [broadcastedPreviously, setBroadcastedPreviously] = useState(false);

  return (
    <div
      className="bg-white"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Hide Candidates
      </h2>

      <div className="space-y-3">
        {/* Option 1 */}
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={doNotMatch}
            onChange={(e) => setDoNotMatch(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-gray-900 cursor-pointer flex-shrink-0"
          />
          <span className="text-base text-gray-700 group-hover:text-gray-900 transition-colors">
            Who are on Do Not Match list
          </span>
        </label>

        {/* Option 2 */}
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={alreadyApplied}
            onChange={(e) => setAlreadyApplied(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-gray-900 cursor-pointer flex-shrink-0"
          />
          <span className="text-base text-gray-700 group-hover:text-gray-900 transition-colors">
            Exclude candidates who have already applied
          </span>
        </label>

        {/* Option 3 */}
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={broadcastedPreviously}
            onChange={(e) => setBroadcastedPreviously(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-gray-900 cursor-pointer flex-shrink-0"
          />
          <span className="text-base text-gray-700 group-hover:text-gray-900 transition-colors">
            Exclude everyone this job was broadcasted previously
          </span>
        </label>

        {/* Candidate name list — always visible */}
        <div className="mt-1 ml-6 text-base text-gray-500 leading-relaxed">
          ({excludedCandidates.join(", ")})
        </div>
      </div>
    </div>
  );
}
