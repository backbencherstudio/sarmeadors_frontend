async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  return (
    <div>
      <div>Jobs for candidate ID: {id}</div>
    </div>
  );
}

export default page;
