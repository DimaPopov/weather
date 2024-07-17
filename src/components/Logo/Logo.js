import WeatherKit from "../../assets/weatherkit-128x128_2x.png";
import {LogoComponent, LogoTitle} from "./styled";

export const Logo = () => {
  return (
    <LogoComponent>
      <img
        width={45}
        height={45}
        src={WeatherKit}
        alt=""
        draggable={false}
      />

      <LogoTitle>
        Погода
      </LogoTitle>
    </LogoComponent>
  );
};
