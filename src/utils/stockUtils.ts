import { EXCHANGES } from "../data/inputData";
import { StockItemStored, Exchange } from "../types/StockTypes";

const getExchanges = () => {
  return EXCHANGES.map(
    ({ code, stockExchange }: { code: string; stockExchange: string }) => ({
      code,
      name: stockExchange,
    })
  );
};

const getStocks = () => {
  return EXCHANGES.reduce(
    (allStocks: StockItemStored[], currentExchange: Exchange) => {
      const { topStocks, code: exchangeCode } = currentExchange;
      if (topStocks?.length) {
        const currentStocks = topStocks.map(({ code, stockName, price }) => ({
          code,
          name: stockName,
          exchangeCode,
          price,
        }));
        allStocks = [...allStocks, ...currentStocks];
      }
      return allStocks;
    },
    []
  );
};

const getStocksByExchangeCode = (exchangeCode: string) => {
  const stocks = getStocks();

  return [
    ...stocks.filter(
      ({ exchangeCode: stockExchange }: { exchangeCode: string }) =>
        exchangeCode === stockExchange
    ),
    {
      code: "GO_HOME_OPTION",
      name: "Return to main menu",
      exchangeCode,
    },
  ];
};

const getStockPriceByStockCode = (stockCode: string) => {
  const stockPrices = getStocks();

  return stockPrices.find(({ code }: { code: string }) => code === stockCode)
    ?.price;
};

export {
  getExchanges,
  getStocks,
  getStockPriceByStockCode,
  getStocksByExchangeCode,
};
