
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BatteryCharging, MapPin, TimerReset, Zap } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Charge Buddy Go</h1>
      </div>

      <div className="grid gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full gap-2 justify-start" 
              size="lg"
              onClick={() => navigate("/map")}
            >
              <MapPin className="h-5 w-5" /> Find Charging Stations
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <BatteryCharging className="h-5 w-5 text-primary" />
                Recent Charging
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">No recent charging sessions</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Energy Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">0 kWh</div>
              <div className="text-sm text-muted-foreground">Start charging to track savings</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
