import List from "@/components/clients/AdminTabs/List/List";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  return (
    <div className="">
      <List />
    </div>
  );
}
