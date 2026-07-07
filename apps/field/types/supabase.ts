// Hand-written to match supabase/migrations/*.sql.
// Regenerate with `pnpm gen-types` once a real Supabase project is linked —
// this file exists so the app type-checks before that project exists
// (see /AI/12-DECISIONS.md re: sandbox network limitations).

export type FlagType =
  | "material_shortage"
  | "schedule_delay"
  | "safety_issue"
  | "change_request"
  | "question"
  | "general_update";

export type FlagStatus = "open" | "acknowledged" | "resolved";
export type ChangeOrderStatus = "draft" | "pending_approval" | "approved" | "rejected";
export type MessageDirection = "inbound" | "outbound";
export type ContactKind = "crew" | "foreman" | "client" | "subcontractor";
export type ProjectStatus = "active" | "on_hold" | "complete" | "archived";

// `Relationships` is required by @supabase/postgrest-js's GenericTable
// constraint, and must actually describe each FK used in an embedded
// select (e.g. `.select("*, projects(name)")`) — otherwise the query
// parser can't resolve the joined shape and the *entire* select result
// types as `never`, not just the joined field. Kept in sync by hand with
// supabase/migrations/*.sql until `pnpm gen-types` can run against a real
// linked project (see /AI/12-DECISIONS.md).
type NoRelationships = [];

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          sms_number: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["organizations"]["Row"]> & { name: string };
        Update: Partial<Database["public"]["Tables"]["organizations"]["Row"]>;
        Relationships: NoRelationships;
      };
      profiles: {
        Row: {
          id: string;
          organization_id: string;
          created_at: string;
          full_name: string | null;
          role: "admin" | "staff";
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          id: string;
          organization_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      projects: {
        Row: {
          id: string;
          organization_id: string;
          created_at: string;
          name: string;
          address: string | null;
          client_name: string | null;
          client_phone: string | null;
          client_email: string | null;
          status: ProjectStatus;
        };
        Insert: Partial<Database["public"]["Tables"]["projects"]["Row"]> & {
          organization_id: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
        Relationships: NoRelationships;
      };
      contacts: {
        Row: {
          id: string;
          organization_id: string;
          project_id: string | null;
          created_at: string;
          name: string | null;
          phone: string;
          kind: ContactKind;
        };
        Insert: Partial<Database["public"]["Tables"]["contacts"]["Row"]> & {
          organization_id: string;
          phone: string;
        };
        Update: Partial<Database["public"]["Tables"]["contacts"]["Row"]>;
        Relationships: NoRelationships;
      };
      messages: {
        Row: {
          id: string;
          organization_id: string;
          project_id: string | null;
          contact_id: string | null;
          created_at: string;
          direction: MessageDirection;
          channel: "sms" | "mms";
          from_number: string;
          to_number: string;
          body: string;
          raw_payload: Record<string, unknown> | null;
          ai_status: "pending" | "processed" | "skipped" | "failed";
          ai_error: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["messages"]["Row"]> & {
          organization_id: string;
          direction: MessageDirection;
          from_number: string;
          to_number: string;
          body: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Row"]>;
        // `messages_project_id_fkey` here covers `.select("*, projects(name)")`
        // from the messages table. The reverse embed
        // `.select("*, message_flags(*)")` resolves from message_flags's own
        // Relationships entry (its FK to messages, declared below) — adding
        // it here too made postgrest-js treat it as one-to-one (a message has
        // *many* flags), so only the projects FK belongs on this side.
        Relationships: [
          {
            foreignKeyName: "messages_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      message_flags: {
        Row: {
          id: string;
          organization_id: string;
          message_id: string;
          project_id: string | null;
          created_at: string;
          flag_type: FlagType;
          summary: string;
          details: Record<string, unknown>;
          confidence: number | null;
          status: FlagStatus;
          resolved_at: string | null;
          resolved_by: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["message_flags"]["Row"]> & {
          organization_id: string;
          message_id: string;
          flag_type: FlagType;
          summary: string;
        };
        Update: Partial<Database["public"]["Tables"]["message_flags"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "message_flags_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "message_flags_message_id_fkey";
            columns: ["message_id"];
            isOneToOne: false;
            referencedRelation: "messages";
            referencedColumns: ["id"];
          }
        ];
      };
      change_orders: {
        Row: {
          id: string;
          organization_id: string;
          project_id: string;
          source_flag_id: string | null;
          created_by: string | null;
          created_at: string;
          title: string;
          description: string;
          cost_delta_cents: number;
          status: ChangeOrderStatus;
          sent_at: string | null;
          decided_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["change_orders"]["Row"]> & {
          organization_id: string;
          project_id: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["change_orders"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "change_orders_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      change_order_events: {
        Row: {
          id: string;
          change_order_id: string;
          organization_id: string;
          created_at: string;
          event_type: "created" | "sent" | "approved" | "rejected" | "comment";
          actor: string;
          note: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["change_order_events"]["Row"]> & {
          change_order_id: string;
          organization_id: string;
          event_type: "created" | "sent" | "approved" | "rejected" | "comment";
          actor: string;
        };
        Update: Partial<Database["public"]["Tables"]["change_order_events"]["Row"]>;
        Relationships: NoRelationships;
      };
      portal_tokens: {
        Row: {
          id: string;
          organization_id: string;
          project_id: string;
          created_at: string;
          token: string;
          expires_at: string;
          revoked_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["portal_tokens"]["Row"]> & {
          organization_id: string;
          project_id: string;
          token: string;
        };
        Update: Partial<Database["public"]["Tables"]["portal_tokens"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "portal_tokens_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "portal_tokens_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      invites: {
        Row: {
          id: string;
          organization_id: string;
          created_at: string;
          email: string;
          role: "admin" | "staff";
          invited_by: string | null;
          accepted_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["invites"]["Row"]> & {
          organization_id: string;
          email: string;
        };
        Update: Partial<Database["public"]["Tables"]["invites"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "invites_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
