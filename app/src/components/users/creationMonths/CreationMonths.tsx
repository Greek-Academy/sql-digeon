import type { UserCreationMonths } from "@/entity/user";
import { UserRepositoryAPI } from "@/repository/api/user";
import { UserUseCase } from "@/repository/usecase/user";
import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const CreationMonths = () => {
  const userRepository = useMemo(() => new UserRepositoryAPI(), []);
  const userUseCase = useMemo(
    () => new UserUseCase(userRepository),
    [userRepository],
  );
  const [months, setMonths] = useState<UserCreationMonths[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const monthsData = await userUseCase.fetchCreationMonths();
      setMonths(monthsData);
    };

    fetchData();
  }, [userUseCase]);

  if (months.length === 0) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: months.map((item) => item.month),
    datasets: [
      {
        label: "Count",
        data: months.map((item) => item.count),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        label: "Creation Months",
      },
    },
  };

  return <Line data={data} options={options} />;
};
