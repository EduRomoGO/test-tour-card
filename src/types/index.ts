export interface TourType {
  id: string;
  price: number;
  length: number;
  img_url: string;
  map_url: string;
  title: string;
  reviews: {
    avg: number;
    cnt: number;
    sample: string;
  };
  destinations: string[];
  age_min: number;
  age_max: number;
  travel_styles: string[];
  regions: string[];
  operated_in: string[];
  flexible_booking: boolean;
}
