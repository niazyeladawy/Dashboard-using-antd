import React from 'react'
// import { Area, AreaChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export const data2 = {
    labels: ['المستخدمين الجدد', 'عدد المشتركين'],
    datasets: [
        {
            data: [1, 100],
            backgroundColor: [
                'rgba(255, 99, 132, .1)',
                'rgba(54, 162, 235, .1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    plugins: {
        datalabels: {
            backgroundColor: function (context) {
                return context.dataset.backgroundColor;
            },

            formatter: (val, context) => `${val}%`,
            borderRadius: 25,
            borderWidth: 3,
            color: "black",
            font: {
                weight: "bold"
            },
            padding: 6
        },

        tooltip: {
            callbacks: {
                label: (ttItem) =>
                    `${ttItem.label}: ${((ttItem.parsed * 100) /
                    ttItem.dataset.data.reduce(
                        (a, b) => Number(a) + Number(b),
                        0
                    )).toFixed()
                    }%`
                //label: (ttItem) => `${ttItem.label}: ${ttItem.parsed}%`
            }
        }
    }
}

const ChartsPage = () => {
    const data = [
        { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }
        , { name: 'Page B', uv: 1900, pv: 2400, amt: 2400 }
        , { name: 'Page C', uv: 400, pv: 2400, amt: 2400 }
    ];
    const pieData = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
        {
            "name": "Group C",
            "value": 500
        },
        {
            "name": "Group D",
            "value": 200
        },
        {
            "name": "Group E",
            "value": 278
        },
        {
            "name": "Group F",
            "value": 189
        }
    ]

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFBB28', '#FF8042'];


    return (
        <div className='chartspage'>
            <h1>Charts</h1>
            {/* <div>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
                <PieChart width={730} height={250}>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} label>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </div> */}
            <div style={{ width: '300px' }}>
                <Pie data={data2} options={options} />
            </div>
        </div>
    )
}

export default ChartsPage