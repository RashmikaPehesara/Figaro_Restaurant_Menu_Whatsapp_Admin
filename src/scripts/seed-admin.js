const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function seedAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Please set MONGODB_URI in .env.local');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    const adminsCollection = db.collection('admins');

    const adminEmail = 'admin@figaro.com';
    const existingAdmin = await adminsCollection.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await adminsCollection.insertOne({
      email: adminEmail,
      password: hashedPassword,
      name: 'Super Admin',
      restaurantId: 'figaro_main',
      createdAt: new Date(),
    });

    console.log('Admin seeded successfully!');
    console.log('Email: admin@figaro.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await client.close();
  }
}

seedAdmin();
