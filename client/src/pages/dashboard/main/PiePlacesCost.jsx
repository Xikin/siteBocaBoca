import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useValue } from '../../../context/ContextProvider';

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#6E009B'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PiePlacesCost() {
  const {
    state: { place },
  } = useValue();
  const [costGroups, setCostGroups] = useState([]);

  useEffect(() => {
    let free = 0,
      lessThan15 = 0,
      between15And35 = 0,
      moreThan50 = 0,
      moreThan100=0;
    place.forEach((place) => {
      if (place.price === 0) return free++;
      if (place.price < 15) return lessThan15++;
      if (place.price <= 35) return between15And35++;
      if (place.price >= 50) return moreThan50++;
      if (place.price >= 100) return moreThan100++;

    });
    setCostGroups([
      { name: 'Preço Não Especificado', qty: free },
      { name: 'Menos que R$15', qty: lessThan15 },
      { name: 'Entre R$15 & R$35', qty: between15And35 },
      { name: 'Maior ou igual a R$50', qty: moreThan50 },
      { name: 'Maior ou igual a R$100', qty: moreThan100 },

    ]);
  }, [place]);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >
      <PieChart width={250} height={235}>
        <Pie
          data={costGroups}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="qty"
        >
          {costGroups.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={2}>
        <Typography variant="h6">Preço dos Locais</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 25, height: 25, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {costGroups[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}