
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
          Welcome to Charge Buddy Go
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find and use EV charging stations near you with ease. Start your
          sustainable journey today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link to="/map">Find Charging Stations</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/profile">My Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
