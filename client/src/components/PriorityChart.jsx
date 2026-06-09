import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PriorityChart({ data }) {
  const COLORS = [
    "#dc3545",
    "#ffc107",
    "#198754",
  ];

  return (
    <div className="card p-2 shadow-sm mb-2 ">
      <h4 className="mb-3">
        Priority Distribution
      </h4>

      <ResponsiveContainer
        width="100%"
        height={200}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={50}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriorityChart;