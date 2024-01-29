import { Line } from 'react-chartjs-2';
// eslint-disable-next-line
import Chart from 'chart.js/auto';

function SalesChart({ chartData }) {
  return <Line data={chartData} />;
}

export default SalesChart;
