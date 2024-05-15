import { ReactElement } from "react";
import { FormGroup } from "components/FormGroup";
import Select, { MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";

import * as S from "./styles";

const animatedComponents = makeAnimated();

export type Option =
  | SingleValue<SelectOption>
  | MultiValue<SelectOption>
  | null;

export type SelectOption = {
  value: string;
  label: string;
};

type SelectWrapperProps = {
  placeholder: string;
  defaultValue?: Option;
  selectOptions: SelectOption[];
  onChange: (option: Option) => void;
};

export const SelectWrapper = ({
  placeholder,
  defaultValue,
  selectOptions,
  onChange,
}: SelectWrapperProps): ReactElement => {
  const handleDropdown = (option: Option) => {
    onChange(option);
  };

  return (
    <FormGroup>
      <Select
        components={animatedComponents}
        backspaceRemovesValue
        placeholder={placeholder}
        options={selectOptions}
        styles={S.CustomDropdownStyles}
        isClearable={true}
        isSearchable={false}
        value={defaultValue}
        onChange={handleDropdown}
      />
    </FormGroup>
  );
};
