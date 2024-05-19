import { ReactElement } from "react";
import { FormGroup } from "components/FormGroup";
import Select, { SingleValue } from "react-select";
import makeAnimated from "react-select/animated";

import { PlaceSelectOption } from "types";

import * as S from "./styles";

const animatedComponents = makeAnimated();

export type Option<T> = SingleValue<T> | null;

type SelectWrapperProps<T> = {
  placeholder: string;
  defaultValue?: Option<T>;
  selectOptions: T[];
  showFullWidth: boolean;
  onChange: (option: Option<T>) => void;
};

export const SelectWrapper = ({
  placeholder,
  defaultValue,
  selectOptions,
  showFullWidth,
  onChange,
}: SelectWrapperProps<PlaceSelectOption>): ReactElement => {
  const handleDropdown = (option: Option<PlaceSelectOption>) => {
    onChange(option);
  };

  return (
    <FormGroup showFullWidth={showFullWidth}>
      <Select
        components={animatedComponents}
        backspaceRemovesValue
        placeholder={placeholder}
        options={selectOptions}
        styles={S.CustomDropdownStyles}
        isClearable={true}
        isSearchable={false}
        value={defaultValue}
        isMulti={false}
        onChange={handleDropdown}
      />
    </FormGroup>
  );
};
