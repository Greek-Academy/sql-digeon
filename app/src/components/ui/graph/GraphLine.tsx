import { Line } from "react-chartjs-2";

type GraphLineProps = {
  label: string;
  labels: string[];
  values: number[];
};
export const GraphLine = ({ label, labels, values }: GraphLineProps) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Line data={data} options={options} />;
};
