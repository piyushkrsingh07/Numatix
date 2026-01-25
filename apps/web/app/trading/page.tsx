import Charts from "./components/Charts";

const Trading = () => {
  return (
    <div className="overflow-hidden w-[70%] h-screen">
      <Charts
        coinId="BTCUSDT"
 
       
        initialPeriod="1s"
      />
    </div>
  );
};

export default Trading;
