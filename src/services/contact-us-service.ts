'use server';
import { ContactFormPayload } from "@/types/index.types";

type contactDetails = {
    name: string;
    email: string;
    phone: string;
    order: string;
    message: string;

};

export const submitContactForm = async (
    contactBody: contactDetails,
) => {
    const { name, email, phone, order, message } = contactBody;

    const URL = `https://api.helpdesk.com/v1/tickets`;
    const authHeader = `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_HELPDISK_CLIENTID}:${process.env.NEXT_PUBLIC_HELPDISK_PRIVATEKEY}`
    ).toString('base64')}`;

    if (message.length <= 0)
        return {
            message: 'Please fill out all fields.',
        };

    const text = `
      Thank you for contacting Furfy. One of our customer service agents will reply to you as soon as possible! Our aim is to reach out with a personal response within 24 hours. If your enquiry is urgent, you can call us on +1 (888) 664-3124.
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
      Order: ${order}
      `;

    const payload: ContactFormPayload = {
        subject: "Furfy Contact Us Request",
        message: {
            text
        },
        priority: 0,
        status: "open",
        requester: {
            name,
            email
        },
        teamIDs: ["89e307b5-012d-4dc1-8cc2-b77336dddd6d"],
        assignment: {
            team: {
                ID: "89e307b5-012d-4dc1-8cc2-b77336dddd6d"
            },
            agent: null
        },
    };

    const requestConfig = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader,

        }),
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(URL, requestConfig);
        if (!response.ok) {
            throw new Error(`Failed to submit contact form`);
        }
        await response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message, error: true };
        } else {
            return { message: 'Something went wrong...', error: true };
        }
    }

    return { message: 'success' };
};
