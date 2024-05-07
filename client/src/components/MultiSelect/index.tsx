"use client";

import {
  Option,
  MultiSelect as Select,
  SelectProps,
} from "react-multi-select-component";
import "@/components/MultiSelect/styles.css";

type MultiSelectProps = {
  label?: string;
  name: string;
  options: Option[];
} & SelectProps;

const MultiSelect = ({ label, name, options, ...props }: MultiSelectProps) => {
  const valueRenderer = (selected: typeof options) => {
    if (!selected.length) {
      return "Selecionar...";
    }

    return (
      selected.length === options.length &&
      selected.map(
        ({ label }, index) =>
          label + (index === options.length - 1 ? " " : ", ")
      )
    );
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-left text-gray-700"
        >
          {label}
        </label>
      )}
      <Select
        options={options}
        overrideStrings={{
          allItemsAreSelected: "Todos os itens selecionados.",
          clearSearch: "Limpar pesquisa",
          clearSelected: "Limpar campo",
          noOptions: "Sem opções",
          search: "Pesquisa",
          selectAll: "Selecionar tudo",
          selectAllFiltered: "Selecionar tudo (filtrado)",
          selectSomeItems: "Selecionar...",
          create: "Criar",
        }}
        valueRenderer={valueRenderer}
        isCreatable={true}
        {...props}
      />
    </div>
  );
};

export default MultiSelect;
