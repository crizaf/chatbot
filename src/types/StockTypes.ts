export interface StockItem {
  code: string;
  stockName: string;
  price: number;
}

export interface StockItemStored {
  code: string;
  name: string;
  exchangeCode: string;
  price?: number;
}

export interface ExchangeStored {
  code: string;
  name: string;
}

export interface Exchange {
  code: string;
  stockExchange: string;
  topStocks: StockItem[];
}

export interface StockValueType {
  menuOptions: StockItemStored[] | ExchangeStored[];
  selectedResponse: string;
  headerTitle: string;
  uniqueResponseId: number;
}

export interface StockValue {
  headerTitle: string;
  menuOptions: StockItemStored[] | ExchangeStored[];
  handleSelectedMenuOption: (
    menuOption: StockItemStored | ExchangeStored
  ) => void;
  responseHistory: StockValueType[];
}

export interface Stage {
  name: string;
  next: string;
  options: StockItemStored[] | ExchangeStored[];
  headerTitle: string;
}
export interface PriceStage {
  name: string;
  next: string;
  options: StockItemStored[];
  headerTitle: string;
}
