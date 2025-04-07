
import StationMap from "@/components/map/StationMap";

const MapPage = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Find Charging Stations</h1>
        <p className="text-muted-foreground">Select a station to begin charging</p>
      </div>
      <StationMap />
    </div>
  );
};

export default MapPage;
