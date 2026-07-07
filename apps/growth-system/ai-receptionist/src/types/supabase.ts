// Generated with the Supabase MCP's generate_typescript_types against the
// live 'buildrail' project (qdcfokengexarxitgckp). This app (ai-receptionist /
// "LunchBreak AI") was migrated from a standalone businesses/business_members
// schema onto the shared organizations/organization_members identity model
// (see docs/platform/identity-foundation.md). Regenerate whenever the schema
// changes.
//
// This file reflects the FULL shared public schema (the same Postgres
// project backs apps/field, apps/sites, apps/estimator, and this app). Tables
// like `leads`, `site_leads`, `contacts`, `projects`, `messages`, etc. belong
// to other products — this app's code should only ever reference: calls,
// receptionist_leads, intake_scripts, receptionist_settings, notifications,
// subscriptions, beta_requests, organizations, organization_members.
//
// `generate_typescript_types` doesn't know about check constraints, so
// enum-like columns (status, direction, urgency, channel, etc.) come back as
// plain `string` rather than a literal union. That's acceptable for this app,
// which already ran with `strict: false` and loose typing pre-migration.

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
      calls: {
        Row: {
          ai_summary: string | null
          created_at: string
          direction: string
          duration_seconds: number | null
          ended_at: string | null
          from_phone: string | null
          id: string
          lead_id: string | null
          organization_id: string
          provider: string | null
          provider_call_id: string | null
          recording_url: string | null
          started_at: string | null
          status: string
          to_phone: string | null
          transcript: string | null
          updated_at: string
        }
        Insert: {
          ai_summary?: string | null
          created_at?: string
          direction?: string
          duration_seconds?: number | null
          ended_at?: string | null
          from_phone?: string | null
          id?: string
          lead_id?: string | null
          organization_id: string
          provider?: string | null
          provider_call_id?: string | null
          recording_url?: string | null
          started_at?: string | null
          status?: string
          to_phone?: string | null
          transcript?: string | null
          updated_at?: string
        }
        Update: {
          ai_summary?: string | null
          created_at?: string
          direction?: string
          duration_seconds?: number | null
          ended_at?: string | null
          from_phone?: string | null
          id?: string
          lead_id?: string | null
          organization_id?: string
          provider?: string | null
          provider_call_id?: string | null
          recording_url?: string | null
          started_at?: string | null
          status?: string
          to_phone?: string | null
          transcript?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calls_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "receptionist_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
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
        Relationships: [
          {
            foreignKeyName: "change_order_events_change_order_id_fkey"
            columns: ["change_order_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_order_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "change_orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_orders_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_orders_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_orders_source_flag_id_fkey"
            columns: ["source_flag_id"]
            isOneToOne: false
            referencedRelation: "message_flags"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_scripts: {
        Row: {
          created_at: string
          custom_questions: Json
          description: string | null
          id: string
          industry: string | null
          is_active: boolean
          is_default: boolean | null
          name: string
          organization_id: string | null
          prompt: string
          questions: Json | null
          required_fields: Json
          updated_at: string
          vertical: string | null
        }
        Insert: {
          created_at?: string
          custom_questions?: Json
          description?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean
          is_default?: boolean | null
          name?: string
          organization_id?: string | null
          prompt: string
          questions?: Json | null
          required_fields?: Json
          updated_at?: string
          vertical?: string | null
        }
        Update: {
          created_at?: string
          custom_questions?: Json
          description?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean
          is_default?: boolean | null
          name?: string
          organization_id?: string | null
          prompt?: string
          questions?: Json | null
          required_fields?: Json
          updated_at?: string
          vertical?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intake_scripts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "message_flags_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_flags_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_flags_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_flags_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          call_id: string | null
          channel: string
          created_at: string
          error_message: string | null
          id: string
          lead_id: string | null
          organization_id: string
          provider_message_id: string | null
          recipient: string
          sent_at: string | null
          status: string
          subject: string | null
        }
        Insert: {
          body?: string | null
          call_id?: string | null
          channel: string
          created_at?: string
          error_message?: string | null
          id?: string
          lead_id?: string | null
          organization_id: string
          provider_message_id?: string | null
          recipient: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          body?: string | null
          call_id?: string | null
          channel?: string
          created_at?: string
          error_message?: string | null
          id?: string
          lead_id?: string | null
          organization_id?: string
          provider_message_id?: string | null
          recipient?: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_call_id_fkey"
            columns: ["call_id"]
            isOneToOne: false
            referencedRelation: "calls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "receptionist_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          business_phone: string | null
          created_at: string
          id: string
          industry: string | null
          logo: string | null
          name: string
          notification_email: string | null
          notification_phone: string | null
          service_area: string | null
          slug: string | null
          sms_number: string | null
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
          logo?: string | null
          name: string
          notification_email?: string | null
          notification_phone?: string | null
          service_area?: string | null
          slug?: string | null
          sms_number?: string | null
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
          logo?: string | null
          name?: string
          notification_email?: string | null
          notification_phone?: string | null
          service_area?: string | null
          slug?: string | null
          sms_number?: string | null
          status?: string
          timezone?: string
          twilio_phone_number?: string | null
          updated_at?: string
          vertical?: string | null
          website_url?: string | null
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
        Relationships: [
          {
            foreignKeyName: "portal_tokens_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portal_tokens_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      receptionist_leads: {
        Row: {
          booked_value: number | null
          caller_email: string | null
          caller_name: string | null
          caller_phone: string | null
          created_at: string
          destination_location: string | null
          estimated_value: number | null
          id: string
          job_date: string | null
          job_location: string | null
          organization_id: string
          service_needed: string | null
          source: string | null
          status: string
          summary: string | null
          urgency: string
        }
        Insert: {
          booked_value?: number | null
          caller_email?: string | null
          caller_name?: string | null
          caller_phone?: string | null
          created_at?: string
          destination_location?: string | null
          estimated_value?: number | null
          id?: string
          job_date?: string | null
          job_location?: string | null
          organization_id: string
          service_needed?: string | null
          source?: string | null
          status?: string
          summary?: string | null
          urgency?: string
        }
        Update: {
          booked_value?: number | null
          caller_email?: string | null
          caller_name?: string | null
          caller_phone?: string | null
          created_at?: string
          destination_location?: string | null
          estimated_value?: number | null
          id?: string
          job_date?: string | null
          job_location?: string | null
          organization_id?: string
          service_needed?: string | null
          source?: string | null
          status?: string
          summary?: string | null
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "receptionist_leads_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      receptionist_settings: {
        Row: {
          after_hours_enabled: boolean
          ai_personality: string
          ai_voice: string | null
          assigned_phone_number: string | null
          business_hours: Json
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
          organization_id: string
          service_area: string | null
          updated_at: string
        }
        Insert: {
          after_hours_enabled?: boolean
          ai_personality?: string
          ai_voice?: string | null
          assigned_phone_number?: string | null
          business_hours?: Json
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
          organization_id: string
          service_area?: string | null
          updated_at?: string
        }
        Update: {
          after_hours_enabled?: boolean
          ai_personality?: string
          ai_voice?: string | null
          assigned_phone_number?: string | null
          business_hours?: Json
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
          organization_id?: string
          service_area?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "receptionist_settings_intake_script_id_fkey"
            columns: ["intake_script_id"]
            isOneToOne: false
            referencedRelation: "intake_scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receptionist_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
      subscriptions: {
        Row: {
          created_at: string
          ends_at: string | null
          id: string
          lemon_squeezy_customer_id: string | null
          lemon_squeezy_order_id: string | null
          lemon_squeezy_subscription_id: string | null
          organization_id: string
          plan_name: string | null
          renews_at: string | null
          status: string | null
          trial_ends_at: string | null
          updated_at: string
          variant_id: string | null
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          id?: string
          lemon_squeezy_customer_id?: string | null
          lemon_squeezy_order_id?: string | null
          lemon_squeezy_subscription_id?: string | null
          organization_id: string
          plan_name?: string | null
          renews_at?: string | null
          status?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          variant_id?: string | null
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          id?: string
          lemon_squeezy_customer_id?: string | null
          lemon_squeezy_order_id?: string | null
          lemon_squeezy_subscription_id?: string | null
          organization_id?: string
          plan_name?: string | null
          renews_at?: string | null
          status?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_onboarding_business: {
        Args: {
          business_industry?: string
          business_name: string
          business_phone?: string
          business_vertical?: string
          business_website_url?: string
          greeting?: string
          notification_email?: string
          notification_phone?: string
          service_area?: string
        }
        Returns: string
      }
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
