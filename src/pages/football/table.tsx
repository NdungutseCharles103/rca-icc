import Table from "@/components/constants/Table";
import { useApp } from "@/contexts/AppProvider";
import MainLayout from "@/layouts/MainLayout";

const FootTableIndex = () => {
  const { teams } = useApp();
  return (
    <MainLayout title="Football - Table">
      <div className="p-3 gap-y-3">
        <div className="float-left font-bold text-lg px-3">
          <h3>Standings</h3>
        </div>
        <Table teams={teams?.football!} />
      </div>
    </MainLayout>
  );
};

export default FootTableIndex;
