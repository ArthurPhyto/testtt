import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yfcnjujixmmtkrctqttk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmY25qdWppeG1tdGtyY3RxdHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNjI1NTcsImV4cCI6MjA1MDczODU1N30.MLlXdDEAoo2yE-N5SkEJhaqp1DvtzJ_gZp_mbgp-oJ0';

export const supabase = createClient(supabaseUrl, supabaseKey);