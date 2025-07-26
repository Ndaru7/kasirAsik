import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MonthlyTarget = ({ totalRevenue = 0, target = 1 }) => {
    const percent = Math.min((totalRevenue / target) * 100, 100);
    const formattedRevenue = totalRevenue.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });
    const formattedTarget = target.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });
    const todayRevenue = (totalRevenue / 30).toFixed(0); // Simulasi per hari

    return (
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-between h-full">
            <h2 className="text-lg font-semibold mb-2">Monthly Target</h2>
            <div className="w-[120px] h-[120px] mb-2">
                <CircularProgressbar
                    value={percent}
                    text={`${percent.toFixed(2)}%`}
                    styles={buildStyles({
                        pathColor: "#3b82f6",
                        textColor: "#111827",
                        trailColor: "#d1d5db",
                        textSize: "18px",
                    })}
                />
            </div>
            <p className="text-sm text-center mb-2">
                You’ve earned <strong>{formattedRevenue}</strong> this month.
            </p>
            <div className="flex justify-between w-full text-xs border-t pt-2 text-gray-500">
                <div>
                    <div className="text-gray-700">Target</div>
                    <div className="text-red-500">{formattedTarget} ↓</div>
                </div>
                <div>
                    <div className="text-gray-700">Revenue</div>
                    <div className="text-green-500">{formattedRevenue} ↑</div>
                </div>
                <div>
                    <div className="text-gray-700">Today</div>
                    <div className="text-green-500">
                        +Rp{Number(todayRevenue).toLocaleString("id-ID")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyTarget;
