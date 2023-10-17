export default interface ILocation {
  id: number;
  renter: string;
  start_date: Date;
  end_date: Date;
  price_per_day: number;
  descount: number | null;
  additional_cost: number | null;
  observations: string | null;
  total: number;
  created_at: Date;
  updated_at: Date;
  property_id: number;
  user_id: number;
}
