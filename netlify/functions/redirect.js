// netlify/functions/redirect.js
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async function(event, context) {
  const shortCode = event.path.split('/')[1];  // Extract the short code from the path
  
  try {
    // Query your database to get the long URL for the short code
    const { data, error } = await supabase
      .from('urls')
      .select('original_url')
      .eq('short_url', shortCode)
      .single();

    if (error || !data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Short URL not found' }),
      };
    }

    // Return a 301 redirect to the long URL
    return {
      statusCode: 301,
      headers: {
        Location: data.original_url,
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error' }),
    };
  }
};
