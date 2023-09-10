export default interface ILocation {
  id: number;
  start_date: Date;
  end_date: Date;
  price_per_day: number;
  descount: number;
  additional_cost: number;
  observations: string;
  total: number;
  created_at: Date;
  updated_at: Date;
  property_id: number;
  user_id: number;
}
