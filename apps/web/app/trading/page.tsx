'use client'
import { useSymbol } from "@/hooks/useSymbol";
import Charts from "./components/Charts";
import HeaderSection from "./components/Header";
import OrderSection from "./components/OrderSection";
import PositionTable from "./components/PositionTable";

const Trading = () => {

  const {currentSymbol}=useSymbol()
  return (
    <div className="min-h-screen w-full bg-gray-50 px-6 py-4">

      <HeaderSection />

   
  


      <div className="mt-6 grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-4">
          <OrderSection />
        </div>


        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
         
        <div className=" w-full rounded-xl bg-white shadow-sm">
  <Charts
    coinId={currentSymbol}
    initialPeriod="1s"
  />
</div>

   
          <PositionTable />
        </div>
      </div>
    </div>
  );
};

export default Trading;
