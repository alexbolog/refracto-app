// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from 'config';
import { Database } from 'types/supabase';

export const supabase: SupabaseClient<Database> = createClient(
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
