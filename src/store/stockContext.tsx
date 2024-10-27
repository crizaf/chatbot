import { createContext, ReactElement, useState } from "react";
import {
  getExchanges,
  getStocksByExchangeCode,
  getStockPriceByStockCode,
} from "../utils/stockUtils";
import { StockValueType, Stage, PriceStage } from "../types/StockTypes";

export const StockContext = createContext({});

export const STAGES = [
  {
    name: "exchange",
    next: "stock",
    options: getExchanges(),
    headerTitle: "Please select an exchange",
  },
  {
    name: "stock",
    next: "price",
    headerTitle: "Please select a stock",
  },
  { name: "price" },
];

let uniqueReponseId = 1;

function StockContextProvider({ children }: { children: ReactElement }) {
  const [currentStage, setCurrentStage] = useState(STAGES[0] as Stage);
  const [responseHistory, setResponseHistory] = useState(
    [] as StockValueType[]
  );

  const setCurrentStageAsHistory = (selectedResponse: string) => {
    const { options, headerTitle } = currentStage;
    const newResponseHistory = [
      ...responseHistory,
      {
        menuOptions: options,
        selectedResponse,
        uniqueResponseId: uniqueReponseId++,
        headerTitle,
      },
    ] as StockValueType[];

    setResponseHistory(newResponseHistory);
  };

  const handleSelectedMenuOption = ({
    code,
    name,
    exchangeCode,
  }: {
    code: string;
    name: string;
    exchangeCode: string;
  }) => {
    setCurrentStageAsHistory(name);

    let nextStage = STAGES.find(
      ({ name }) => name === currentStage?.next
    ) as Stage;
    if (!nextStage) {
      // when we selected exchange, stock and we show the price we should keep offering the same stock options
      nextStage = STAGES[2] as PriceStage;
    }
    if (code === "GO_HOME_OPTION") {
      // return to main menu selected
      nextStage = STAGES[0] as Stage;
    }
    const isShowPriceStage = nextStage.name === STAGES[2].name;
    const isExchangeStage = nextStage.name === STAGES[0].name;

    if (!isExchangeStage) {
      //we need to use the exchange code and this comes from different properties from each stage
      const exgCode = isShowPriceStage ? exchangeCode : code;
      nextStage.options = getStocksByExchangeCode(exgCode);
    }
    if (isShowPriceStage) {
      nextStage.headerTitle = `Stock price of ${name} ${code} is <b>${getStockPriceByStockCode(
        code
      )}&#36;</b>. Please select an option`;
    }

    setCurrentStage(nextStage);
  };

  const { headerTitle, options: menuOptions } = currentStage;

  const stockValue = {
    headerTitle,
    menuOptions,
    responseHistory,
    handleSelectedMenuOption,
  };
  return (
    <StockContext.Provider value={stockValue}>{children}</StockContext.Provider>
  );
}

export default StockContextProvider;
