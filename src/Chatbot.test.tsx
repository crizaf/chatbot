import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import Chatbot from "./Chatbot";
import { StockContext } from "./store/stockContext";
import { StockValue, StockItemStored } from "./types/StockTypes";
import {
  getExchanges,
  getStocksByExchangeCode,
  getStockPriceByStockCode,
} from "./utils/stockUtils";

const customRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: { providerProps: { value: StockValue } }
) => {
  return render(
    <StockContext.Provider {...providerProps}>{ui}</StockContext.Provider>,
    renderOptions
  );
};
window.HTMLElement.prototype.scrollIntoView = function () {};

const checkExchanges = () => {
  getExchanges()
    .map(({ code, name }) => `${name} ${code}`)
    .forEach((exch) => {
      const readOnlyExchangesElement = screen.getAllByRole("toolbar", {
        name: exch,
      });
      expect(readOnlyExchangesElement[0]).toBeInTheDocument();
    });
};

const checkPreviousStocks = (stockOptions: StockItemStored[]) => {
  stockOptions
    .map(({ code, name }: { code: string; name: string }, index: number) => {
      // Return to main menu
      if (index === stockOptions.length - 1) {
        return name;
      }
      return `${name} ${code}`;
    })
    .forEach((stockOption: string) => {
      const stockOptionButton = screen.getAllByRole("toolbar", {
        name: stockOption,
      });
      expect(stockOptionButton[0]).toBeInTheDocument();
    });
};

test("displays info message", () => {
  const providerProps = {
    value: {
      headerTitle: "",
      menuOptions: [],
      responseHistory: [],
      handleSelectedMenuOption: () => {},
    },
  };
  customRender(<Chatbot />, { providerProps });

  const linkElement = screen.getByText(/hello/i);

  expect(linkElement).toBeInTheDocument();
});

test("displays home menu", () => {
  const providerProps = {
    value: {
      menuOptions: getExchanges(),
      headerTitle: "Please select an exchange",
      responseHistory: [],
      handleSelectedMenuOption: () => {},
    },
  };
  customRender(<Chatbot />, { providerProps });

  const linkElement = screen.getByText(/Please select an exchange/i);
  const lseOption = screen.getByText(/London Stock Exchange/i);
  const nyseOption = screen.getByText(/New York Stock Exchange/i);
  const nasdaqOption = screen.getByText(/Nasdaq/i);

  expect(linkElement).toBeInTheDocument();
  expect(lseOption).toBeInTheDocument();
  expect(nyseOption).toBeInTheDocument();
  expect(nasdaqOption).toBeInTheDocument();
});

test("displays exchange menu as read-only and the stocks for that exchange", () => {
  const stockOptions = getStocksByExchangeCode("NYSE");
  const providerProps = {
    value: {
      menuOptions: stockOptions,
      headerTitle: "Please select a stock",
      responseHistory: [
        {
          menuOptions: getExchanges(),
          selectedResponse: "New York Stock Exchange",
          headerTitle: "Please select an exchange",
          uniqueResponseId: 1,
        },
      ],
      handleSelectedMenuOption: () => {},
    },
  };
  customRender(<Chatbot />, { providerProps });

  const linkElement = screen.getByText(/Please select a stock/i);
  const selectedExchangeElement = screen.getByRole("tooltip", {
    name: /Exchange/i,
  });
  expect(selectedExchangeElement).toHaveTextContent("New York Stock Exchange");

  //check that exchanges are shown as read-only
  checkExchanges();

  expect(linkElement).toBeInTheDocument();

  stockOptions
    .map(({ code, name }, index) => {
      // Return to main menu
      if (index === stockOptions.length - 1) {
        return name;
      }
      return `${name} ${code}`;
    })
    .forEach((stockOption) => {
      const stockOptionButton = screen.getByText(`${stockOption}`);
      expect(stockOptionButton).toBeInTheDocument();
    });
});

test("displays stock menu as read-only and the selected stock price for that exchange", () => {
  const stockOptions = getStocksByExchangeCode("NYSE");
  const providerProps = {
    value: {
      menuOptions: stockOptions,
      headerTitle: `Stock price of Ashford Hospitality Trust AHT is ${getStockPriceByStockCode(
        "AHT"
      )}. Please select an option`,
      responseHistory: [
        {
          menuOptions: getExchanges(),
          selectedResponse: "New York Stock Exchange",
          headerTitle: "Please select an exchange",
          uniqueResponseId: 1,
        },
        {
          menuOptions: stockOptions,
          selectedResponse: "Ashford Hospitality Trust",
          headerTitle: "Please select a stock",
          uniqueResponseId: 2,
        },
      ],
      handleSelectedMenuOption: () => {},
    },
  };
  customRender(<Chatbot />, { providerProps });

  const linkElement = screen.getByText(
    /Stock price of Ashford Hospitality Trust AHT is 1.72. Please select an option/i
  );

  expect(linkElement).toBeInTheDocument();

  const selectedExchangeElement = screen.getByRole("tooltip", {
    name: /Exchange/i,
  });

  expect(selectedExchangeElement).toHaveTextContent("New York Stock Exchange");

  //check that exchanges are shown as read-only
  checkExchanges();

  //check that the stocks options are shown as read-only
  checkPreviousStocks(stockOptions);
});
