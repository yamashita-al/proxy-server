export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "a4468";

    const username = "n8ntest";
    const password = "OZLoxtGdEgyz8yJY7p8dZ5Fv";
    const token = btoa(`${username}:${password}`);

    const wpUrl = `https://lapuri.site/wp-json/wp/v2/pages?slug=${slug}`;
    const response = await fetch(wpUrl, {
      headers: {
        "Authorization": `Basic ${token}`,
        "Content-Type": "application/json"
      },
    });

    const data = await response.text(); // ← JSON.parse ではなく text
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
