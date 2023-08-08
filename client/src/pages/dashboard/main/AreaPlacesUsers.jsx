import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useValue } from '../../../context/ContextProvider';

const months = 8;
const today = new Date();
const tempData = [];
for (let i = 0; i < months; i++) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1))
  );
  tempData.push({
    date,
    name: moment(date).format('MMM YYYY'),
    users: 0,
    place: 0,
  });
}

export default function AreaPlaceUsers() {
  const {
    state: { place, users },
  } = useValue();
  const [data, setData] = useState([]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].users = 0;
    }
    users.forEach((user) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(user?.createdAt, 'month'))//Se bater o numero da criação com o do gráfico irá adicionar a criação do usuário naquele mês
          return tempData[i].users++;
      }
    });
    setData([...tempData]);
  }, [users]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].place = 0;
    }
    place.forEach((place) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(place?.createdAt, 'month'))
          return tempData[i].place++;
      }
    });
    setData([...tempData]);
  }, [place]);
  return (
    <div style={{ width: '100%', height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="place"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}