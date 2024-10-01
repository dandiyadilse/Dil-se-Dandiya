import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = 'mongodb+srv://dandiyadilse95:dandiya21024@dilsedandiya.9qlpj.mongodb.net/?retryWrites=true&w=majority&appName=DilseDandiya';

export async function POST(req) {
    const { value } = await req.json();

    if (!value) {
        return NextResponse.json({ message: 'Value is required' }, { status: 400 });
    }

    // Validate that the value is a 4-digit number between 0001 and 3000
    if (typeof value !== 'string' || value.length !== 4 || isNaN(value) || Number(value) < 1 || Number(value) > 3000) {
        return NextResponse.json({ message: 'Serial number does not exist' }, { status: 400 });
    }

    let client;  // Define client outside the try block

    try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('DilseDandiya');
        const collection = db.collection('values');

        // Check if the value already exists
        const existingValue = await collection.findOne({ value });

        if (existingValue) {
            return NextResponse.json({ message: 'User already entered!' }, { status: 200 });
        } else {
            await collection.insertOne({ value });
            return NextResponse.json({ message: 'User can enter!!' }, { status: 200 });
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return NextResponse.json({ message: 'An error occurred while saving the value' }, { status: 500 });
    } finally {
        if (client) {
            await client.close();  // Close the connection only if the client is initialized
        }
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not supported in this route' }, { status: 405 });
}
