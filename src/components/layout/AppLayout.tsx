
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home, Map, Battery, Settings, LogOut } from "lucide-react";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");
    if (!authStatus) {
      navigate("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 mx-auto w-full max-w-screen-xl p-4 md:p-6">
        <Outlet />
      </main>
      <div className="border-t">
        <nav className="mx-auto max-w-screen-xl p-2">
          <div className="flex justify-around items-center">
            <Button
              variant={isActive("/home") ? "default" : "ghost"}
              className="flex flex-col items-center gap-1 h-16 w-16 rounded-full"
              onClick={() => navigate("/home")}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </Button>
            <Button
              variant={isActive("/map") ? "default" : "ghost"}
              className="flex flex-col items-center gap-1 h-16 w-16 rounded-full"
              onClick={() => navigate("/map")}
            >
              <Map className="h-6 w-6" />
              <span className="text-xs">Find</span>
            </Button>
            <Button
              variant={isActive("/charging") ? "default" : "ghost"}
              className="flex flex-col items-center gap-1 h-16 w-16 rounded-full"
              onClick={() => navigate("/charging")}
            >
              <Battery className="h-6 w-6" />
              <span className="text-xs">Charge</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-16 w-16 rounded-full"
              onClick={handleLogout}
            >
              <LogOut className="h-6 w-6" />
              <span className="text-xs">Logout</span>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
