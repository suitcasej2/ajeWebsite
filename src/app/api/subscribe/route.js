import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    console.log("API Key present:", !!process.env.KIT_API_KEY);

    const response = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Kit-Api-Key": process.env.KIT_API_KEY?.trim(),
      },
      body: JSON.stringify({
        first_name: name,
        email_address: email,
        state: "active",
        fields: {}, // You can add additional fields here if needed
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Kit API Response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        body: errorData,
      });
      throw new Error(
        `Kit API error: ${response.status} ${response.statusText} - ${errorData}`
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
