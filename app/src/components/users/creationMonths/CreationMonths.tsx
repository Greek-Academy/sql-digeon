import { GraphLine } from "@/components/ui/graph/GraphLine";
import { useUserCreationMonths } from "@/hooks/user/useUserCreationMonths";
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
  const creationMonthsHook = useUserCreationMonths();

  if (creationMonthsHook.isLoading) {
    return <div>Loading...</div>;
  }

  if (creationMonthsHook.error) {
    return <div>Error: {creationMonthsHook.error.message}</div>;
  }

  const labels = creationMonthsHook.ret.map((item) => item.month);
  const values = creationMonthsHook.ret.map((item) => item.count);

  return (
    <div>
      <h1>月別ユーザー登録数</h1>
      <GraphLine label={"登録数"} labels={labels} values={values} />
    </div>
  );
};
