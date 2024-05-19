import { ReactElement } from "react";
import { FormGroup } from "components/FormGroup";
import Select, { SingleValue } from "react-select";
import makeAnimated from "react-select/animated";

import * as S from "./styles";

const animatedComponents = makeAnimated();

export type Option = SingleValue<SelectOption> | null;

export type SelectOption = {
  value: string;
  label: string;
};

type SelectWrapperProps = {
  placeholder: string;
  defaultValue?: Option;
  selectOptions: SelectOption[];
  showFullWidth: boolean;
  onChange: (option: Option) => void;
};

export const SelectWrapper = ({
  placeholder,
  defaultValue,
  selectOptions,
  showFullWidth,
  onChange,
}: SelectWrapperProps): ReactElement => {
  const handleDropdown = (option: Option) => {
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
