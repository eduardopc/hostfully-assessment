export type DatesProps = {
  from: string;
  to: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type PlaceSelectOption = SelectOption & {
  pricePerDay?: number;
};
