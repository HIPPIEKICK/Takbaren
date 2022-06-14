import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { sanity } from "../sanity";

import {
  HeadingDark,
  SubHeadingLight,
  SubHeadingRed,
  SquareBtn,
  CardSpacing,
} from "../globalStyleComponents";

const query = `
  *[ _type == 'openHoursHome' ] { title, description }
`;

const OpenHoursHome = () => {
  const { data = [] } = useQuery("openHoursHome", () => sanity.fetch(query));

  const [openHoursHome] = data;

  if (!openHoursHome) {
    return <h1>Loading…</h1>;
  }

  return (
    <CardSpacing>
      <HeadingDark>{openHoursHome.title}</HeadingDark>
      <SubHeadingRed>{openHoursHome.description}</SubHeadingRed>
      <Link to="/openinghours">
        <SquareBtn>More</SquareBtn>
      </Link>
    </CardSpacing>
  );
};

export default OpenHoursHome;
