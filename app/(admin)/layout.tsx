import AdminSidbarMenu from "@/components/common/AdminSidbarMenu";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminSidbarMenu>{children}</AdminSidbarMenu>;
};

export default AdminLayout;
