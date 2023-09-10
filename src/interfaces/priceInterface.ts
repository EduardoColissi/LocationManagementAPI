export default interface IPrice {
  id: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  period_id: number;
  location_id: number;
  user_id: number;
}
