import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ProblemStatementSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    domain: { type: String, default: '', trim: true },
    slotsTotal: { type: Number, required: true, default: 5 },
    slotsTaken: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true, collection: 'problemstatements' }
);

const ProblemStatement = mongoose.models.ProblemStatement || mongoose.model('ProblemStatement', ProblemStatementSchema);

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // First clear existing problem statements for a clean test
    await ProblemStatement.deleteMany({});
    console.log('Cleared existing Problem Statements.');

    const domains = [
      'Web3 & Blockchain',
      'Artificial Intelligence',
      'FinTech',
      'HealthTech',
      'EdTech',
      'Cybersecurity',
      'AgriTech',
      'SpaceTech',
      'IoT & Smart Cities',
      'E-Commerce'
    ];

    for (let i = 1; i <= 10; i++) {
      const psData = {
        order: i,
        title: `Dummy Problem Statement ${i} [dummy${i}]`,
        description: `This is a test description for problem statement ${i}. It contains the text [dummy${i}] as requested. Please solve this dummy problem creatively.`,
        domain: domains[i - 1],
        slotsTotal: 5,
        slotsTaken: 0
      };

      console.log(`Inserting PS ${i}...`);
      await ProblemStatement.create(psData);
    }

    console.log('Successfully inserted 10 dummy problem statements to Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
