import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = '';  // Substitua com a URL do seu projeto
const SUPABASE_ANON_KEY = '';  // Substitua com sua chave anônima

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

