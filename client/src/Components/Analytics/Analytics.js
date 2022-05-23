import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { BarChart, Bar, Legend} from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import "./Analytics.css"
import React, { PureComponent } from 'react';


export default function  Analytics(props){
    return (
        <div>
            <div className='container'>
        
                <div className="BarChart">
                    {renderBarChart}
                </div>

                <div className='PieChart'>
                    {renderPieChart}
                </div>

                <div className='LineChart'>
                    {renderAreaChart}
                </div>
            </div>
        </div>
    
    )

}

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  

export const renderAreaChart = (
    <AreaChart width={1000} height={300} data={data} margin={{ top: 100, right: 30, left: 0,bottom: 0,}}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="amt" stackId="1" stroke="#ff0000" fill="#ff0000" />
  </AreaChart>
);

export const renderBarChart = (
    <BarChart width={500} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <XAxis dataKey="name" stroke="#8884d8" />
      <YAxis />
      <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="uv" fill="#ff00ff" barSize={30} />
    </BarChart>
  );

    const data1 = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
        ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];  

export const renderPieChart = (
    <PieChart display= 'inline' width={500} height={300} margin={{ top: 0, right: 0, bottom: 0, left: 100 }} >
        <Pie
        data={data1}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        >
        {data1.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
    </PieChart>
)