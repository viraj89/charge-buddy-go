
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-primary p-3">
            <Battery className="h-8 w-8 text-white" />
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
