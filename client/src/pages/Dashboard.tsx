import { DataTable } from "@/components/app/data-table";
import { adminTableColumn } from "@/components/columns/admin-table-column";
import { sampleRestaurants } from "@/types/restaurant.type";

export const AdminDashboard = () => {
  return (
    <main className="h-full w-full">
      <section className="mt-3 w-full">
        <DataTable columns={adminTableColumn} data={sampleRestaurants} />
      </section>
    </main>
  );
};
