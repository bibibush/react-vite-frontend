import CustomDataTable from "@/components/CustomTables/CustomDataTable";
import useGetDataTable from "@/hooks/useGetDataTable";

function Trends() {
  const { data } = useGetDataTable({
    category: "siselist_tab_0",
    extraColumnsName: ["a", "b", "c", "d"].join(","),
  });
  console.log(data);
  return (
    <section className="bg-white rounded-lg lg:py-5 lg:px-3">
      <CustomDataTable />
    </section>
  );
}

export default Trends;
