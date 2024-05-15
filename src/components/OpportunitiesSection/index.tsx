import { ReactElement } from "react";

import Heading from "components/Heading";
import {
  OpportunityCard,
  OpportunityCardProps,
} from "components/OpportunityCard";

import * as S from "./styles";

type OpportunitiesSectionProps = {
  title: string;
  availableOpportunities?: OpportunityCardProps[];
};

export const OpportunitiesSection = ({
  title,
  availableOpportunities,
}: OpportunitiesSectionProps): ReactElement => {
  return (
    <>
      <Heading lineLeft>{title}</Heading>

      <S.Content>
        {availableOpportunities?.map((opportunity, index) => (
          <OpportunityCard
            key={index}
            image={opportunity.image}
            title={opportunity.title}
            description={opportunity.description}
          />
        ))}
      </S.Content>
    </>
  );
};
