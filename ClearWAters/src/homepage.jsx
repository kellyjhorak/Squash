{/* this will be the landing page where users type in their zipcode*/} 

import React, { useState } from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";

export function Homepage() {
  return (
    <div>
      <Navbar />
      <Footer />
    </div>
  );
}

export function ZipLookup() {
  const [zip, setZip] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCountyData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/getCountyData?zip=${zip}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Could not retrieve data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">PFAS Water Quality Lookup</h1>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter ZIP code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-48"
        />
        <Button onClick={fetchCountyData} disabled={loading || !zip}>
          {loading ? <Loader className="animate-spin" size={16} /> : "Go"}
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <Card className="w-96 mt-4">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">{data.county} County</h2>
            <p>PFAS Level: {data.pfasLevel} ppt</p>
            <p>EPA Guideline: {data.epaGuideline} ppt</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
