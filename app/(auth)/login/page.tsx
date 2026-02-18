import LoginForm from "@/components/allForm/LoginForm";
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
        <LoginForm />
      </Suspense>
    </section>
  );
}

export default LoginPage;
