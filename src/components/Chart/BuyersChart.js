import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    sales: 4000,
    ex_sales: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    sales: 3000,
    ex_sales: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    sales: 2000,
    ex_sales: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    sales: 2780,
    ex_sales: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    sales: 1890,
    ex_sales: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    sales: 2390,
    ex_sales: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    sales: 3490,
    ex_sales: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    sales: 2000,
    ex_sales: 9800,
    amt: 2290,
  },
  {
    name: 'Sep',
    sales: 2780,
    ex_sales: 3908,
    amt: 2000,
  },
  {
    name: 'Oct',
    sales: 1890,
    ex_sales: 4800,
    amt: 2181,
  },
  {
    name: 'Nov',
    sales: 2390,
    ex_sales: 3800,
    amt: 2500,
  },
  {
    name: 'Dec',
    sales: 3490,
    ex_sales: 4300,
    amt: 2100,
  },
];
const BuyersChart = () => {

  const {t} = useTranslation()

  return (
    <div>
      <h2 className='text-center my-2'>{t('home.syear')}</h2>
      <ResponsiveContainer   style={{ direction: 'rtl' }} width="100%" height={200}>
        <AreaChart
            

          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip  />
          <Area type="monotone" dataKey="sales" stroke="#3f8600" fill="#3f8600" />
        </AreaChart>
      </ResponsiveContainer>
      <h2 className='text-center mt-4'>{t('home.esyear')}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area connectNulls type="monotone" dataKey="ex_sales" stroke="#8a9bb5" fill="#8a9bb5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BuyersChart;