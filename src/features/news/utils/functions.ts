import { Dispatch, SetStateAction } from "react";
import { obtainNews } from "../fakeRest";
import { InormalizedNews } from "../types";

export const obtainInfo = async (
  setData: Dispatch<SetStateAction<InormalizedNews[]>>
) => {
  const response = await obtainNews();

  const data = response.map((n) => {
    const title = n.title
      .split(" ")
      .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(" ");

    const now = new Date();
    const transcurredMinutes = Math.floor(
      (now.getTime() - n.date.getTime()) / 60000
    );

    return {
      id: n.id,
      title: title,
      description: n.description,
      date: n.date,
      normalizedDate: `Hace ${transcurredMinutes} minutos`,
      isPremium: n.isPremium,
      image: n.image,
      shortDescription: n.description.substring(0, 100),
    };
  });

  setData(data);
};
