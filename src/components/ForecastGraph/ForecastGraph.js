import {useEffect, useMemo, useRef} from "react";
import {noop} from "@vkontakte/vkjs";

import {ForecastGraphComponent, GraphComponent} from "./styled.js";
import {COLORS} from "../../utils/styled.js";

import Graph_5 from "../../assets/graph/4_5.svg?react";
import Graph_4 from "../../assets/graph/4_4.svg?react";


export const ForecastGraph = ({ way, hoverWay, onHover = noop, onBlur = noop }) => {
  const countState = way?.[0].length;
  const ref = useRef();

  const [wayIDs, noWayIDs] = useMemo(() => {
    const wayIDs = [];
    const noWayIDs = [];

    way.map((array, s1) => {
      array.map((item, s2) => {
        const wayID = `way_${s1 + 1}_${s2 + 1}`;

        if (item.length > 0) {
          if (wayIDs.indexOf(wayID) === -1) wayIDs.push(wayID);
        }else {
          if (noWayIDs.indexOf(wayID) === -1) noWayIDs.push(wayID);
        }
      });
    });

    return [wayIDs, noWayIDs];
  }, [way]);

  useEffect(() => {
    if (ref.current) {
      noWayIDs.map((id) => {
        const element = ref.current.querySelector(`#${id}`);
        if (element) element.remove();
      });

      wayIDs.map((id, i) => {
        const element = ref.current.querySelector(`#${id}`);

        if (element) {
          element.style.color = `var(${COLORS[i]})`;
          element.addEventListener('mouseover', () => onHover(i));
          element.addEventListener('mouseout', onBlur);
        }
      });
    }
  }, [wayIDs]);

  useEffect(() => {
    if (hoverWay === -1) {
      wayIDs.map((id, i) => {
        const element = ref.current.querySelector(`#${id}`);
        if (element) element.style.opacity = null;
      });

      return;
    }

    wayIDs.map((id, i) => {
      if (i === hoverWay) return;

      const element = ref.current.querySelector(`#${id}`);
      if (element) element.style.opacity = 0.15;
    });
  }, [hoverWay]);


  if (!way) return <ForecastGraphComponent/>;

  return (
    <ForecastGraphComponent>
      <GraphComponent ref={ref}>
        {countState === 5 ? <Graph_5 key={JSON.stringify(way)}/> : <Graph_4 key={JSON.stringify(way)} />}
      </GraphComponent>
    </ForecastGraphComponent>
  );
};
