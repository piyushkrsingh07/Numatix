import Charts from "./components/Charts";

const Trading = () => {
  return (
    <div className="flex gap-x-2 w-screen overflow-hidden">
      <Charts
        coinId="BTCUSDT"
        height={360}
        initialPeriod="daily"
      />
    </div>
  );
};

export default Trading;
