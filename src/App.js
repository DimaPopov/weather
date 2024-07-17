import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  SplitLayout,
  SplitCol,
  Group,
  FormLayoutGroup,
  FormItem,
  Button, CustomSelect,
  Text, CustomSelectOption, Spacing
} from '@vkontakte/vkui';

import {useSearchParams} from "@vkontakte/vk-mini-apps-router";
import {debounce} from "@vkontakte/vkjs";

import "./main.css";
import styles from "./App.module.css";

import {Logo} from "./components/Logo/Logo";
import {WeatherBlock} from "./components/WeatherBlock/WeatherBlock";
import {SimpleForecastBlock} from "./components/SimpleForecastBlock/SimpleForecastBlock";

import {getCities, translateLetter} from "./utils/";
import {Modals} from "./modals/Modals";
import {ExactForecastBlock} from "./components/ExactForecastBlock/ExactForecastBlock.js";


let getCityDebounce;

export const App = () => {
  const [params, setParams] = useSearchParams();

  const [showData, setShowData] = useState(false);
  const [dataWeather, setDataWeather] = useState({});

  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(params.get("city") ?? null);
  const [citySelect, setCitySelect] = useState(params.get("city") ?? null);

  const [cityQuery, setCityQuery] = React.useState('');
  const [fetching, setFetching] = React.useState(false);
  const [cities, setCities] = React.useState([]);

  const [simpleForecast, setSimpleForecast] = useState(false);
  const [exactForecast, setExactForecast] = useState(false);

  useEffect(() => {
    if (city) params.set("city", city);
    else params.delete("city");

    setParams(params);
  }, [city]);

  useLayoutEffect(() => {
    if (city) {
      setLoading(true);
      setShowData(true);

      const cityRU = translateLetter(city);

      setCityQuery(cityRU);
      getCities(cityRU)
        .then((data) => {
          setCities(data);
          setFetching(false);
        });
    }

    getCityDebounce = debounce(getCity, 1000);
  }, []);


  // Запустить прогнозирование
  const onForecast = () => {
    setCity(citySelect);
    setExactForecast(false);
    setSimpleForecast(false);
    setDataWeather({});
    setLoading(true);
    if (!showData) setShowData(true);
  };

  // Проверка выполнены ли выяисления прогнозов
  const onCheckForecast = () => {
    if (!simpleForecast || !exactForecast) return;
    setLoading(false);
  };

  // Получение списка городов
  const getCity = (q) => {
    getCities(q)
      .then((data) => {
        setCities(data);
        setFetching(false);
      });
  };

  const searchCity = (e) => {
    const _cityQuery = e.target.value;
    setCityQuery(_cityQuery);

    if (_cityQuery.length > 3) setFetching(true);
    getCityDebounce(_cityQuery);
  };

  const renderDropdown = ({ defaultDropdownContent }) => {
    if (cityQuery.length < 3) {
      return (
        <Text style={{ padding: 12, color: 'var(--vkui--color_text_secondary)' }}>
          Нужно ввести хотя бы три символа
        </Text>
      );
    }

    return defaultDropdownContent;
  };

  return (
    <SplitLayout className={styles.App} modal={<Modals/>}>
      <SplitCol maxWidth={1100}>
        <Logo/>

        <Group>
          <FormLayoutGroup mode={window.innerWidth <= 768 ? "vertical" : "horizontal"}>
            <FormItem htmlFor="city" top="Город">
              <CustomSelect
                id="city"
                value={citySelect}
                onChange={(e) => setCitySelect(e.target.value)}
                options={cities}
                placeholder="Введите название города"
                onInputChange={searchCity}
                fetching={fetching}
                disabled={loading}
                searchable
                renderDropdown={!fetching && renderDropdown}
                renderOption={({ option, ...restProps }) => (
                  <CustomSelectOption
                    {...restProps}
                    description={option?.description}
                  />
                )}
              />
            </FormItem>

            <FormItem>
              <Button
                style={window.innerWidth > 768 ? { marginLeft: 16 } : {}}
                stretched={window.innerWidth <= 768}
                size="l"
                mode="secondary"
                loading={loading}
                onClick={onForecast}
                disabled={!citySelect}
              >
                Спрогназировать
              </Button>
            </FormItem>
          </FormLayoutGroup>
        </Group>

        {showData && <React.Fragment>
          <WeatherBlock
            city={city}
            weather={dataWeather}
            setWeather={setDataWeather}
          />

          {Object.keys(dataWeather).length >= 10 && <Group>
            <SimpleForecastBlock
              weather={dataWeather}
              setStatus={setSimpleForecast}
              checkForecast={onCheckForecast}
            />

            <Spacing size={20}/>

            <ExactForecastBlock
              weather={dataWeather}
              setStatus={setExactForecast}
              checkForecast={onCheckForecast}
            />
          </Group>}
        </React.Fragment>}
      </SplitCol>
    </SplitLayout>
  );
};
