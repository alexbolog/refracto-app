// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from 'config';
import { Database } from 'types/supabase';

export const supabase: SupabaseClient<Database> = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

export async function setSupabaseAccessToken(
  accessToken: string,
  refreshToken: string
) {
  await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken
  });
}
