import classNames from "classnames";

const InfoMessage = ({
  type,
  infoText = "intro",
}: {
  type: string;
  infoText: string;
}) => {
  const infoClasses = classNames({
    cb__info: true,
    cb__response: type !== "intro" && type !== "infoMessage",
    cb__infoMessage: type === "infoMessage",
  });
  const role = "tooltip";
  const ariaLabel =
    type !== "intro" && type !== "infoMessage" ? infoText : "intro";
  return (
    <div className={infoClasses}>
      <p
        role={role}
        aria-label={ariaLabel}
        dangerouslySetInnerHTML={{ __html: infoText }}
      ></p>
    </div>
  );
};

export default InfoMessage;
