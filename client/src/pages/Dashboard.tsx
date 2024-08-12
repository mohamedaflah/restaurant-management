import { DataTable } from "@/components/app/data-table";
import { adminTableColumn } from "@/components/columns/admin-table-column";
import { getAllrestaurantAdmin } from "@/redux/actions/getAllrestaurant.action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IRestaurant } from "@/types/restaurant.type";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Check if `pageSize` or `page` is missing, and set default values
    if (!params.has("pageSize") || !params.has("page")) {
      params.set("pageSize", "7");
      params.set("page", "1");

      // Update the URL with the new parameters
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
  }, []);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    dispatch(
      getAllrestaurantAdmin({
        page: params.get("page") as unknown as number,
        pageSize: params.get("pageSize") as unknown as number,
        location: params.get("location") as string,
        pincode: params.get("pincode") as string,
        search: params.get("search") as string,
      })
    );
  }, [dispatch, searchParams]);

  const { restaurants } = useAppSelector((state) => state.retaurant);
  return (
    <main className="h-full w-full">
      <section className="mt-3 w-full">
        {restaurants ? (
          <>
            <DataTable
              columns={adminTableColumn}
              data={restaurants as IRestaurant[]}
            />
          </>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};
