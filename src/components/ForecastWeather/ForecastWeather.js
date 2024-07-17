import {Header} from "@vkontakte/vkui";
import {decadeText, MonthOf} from "../../utils/";
import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "../Table/Table";
import {ForecastWeatherComponent} from "./styled.js";

export const ForecastWeather = ({ decade, month, range }) => {
  const years = Object.keys(range);

  return (
    <ForecastWeatherComponent>
      <Header mode="secondary">Средняя температура за {decadeText[decade]} декаду {MonthOf[month].toLowerCase()}</Header>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {years.map((year) => <Th key={year}>{year}</Th>)}
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              {years.map((year) => <Td key={year}>{range[year]}</Td>)}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </ForecastWeatherComponent>
  );
};
