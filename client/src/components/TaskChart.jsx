import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
    PieChart,
    Pie,
    Legend,
} from "recharts";

function TaskChart({ data }) {
    return (
        <div className="card p-3 shadow-sm mb-4">
            <h4 className="mb-3">Task Overview</h4>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="category" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="count">
                        <Cell fill="#ffc107" />
                        <Cell fill="#198754" />
                        <Cell fill="#dc3545" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TaskChart;