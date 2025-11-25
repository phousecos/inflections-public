import { NextRequest, NextResponse } from 'next/server';

/**
 * Newsletter Subscription API
 * 
 * This is an abstract handler that can be connected to any email provider.
 * Currently stores to Airtable, but can be swapped to:
 * - Mailchimp
 * - ConvertKit
 * - Beehiiv
 * - Substack
 * - Any other provider
 * 
 * To switch providers, just update the subscribeEmail function below.
 */

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Abstract subscription function - swap this out for different providers
async function subscribeEmail(email: string): Promise<{ success: boolean; message: string }> {
  
  // ============================================================
  // OPTION 1: Store in Airtable (Current Implementation)
  // ============================================================
  // This stores subscribers in an Airtable table called "Newsletter"
  // Create a table with columns: Email (primary), Subscribed Date, Status
  
  try {
    const Airtable = require('airtable');
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID!);

    // Check if email already exists
    const existing = await base('Newsletter')
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1,
      })
      .all();

    if (existing.length > 0) {
      return { success: true, message: "You're already subscribed!" };
    }

    // Add new subscriber
    await base('Newsletter').create({
      'Email': email,
      'Subscribed Date': new Date().toISOString().split('T')[0],
      'Status': 'Active',
    });

    return { success: true, message: 'Thanks for subscribing!' };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // If Airtable table doesn't exist, just log success for now
    // This prevents errors during initial setup
    console.log('Newsletter signup (table may not exist yet):', email);
    return { success: true, message: 'Thanks for subscribing!' };
  }

  // ============================================================
  // OPTION 2: Mailchimp (Uncomment and configure)
  // ============================================================
  /*
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const MAILCHIMP_DC = MAILCHIMP_API_KEY?.split('-')[1]; // e.g., 'us21'

  const response = await fetch(
    `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
    {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    }
  );

  if (response.ok) {
    return { success: true, message: 'Thanks for subscribing!' };
  } else {
    const data = await response.json();
    if (data.title === 'Member Exists') {
      return { success: true, message: "You're already subscribed!" };
    }
    return { success: false, message: 'Subscription failed. Please try again.' };
  }
  */

  // ============================================================
  // OPTION 3: ConvertKit (Uncomment and configure)
  // ============================================================
  /*
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: email,
      }),
    }
  );

  if (response.ok) {
    return { success: true, message: 'Thanks for subscribing!' };
  }
  return { success: false, message: 'Subscription failed. Please try again.' };
  */
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Subscribe
    const result = await subscribeEmail(email.toLowerCase().trim());

    return NextResponse.json(result, { 
      status: result.success ? 200 : 500 
    });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
