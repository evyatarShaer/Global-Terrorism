import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { fetchDeadliestAttackTypes } from "../store/features/deadliestAttackTypesSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deadliestAttackTypesModel } from "../types/deadliestAttackTypes";

const DeadliestAttackTypes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const deadliestAttackTypesList = useSelector((state: RootState) => state.deadliestAttackTypes.deadliestAttackTypesList);
  const status = useSelector((state: RootState) => state.deadliestAttackTypes.status);
  const error = useSelector((state: RootState) => state.deadliestAttackTypes.error);
  const [newList, setNewList] = useState<deadliestAttackTypesModel[]>([]);
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDeadliestAttackTypes());
    }
  }, [status, error, dispatch]);
  const CustomTooltip = ({active, payload, label}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div style={{color: "#213555"}}>
          <p>{`${label} : ${payload[0].value}`}</p>
          <p>In this attack they were killed {payload[0].value} people.</p>
        </div>
      );
    }
    return null;
  };
  const createNewList = (deadliestAttack: string) => {
    const attack = deadliestAttackTypesList.find((item) => item._id === deadliestAttack);
    if (!attack) return;
    const isExists = newList.some((item) => item._id === attack._id);
    if (isExists) {
      const updatedList = newList.filter((item) => item._id !== attack._id);
      setNewList(updatedList);
      if (updatedList.length === 0) setRender(false);
    } else {
      setNewList((prevList) => [...prevList, attack]);
      setRender(true);
    }
  };
  return (
    <div>
      {status === "loading" && <p>Loading data...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {deadliestAttackTypesList.length > 0 && (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={render ? newList : deadliestAttackTypesList}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" tick={{ fill: '#213555' }} />
            <YAxis dataKey="total_fatalities" tick={{ fill: '#213555' }}/>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="total_fatalities" barSize={30} fill="#608BC1" />
          </BarChart>
        </ResponsiveContainer>
      )}
      <div>
        {deadliestAttackTypesList.map((deadliestAttack) => (
          <button
            key={deadliestAttack._id}
            onClick={() => createNewList(deadliestAttack._id)}
            style={{
              backgroundColor: newList.some(item => item._id === deadliestAttack._id) ? "#b0c4de" : "#f0f0f0"
            }}
          >
            {deadliestAttack._id}
          </button>
        ))}
      </div>
    </div>
  );
};
export default DeadliestAttackTypes;
