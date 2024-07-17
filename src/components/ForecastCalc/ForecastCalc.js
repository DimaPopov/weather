import {useMemo, useState} from "react";
import {Accordion, Div, Flex, Spinner} from "@vkontakte/vkui";

import {rangeToAdjustObject} from "../../lib/ranges.js";

import {
  FlexBlock,
  ForecastCalcComponent,
  ForecastCalcGraph,
  ForecastGraphLegend,
  ForecastGraphLegendItem, SystemInfo
} from "./styled.js";

import {COLORS} from "../../utils/styled.js";

import {ForecastRange} from "../ForecastRange/ForecastRange.js";
import {ForecastGraph} from "../ForecastGraph/ForecastGraph.js";
import {ForecastWeather} from "../ForecastWeather/ForecastWeather.js";
import {ForecastMath} from "../ForecastMath/ForecastMath.js";


export const ForecastCalc = ({ forecast, result = false }) => {
  const [hoverWay, setHoverWay] = useState(-1);
  const [hoverWayGraph, setHoverWayGraph] = useState(-1);

  const [showSystemInfo, setShowSystemInfo] = useState(false);

  const ranges = useMemo(() => {
    const ranges = forecast?.range;
    const dataRange = { s1: [], s2: [] };

    if (!ranges) return dataRange;

    dataRange.s1 = rangeToAdjustObject(ranges.s1);
    dataRange.s2 = rangeToAdjustObject(ranges.s2);

    return dataRange;
  }, [forecast?.range]);


  const wayLegend = useMemo(() => {
    const wayIDs = [];
    if (!forecast?.way) return wayIDs;

    forecast.way.map((array) => {
      array.map((item) => {
        if (item.length > 0) wayIDs.push(item);
      });
    });

    return wayIDs.map((item, i) => {
      return [i, item];
    }).sort((a, b) => a[1][0] - b[1][0]);
  }, [forecast?.way]);

  if (!forecast) return <Spinner style={{ height: 250 }}/>;

  return (
    <ForecastCalcComponent>
      <ForecastCalcGraph>
        <FlexBlock>
          <Flex>
            <ForecastRange
              s={1}
              decade={forecast?.argument?.month_1?.decade}
              month={forecast?.argument?.month_1?.month}
              range={ranges.s1}
            />

            <ForecastRange
              s={2}
              decade={forecast?.argument?.month_2?.decade}
              month={forecast?.argument?.month_2?.month}
              range={ranges.s2}
            />
          </Flex>

          <ForecastGraphLegend>
            {wayLegend.map((item) => (
              <ForecastGraphLegendItem
                key={item[0]}
                $color={COLORS[item[0]]}
                $hoverGraph={hoverWayGraph !== item[0] && hoverWayGraph !== -1}
                onMouseEnter={() => setHoverWay(item[0])}
                onMouseLeave={() => setHoverWay(-1)}
              >
                {item[1].join(", ")}
              </ForecastGraphLegendItem>
            ))}
          </ForecastGraphLegend>
        </FlexBlock>

        <ForecastGraph
          way={forecast?.way}
          hoverWay={hoverWay}
          onHover={(id) => setHoverWayGraph(id)}
          onBlur={() => setHoverWayGraph(-1)}
        />
      </ForecastCalcGraph>

      <ForecastWeather
        decade={forecast?.argument?.month_1?.decade}
        month={forecast?.argument?.month_1?.month}
        range={forecast?.argument?.d1}
      />

      <ForecastWeather
        decade={forecast?.argument?.month_2?.decade}
        month={forecast?.argument?.month_2?.month}
        range={forecast?.argument?.d2}
      />

      <ForecastMath
        result={result}
        decade={forecast?.argument?.month_2?.decade}
        month={forecast?.argument?.month_2?.month}
        forecast={forecast}
      />

      <Accordion
        expanded={showSystemInfo}
        onChange={(e) => (e ? setShowSystemInfo(true) : setShowSystemInfo(false))}
      >
        <Accordion.Summary iconPosition="before">Техническая информация</Accordion.Summary>
        <Accordion.Content>
          <SystemInfo>
            <pre>
              {JSON.stringify(forecast, null, 4)}
            </pre>
          </SystemInfo>
        </Accordion.Content>
      </Accordion>
    </ForecastCalcComponent>
  );
};
