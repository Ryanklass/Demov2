export async function POST() {
  const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;
  
  try {
    if (!HEYGEN_API_KEY) {
      throw new Error("API key is missing from environment variables");
    }

    const res = await fetch(
      "https://api.heygen.com/v1/streaming.create_token",
      {
        method: "POST",
        headers: {
          "x-api-key": HEYGEN_API_KEY,
        },
      },
    );

    const data = await res.json();

    if (!data.data || !data.data.token) {
      throw new Error(`Invalid response from API: ${JSON.stringify(data)}`);
    }

    return new Response(data.data.token, {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving access token:", error);

    return new Response("Failed to retrieve access token", {
      status: 500,
    });
  }
}

