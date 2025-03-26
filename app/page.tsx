import ExpenseChart from "@/components/ExpenseChart";
import ExpensePrediction from "@/components/ExpensePrediction";
import Balance from "@/components/Balance";
import Spending from "@/components/Spending";
import RecentTransactions from "@/components/RecentTransaction";

export default function Home() {
  return (
    <div className="p-[5%] pt-4 bg-[#171717] text-white">
      {/* Header Section */}
      <div className="flex justify-between w-full pb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="bg-white px-4 py-1 text-[#212121] text-[16px] font-bold rounded-full inline-flex items-center justify-center leading-none">
          March
        </div>
      </div>

      {/* Main Layout Using Flex */}
      <div className="flex flex-col gap-4">
        {/* First Row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <ExpenseChart />
          </div>
          <div className="w-1/3">
            <ExpensePrediction />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Balance />
          </div>
          <div className="flex-1">
            <Spending />
          </div>
          <div className="flex-1">
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}