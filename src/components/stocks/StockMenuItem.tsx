import { StockItemStored, ExchangeStored } from "../../types/StockTypes";

const StockMenuItem = ({
  stockItemHandler,
  stock,
  stockTitle,
  stockShortHand,
  isReadOnly,
}: {
  stockItemHandler?: (menuOption: StockItemStored | ExchangeStored) => void;
  stock: StockItemStored | ExchangeStored;
  stockTitle: string;
  stockShortHand: string;
  isReadOnly?: boolean;
}) => {
  let stockText = `${stockTitle} ${
    stockShortHand === "GO_HOME_OPTION" ? "" : stockShortHand
  }`;
  return (
    <div>
      {isReadOnly && (
        <p
          role="toolbar"
          aria-label={stockText}
          className="stock__item--read-only"
        >
          {stockText}
        </p>
      )}
      {!isReadOnly && (
        <button
          className="stock__item"
          onClick={() => stockItemHandler!(stock)}
        >
          {stockText}
        </button>
      )}
    </div>
  );
};

export default StockMenuItem;
