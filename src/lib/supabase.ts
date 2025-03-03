import { createClient } from '@supabase/supabase-js';

// For client components
export const createClientComponentClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be defined');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// For server components
export const createServerComponentClient = async () => {
  const { createServerComponentClient } = await import('@supabase/auth-helpers-nextjs');
  const { cookies } = await import('next/headers');
  
  return createServerComponentClient({ cookies });
};

// For server actions and API routes
export const createServerActionClient = async () => {
  const { createServerActionClient } = await import('@supabase/auth-helpers-nextjs');
  const { cookies } = await import('next/headers');
  
  return createServerActionClient({ cookies });
}; 