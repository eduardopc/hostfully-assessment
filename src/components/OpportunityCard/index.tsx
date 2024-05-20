import * as S from "./styles";

export type OpportunityCardProps = {
  title: string;
  description: string;
  image: string;
};

export const OpportunityCard = ({
  title,
  image,
  description,
}: OpportunityCardProps) => {
  return (
    <S.Card data-testid="opportunity-card">
      <S.Image src={image} />
      <S.Title>{title}</S.Title>
      <S.Description dangerouslySetInnerHTML={{ __html: description }} />
    </S.Card>
  );
};
