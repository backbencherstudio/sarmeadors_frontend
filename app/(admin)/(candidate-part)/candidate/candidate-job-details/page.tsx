import Link from "next/link";

function page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Link
        href="/candidate/candidate-job-details"
        className="text-primaryColor text-2xl underline"
      >
        Go Back to Job List
      </Link>
    </div>
  );
}

export default page;
