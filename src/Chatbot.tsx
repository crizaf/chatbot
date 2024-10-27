import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chatbot.css";
import InfoMessage from "./components/messages/InfoMessage";
import { StockContext } from "./store/stockContext";
import StockMenu from "./components/stocks/StockMenu";
import { StockValue } from "./types/StockTypes";
import { FaRobot, FaRegWindowMinimize } from "react-icons/fa";
import { FaMaximize } from "react-icons/fa6";

function Chatbot() {
  const {
    headerTitle,
    menuOptions,
    handleSelectedMenuOption,
    responseHistory,
  } = useContext(StockContext) as StockValue;
  const [isMinimized, setMinimized] = useState(false);
  //used to focus on the latest menu when user selects any of the options
  const bottomRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responseHistory]);

  const contentClasses = isMinimized ? "cb-content-min" : "cb-content";

  return (
    <div className={contentClasses}>
      <header className="cb-header" onClick={() => setMinimized(!isMinimized)}>
        <p>
          <FaRobot /> LSEG chatbot
        </p>
        <button>
          {isMinimized ? <FaMaximize /> : <FaRegWindowMinimize />}
        </button>
      </header>
      {!isMinimized && (
        <div className="cb-content-scrollable">
          <InfoMessage
            type="infoMessage"
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
      )}
    </div>
  );
}

export default Chatbot;
