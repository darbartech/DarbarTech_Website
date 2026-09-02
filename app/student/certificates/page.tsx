"use client";

import { useState } from "react";
import {
  Award,
  BadgeCheck,
  Download,
  Eye,
  Pencil,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { Card, EmptyState, PageHeader, StatusBadge } from "../components/ui";
import { certificates, student } from "../data";

export default function CertificatesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const issued = certificates.filter((c) => c.status === "Issued");
  const inProgress = certificates.filter((c) => c.status !== "Issued");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates"
        subtitle="Certificates officially issued by DarbarTech."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "var(--secondary-bg-dashboard)" }}
              >
                <Award size={22} style={{ color: "var(--secondary-text-dashboard)" }} />
              </div>
              <StatusBadge status={cert.status} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-(--text-primary-dashboard)">
              {cert.title}
            </h3>
            <p className="mt-0.5 text-xs text-(--tertiary-text-dashboard)">
              {cert.id}
            </p>

            <div className="mt-4 flex flex-col gap-1.5 text-xs text-(--tertiary-text-dashboard)">
              <p>Issued: {cert.issuedDate}</p>
              <p>Completed: {cert.completedDate}</p>
            </div>

            {cert.status === "Issued" ? (
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedId(cert.id)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-(--bg-lightblue) px-3 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                >
                  <Eye size={13} /> View
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Certificate downloaded.")}
                  title="Download"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                  style={{ background: "var(--secondary-bg-dashboard)" }}
                >
                  <Download size={13} /> Download
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  title="Print"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
                >
                  <Printer size={13} />
                </button>
              </div>
            ) : (
              <p className="mt-5 rounded-lg px-3 py-2.5 text-center text-xs font-medium text-(--tertiary-text-dashboard)" style={{ background: "var(--secondary-bg-dashboard)" }}>
                You will receive this certificate after completing the course.
              </p>
            )}
          </Card>
        ))}
      </div>

      {issued.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-5 py-4 text-xs text-(--tertiary-text-dashboard)">
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={15} style={{ color: "var(--bg-lightblue)" }} />
            Certificates are verifiable
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={15} style={{ color: "var(--bg-lightblue)" }} />
            Only official DarbarTech-issued certificates appear here
          </span>
        </div>
      )}

      {selectedId && (() => {
        const cert = certificates.find((c) => c.id === selectedId);
        if (!cert) return null;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedId(null)}
          >
            <div
              className="w-full max-w-xl rounded-2xl border p-8 text-center shadow-2xl bg-(--bg-primary-dashboard)"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "var(--secondary-bg-dashboard)" }}>
                <Award size={28} style={{ color: "var(--bg-lightblue)" }} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-(--tertiary-text-dashboard)">
                DarbarTech — Group of Technology
              </p>
              <h2 className="mt-2 text-2xl font-bold text-(--text-primary-dashboard)">
                Certificate of Completion
              </h2>
              <p className="mt-1 text-sm text-(--tertiary-text-dashboard)">
                This certifies that
              </p>
              <p className="mt-3 text-xl font-semibold text-(--bg-dashboard-hero)">
                {student.name}
              </p>
              <p className="mt-2 text-sm text-(--tertiary-text-dashboard)">
                has successfully completed the course
              </p>
              <p className="mt-1 text-lg font-semibold text-(--text-primary-dashboard)">
                {cert.title}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-(--border-primary-dashboard) pt-5 text-xs text-(--tertiary-text-dashboard)">
                <span>Certificate No: {cert.id}</span>
                <span>Issue Date: {cert.issuedDate}</span>
              </div>
              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-(--bg-lightblue) px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                  onClick={() => setSelectedId(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
                  style={{ background: "var(--secondary-bg-dashboard)" }}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Pencil size={13} /> Print
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {inProgress.length === 0 && (
        <hr className="border-(--border-primary-dashboard)" />
      )}
      {inProgress.length === 0 && certificates.length === 0 && (
        <EmptyState
          icon={<Award size={24} />}
          title="No certificates yet"
          description="Earned certificates will appear here once issued."
        />
      )}

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg lg:bottom-6">
          {toast}
        </div>
      )}
    </div>
  );
}