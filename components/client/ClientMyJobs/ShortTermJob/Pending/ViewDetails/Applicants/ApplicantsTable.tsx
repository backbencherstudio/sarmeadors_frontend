"use client";

import { useState } from "react";
import Link from "next/link";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import TableColAscDsc from "@/components/dashboard/TableColAscDsc";
import { Eye } from "lucide-react";
import HireCandidateModal from "../../../Marketplace/Applicants/HireCandidateModal";
import { useGetApplicantsQuery } from "@/feature/dashboard/client/myJob";
import { useSearchParams } from "next/navigation";

function ApplicantsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState({
    full_name: true,
    application_date: true,
    application_message: true,
    action: true,
  });

  const params = useSearchParams();
  const jobId = params.get("jobId");

  const { data: applicantsData, isLoading } = useGetApplicantsQuery(jobId, {
    skip: !jobId,
  });

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const rows = applicantsData?.data?.applications?.data?.map(
    (application: any) => ({
      id: String(application.id),
      full_name:
        `${application.candidate?.first_name ?? ""} ${application.candidate?.last_name ?? ""}`.trim(),
      application_date: formatDate(application.created_at),
      application_message: application.application_message,
      status: application.status,
      short_term_job_id: application.short_term_job_id,
      candidate_id: application.candidate_id,
    }),
  );

  const toggleSelectAll = () => {
    if (selectedRows.length === rows?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows?.map((row) => row.id));
    }
  };

  const toggleRowSelection = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId],
    );
  };

  const handleColShort = () => {
    console.log("Column sorting clicked");
  };

  const columns = [
    {
      label: (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedRows.length === rows?.length && rows.length > 0}
            onChange={toggleSelectAll}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <span>Name</span>
          <TableColAscDsc onClick={handleColShort} />
        </div>
      ),
      accessor: "full_name",
      width: "200px",
      formatter: (value: string, record: any) => (
        <Link
          href={`/client/marketplace-view-details/applicants/${record?.id}/personal-information?jobId=${record?.short_term_job_id}&candidateId=${record?.candidate_id}`}
          className="flex items-center gap-3"
        >
          <input
            type="checkbox"
            checked={selectedRows.includes(record.id)}
            onChange={() => toggleRowSelection(record.id)}
            className="w-4 h-4 cursor-pointer rounded border-gray-300"
          />
          <span className="text-sm font-medium text-blackColor">{value}</span>
        </Link>
      ),
    },
    {
      label: "Application Date",
      accessor: "application_date",
      width: "180px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor">{value}</span>
      ),
    },
    {
      label: "Application Message",
      accessor: "application_message",
      width: "400px",
      formatter: (value: string) => (
        <span className="text-sm text-blackColor line-clamp-2">{value}</span>
      ),
    },
    {
      label: (
        <div className="text-right">
          <span>Actions</span>
        </div>
      ),
      accessor: "action",
      width: "120px",
      formatter: (_: any, record: any) => (
        <div className="flex items-center gap-2 justify-end">
          <Link
            href={`/client/marketplace-view-details/applicants/${record?.id}/personal-information?jobId=${record?.short_term_job_id}&candidateId=${record?.candidate_id}`}
            className="p-2 rounded-[10px] border"
          >
            <Eye />
          </Link>
          {/* Schedule Interview Modal */}
          {/* <ScheduleInterviewModal /> */}
          {/* Modal */}
          <HireCandidateModal
            jobId={record?.short_term_job_id}
            applicantId={record?.candidate_id}
          />
        </div>
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumnsArray = columns.filter(
    (col) => visibleColumns[col.accessor as keyof typeof visibleColumns],
  );

  return (
    <section>
      <DynamicTableTwo
        columns={visibleColumnsArray}
        data={rows || []}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
        loading={isLoading}
        totalItems={rows?.length}
        totalpage={Math.max(1, Math.ceil(rows?.length / itemsPerPage))}
      />
    </section>
  );
}

export default ApplicantsTable;
