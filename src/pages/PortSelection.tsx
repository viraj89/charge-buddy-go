
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plug, Zap, Check } from "lucide-react";
import { toast } from "sonner";

const portTypes = [
  { id: "ccs", name: "CCS (Combo 1)", icon: "Plug", color: "bg-blue-100", available: true },
  { id: "chademo", name: "CHAdeMO", icon: "Plug", color: "bg-blue-100", available: true },
  { id: "type2", name: "Type 2", icon: "Plug", color: "bg-blue-100", available: true },
  { id: "tesla", name: "Tesla", icon: "Plug", color: "bg-blue-100", available: false },
];

const PortSelection = () => {
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [selectedPort, setSelectedPort] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stationData = localStorage.getItem("selectedStation");
    if (stationData) {
      setSelectedStation(JSON.parse(stationData));
    } else {
      navigate("/map");
    }
  }, [navigate]);

  const handlePortSelect = (portId: string) => {
    const port = portTypes.find(p => p.id === portId);
    if (port && !port.available) {
      toast.error("This port type is not available at this station");
      return;
    }
    setSelectedPort(portId);
  };

  const handleContinue = () => {
    if (!selectedPort) {
      toast.error("Please select a charging port");
      return;
    }
    
    localStorage.setItem("selectedPort", selectedPort);
    navigate("/charging-status");
  };

  if (!selectedStation) return null;

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/map")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Select Charging Port</h1>
          <p className="text-muted-foreground">{selectedStation.name}</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {portTypes.map((port) => (
          <Card 
            key={port.id}
            className={`cursor-pointer transition-all ${selectedPort === port.id ? 'border-primary' : ''} ${!port.available ? 'opacity-50' : ''}`}
            onClick={() => handlePortSelect(port.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className={`rounded-full ${port.color} p-3 mr-4`}>
                  <Plug className="h-6 w-6 text-blue-800" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{port.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {port.available ? 'Available now' : 'Currently unavailable'}
                  </p>
                </div>
                {selectedPort === port.id && <Check className="h-5 w-5 text-primary" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        className="w-full" 
        onClick={handleContinue}
        disabled={!selectedPort}
      >
        Continue
      </Button>
    </div>
  );
};

export default PortSelection;
