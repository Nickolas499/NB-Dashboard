import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,    
  } from "recharts";
  
  export const ProfileCharts = (props) => {
    return (
      <div>
        <h1 className="chart_title">{props.title}</h1>
        <ResponsiveContainer height={props.height} width="100%">
          <LineChart margin={{ top: 15, right: 30, bottom: 40, left: 0 }}data={props.data}>        
            <Line name={props.value1} type="monotone" dataKey={props.value1} stroke="#009C5A" strokeWidth={1} dot={false}/>
            <Line name={props.value2}  type="monotone" dataKey={props.value2} stroke="#005FF0" strokeWidth={1} dot={false}/>
            <Line name={props.value3} type="monotone" dataKey={props.value3} stroke="#E37300" strokeWidth={1} dot={false}/>
            <Line name={props.value4} type="monotone" dataKey={props.value4} stroke="#E2B00F" strokeWidth={1} dot={false}/>
            <Line name={props.value5}  type="monotone" dataKey={props.value5} stroke="#01B1BD" strokeWidth={1} dot={false}/>
            <Line name={props.value6} type="monotone" dataKey={props.value6} stroke="#5F01C4" strokeWidth={1} dot={false}/>         
            <CartesianGrid stroke="#ffffff35"strokeDasharray="3 3" />  
            <Tooltip contentStyle={{ backgroundColor: '#23262D', borderRadius: '5px' }} style={{ fontSize: '12px' }}/>      
            <XAxis style={{ fontSize: '10px' }}dataKey="DATE" textAnchor= "end" scaleToFit="true" verticalAnchor= "start"  interval={0} angle= "-45" stroke="#ffffffaa" />
            <YAxis style={{ fontSize: '12px'}} domain={props.range} stroke="#ffffffaa"/>
            <Legend iconType="plainline"  verticalAlign="top" height={40} width="100%" align="center" margin={{ top: 0, left: 100, right: 0, bottom: 0 }}/>
          </LineChart>      
        </ResponsiveContainer>
      </div>
    );
  };
  
