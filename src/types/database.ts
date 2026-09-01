import type {
  AllocationRequestInsert,
  AllocationRequestRow,
  AllocationRequestUpdate,
} from "@/types/allocation-request";

type ProtocolCounterRow = {
  year: number;
  last_number: number;
};

export type Database = {
  public: {
    Tables: {
      allocation_protocol_counters: {
        Row: ProtocolCounterRow;
        Insert: {
          year: number;
          last_number?: number;
        };
        Update: {
          last_number?: number;
        };
        Relationships: [];
      };
      allocation_requests: {
        Row: AllocationRequestRow;
        Insert: AllocationRequestInsert;
        Update: AllocationRequestUpdate;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_allocation_protocol: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
