import { useEffect, useState } from "react";

import { InormalizedNews } from "./types";

import { obtainInfo } from "./utils/functions";

import Card from "./components/card/Card";
import Modal from "./components/modal/Modal";

import { NewsContainer, NewsList, NewsTitle } from "./styled";

const NewsLetter = () => {
  const [news, setNews] = useState<InormalizedNews[]>([]);
  const [selectedNews, setSelectedNews] = useState<InormalizedNews | null>(
    null
  );

  useEffect(() => {
    obtainInfo(setNews);
  }, []);

  return (
    <NewsContainer>
      <NewsTitle>Noticias de los Simpsons</NewsTitle>
      <NewsList>
        {news.map((n) => (
          <Card key={n.id} news={n} setter={setSelectedNews} />
        ))}
        {selectedNews && <Modal news={selectedNews} setter={setSelectedNews} />}
      </NewsList>
    </NewsContainer>
  );
};

export default NewsLetter;
