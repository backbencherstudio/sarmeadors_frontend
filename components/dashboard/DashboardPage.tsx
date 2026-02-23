import { cookies } from "next/headers";
import Link from "next/link";
import { TbNotes } from "react-icons/tb";
import { TiFlowMerge } from "react-icons/ti";
import DashboardUserTable from "./DashboardUserTable";
import StatCards from "./StatCards";

async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore?.get("jobtoken")?.value;
 const statCards = [
    {
      title: "Pre Application",
      value: 195,
      percentage: "0.1%",
    },
    {
      title: "Application Started",
      value: 7,
      percentage: "0.8%",
    },
    {
      title: "Applied",
      value: 18,
      percentage: "1.5%",
    },
    {
      title: "Inactive",
      value: 635,
      percentage: "72.6%",
    },
    {
      title: "Initial Payment Made",
      value: 0,
      percentage: "3.2%",
    },
    {
      title: "Consultation Booked",
      value: 0,
      percentage: "3.2%",
    },
    {
      title: "Consultation Complete",
      value: 0,
      percentage: "3.2%",
    },
    {
      title: "Job Posted",
      value: 97,
      percentage: "3.2%",
    },
  ];
  if (token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Link
          href="/login"
          className="text-xl underline text-primaryColor text-center"
        >
          Please log in to view the dashboard
        </Link>
      </div>
    );
  }

  try {
    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-blackColor">
              Status Statistics
            </h3>
            <div className="flex gap-2 md:gap-4 items-center">
              <button className="flex items-center md:px-4 px-2 py-2 md:py-3 text-sm md:text-base cursor-pointer rounded-md gap-2 border border-gray2Color ">
                <TiFlowMerge /> Process Flow
              </button>
              <button className="flex items-center md:px-4 px-2 py-2 md:py-3 text-sm md:text-base cursor-pointer rounded-md gap-2 border border-gray2Color ">
                <TbNotes /> View Application Form
              </button>
            </div>
          </div>
          <StatCards statCards={statCards} />
        </div>

        <div className="mt-10">
          <DashboardUserTable />
        </div>
      </div>
    );
  } catch (error: any) {
    if (error?.response?.status === 403) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-500">
            Access forbidden. Please log in again or check your permissions.
          </p>
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">
          Error: {error?.message || "Something went wrong."}
        </p>
      </div>
    );
  }
}

export default DashboardPage;
