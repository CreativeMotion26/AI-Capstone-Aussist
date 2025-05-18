// maps.tsx
const GOOGLE_API_KEY = 'AIzaSyCrKTP8_dWdVVprq4zdt5N17PmiOdNSYac';

// 주변 병원 검색 (Nearby Search)
export async function searchNearbyHospitals(
  lat: number,
  lng: number,
  radius: number = 2000
) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`
    + `?location=${lat},${lng}`
    + `&radius=${radius}`
    + `&type=hospital`
    + `&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch nearby hospitals');
  const data = await res.json();

  const hospitalsWithDetails = await Promise.all(
    data.results.map(async (hospital: any) => {
      try {
        const details = await getPlaceDetails(hospital.place_id);
        return { ...hospital, details: details.result };
      } catch {
        return hospital;
      }
    })
  );
  return { ...data, results: hospitalsWithDetails };
}

// 주변 약국 검색 (Nearby Search)
export async function searchNearbyPharmacies(
  lat: number,
  lng: number,
  radius: number = 2000
) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`
    + `?location=${lat},${lng}`
    + `&radius=${radius}`
    + `&type=pharmacy`
    + `&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch nearby pharmacies');
  const data = await res.json();

  const pharmaciesWithDetails = await Promise.all(
    data.results.map(async (pharmacy: any) => {
      try {
        const details = await getPlaceDetails(pharmacy.place_id);
        return { ...pharmacy, details: details.result };
      } catch {
        return pharmacy;
      }
    })
  );
  return { ...data, results: pharmaciesWithDetails };
}

// 장소 텍스트 검색 (Text Search)
export async function searchPlaces(
  query: string,
  lat?: number,
  lng?: number
) {
  const locationParam = lat && lng ? `&location=${lat},${lng}` : '';
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`
    + `?query=${encodeURIComponent(query)}`
    + locationParam
    + `&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch places');
  const data = await res.json();

  const placesWithDetails = await Promise.all(
    data.results.map(async (place: any) => {
      try {
        const details = await getPlaceDetails(place.place_id);
        return { ...place, details: details.result };
      } catch {
        return place;
      }
    })
  );
  return { ...data, results: placesWithDetails };
}

// 장소 상세 정보 (Place Details)
export async function getPlaceDetails(placeId: string) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json`
    + `?place_id=${placeId}`
    + `&fields=opening_hours,formatted_phone_number,website`
    + `&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch place details');
  return res.json();
}
