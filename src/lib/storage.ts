import type { Hotel, HotelStateMap } from '../types';

const DB_KEY = 'staysync-sales-map-hotels-v1';
const STATE_KEY = 'staysync-sales-map-state-v4';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.error('저장 데이터 읽기 오류', key, error);
    return fallback;
  }
}

export function loadSavedHotels(): Hotel[] | null {
  return readStorage<Hotel[] | null>(DB_KEY, null);
}

export function loadSavedState(): Partial<HotelStateMap> {
  return readStorage<Partial<HotelStateMap>>(STATE_KEY, {});
}

export function saveHotels(hotels: Hotel[]): void {
  localStorage.setItem(DB_KEY, JSON.stringify(hotels));
}

export function saveState(state: HotelStateMap): void {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

export function saveAll(hotels: Hotel[], state: HotelStateMap): void {
  saveHotels(hotels);
  saveState(state);
}
