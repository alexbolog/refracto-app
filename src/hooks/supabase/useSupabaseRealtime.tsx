import { supabase } from 'apiRequests/supabaseClient';
import { useEffect, useState } from 'react';

export interface SupabaseRealtimeProps {
  channel: string;
  isAuthRequired?: boolean;
  onInsert?: (data: any) => void;
  onUpdate?: (data: any) => void;
  onDelete?: (data: any) => void;
  onAll?: (data: any) => void;
}

export const useSupabaseRealtime = ({
  channel,
  isAuthRequired,
  onInsert,
  onUpdate,
  onDelete,
  onAll
}: SupabaseRealtimeProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribe = () => {
    onInsert &&
      supabase
        .channel(channel)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: channel },
          onInsert
        )
        .subscribe();

    onUpdate &&
      supabase
        .channel(channel)
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: channel },
          onUpdate
        )
        .subscribe();

    onDelete &&
      supabase
        .channel(channel)
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: channel },
          onDelete
        )
        .subscribe();

    onAll &&
      supabase
        .channel(channel)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: channel },
          onAll
        )
        .subscribe();

    setIsSubscribed(true);
    console.log('Subscribed to channel', channel);
  };

  useEffect(() => {
    if (isSubscribed) {
      return;
    }
    supabase.auth.onAuthStateChange((event, _) => {
      if (isAuthRequired) {
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          subscribe();
        }
      } else {
        subscribe();
      }
    });
  }, []);
};
