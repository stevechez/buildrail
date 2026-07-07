// Generated via Supabase MCP (generate_typescript_types) against the shared
// BuildRail project (qdcfokengexarxitgckp). This mirrors the full public
// schema (every app's tables), same approach as apps/field and apps/app —
// see docs/engineering/stabilization-log.md's note on why a single
// project-wide Database type isn't centralized in @buildrail/database.
// apps/sites itself only reads/writes the `leads` table.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      change_order_events: {
        Row: {
          actor: string
          change_order_id: string
          created_at: string
          event_type: string
          id: string
          note: string | null
          organization_id: string
        }
        Insert: {
          actor: string
          change_order_id: string
          created_at?: string
          event_type: string
          id?: string
          note?: string | null
          organization_id: string
        }
        Update: {
          actor?: string
          change_order_id?: string
          created_at?: string
          event_type?: string
          id?: string
          note?: string | null
          organization_id?: string
        }
        Relationships: []
      }
      change_orders: {
        Row: {
          cost_delta_cents: number
          created_at: string
          created_by: string | null
          decided_at: string | null
          description: string
          id: string
          organization_id: string
          project_id: string
          sent_at: string | null
          source_flag_id: string | null
          status: string
          title: string
        }
        Insert: {
          cost_delta_cents?: number
          created_at?: string
          created_by?: string | null
          decided_at?: string | null
          description?: string
          id?: string
          organization_id: string
          project_id: string
          sent_at?: string | null
          source_flag_id?: string | null
          status?: string
          title: string
        }
        Update: {
          cost_delta_cents?: number
          created_at?: string
          created_by?: string | null
          decided_at?: string | null
          description?: string
          id?: string
          organization_id?: string
          project_id?: string
          sent_at?: string | null
          source_flag_id?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string
          id: string
          kind: string
          name: string | null
          organization_id: string
          phone: string
          project_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kind?: string
          name?: string | null
          organization_id: string
          phone: string
          project_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          name?: string | null
          organization_id?: string
          phone?: string
          project_id?: string | null
        }
        Relationships: []
      }
      invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          id: string
          invited_by: string | null
          organization_id: string
          role: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by?: string | null
          organization_id: string
          role?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string | null
          organization_id?: string
          role?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          contacted_at: string | null
          created_at: string
          email: string | null
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
          email?: string | null
          estimate_max?: number
          estimate_min?: number
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
          email?: string | null
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
      site_leads: {
        Row: {
          business_name: string
          created_at: string
          email: string | null
          existing_website: string | null
          full_name: string
          id: string
          phone: string | null
          service_area: string | null
          source: string
          status: string
          target_clients: string | null
          trade: string
        }
        Insert: {
          business_name: string
          created_at?: string
          email?: string | null
          existing_website?: string | null
          full_name: string
          id?: string
          phone?: string | null
          service_area?: string | null
          source?: string
          status?: string
          target_clients?: string | null
          trade: string
        }
        Update: {
          business_name?: string
          created_at?: string
          email?: string | null
          existing_website?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          service_area?: string | null
          source?: string
          status?: string
          target_clients?: string | null
          trade?: string
        }
        Relationships: []
      }
      message_flags: {
        Row: {
          confidence: number | null
          created_at: string
          details: Json
          flag_type: string
          id: string
          message_id: string
          organization_id: string
          project_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          summary: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          details?: Json
          flag_type: string
          id?: string
          message_id: string
          organization_id: string
          project_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          summary: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          details?: Json
          flag_type?: string
          id?: string
          message_id?: string
          organization_id?: string
          project_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          summary?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          ai_error: string | null
          ai_status: string
          body: string
          channel: string
          contact_id: string | null
          created_at: string
          direction: string
          from_number: string
          id: string
          organization_id: string
          project_id: string | null
          raw_payload: Json | null
          to_number: string
        }
        Insert: {
          ai_error?: string | null
          ai_status?: string
          body: string
          channel?: string
          contact_id?: string | null
          created_at?: string
          direction: string
          from_number: string
          id?: string
          organization_id: string
          project_id?: string | null
          raw_payload?: Json | null
          to_number: string
        }
        Update: {
          ai_error?: string | null
          ai_status?: string
          body?: string
          channel?: string
          contact_id?: string | null
          created_at?: string
          direction?: string
          from_number?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          raw_payload?: Json | null
          to_number?: string
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          industry: string | null
          logo: string | null
          name: string
          slug: string | null
          sms_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          industry?: string | null
          logo?: string | null
          name: string
          slug?: string | null
          sms_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          industry?: string | null
          logo?: string | null
          name?: string
          slug?: string | null
          sms_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      portal_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          organization_id: string
          project_id: string
          revoked_at: string | null
          token: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          organization_id: string
          project_id: string
          revoked_at?: string | null
          token: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          organization_id?: string
          project_id?: string
          revoked_at?: string | null
          token?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          address: string | null
          client_email: string | null
          client_name: string | null
          client_phone: string | null
          created_at: string
          id: string
          name: string
          organization_id: string
          status: string
        }
        Insert: {
          address?: string | null
          client_email?: string | null
          client_name?: string | null
          client_phone?: string | null
          created_at?: string
          id?: string
          name: string
          organization_id: string
          status?: string
        }
        Update: {
          address?: string | null
          client_email?: string | null
          client_name?: string | null
          client_phone?: string | null
          created_at?: string
          id?: string
          name?: string
          organization_id?: string
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_org_admin: { Args: { check_org_id: string }; Returns: boolean }
      is_org_member: { Args: { check_org_id: string }; Returns: boolean }
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
type DefaultSchema = DatabaseWithoutInternals["public"]

export type Tables<
  T extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][T]["Row"]

export type TablesInsert<
  T extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][T]["Insert"]

export type TablesUpdate<
  T extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][T]["Update"]
