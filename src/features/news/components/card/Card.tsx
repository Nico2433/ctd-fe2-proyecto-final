import { Icard } from "./types";

import {
  MoreInfoButton,
  NewsCard,
  NewsCardDate,
  NewsCardDescription,
  NewsCardImg,
  NewsCardTitle,
} from "../../styled";

const Card = ({ news, setter }: Icard) => {
  const { title, shortDescription, normalizedDate, image } = news;

  return (
    <NewsCard>
      <NewsCardImg src={image} />
      <NewsCardTitle>{title}</NewsCardTitle>
      <NewsCardDate>{normalizedDate}</NewsCardDate>
      <NewsCardDescription>{shortDescription}</NewsCardDescription>
      <MoreInfoButton onClick={() => setter(news)}>Ver más</MoreInfoButton>
    </NewsCard>
  );
};

export default Card;
