import InfoMessage from "../messages/InfoMessage";
import { StockItemStored, ExchangeStored } from "../../types/StockTypes";
import StockMenuItem from "./StockMenuItem";

const StockMenu = ({
  headerTitle,
  options,
  handleSelectedMenuOption,
  isReadOnly,
}: {
  headerTitle: string;
  options: StockItemStored[] | ExchangeStored[];
  handleSelectedMenuOption?: (
    menuOption: StockItemStored | ExchangeStored
  ) => void;
  isReadOnly?: boolean;
}) => {
  return (
    <div className="stock__menu">
      <InfoMessage type="intro" infoText={headerTitle} />
      {options.map((option) => {
        const stockTitle = option?.name ?? "";
        return (
          <StockMenuItem
            key={option.code}
            isReadOnly={isReadOnly}
            stockItemHandler={handleSelectedMenuOption}
            stock={option}
            stockTitle={stockTitle}
            stockShortHand={option.code}
          />
        );
      })}
    </div>
  );
};

export default StockMenu;
