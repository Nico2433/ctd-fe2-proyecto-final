import { rest } from "msw";
import { API_URL } from "../../../app/constants";

const validQueries = ["Test"];

const randomQuote = {
  character: "Random Character",
  quote: "Random Quote",
  image: "random_image.png",
  characterDirection: "Random Direction",
};

const mockedQuotes = [
  {
    query: "Test",
    data: {
      character: "Test Character",
      quote: "Test Quote",
      image: "test_image.png",
      characterDirection: "Test Direction",
    },
  },
];

const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get("character");

    if (character === null) {
      return res(ctx.json([randomQuote]), ctx.delay(150));
    }

    if (validQueries.includes(character)) {
      const quote = mockedQuotes.find((q) => q.query === character);
      if (quote) {
        return res(ctx.json([quote.data]));
      }
    }

    return res(ctx.json([]), ctx.delay(150));
  }),
];

export { handlers };
