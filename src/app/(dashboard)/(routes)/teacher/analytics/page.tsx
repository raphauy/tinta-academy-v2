import { redirect } from "next/navigation";


import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { getAnalytics } from "@/app/(dashboard)/_services/get-analytics";
import { getCurrentUser } from "@/lib/auth";

const AnalyticsPage = async () => {
  const currentUser = await getCurrentUser()
  const userId = currentUser?.id

  if (!userId) {
    return redirect("/");
  }

  const {
    data,
    totalRevenue,
    totalSales,
  } = await getAnalytics(userId);

  return ( 
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Profit"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard
          label="Ventas"
          value={totalSales}
        />
      </div>
      <Chart
        data={data}
      />
    </div>
   );
}
 
export default AnalyticsPage;