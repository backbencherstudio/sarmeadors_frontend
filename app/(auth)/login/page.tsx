import LoginForm from "@/components/allForm/LoginForm";
import LoginHeader from "@/components/auth/LoginHeader";
import Loader from "@/components/reusable/Loader";
import { Suspense } from "react";
function LoginPage() {
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
                title=" Family Login"
                heading="COAST TO COAST NANNIES"
                subtitle="Submit your email and password for login."
              />
            </div>
            <LoginForm />
          </div>
        </div>
      </Suspense>
    </section>
  );
}

export default LoginPage;
