"use client";

import React, { useState } from "react";
import { updateInquiryStatusAction } from "@/app/actions/inquiries";
import { Mail, Building, Tag } from "lucide-react";

interface InquiryRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  company: string | null;
  budgetRange: string | null;
  templateName: string | null;
  notes: string | null;
  status: "NEW" | "CONTACTED" | "MEETING_SCHEDULED" | "PROPOSAL_SENT" | "CLOSED_WON" | "CLOSED_LOST";
  createdAt: Date;
}

const statusBadgeStyles: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  CONTACTED: "bg-amber-50 text-amber-700 border-amber-200",
  MEETING_SCHEDULED: "bg-purple-50 text-purple-700 border-purple-200",
  PROPOSAL_SENT: "bg-indigo-50 text-indigo-700 border-indigo-200",
  CLOSED_WON: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CLOSED_LOST: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

export const LeadsPipelineTable: React.FC<{ initialLeads: InquiryRecord[] }> = ({ initialLeads }) => {
  const [leads, setLeads] = useState(initialLeads);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    newStatus: "NEW" | "CONTACTED" | "MEETING_SCHEDULED" | "PROPOSAL_SENT" | "CLOSED_WON" | "CLOSED_LOST"
  ) => {
    setUpdatingId(id);
    const res = await updateInquiryStatusAction(id, newStatus);
    setUpdatingId(null);

    if (res.success) {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
    }
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-black/5 text-center">
        <p className="text-sm text-charcoal-muted">No client inquiries received yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas border-b border-black/5 text-charcoal-muted uppercase font-bold text-[10px] tracking-wider">
            <tr>
              <th className="py-4 px-6">Client / Company</th>
              <th className="py-4 px-6">Interest & Budget</th>
              <th className="py-4 px-6">Notes / Scope</th>
              <th className="py-4 px-6">Status Pipeline</th>
              <th className="py-4 px-6 text-right">Received Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 text-charcoal">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-canvas/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-bold text-sm text-charcoal">{lead.clientName}</div>
                  <div className="flex items-center gap-1.5 text-charcoal-muted text-[11px] mt-0.5">
                    <Mail className="w-3 h-3 text-crimson" />
                    <span>{lead.clientEmail}</span>
                  </div>
                  {lead.company && (
                    <div className="flex items-center gap-1.5 text-charcoal-muted text-[11px] mt-0.5">
                      <Building className="w-3 h-3 opacity-60" />
                      <span>{lead.company}</span>
                    </div>
                  )}
                </td>

                <td className="py-4 px-6">
                  {lead.templateName ? (
                    <span className="inline-flex items-center gap-1 bg-crimson-light text-crimson font-semibold px-2.5 py-0.5 rounded-full text-[10px]">
                      <Tag className="w-3 h-3" /> {lead.templateName}
                    </span>
                  ) : (
                    <span className="text-charcoal-muted text-[11px]">General Inbound</span>
                  )}
                  <div className="font-semibold text-charcoal mt-1 text-[11px]">
                    {lead.budgetRange || "Flexible"}
                  </div>
                </td>

                <td className="py-4 px-6 max-w-xs">
                  <p className="line-clamp-2 text-[11px] text-charcoal-muted leading-relaxed">
                    {lead.notes || "No scope details provided."}
                  </p>
                </td>

                <td className="py-4 px-6">
                  <select
                    value={lead.status}
                    disabled={updatingId === lead.id}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                    className={`text-[11px] font-bold py-1 px-3 rounded-full border focus:outline-none cursor-pointer ${
                      statusBadgeStyles[lead.status]
                    }`}
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="MEETING_SCHEDULED">MEETING_SCHEDULED</option>
                    <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                    <option value="CLOSED_WON">CLOSED_WON</option>
                    <option value="CLOSED_LOST">CLOSED_LOST</option>
                  </select>
                </td>

                <td className="py-4 px-6 text-right text-charcoal-muted text-[11px] whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
