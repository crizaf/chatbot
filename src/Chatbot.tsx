import React, { useContext, useEffect, useRef } from "react";
import "./Chatbot.css";
import InfoMessage from "./components/messages/InfoMessage";
import { StockContext } from "./store/stockContext";
import StockMenu from "./components/stocks/StockMenu";
import { StockValue } from "./types/StockTypes";

function Chatbot() {
  const {
    headerTitle,
    menuOptions,
    handleSelectedMenuOption,
    responseHistory,
  } = useContext(StockContext) as StockValue;
  //used to focus on the latest menu when user selects any of the options
  const bottomRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responseHistory]);

  return (
    <div className="cb">
      <div className="cb-content">
        <header className="cb-header">
          <p>LSEG chatbot</p>
        </header>
        <div className="cb-content-scrollable">
          <InfoMessage
            type="intro"
            infoText="Hello and welcome to LSEG chatbot"
          />
          {responseHistory.map(
            ({
              menuOptions,
              selectedResponse,
              headerTitle,
              uniqueResponseId,
            }) => (
              <div key={uniqueResponseId}>
                <StockMenu
                  headerTitle={headerTitle}
                  options={menuOptions}
                  isReadOnly={true}
                />
                {selectedResponse && (
                  <InfoMessage type="response" infoText={selectedResponse} />
                )}
              </div>
            )
          )}
          <StockMenu
            headerTitle={headerTitle}
            options={menuOptions}
            handleSelectedMenuOption={handleSelectedMenuOption}
          />
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
