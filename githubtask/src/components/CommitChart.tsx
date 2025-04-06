import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface CommitChartProps {
  commitData: any[];
}

const CommitChart: React.FC<CommitChartProps> = ({ commitData }) => {
  // Process data for the chart
  const processedData = useMemo(() => {
    // Create a map of date to commit counts for each repository
    const dateMap = new Map();
    
    // Process each repository's commit data
    commitData.forEach(repo => {
      repo.data.forEach((day: any) => {
        if (!dateMap.has(day.date)) {
          dateMap.set(day.date, { date: day.date });
        }
        const existingData = dateMap.get(day.date);
        existingData[repo.repository] = day.count;
      });
    });
    
    // Convert map to array and sort by date
    return Array.from(dateMap.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [commitData]);
  
  // Generate random colors for each repository
  const colors = useMemo(() => {
    return commitData.map(() => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 50%)`;
    });
  }, [commitData]);

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={processedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {commitData.map((repo, index) => (
            <Line
              key={repo.repository}
              type="monotone"
              dataKey={repo.repository}
              stroke={colors[index]}
              dot={false}
              name={repo.repository}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitChart;