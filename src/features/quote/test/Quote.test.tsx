import { setupServer } from "msw/node";
import { handlers } from "./mswHandlers";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import Quote from "../Quote";
import { render } from "../../../test-utils";
import { FETCH_STATUS, LOADING_MESSAGE, NOT_FOUND } from "../utils/constants";
import { store } from "../../../redux/store";
import { Provider } from "react-redux";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Renderizado inicial", () => {
  // Estado inicial
  const initialState = {
    data: null,
    status: FETCH_STATUS.INACTIVE,
  };
  render(<Quote />, { preloadedState: initialState });

  // Obtener elementos
  const quoteText = screen.getByRole("paragraph", {
    name: "quote text",
  });
  const quoteAuthor = screen.getByRole("paragraph", {
    name: "quote author",
  });
  const inputElement = screen.getByRole("textbox");
  const obtainQuoteButton = screen.getByRole("button", {
    name: "obtain random quote",
  });
  const clearButton = screen.getByRole("button", { name: "clear" });

  // Esperar resultado
  expect(quoteText).toBeInTheDocument();
  expect(quoteAuthor).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
  expect(obtainQuoteButton).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
});

test("Obtener cita aleatoria", async () => {
  // Estado inicial
  const initialState = {
    data: null,
    status: FETCH_STATUS.INACTIVE,
  };

  render(
    <Provider store={store}>
      <Quote />
    </Provider>,
    { preloadedState: initialState }
  );

  // Clickear boton de obtener cita
  const obtainQuoteButton = screen.getByRole("button", {
    name: "obtain random quote",
  });
  fireEvent.click(obtainQuoteButton);

  // Esperar resultado
  await waitFor(() => {
    const quoteText = screen.getByRole("paragraph", {
      name: "quote text",
    });
    const quoteAuthor = screen.getByRole("paragraph", {
      name: "quote author",
    });

    const expectedResult = "Random";

    // Verificar store
    const state = store.getState().quote;
    expect(state.data?.character).toBe(`${expectedResult} Character`);
    expect(state.status).toBe(FETCH_STATUS.INACTIVE);

    expect(quoteText).toBeInTheDocument();
    expect(quoteAuthor).toBeInTheDocument();

    // Verificar resultado
    expect(quoteText).toHaveTextContent(`${expectedResult} Quote`);
    expect(quoteAuthor).toHaveTextContent(`${expectedResult} Character`);
  });
});

test("Obtener cita por personaje", async () => {
  // Estado inicial
  const initialState = {
    data: null,
    status: FETCH_STATUS.INACTIVE,
  };

  render(
    <Provider store={store}>
      <Quote />
    </Provider>,
    { preloadedState: initialState }
  );

  // Campo a buscar
  const searchField = "Test";

  // Introducir texto
  const inputElement = screen.getByRole("textbox");
  fireEvent.change(inputElement, { target: { value: searchField } });

  // Clickear boton de obtener cita
  const obtainQuoteButton = screen.getByRole("button", {
    name: "obtain quote",
  });
  fireEvent.click(obtainQuoteButton);

  // Esperar resultado
  await waitFor(() => {
    const quoteText = screen.getByRole("paragraph", {
      name: "quote text",
    });
    const quoteAuthor = screen.getByRole("paragraph", {
      name: "quote author",
    });

    // Verificar store
    const state = store.getState().quote;
    expect(state.data?.character).toBe(`${searchField} Character`);
    expect(state.status).toBe(FETCH_STATUS.INACTIVE);

    expect(quoteText).toBeInTheDocument();
    expect(quoteAuthor).toBeInTheDocument();

    // Verificar resultado
    expect(quoteText).toHaveTextContent(`${searchField} Quote`);
    expect(quoteAuthor).toHaveTextContent(`${searchField} Character`);
  });
});

test("Limpiar la cita al darle al boton de borrado", async () => {
  // Estado inicial
  const initialState = {
    data: {
      character: "Test Character",
      quote: "Test Quote",
      image: "test_image.png",
      characterDirection: "Test Direction",
    },
    status: FETCH_STATUS.INACTIVE,
  };

  render(
    <Provider store={store}>
      <Quote />
    </Provider>,
    { preloadedState: initialState }
  );

  // Clickear boton de borrar
  const clearButton = screen.getByRole("button", { name: "clear" });
  fireEvent.click(clearButton);

  // Esperar resultado
  await waitFor(() => {
    const quoteText = screen.getByRole("paragraph", {
      name: "quote text",
    });
    const quoteAuthor = screen.getByRole("paragraph", {
      name: "quote author",
    });

    // Verificar store
    const state = store.getState().quote;
    expect(state.data).toBe(null);
    expect(state.status).toBe(FETCH_STATUS.INACTIVE);

    // Verificar resultado
    expect(quoteText).toHaveTextContent(NOT_FOUND);
    expect(quoteAuthor).toHaveTextContent("");
  });
});

test("Mostrar el texto correcto basado en el status de la peticion", () => {
  // Estado inicial
  const initialState = {
    data: null,
    status: FETCH_STATUS.LOADING,
  };

  render(<Quote />, { preloadedState: initialState });

  // Esperar resultado
  const quoteText = screen.getByRole("paragraph", {
    name: "quote text",
  });
  expect(quoteText).toHaveTextContent(LOADING_MESSAGE);
});
