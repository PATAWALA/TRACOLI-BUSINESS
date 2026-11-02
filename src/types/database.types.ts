export type LeadStatus =
  | "received"
  | "researching"
  | "quoted"
  | "validating"
  | "payment_confirmed"
  | "purchased"
  | "shipping"
  | "arrived"
  | "delivered"
  | "closed";

export type OrderStatus =
  | "en_attente"
  | "confirme"
  | "en_production"
  | "expedie"
  | "en_transit"
  | "dedouanement"
  | "livre";

export interface Lead {
  id: string;
  reference: string;
  type: string | null;
  status: LeadStatus;
  name: string;
  whatsapp: string;
  email: string | null;
  destination_city: string | null;
  destination_country: string | null;
  product_name: string | null;
  product_url: string | null;
  product_image_url: string | null;
  freight_mode: string | null;
  freight_quantity: number | null;
  freight_unit: string | null;
  customs_managed: boolean | null;
  source: string | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  reference: string;
  lead_id: string;
  description: string;
  quantity: number | null;
  unit_price: number | null;
  total_price: number | null;
  currency: string;
  status: OrderStatus;
  tracking_number: string | null;
  estimated_delivery: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmailCapture {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "agent";
  created_at: string;
}

export interface FileRecord {
  id: string;
  lead_id: string | null;
  order_id: string | null;
  file_url: string;
  file_name: string;
  file_type: string | null;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  category: string | null;
  country: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  notes: string | null;
  active: boolean;
  created_at: string;
}

type TableDef<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
};

export interface Database {
  public: {
    Tables: {
      users: TableDef<User>;
      leads: TableDef<Lead>;
      orders: TableDef<Order>;
      email_captures: TableDef<EmailCapture>;
      files: TableDef<FileRecord>;
      partners: TableDef<Partner>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
