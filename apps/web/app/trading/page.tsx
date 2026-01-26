import Charts from "./components/Charts";
import HeaderSection from "./components/Header";
import OrderSection from "./components/OrderSection";
import PositionTable from "./components/PositionTable";

const Trading = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 px-6 py-4">
      {/* Header */}
      <HeaderSection />

      {/* Page Title */}
  

      {/* Main Layout */}
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* Left Panel */}
        <div className="col-span-12 lg:col-span-4">
          <OrderSection />
        </div>

        {/* Right Panel */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Chart */}
        <div className=" w-full rounded-xl bg-white shadow-sm">
  <Charts
    coinId="BTCUSDT"
    initialPeriod="1s"
  />
</div>

          {/* Positions Table */}
          <PositionTable />
        </div>
      </div>
    </div>
  );
};

export default Trading;
