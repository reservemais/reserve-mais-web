"use client";

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline";

import {
  useModalStore,
  usePaginationStore,
  useToastNotificationStore,
  useUserStore,
} from "@/store";
import {
  Button,
  ConfirmationModal,
  Modal,
  // PrivateRouteWrapper,
  Table,
  UserFilter,
  UserForm,
} from "@/components";
import * as D from "./data";
import { userQueries } from "@/queries";

const Users = () => {
  const {
    fetchData,
    isLoading,
    removeUser,
    selectedUser,
    selectUser,
    paginationData,
    selectedFilter,
    hasFilteredUsers,
  } = useUserStore();
  const { modalType, toggleVisibility } = useModalStore();
  const { pagination, setPagination } = usePaginationStore();
  const { isVisible, show } = useToastNotificationStore();

  const { query } = userQueries(pagination, selectedFilter!);

  const handleRemoveFilter = (filter: string) => {
    const filterData = { ...selectedFilter, [filter]: "" };

    fetchData(query, filterData);
  };

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
          Usuários
        </h1>
        <div className="inline-flex w-full gap-4 sm:w-auto">
          {selectedFilter && (
            <>
              {selectedFilter.type && (
                <div className="inline-flex items-center p-2 space-x-2 bg-white rounded-lg shadow-md">
                  <span className="font-medium text-gray-700">
                    {selectedFilter.type}
                  </span>
                  <button
                    className="px-2 font-medium text-gray-700 border-l border-primary hover:text-red-400"
                    onClick={() => handleRemoveFilter("type")}
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
                hasFilteredUsers
                  ? "bg-secondary text-white"
                  : "bg-primary text-secondary"
              }  focus:bg-secondary focus:outline-none`}
            />
          </div>
          <Button
            type="button"
            className="inline-flex justify-center w-full px-3 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm "
            onClick={() => {
              selectUser();
              toggleVisibility(true, "add");
            }}
          >
            <div className="flex items-center gap-2">
              <h4>Adicionar usuário</h4>
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
          description="Ao fazer isso o usuário será deletado. Tem certeza que deseja deleta-lo?"
          action={() => {
            removeUser(selectedUser?.id!);
            show("Usuário deletado com sucesso.", "success");
          }}
        />
      ) : modalType === "filter" ? (
        <Modal>
          <UserFilter />
        </Modal>
      ) : (
        <Modal>
          <UserForm />
        </Modal>
      )}
    </>
    //</PrivateRouteWrapper>
  );
};

export default Users;
