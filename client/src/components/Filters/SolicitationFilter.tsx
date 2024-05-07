"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  useModalStore,
  usePaginationStore,
  useSolicitationStore,
} from "@/store";
import { reservationModel } from "@/models";
import { solicitationQueries } from "@/queries";
import { Button, Select } from "@/components";
import { useAuth } from "@/hooks";

import * as D from "./data";

const SolicitationFilter = () => {
  const { toggleVisibility } = useModalStore();
  const { fetchData, selectedFilter, hasFilteredAmbiences } =
    useSolicitationStore();
  const { pagination } = usePaginationStore();
  const { session } = useAuth();
  const [filterData, setFilterData] = useState(
    selectedFilter ||
      ({
        status: "",
      } as Pick<reservationModel, "status">)
  );

  const { query, queryWithFilters } = solicitationQueries(
    pagination,
    Number(session?.user?.id!),
    filterData
  );
  const { solicitationFilterStatusOptions } = D.filtersOptions();

  const handleRemoveFilters = () => {
    toggleVisibility(false);
    fetchData(query);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toggleVisibility(false);
    fetchData(queryWithFilters, filterData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white ">
        <Dialog.Title className="relative p-4 text-lg font-medium leading-6 text-center text-gray-900 border-b border-solid sm:p-4 border-slate-200">
          Filtros
        </Dialog.Title>
        <XMarkIcon
          className="absolute w-6 h-6 text-gray-400 cursor-pointer right-3 top-2"
          onClick={() => toggleVisibility(false)}
        />
      </div>
      <div className="pb-4 bg-white sm:p-1">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:text-left sm:w-full">
            <div>
              <div className="pl-4 pr-4 mt-2">
                <Select
                  label="Status"
                  name="status"
                  placeholder="Selecione um status"
                  options={solicitationFilterStatusOptions}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFilterData((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }));
                  }}
                  value={filterData.status}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4 px-4 py-3 bg-gray-50 sm:flex sm:justify-between sm:flex-row-reverse sm:px-6">
        <div>
          <Button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:ring-offset-2 sm:w-auto sm:text-sm"
            onClick={() => toggleVisibility(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="inline-flex justify-center w-full px-4 py-2 mt-3 mb-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm sm:mb-0 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-green-700 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            disabled={!filterData.status}
          >
            Filtrar
          </Button>
        </div>
        <div>
          {hasFilteredAmbiences && (
            <Button
              title="Remover todos os filtros"
              type="button"
              className="inline-flex justify-center w-full px-3 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm hover:bg-red-700 focus:ring-red-500"
              onClick={handleRemoveFilters}
            >
              Remover todos os filtros
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SolicitationFilter;
