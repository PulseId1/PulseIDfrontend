"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { AccessRequestItem } from "@/lib/api/types";
import { PatientService } from "@/lib/api/patient-service";
import { DemoService } from "@/lib/demo/demo-service";

export type ModalType = "approve" | "reject" | "revoke" | null;

export function useAccessRequests() {
  const { isDemo } = useAuth();
  const [requests, setRequests] = useState<AccessRequestItem[]>(() =>
    PatientService.getAccessRequests()
  );
  const [selectedRequest, setSelectedRequest] = useState<AccessRequestItem | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  useEffect(() => {
    if (isDemo) {
      const timer = setTimeout(() => {
        setRequests(DemoService.getAccessRequests());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isDemo]);

  const pendingList = requests.filter((r) => r.status === "pending");
  const activeList = requests.filter((r) => r.status === "approved");
  const historyList = requests.filter((r) => r.status === "rejected" || r.status === "revoked");

  const openModal = (req: AccessRequestItem, type: ModalType) => {
    setSelectedRequest(req);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setModalType(null);
  };

  const handleConfirmAction = () => {
    if (!selectedRequest || !modalType) return;

    if (isDemo) {
      const updated = DemoService.respondToAccessRequest(
        selectedRequest.id,
        modalType === "approve" ? "approve" : "reject"
      );
      setRequests(updated);
      setActionNotice(
        `Request from ${selectedRequest.doctorName} marked as ${
          modalType === "approve" ? "Approved" : modalType === "reject" ? "Rejected" : "Revoked"
        }.`
      );
      closeModal();
      setTimeout(() => setActionNotice(null), 6000);
      return;
    }

    const newStatus =
      modalType === "approve" ? "approved" : modalType === "reject" ? "rejected" : "revoked";
    const updated = PatientService.updateAccessRequestStatus(selectedRequest.id, newStatus);
    setRequests(updated);
    setActionNotice(`Request from ${selectedRequest.doctorName} marked as ${newStatus}.`);
    closeModal();
    setTimeout(() => setActionNotice(null), 6000);
  };

  return {
    requests,
    pendingList,
    activeList,
    historyList,
    selectedRequest,
    modalType,
    actionNotice,
    openModal,
    closeModal,
    handleConfirmAction,
  };
}
