
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Battery, BatteryCharging, Clock, Zap } from "lucide-react";

enum ChargingStage {
  INITIALIZING = "INITIALIZING",
  PREPARING = "PREPARING",
  CONNECTING = "CONNECTING",
  CHARGING = "CHARGING",
  COMPLETE = "COMPLETE",
}

const ChargingStatus = () => {
  const [stage, setStage] = useState<ChargingStage>(ChargingStage.INITIALIZING);
  const [progress, setProgress] = useState(0);
  const [station, setStation] = useState<any>(null);
  const [port, setPort] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const stationData = localStorage.getItem("selectedStation");
    const portData = localStorage.getItem("selectedPort");
    
    if (!stationData || !portData) {
      navigate("/map");
      return;
    }
    
    setStation(JSON.parse(stationData));
    setPort(portData);
    
    // Simulate charging progress
    const timer1 = setTimeout(() => setStage(ChargingStage.PREPARING), 1500);
    const timer2 = setTimeout(() => setStage(ChargingStage.CONNECTING), 3000);
    const timer3 = setTimeout(() => setStage(ChargingStage.CHARGING), 5000);
    
    let progressInterval: ReturnType<typeof setInterval>;
    const timer4 = setTimeout(() => {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setStage(ChargingStage.COMPLETE);
            return 100;
          }
          return prev + 10;
        });
      }, 1000);
    }, 5500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [navigate]);

  const getStageContent = () => {
    switch (stage) {
      case ChargingStage.INITIALIZING:
        return {
          title: "Initializing",
          description: "Setting up your charging session",
          icon: <Clock className="h-8 w-8 animate-pulse" />,
        };
      case ChargingStage.PREPARING:
        return {
          title: "Preparing",
          description: "Getting charger ready",
          icon: <Battery className="h-8 w-8 animate-pulse" />,
        };
      case ChargingStage.CONNECTING:
        return {
          title: "Connecting",
          description: "Establishing connection to your vehicle",
          icon: <Zap className="h-8 w-8 animate-pulse" />,
        };
      case ChargingStage.CHARGING:
        return {
          title: "Charging in Progress",
          description: "Your vehicle is now charging",
          icon: <BatteryCharging className="h-8 w-8 text-green-500" />,
        };
      case ChargingStage.COMPLETE:
        return {
          title: "Charging Complete",
          description: "Your vehicle has been charged successfully",
          icon: <Battery className="h-8 w-8 text-green-500" />,
        };
      default:
        return {
          title: "Unknown Status",
          description: "Please check your connection",
          icon: <Clock className="h-8 w-8" />,
        };
    }
  };

  const content = getStageContent();

  if (!station) return null;

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/port-selection")}
          className="mr-2"
          disabled={stage === ChargingStage.CHARGING}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Charging Status</h1>
          <p className="text-muted-foreground">{station.name}</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-primary/10 p-6 mb-4">
              {content.icon}
            </div>
            <h2 className="text-xl font-bold mb-1">{content.title}</h2>
            <p className="text-muted-foreground mb-4">{content.description}</p>
            
            {(stage === ChargingStage.CHARGING || stage === ChargingStage.COMPLETE) && (
              <div className="w-full space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>{progress}%</span>
                  <span>{stage === ChargingStage.COMPLETE ? "Complete" : `${Math.round(progress / 10)} minutes remaining`}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Station</span>
          <span className="font-medium">{station.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Port Type</span>
          <span className="font-medium">
            {port === "ccs" ? "CCS (Combo 1)" : 
             port === "chademo" ? "CHAdeMO" :
             port === "type2" ? "Type 2" : "Tesla"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Power</span>
          <span className="font-medium">150 kW</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated Cost</span>
          <span className="font-medium">$12.50</span>
        </div>
      </div>

      {stage === ChargingStage.COMPLETE && (
        <Button className="w-full mt-6" onClick={() => navigate("/home")}>
          Return to Home
        </Button>
      )}
      
      {stage === ChargingStage.CHARGING && (
        <Button className="w-full mt-6" variant="destructive">
          Stop Charging
        </Button>
      )}
    </div>
  );
};

export default ChargingStatus;
