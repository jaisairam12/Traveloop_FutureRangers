import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useTheme } from '../../context/ThemeContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function TripMap({ activeDay, activities = [] }) {
  const { dark } = useTheme();
  
  // Default center (Tokyo)
  const [center, setCenter] = useState({ lat: 35.6762, lng: 139.6503 });

  // Map activities to markers with rough coordinates based on index for demo purposes
  // In a real app, activities would have exact lat/lng
  const markers = activities.map((act, i) => ({
    id: act.id,
    title: act.title,
    type: act.type,
    position: {
      lat: center.lat + (Math.random() * 0.1 - 0.05),
      lng: center.lng + (Math.random() * 0.1 - 0.05),
    }
  }));

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    mapId: dark ? 'a1b2c3d4e5f6g7h8' : '1a2b3c4d5e6f7g8h', // Placeholder Map IDs for styling
  };

  return (
    <Card padding={false} className="h-full overflow-hidden flex flex-col relative group">
      <div className="absolute top-4 left-4 z-10">
        <Badge color="blue" className="shadow-lg backdrop-blur-md bg-white/80 dark:bg-black/50">
          🗺️ Day {activeDay || 1} Map View
        </Badge>
      </div>

      <div className="flex-1 w-full h-full min-h-[300px]">
        <APIProvider apiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <Map
            defaultZoom={11}
            defaultCenter={center}
            {...mapOptions}
            className="w-full h-full"
          >
            {markers.map((marker, i) => (
              <AdvancedMarker key={marker.id} position={marker.position}>
                <Pin 
                  background={marker.type === 'food' ? '#f59e0b' : '#10b981'} 
                  borderColor={dark ? '#1A1D27' : '#FFFFFF'} 
                  glyphColor={dark ? '#1A1D27' : '#FFFFFF'}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>
      
      {/* Disclaimer for demo */}
      <div className={`absolute bottom-0 left-0 right-0 p-2 text-center text-[10px] ${dark ? 'bg-dark-bg/80 text-dark-muted' : 'bg-light-bg/80 text-light-muted'} backdrop-blur-sm`}>
        Map shows approximate locations. Requires valid Google Maps API Key for production.
      </div>
    </Card>
  );
}
