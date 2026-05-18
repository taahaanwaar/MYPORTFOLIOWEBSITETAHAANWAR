import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simulated DB connection optimization
// In a real app, you would initialize your DB client (Prisma, MongoClient, etc.) outside the handler
// to reuse the connection across multiple invocations.
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  
  // Simulation of DB connection logic
  console.log("Connecting to Database...");
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.warn("DATABASE_URL is not set. Using fallback mode.");
  }
  
  cachedDb = { status: "connected", timestamp: Date.now() };
  return cachedDb;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = request.body;

    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    // Connect to DB (optimized connection pooling)
    await connectToDatabase();

    // In a real application, you would save this to a database or send an email here.
    console.log(`Received message from ${name} (${email}): ${message}`);

    // Simulate success
    return response.status(200).json({ 
      success: true, 
      message: 'Thank you for your message. I will get back to you soon!' 
    });

  } catch (error) {
    console.error('API Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
