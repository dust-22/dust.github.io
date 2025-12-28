export type Database = {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          theme_color: string;
          created_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          logo_url?: string | null;
          theme_color?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          restaurant_id: string;
          name: string;
          order_index: number;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string;
          restaurant_id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          is_available: boolean;
        };
      };
    };
  };
};