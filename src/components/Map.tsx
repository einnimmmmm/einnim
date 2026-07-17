import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';
import type { Hotel, HotelStateMap, VisitStatus } from '../types';
import { HotelPopup } from './HotelPopup';

const STATUS_LABELS: Record<VisitStatus, string> = {
  planned: '방문 예정',
  today: '오늘 방문',
  visited: '방문 완료',
  excluded: '영업 제외'
};

const STATUS_COLORS: Record<VisitStatus, string> = {
  planned: '#22c55e',
  today: '#e9a800',
  visited: '#2563eb',
  excluded: '#ef4444'
};

interface MapProps {
  hotels: Hotel[];
  state: HotelStateMap;
  labelsVisible: boolean;
  selectedHotelId: string | null;
  pickingLocation: boolean;
  onSelectHotel: (hotel: Hotel) => void;
  onPickedLocation: (lat: number, lon: number) => void;
  onStatusChange: (id: string, status: VisitStatus) => void;
  onSaveProfile: (id: string, form: FormData) => void;
  onAddVisitLog: (id: string, form: FormData) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function MapFocus({ hotels, selectedHotelId }: { hotels: Hotel[]; selectedHotelId: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedHotelId) {
      const hotel = hotels.find((item) => item.id === selectedHotelId);
      if (hotel) map.setView([hotel.lat, hotel.lon], 15);
      return;
    }
    if (hotels.length) {
      const bounds = hotels.map((hotel) => [hotel.lat, hotel.lon] as [number, number]);
      map.fitBounds(bounds, { padding: [24, 24], maxZoom: 13 });
    }
  }, [hotels, map, selectedHotelId]);

  return null;
}

function LocationPicker({ enabled, onPickedLocation }: { enabled: boolean; onPickedLocation: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(event) {
      if (enabled) onPickedLocation(event.latlng.lat, event.latlng.lng);
    }
  });
  return null;
}

export function Map({
  hotels,
  state,
  labelsVisible,
  selectedHotelId,
  pickingLocation,
  onSelectHotel,
  onPickedLocation,
  onStatusChange,
  onSaveProfile,
  onAddVisitLog,
  onEdit,
  onDelete
}: MapProps) {
  return (
    <div className="map-shell">
      {pickingLocation && <div className="pick-banner">지도에서 원하는 위치를 클릭해줘. 좌표가 자동 입력된다.</div>}
      <MapContainer center={[35.22, 128.82]} zoom={10} className="map">
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
        <MapFocus hotels={hotels} selectedHotelId={selectedHotelId} />
        <LocationPicker enabled={pickingLocation} onPickedLocation={onPickedLocation} />
        {hotels.map((hotel) => {
          const hotelState = state[hotel.id];
          if (!hotelState) return null;
          return (
            <CircleMarker
              key={hotel.id}
              center={[hotel.lat, hotel.lon]}
              radius={hotelState.status === 'today' ? 9 : 7}
              pathOptions={{
                fillColor: STATUS_COLORS[hotelState.status],
                color: '#fff',
                weight: hotelState.status === 'today' ? 3 : 1.5,
                fillOpacity: 0.95
              }}
              eventHandlers={{ click: () => onSelectHotel(hotel) }}
            >
              {labelsVisible && (
                <Tooltip permanent direction="top" className="hotel-label" offset={[0, -6]}>
                  {hotel.area} {hotel.name}
                </Tooltip>
              )}
              <Popup maxWidth={360}>
                <HotelPopup
                  hotel={hotel}
                  hotelState={hotelState}
                  statusLabel={STATUS_LABELS[hotelState.status]}
                  onStatusChange={onStatusChange}
                  onSaveProfile={onSaveProfile}
                  onAddVisitLog={onAddVisitLog}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
