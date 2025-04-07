
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Battery, MapPin, Navigation, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Mock data for charging stations
const MOCK_STATIONS = [
  { id: 1, name: "Downtown Charge Hub", address: "123 Main St", available: 3, total: 4, lat: 40.7128, lng: -74.0060 },
  { id: 2, name: "Central Park Charger", address: "456 Park Ave", available: 0, total: 2, lat: 40.7645, lng: -73.9779 },
  { id: 3, name: "Westside Power Station", address: "789 West Blvd", available: 5, total: 8, lat: 40.7484, lng: -74.0458 },
  { id: 4, name: "Eastside Charging Zone", address: "321 East St", available: 2, total: 6, lat: 40.7231, lng: -73.9478 }
];

const StationMap = () => {
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStations, setFilteredStations] = useState(MOCK_STATIONS);
  const navigate = useNavigate();
  
  // Filter stations when search query changes
  useEffect(() => {
    if (!searchQuery) {
      setFilteredStations(MOCK_STATIONS);
      return;
    }
    
    const filtered = MOCK_STATIONS.filter(station => 
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      station.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredStations(filtered);
  }, [searchQuery]);

  const handleStationSelect = (station: any) => {
    setSelectedStation(station);
  };

  const handleContinue = () => {
    if (!selectedStation) {
      toast.error("Please select a charging station");
      return;
    }
    
    // Store selected station in localStorage for use in other components
    localStorage.setItem('selectedStation', JSON.stringify(selectedStation));
    navigate('/port-selection');
  };

  return (
    <div className="h-[85vh] flex flex-col">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for charging stations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex-1 bg-muted rounded-md border overflow-hidden mb-4 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-2 opacity-20" />
            <p className="text-muted-foreground">Map view would show charging stations here</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-auto max-h-64 space-y-2">
        {filteredStations.map(station => (
          <Card 
            key={station.id} 
            className={`cursor-pointer transition-all ${selectedStation?.id === station.id ? 'border-primary' : ''}`}
            onClick={() => handleStationSelect(station)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{station.name}</h3>
                  <p className="text-sm text-muted-foreground">{station.address}</p>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Battery className={`h-4 w-4 ${station.available > 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <span>{station.available}/{station.total}</span>
                </div>
              </div>
              {selectedStation?.id === station.id && (
                <div className="mt-2 flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs w-full">
                    <Navigation className="h-3 w-3 mr-1" /> Directions
                  </Button>
                  <Button size="sm" className="text-xs w-full" onClick={handleContinue}>
                    Select
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedStation && (
        <div className="mt-4">
          <Button className="w-full" onClick={handleContinue}>
            Continue to Port Selection
          </Button>
        </div>
      )}
    </div>
  );
};

export default StationMap;
