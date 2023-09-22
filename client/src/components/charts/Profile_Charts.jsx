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
            <Line name={props.value1} type="monotone" dataKey={props.value1} stroke="#009C5A" strokeWidth={1} dot={true}/>
            <Line name={props.value2}  type="monotone" dataKey={props.value2} stroke="#005FF0" strokeWidth={1} dot={false}/>
            <Line name={props.value3} type="monotone" dataKey={props.value3} stroke="#E37300" strokeWidth={1} dot={false}/>
            <Line name={props.value4} type="monotone" dataKey={props.value4} stroke="#E2B00F" strokeWidth={1} dot={false}/>
            <Line name={props.value5}  type="monotone" dataKey={props.value5} stroke="#01B1BD" strokeWidth={1} dot={false}/>
            <Line name={props.value6} type="monotone" dataKey={props.value6} stroke="#5F01C4" strokeWidth={1} dot={false}/>
            <Line name={props.value7} type="monotone" dataKey={props.value7} stroke="#268307" strokeWidth={1} dot={false}/>
            <Line name={props.value8} type="monotone" dataKey={props.value8} stroke="#d55c1a" strokeWidth={1} dot={false}/>
            <Line name={props.value9} type="monotone" dataKey={props.value9} stroke="#dfe30d" strokeWidth={1} dot={false}/>
            <Line name={props.value10} type="monotone" dataKey={props.value10} stroke="#F0F0F0" strokeWidth={1} dot={false}/>
            <Line name={props.value11} type="monotone" dataKey={props.value11} stroke="#21b57a" strokeWidth={1} dot={false}/>
            <Line name={props.value12} type="monotone" dataKey={props.value12} stroke="#9e4ef4" strokeWidth={1} dot={false}/>
            <Line name={props.value13} type="monotone" dataKey={props.value13} stroke="#961d1d" strokeWidth={1} dot={false}/>
                     
            <CartesianGrid stroke="#ffffff35"strokeDasharray="3 3" />  
            <Tooltip contentStyle={{ backgroundColor: '#23262D', borderRadius: '5px' }} style={{ fontSize: '12px' }}/>      
            <XAxis style={{ fontSize: '10px' }}dataKey="_id" textAnchor= "end" scaleToFit="true" verticalAnchor= "start"  interval={0} angle= "-45" stroke="#ffffffaa" />
            <YAxis style={{ fontSize: '12px'}} domain={props.range} stroke="#ffffffaa"/>
            <Legend iconType="plainline"  verticalAlign="top" height={40} width="100%" align="center" margin={{ top: 0, left: 100, right: 0, bottom: 0 }}/>
          </LineChart>      
        </ResponsiveContainer>
      </div>
    );
  };
  
