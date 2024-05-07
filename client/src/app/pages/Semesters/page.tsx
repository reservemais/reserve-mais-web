"use client";

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/outline";

import {
  useModalStore,
  usePaginationStore,
  useSemesterStore,
  useToastNotificationStore,
} from "@/store";
import { semesterQueries } from "@/queries";
import {
  Button,
  ConfirmationModal,
  Modal,
  // PrivateRouteWrapper,
  SemesterForm,
  Table,
} from "@/components";
import * as D from "./data";

const Semesters = () => {
  const {
    fetchData,
    isLoading,
    removeSemester,
    selectSemester,
    selectedSemester,
    paginationData,
  } = useSemesterStore();
  const { modalType, toggleVisibility } = useModalStore();
  const { pagination, setPagination } = usePaginationStore();
  const { isVisible, show } = useToastNotificationStore();

  const { query } = semesterQueries(pagination);

  useEffect(() => {
    setPagination(paginationData || pagination);
  }, [paginationData]);

  useEffect(() => {
    (async () => {
      fetchData(query);
    })();
  }, []);

  return (
    // <PrivateRouteWrapper>
    <>
      <div className="flex flex-wrap items-center justify-between px-2 mx-2 mb-4 sm:flex-nowrap sm:mx-0">
        <h1 className="font-mono text-3xl font-semibold text-primary">
          Semestres
        </h1>
        <div className="inline-flex w-full gap-4 sm:w-auto">
          <Button
            type="button"
            className="inline-flex justify-center w-full px-3 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm "
            onClick={() => {
              selectSemester();
              toggleVisibility(true, "add");
            }}
          >
            <div className="flex items-center gap-2">
              <h4>Adicionar semestre</h4>
              <PlusIcon className="w-5 h-5 text-white" />
            </div>
          </Button>
        </div>
      </div>

      <Table
        data={D.Data().data}
        columns={D.Data().columns}
        actions={D.Actions()}
        loading={isLoading}
      />

      {isVisible && <ToastContainer />}

      {modalType === "delete" ? (
        <ConfirmationModal
          title="Confirmação de exclusão"
          description="Ao fazer isso o semestre será deletado. Tem certeza que deseja deleta-lo?"
          action={() => {
            removeSemester(selectedSemester?.id!);
            show("Semestre deletado com sucesso.", "success");
          }}
        />
      ) : (
        <Modal>
          <SemesterForm />
        </Modal>
      )}
    </>
    // </PrivateRouteWrapper>
  );
};

export default Semesters;
