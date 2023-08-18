// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from 'config';

export const supabase: SupabaseClient = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

export function setSupabaseAccessToken(accessToken: string) {
  supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: ''
  });
  //   supabase.auth.session = () => ({
  //     user: null, // or provide user details if available.
  //     expires_at: null,
  //     provider_token: null
  //   });
}
