import React from "react";
import {Div, FormStatus, Paragraph, Spacing} from "@vkontakte/vkui";
import {Matrix, roundItem} from "../Matrix/Matrix.js";
import {MathRow, MatrixBlock, MatrixLabel} from "./styled.js";
import {MathSqrt, MathText} from "../../utils/styled.js";
import {decadeText, Month, MonthOf} from "../../utils/index.js";

export const ForecastMath = ({ decade, month, result = false, forecast }) => {
  const { P, P_T, P_V, V, avg_range, temperature, D, inaccuracy } = forecast;
  const year = new Date().getFullYear();

  const P_V_not_null = P_V.filter((item) => item > 0);

  return (
    <Div>
      <MathRow>
        <MatrixBlock>
          <MatrixLabel>P</MatrixLabel>
          <Matrix matrix={P}/>
        </MatrixBlock>

        <MatrixBlock>
          <MatrixLabel>P<sup>T</sup></MatrixLabel>
          <Matrix matrix={P_T}/>
          <Matrix matrix={V}/>
          <MatrixLabel>=</MatrixLabel>
          <Matrix matrix={P_V}/>
        </MatrixBlock>
      </MathRow>

      {result && <React.Fragment>
        <Spacing size={25}/>

        <Paragraph>
          <MathText>
            M(X) = {
              P_V_not_null.map((a, i) => `${roundItem(a)} • ${roundItem(avg_range[i])}`).join(" + ")
            } = {roundItem(temperature)}
          </MathText>
        </Paragraph>

        <Spacing/>

        <Paragraph>
          <MathText>
            D(X) = M(X<sup>2</sup>) - (M(X))<sup>2</sup> = {
              P_V_not_null.map((a, i) => (
                <React.Fragment key={i}>
                  {roundItem(a)} • {roundItem(avg_range[i])}<sup>2</sup> {i !== P_V_not_null.length - 1 ? "+ " : ""}
                </React.Fragment>
              ))
            } - {temperature > 0 ? roundItem(temperature) : `(${roundItem(temperature)})`}<sup>2</sup> = {roundItem(D)}
          </MathText>
        </Paragraph>

        <Spacing size={12}/>

        <Paragraph>
          <MathText>σ = <MathSqrt>D(X)</MathSqrt> = <MathSqrt>{roundItem(D)}</MathSqrt> = {roundItem(inaccuracy)}</MathText>
        </Paragraph>

        <Spacing size={12}/>

        <FormStatus>
          <Paragraph>
            Дневная температура воздуха в {decadeText[decade]} декаде {MonthOf[month].toLowerCase()} {year} будет от {roundItem(temperature - inaccuracy)}° до {roundItem(temperature + inaccuracy)}°
          </Paragraph>
        </FormStatus>
      </React.Fragment>}
    </Div>
  );
};
