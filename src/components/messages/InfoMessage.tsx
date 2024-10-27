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
    cb__response: type !== "intro",
  });
  const role = "tooltip";
  const ariaLabel = type !== "intro" ? infoText : "intro";
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
