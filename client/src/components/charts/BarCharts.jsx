import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,ResponsiveContainer,
} from "recharts";

const BarCharts = (props) => {
  return (
    <div>
        <h1 className="chart_title">{props.title}</h1>
        <ResponsiveContainer height={250} width="100%">
      <BarChart  data={props.data} margin={{top: 20,right: 20, left: 0, bottom: 5,}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        <Bar dataKey="av" stackId="a" fill="#83339d" />
        <Bar dataKey="rv" stackId="a" fill="#fffa9d" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
