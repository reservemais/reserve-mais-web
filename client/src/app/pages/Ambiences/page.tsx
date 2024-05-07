"use client";

import React, { useEffect } from "react";
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";

import {
  useAmbiencesStore,
  useModalStore,
  usePaginationStore,
  useToastNotificationStore,
  useUserStore,
} from "@/store";
import { ambienceQueries } from "@/queries";
import {
  AmbienceFilter,
  AmbienceForm,
  Button,
  ConfirmationModal,
  Modal,
  // PrivateRouteWrapper,
  Table,
} from "@/components";

import * as D from "./data";
import { useAuth } from "@/hooks";
import { ToastContainer } from "react-toastify";

const Ambiences = () => {
  const {
    hasFilteredAmbiences,
    isLoading,
    fetchData,
    paginationData,
    selectedFilter,
    selectAmbience,
    removeAmbience,
    selectedAmbience,
  } = useAmbiencesStore();
  const { fetchData: userFetchData } = useUserStore();
  const { toggleVisibility, modalType } = useModalStore();
  const { pagination, setPagination } = usePaginationStore();
  const { isVisible, show } = useToastNotificationStore();
  const { session } = useAuth();

  const { query, queryWithFilters } = ambienceQueries(
    pagination,
    selectedFilter!
  );

  const handleRemoveFilter = (filter: string) => {
    const filterData = { ...selectedFilter, [filter]: "" };

    fetchData(queryWithFilters, filterData);
  };

  useEffect(() => {
    (async () => {
      if (hasFilteredAmbiences) {
        fetchData(queryWithFilters, selectedFilter);
      } else {
        fetchData(query);
        userFetchData();
      }
    })();
  }, [
    fetchData,
    hasFilteredAmbiences,
    query,
    queryWithFilters,
    selectedFilter,
  ]);

  useEffect(() => {
    setPagination(paginationData || pagination);
  }, [paginationData]);

  return (
    // <PrivateRouteWrapper>
    <>
      <div className="flex flex-wrap items-center justify-between px-2 mx-2 mb-4 sm:flex-nowrap sm:mx-0">
        <h1 className="font-mono text-3xl font-semibold text-primary">
          Ambientes
        </h1>
        <div className="inline-flex w-full gap-4 sm:w-auto">
          {selectedFilter && (
            <>
              {selectedFilter.type && (
                <div className="inline-flex items-center p-2 space-x-2 bg-white rounded-lg shadow-md">
                  <span className="font-medium text-gray-700">
                    {selectedFilter.type === "laboratory"
                      ? "Laboratório"
                      : selectedFilter.type === "class"
                      ? "Sala"
                      : "Outros"}
                  </span>
                  <button
                    className="px-2 font-medium text-gray-700 border-l border-primary hover:text-red-400"
                    onClick={() => handleRemoveFilter("type")}
                  >
                    X
                  </button>
                </div>
              )}
              {selectedFilter.numberOfMachines && (
                <div className="inline-flex items-center p-2 space-x-2 bg-white rounded-lg shadow-md">
                  <span className="font-medium text-gray-700">
                    {selectedFilter.numberOfMachines}
                  </span>
                  <button
                    className="px-2 font-medium text-gray-700 border-l border-primary hover:text-red-400"
                    onClick={() => handleRemoveFilter("numberOfMachines")}
                  >
                    X
                  </button>
                </div>
              )}
              {selectedFilter.availability && (
                <div className="inline-flex items-center p-2 space-x-2 bg-white rounded-lg shadow-md">
                  <span className="font-medium text-gray-700">
                    {selectedFilter.availability === "available"
                      ? "Disponível"
                      : "Indisponível"}
                  </span>
                  <button
                    className="px-2 font-medium text-gray-700 border-l border-primary hover:text-red-400"
                    onClick={() => handleRemoveFilter("availability")}
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
          {session?.user?.isAdmin && (
            <Button
              type="button"
              className="inline-flex justify-center w-full px-3 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm "
              onClick={() => {
                selectAmbience();
                toggleVisibility(true, "add");
              }}
            >
              <div className="flex items-center gap-2">
                <h4>Adicionar ambiente</h4>
                <PlusIcon className="w-5 h-5 text-white" />
              </div>
            </Button>
          )}
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
          description="Ao fazer isso o ambiente será deletado. Tem certeza que deseja deleta-lo?"
          action={() => {
            removeAmbience(selectedAmbience?.id!);
            show("Ambiente deletado com sucesso.", "success");
          }}
        />
      ) : modalType === "filter" ? (
        <Modal>
          <AmbienceFilter />
        </Modal>
      ) : (
        <Modal>
          <AmbienceForm />
        </Modal>
      )}
    </>
    // </PrivateRouteWrapper>
  );
};

export default Ambiences;
