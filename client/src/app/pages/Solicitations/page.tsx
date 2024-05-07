"use client";

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { FunnelIcon } from "@heroicons/react/24/outline";

import {
  useModalStore,
  usePaginationStore,
  useSolicitationStore,
  useToastNotificationStore,
} from "@/store";
import { useAuth } from "@/hooks";
import { solicitationQueries } from "@/queries";
import {
  ConfirmationModal,
  Modal,
  SolicitationViewModal,
  Table,
  // PrivateRouteWrapper,
  SolicitationFilter,
} from "@/components";

import * as D from "./data";

const Solicitations = () => {
  const {
    fetchData,
    paginationData,
    selectedFilter,
    changeStatusAndReasonSolicitation,
    isLoading,
    hasFilteredAmbiences,
  } = useSolicitationStore();
  const { toggleVisibility, modalType } = useModalStore();
  const { pagination, setPagination } = usePaginationStore();
  const { isVisible, show } = useToastNotificationStore();
  const { session } = useAuth();

  const { query } = solicitationQueries(pagination, Number(session?.user?.id!));

  useEffect(() => {
    (async () => {
      fetchData(query);
    })();
  }, [fetchData, query]);

  useEffect(() => {
    setPagination(paginationData || pagination);
  }, [paginationData]);

  return (
    // <PrivateRouteWrapper>
    <>
      <div className="flex flex-wrap items-center justify-between px-2 mx-2 mb-4 sm:flex-nowrap sm:mx-0">
        <h1 className="font-mono text-3xl font-semibold text-primary">
          Solicitações
        </h1>
        <div className="inline-flex w-full gap-4 sm:w-auto">
          {selectedFilter && (
            <>
              {selectedFilter.status && (
                <div className="inline-flex items-center p-2 space-x-2 bg-white rounded-lg shadow-md">
                  <span className="font-medium text-gray-700">
                    {selectedFilter.status === "approved"
                      ? "Aprovado"
                      : "Reprovado"}
                  </span>
                  <button
                    className="px-2 font-medium text-gray-700 border-l border-primary hover:text-red-400"
                    onClick={() => fetchData(query)}
                  >
                    X
                  </button>
                </div>
              )}
            </>
          )}
          <div className="relative inline-block ">
            <FunnelIcon
              title="Filtrar"
              onClick={() => toggleVisibility(true, "filter")}
              className={`inline-flex items-center w-10 h-10 p-2 space-x-2 rounded-lg cursor-pointer ${
                hasFilteredAmbiences
                  ? "bg-secondary text-white"
                  : "bg-primary text-secondary"
              }  focus:bg-secondary focus:outline-none`}
            />
          </div>
        </div>
      </div>

      <Table
        data={D.Data().data}
        columns={D.Data().columns}
        actions={D.Actions()}
        loading={isLoading}
      />

      {isVisible && <ToastContainer />}

      {modalType === "filter" && (
        <Modal>
          <SolicitationFilter />
        </Modal>
      )}

      {modalType === "view" && (
        <Modal>
          <SolicitationViewModal />
        </Modal>
      )}

      {modalType === "approved" && (
        <ConfirmationModal
          title="Confirmação de aprovação"
          description="Ao fazer isso a solicitação será aprovada. Tem certeza que deseja aprova-la?"
          action={() => {
            changeStatusAndReasonSolicitation("approved", "", query);
            show("Solicitação aprovada com sucesso.", "success");
          }}
          approvedButton
        />
      )}

      {modalType === "delete" && (
        <ConfirmationModal
          title="Confirmação de reprovação"
          description="Ao fazer isso a solicitação será reprovada. Tem certeza que deseja reprova-la?"
          action={(reason) => {
            changeStatusAndReasonSolicitation("disapproved", reason, query);
            show("Solicitação reprovada com sucesso.", "success");
          }}
          solicitationDisapproved
        />
      )}
    </>
    // </PrivateRouteWrapper>
  );
};

export default Solicitations;
