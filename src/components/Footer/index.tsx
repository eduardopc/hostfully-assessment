import { ReactElement } from "react";

import { Heading } from "components/Heading";
import { FOOTER } from "languages";

import * as S from "./styles";

export const Footer = (): ReactElement => {
  const currentYear = new Date().getFullYear();

  return (
    <S.Wrapper>
      <S.Content>
        <S.Column>
          <Heading color="black" size="small" lineBottom lineColor="secondary">
            Contact Us
          </Heading>
          <a href="mailto:sample@mail.com">sample@mail.com</a>
        </S.Column>

        <S.Column>
          <Heading color="black" lineColor="secondary" lineBottom size="small">
            Follow us
          </Heading>

          <nav aria-labelledby="social media">
            <a
              href="https://www.instagram.com/hostfully_/"
              target="_blank"
              rel="noopenner, noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/hostfully-inc-/"
              target="_blank"
              rel="noopenner, noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        </S.Column>

        <S.Column aria-labelledby="footer-contact">
          <Heading color="black" lineColor="secondary" lineBottom size="small">
            Location
          </Heading>
          <span>Lorem ipsum dolor sit.</span>
        </S.Column>
      </S.Content>

      <S.Copyright>
        {FOOTER.content}
        <strong>{FOOTER.author}</strong>
        {FOOTER.copyright(currentYear)}
      </S.Copyright>
    </S.Wrapper>
  );
};
