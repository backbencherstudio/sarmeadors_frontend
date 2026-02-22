import LoginHeader from "@/components/auth/LoginHeader";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import Loader from "@/components/reusable/Loader";
import { Suspense } from "react";
function NewPasswordPage() {
  return (
    <section className="max-w-[1346px] mx-auto min-h-screen  px-4">
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <div className="flex justify-center items-center min-h-screen ">
          <div className="w-full max-w-lg   space-y-4 ">
            <div>
              <LoginHeader
                title=" New Password"
                heading="COAST TO COAST NANNIES"
                subtitle="Choose a new and secure password to protect your account."
              />
            </div>
            <NewPasswordForm />
          </div>
        </div>
      </Suspense>
    </section>
  );
}

export default NewPasswordPage;
