
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BatteryCharging, Plug, ZapOff } from "lucide-react";

const Charging = () => {
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [station, setStation] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stationData = localStorage.getItem("selectedStation");
    if (stationData) {
      setStation(JSON.parse(stationData));
      setHasActiveSession(true);
    }
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Charging Session</h1>
        <p className="text-muted-foreground">Manage your current charging session</p>
      </div>

      {hasActiveSession ? (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <BatteryCharging className="h-5 w-5 text-primary" />
                Active Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Station</span>
                  <span className="font-medium">{station?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-green-500">Charging</span>
                </div>
                <Button onClick={() => navigate("/charging-status")} className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <Button variant="outline" className="w-full gap-2" onClick={() => navigate("/map")}>
                <Plug className="h-4 w-4" /> Find New Charging Station
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="rounded-full bg-muted p-6 inline-flex mb-4">
            <ZapOff className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">No Active Charging Session</h2>
          <p className="text-muted-foreground mb-6">Start a new charging session to see details here</p>
          <Button onClick={() => navigate("/map")} className="gap-2">
            <Plug className="h-4 w-4" /> Find Charging Station
          </Button>
        </div>
      )}
    </div>
  );
};

export default Charging;
