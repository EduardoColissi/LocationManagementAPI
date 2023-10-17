export default interface IProperty {
  id: number;
  description: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  house: boolean;
  apartment: boolean;
  rooms: number;
  pet_friendly: boolean;
  bed_linen: boolean;
  towels: boolean;
  comission: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}
