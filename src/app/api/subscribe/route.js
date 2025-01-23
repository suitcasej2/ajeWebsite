export async function POST(request) {
  try {
    const { name, email } = await request.json();

    const response = await fetch("https://api.kit.co/email_subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KIT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_subscriber: {
          email: email,
          name: name,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Kit API error");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return new Response(JSON.stringify({ error: "Subscription failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
