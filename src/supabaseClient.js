import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cwwureyuqcgvecidsdzr.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3d3VyZXl1cWNndmVjaWRzZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDUzMjIsImV4cCI6MjA1NTEyMTMyMn0.5hR92w4qca1GzRWCoInS2GA7QfpbDJEUpnMS9zuq48A";  // Replace with your API Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
