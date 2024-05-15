import theme from "styles/theme";

export const CustomDropdownStyles = {
  placeholder: (provided) => ({
    ...provided,
    color: theme.colors.white,
    font: theme.font.family,
    fontSize: theme.font.sizes.small,
  }),
  control: (provided) => ({
    ...provided,
    background: "linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%)",
    borderColor: theme.colors.primary,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: theme.colors.white,
    font: theme.font.family,
    fontSize: theme.font.sizes.small,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    color: theme.colors.white,
  }),
};
