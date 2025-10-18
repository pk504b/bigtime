// export const dynamic = 'force-static';

// API endpoint needed. 
// CORS on client-side fetch and server's info on server component

export async function GET(request: Request) {
  const res = await fetch("https://free.freeipapi.com/api/json");
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}