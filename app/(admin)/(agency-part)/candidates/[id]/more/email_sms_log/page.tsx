import React from 'react'

async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  return (
    <div>
      <div>Email/SMS Log for candidate ID: {id}</div>
    </div>
  )
}

export default page
