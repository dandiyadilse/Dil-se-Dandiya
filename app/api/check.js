import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://dandiyadilse95:dandiya21024@dilsedandiya.9qlpj.mongodb.net/?retryWrites=true&w=majority&appName=DilseDandiya';

async function handler(req, res) {
    if (req.method === 'POST') {
        const { value } = req.body;

        if (!value) {
            return res.status(400).json({ message: 'Value is required' });
        }

        try {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const db = client.db('DilseDandiya');
            const collection = db.collection('values');

            await collection.insertOne({ value });

            res.status(200).json({ message: `Value "${value}" has been saved successfully.` });
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            res.status(500).json({ message: 'An error occurred while saving the value' });
        } finally {
            client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default handler;
