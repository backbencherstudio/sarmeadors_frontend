"use client";

import EditeIcon from "@/components/icon/EditeIcon";
import { useGetProcessFlowQuery } from "@/feature/slice/agency/processFlowSlice";
import DeleteIcon from "@/public/icon/DeleteIcon";
import EmailIcon from "@/public/icon/EmailIcon";
import TemplateIcon from "@/public/icon/TemplateIcon";
import { Edit2, Plus } from "lucide-react";
import { useState } from "react";
import EmailTemplateSate from "./EmailTemplateSate";

// API Response TypeScript Interfaces
interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  status: number;
}

interface DocumentTemplate {
  id: number;
  name: string;
  status: number;
}

interface ProcessFlowStatus {
  status_id: number;
  status_name: string;
  status_color: string;
  serial: number;
  status_type: string;
  document_templates: DocumentTemplate[];
  email_templates: EmailTemplate[];
}

function ProcessFlowPage() {
  const [isEmailTemplateOpen, setIsEmailTemplateOpen] = useState(false);
  
  const [isEditeTemplateOpen, setIsEditeTemplateOpen] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const { data, isLoading: statusLoading } = useGetProcessFlowQuery("client");
  const handleEmailTemplateUpdate = (statusId: number) => {
    setSelectedStatusId(statusId);
     setIsEditeTemplateOpen(true);
    setIsEmailTemplateOpen(true);
  }
  if (statusLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-sm font-medium text-gray-500">
        Loading process flow...
      </div>
    );
  }

  const processFlows: ProcessFlowStatus[] = data?.data || [];

  return (
    <div className=" py-8 px-4 md:px-8">
      <div className="space-y-6">
        {/* --- MAP THROUGH EACH STATUS FLOW CARD --- */}
        {processFlows.map((flow) => (
          <div
            key={flow.status_id}
            className="bg-white rounded-2xl border border-borderColor shadow-[0_4px_12px_0_rgba(2,_31,_24,_0.04)] overflow-hidden"
          >
            {/* Top Bar Section of the Card */}
            <div className="px-6 py-4 border-b border-borderColor gap-3 bg-white">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium text-headerColor flex items-center gap-2">
                  {flow.status_name}
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: flow.status_color }}
                  />
                </h3>
              </div>

              {/* Actions Control Toolbar */}
              <div className="flex items-center gap-3 mt-3">
                <button className="text-blueColor hover:bg-blue-50 rounded-md transition-colors cursor-pointer">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button className="text-headerColor hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
                  <EditeIcon className="w-3.5 h-3.5" />
                </button>
                <button className="text-redColor hover:bg-red-50 rounded-md transition-colors cursor-pointer">
                  <DeleteIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inner Body Templates Section */}
            <div className="p-6 bg-bgColor space-y-6">
              {/* --- DOCUMENT TEMPLATES SUB-SECTION --- */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray3Color">
                  Document Template
                </h4>
                {/* Render Templates if exist */}
                {flow.document_templates.map((doc) => (
                  <div key={doc.id} className=" group">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <TemplateIcon className="w-4 h-4 text-headerColor " />
                      <p className="text-sm text-headerColor font-medium ">
                        {doc.name}
                      </p>
                    </div>
                    <button className="text-headerColor p-1 rounded transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Always visible Add (+) Button */}
                <button className="w-10 h-8 rounded-md border bg-bgColor flex items-center justify-center text-headerColor transition-colors shadow-sm cursor-pointer mt-1">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* --- EMAIL TEMPLATES SUB-SECTION --- */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray3Color ">
                  Email Template
                </h4>

                {/* Render Email Templates if exist */}
                {flow.email_templates.map((email) => (
                  <div
                    key={email.id}
                    className="group flex items-center justify-between gap-2.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <EmailIcon className="w-4 h-4 text-headerColor " />
                      <div className="min-w-0">
                        <p className="text-sm text-headerColor font-medium ">
                          {email.name}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleEmailTemplateUpdate(flow.status_id)} className="text-headerColor p-1 rounded transition-colors">
                      <EditeIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Always visible Add (+) Button */}
                <button
                  onClick={() => {
                    setSelectedStatusId(flow.status_id);
                    setIsEmailTemplateOpen(true);
                  }}
                  className="w-10 h-8 rounded-md border bg-bgColor flex items-center justify-center text-headerColor transition-colors shadow-sm cursor-pointer mt-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isEmailTemplateOpen && (
        <EmailTemplateSate
          statusId={selectedStatusId}
          open={isEmailTemplateOpen}
          isEditeTemplateOpen={isEditeTemplateOpen}
          setOpen={setIsEmailTemplateOpen}
        />
      )}
    </div>
  );
}
export default ProcessFlowPage;
