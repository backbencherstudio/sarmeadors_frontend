async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  return (
    <div>
      <div>profile page for candidate ID: {id}</div>
    </div>
  );
}

export default page;
