import React, { useRef, useState } from "react";
import { usePopper } from "react-popper";
import { TooltipProps } from "./Tooltip.model";

const Tooltip = (props: TooltipProps) => {
  const [tooltipShow, setTooltipShow] = useState(false);

  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: props.position
    }
  );

  const openTooltip = () => {
    setTooltipShow(true);
  };

  const closeTooltip = () => {
    setTooltipShow(false);
  };

  return (
    <div {...attributes.popper} onMouseEnter={openTooltip}>
      <div ref={referenceRef}>{props.holder}</div>

      <div
        style={styles.popper}
        onMouseLeave={closeTooltip}
        className={`${!tooltipShow ? "hidden" : "block"} z-50`}
        ref={popperRef}>
        <div className="flex flex-col">
          {props.title ? props.title : null}
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
