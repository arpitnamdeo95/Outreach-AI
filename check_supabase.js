try {
    import('@supabase/supabase-js').then(() => console.log('SUPABASE_FOUND')).catch(() => console.log('SUPABASE_NOT_FOUND'));
} catch (e) {
    console.log('SUPABASE_NOT_FOUND');
}
