/**
 * Formspree Service Integration for Propel Properties
 * Endpoint: https://formspree.io/f/mrpblqyr
 * All form submissions on the website are routed here to notify seyiodofin@gmail.com
 */

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrpblqyr';

export interface FormspreeSubmissionResult {
  ok: boolean;
  message?: string;
  error?: string;
}

/**
 * Submits structured form data directly to the user's Formspree endpoint.
 */
export async function submitToFormspree(
  fields: Record<string, any>,
  options?: {
    subject?: string;
    replyTo?: string;
    formName?: string;
  }
): Promise<FormspreeSubmissionResult> {
  try {
    const payload: Record<string, any> = {
      ...fields,
      _timestamp: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
    };

    if (options?.subject) {
      payload._subject = options.subject;
    }
    if (options?.replyTo) {
      payload._replyto = options.replyTo;
    } else if (fields.email || fields['Email Address']) {
      payload._replyto = fields.email || fields['Email Address'];
    }
    if (options?.formName) {
      payload._form_name = options.formName;
    }

    // Formspree honeypot support
    if (fields._hp) {
      payload._gotcha = fields._hp;
    }

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return {
        ok: true,
        message: 'Your details have been successfully submitted and delivered.',
      };
    }

    const data = await response.json().catch(() => null);
    const errorMsg =
      data?.errors?.map((e: any) => e.message).join(', ') ||
      data?.error ||
      'Failed to deliver message via Formspree.';

    return {
      ok: false,
      error: errorMsg,
    };
  } catch (err: any) {
    return {
      ok: false,
      error: err?.message || 'Network error connecting to Formspree service.',
    };
  }
}
