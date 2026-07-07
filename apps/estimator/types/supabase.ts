export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      beta_requests: {
        Row: {
          business_name: string | null
          business_type: string | null
          contact_name: string | null
          created_at: string
          email: string
          id: string
          missed_call_problem: string | null
          phone: string | null
          status: string
        }
        Insert: {
          business_name?: string | null
          business_type?: string | null
          contact_name?: string | null
          created_at?: string
          email: string
          id?: string
          missed_call_problem?: string | null
          phone?: string | null
          status?: string
        }
        Update: {
          business_name?: string | null
          business_type?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string
          id?: string
          missed_call_problem?: string | null
          phone?: string | null
          status?: string
        }
        Relationships: []
      }
      business_members: {
        Row: {
          business_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          business_phone: string | null
          created_at: string
          id: string
          industry: string | null
          name: string
          notification_email: string | null
          notification_phone: string | null
          phone_number: string | null
          service_area: string | null
          status: string
          timezone: string
          twilio_phone_number: string | null
          updated_at: string
          vertical: string | null
          website_url: string | null
        }
        Insert: {
          business_phone?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          name: string
          notification_email?: string | null
          notification_phone?: string | null
          phone_number?: string | null
          service_area?: string | null
          status?: string
          timezone?: string
          twilio_phone_number?: string | null
          updated_at?: string
          vertical?: string | null
          website_url?: string | null
        }
        Update: {
          business_phone?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          name?: string
          notification_email?: string | null
          notification_phone?: string | null
          phone_number?: string | null
          service_area?: string | null
          status?: string
          timezone?: string
          twilio_phone_number?: string | null
          updated_at?: string
          vertical?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      calls: {
        Row: {
          ai_summary: string | null
          business_id: string
          created_at: string
          direction: string
          duration_seconds: number | null
          ended_at: string | null
          from_phone: string | null
          id: string
          lead_id: string | null
          provider: string | null
          provider_call_id: string | null
          recording_url: string | null
          started_at: string | null
          status: string
          to_phone: string | null
          transcript: string | null
          updated_at: string
          vertical: string | null
        }
        Insert: {
          ai_summary?: string | null
          business_id: string
          created_at?: string
          direction?: string
          duration_seconds?: number | null
          ended_at?: string | null
          from_phone?: string | null
          id?: string
          lead_id?: string | null
          provider?: string | null
          provider_call_id?: string | null
          recording_url?: string | null
          started_at?: string | null
          status?: string
          to_phone?: string | null
          transcript?: string | null
          updated_at?: string
          vertical?: string | null
        }
        Update: {
          ai_summary?: string | null
          business_id?: string
          created_at?: string
          direction?: string
          duration_seconds?: number | null
          ended_at?: string | null
          from_phone?: string | null
          id?: string
          lead_id?: string | null
          provider?: string | null
          provider_call_id?: string | null
          recording_url?: string | null
          started_at?: string | null
          status?: string
          to_phone?: string | null
          transcript?: string | null
          updated_at?: string
          vertical?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calls_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_scripts: {
        Row: {
          business_id: string | null
          created_at: string
          custom_questions: Json
          description: string | null
          id: string
          industry: string | null
          is_active: boolean
          is_default: boolean | null
          name: string
          prompt: string
          questions: Json | null
          required_fields: Json
          updated_at: string
          vertical: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          custom_questions?: Json
          description?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean
          is_default?: boolean | null
          name?: string
          prompt: string
          questions?: Json | null
          required_fields?: Json
          updated_at?: string
          vertical?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string
          custom_questions?: Json
          description?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean
          is_default?: boolean | null
          name?: string
          prompt?: string
          questions?: Json | null
          required_fields?: Json
          updated_at?: string
          vertical?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intake_scripts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          contacted_at: string | null
          created_at: string
          email: string
          estimate_max: number
          estimate_min: number
          finish: string | null
          id: string
          name: string
          phone: string | null
          remodel_rooms: string[] | null
          scope: string | null
          size: string | null
          source: string
        }
        Insert: {
          contacted_at?: string | null
          created_at?: string
          email: string
          estimate_max: number
          estimate_min: number
          finish?: string | null
          id?: string
          name: string
          phone?: string | null
          remodel_rooms?: string[] | null
          scope?: string | null
          size?: string | null
          source?: string
        }
        Update: {
          contacted_at?: string | null
          created_at?: string
          email?: string
          estimate_max?: number
          estimate_min?: number
          finish?: string | null
          id?: string
          name?: string
          phone?: string | null
          remodel_rooms?: string[] | null
          scope?: string | null
          size?: string | null
          source?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          business_id: string
          call_id: string | null
          channel: string
          created_at: string
          error_message: string | null
          id: string
          lead_id: string | null
          provider_message_id: string | null
          recipient: string
          sent_at: string | null
          status: string
          subject: string | null
        }
        Insert: {
          body?: string | null
          business_id: string
          call_id?: string | null
          channel: string
          created_at?: string
          error_message?: string | null
          id?: string
          lead_id?: string | null
          provider_message_id?: string | null
          recipient: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          body?: string | null
          business_id?: string
          call_id?: string | null
          channel?: string
          created_at?: string
          error_message?: string | null
          id?: string
          lead_id?: string | null
          provider_message_id?: string | null
          recipient?: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_call_id_fkey"
            columns: ["call_id"]
            isOneToOne: false
            referencedRelation: "calls"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      receptionist_settings: {
        Row: {
          after_hours_enabled: boolean
          ai_personality: string
          ai_voice: string | null
          assigned_phone_number: string | null
          business_hours: Json
          business_id: string
          created_at: string
          escalation_instructions: string | null
          fallback_message: string | null
          forwarding_number: string | null
          greeting: string | null
          id: string
          intake_script_id: string | null
          is_live: boolean | null
          missed_call_enabled: boolean
          mode: string | null
          service_area: string | null
          updated_at: string
        }
        Insert: {
          after_hours_enabled?: boolean
          ai_personality?: string
          ai_voice?: string | null
          assigned_phone_number?: string | null
          business_hours?: Json
          business_id: string
          created_at?: string
          escalation_instructions?: string | null
          fallback_message?: string | null
          forwarding_number?: string | null
          greeting?: string | null
          id?: string
          intake_script_id?: string | null
          is_live?: boolean | null
          missed_call_enabled?: boolean
          mode?: string | null
          service_area?: string | null
          updated_at?: string
        }
        Update: {
          after_hours_enabled?: boolean
          ai_personality?: string
          ai_voice?: string | null
          assigned_phone_number?: string | null
          business_hours?: Json
          business_id?: string
          created_at?: string
          escalation_instructions?: string | null
          fallback_message?: string | null
          forwarding_number?: string | null
          greeting?: string | null
          id?: string
          intake_script_id?: string | null
          is_live?: boolean | null
          missed_call_enabled?: boolean
          mode?: string | null
          service_area?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "receptionist_settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receptionist_settings_intake_script_id_fkey"
            columns: ["intake_script_id"]
            isOneToOne: false
            referencedRelation: "intake_scripts"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          business_id: string
          created_at: string
          ends_at: string | null
          id: string
          lemon_squeezy_customer_id: string | null
          lemon_squeezy_order_id: string | null
          lemon_squeezy_subscription_id: string | null
          plan_name: string | null
          renews_at: string | null
          status: string | null
          trial_ends_at: string | null
          updated_at: string
          variant_id: string | null
        }
        Insert: {
          business_id: string
          created_at?: string
          ends_at?: string | null
          id?: string
          lemon_squeezy_customer_id?: string | null
          lemon_squeezy_order_id?: string | null
          lemon_squeezy_subscription_id?: string | null
          plan_name?: string | null
          renews_at?: string | null
          status?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          variant_id?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string
          ends_at?: string | null
          id?: string
          lemon_squeezy_customer_id?: string | null
          lemon_squeezy_order_id?: string | null
          lemon_squeezy_subscription_id?: string | null
          plan_name?: string | null
          renews_at?: string | null
          status?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_onboarding_business:
        | {
            Args: {
              business_industry: string
              business_name: string
              business_phone: string
              business_vertical: string
              business_website_url: string
              greeting: string
              notification_email: string
              notification_phone: string
              service_area: string
            }
            Returns: string
          }
        | {
            Args: {
              business_industry?: string
              business_name: string
              business_phone?: string
              business_website_url?: string
              greeting?: string
              notification_email?: string
              notification_phone?: string
              service_area?: string
            }
            Returns: string
          }
      is_business_admin: {
        Args: { target_business_id: string }
        Returns: boolean
      }
      is_business_member: {
        Args: { target_business_id: string }
        Returns: boolean
      }
      is_business_owner: {
        Args: { target_business_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
