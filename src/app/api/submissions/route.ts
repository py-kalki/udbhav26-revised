import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Submission } from "@/models/Submission";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, teamId, submissionLink, description, isLeader, submittedAt } = body;

    // Server-side validation
    if (!type || !teamId || !submissionLink || !isLeader) {
      return NextResponse.json(
        { error: "Missing required fields or unauthorized submission." },
        { status: 400 }
      );
    }

    // Attempt database connection if URI is present, otherwise fallback to mock
    if (process.env.MONGODB_URI) {
      await connectDB();

      // Create a new submission in the database
      const newSubmission = await Submission.create({
        type,
        teamId,
        submissionLink,
        description,
        isLeader,
        submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
      });

      console.log(`\n--- SAVED TO MONGODB [${type.toUpperCase()}] ---`);
      console.log(`Team ID: ${teamId}`);
      console.log(`Mongo ID: ${newSubmission._id}`);
      console.log(`-------------------------------------------\n`);

      // Return success response with the database ID
      return NextResponse.json(
        { 
          message: "Submission saved to database successfully", 
          submissionId: newSubmission._id,
          status: "recorded" 
        },
        { status: 201 }
      );
    } else {
      console.warn("\n⚠️ MONGODB_URI is not defined in .env.local. Falling back to console logging.");
      
      // Mock processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`\n--- [MOCK] NEW SUBMISSION [${type.toUpperCase()}] ---`);
      console.log(`Team ID: ${teamId}`);
      console.log(`Link: ${submissionLink}`);
      console.log(`-------------------------------------------\n`);

      return NextResponse.json(
        { 
          message: "Submission received (Mock Mode)", 
          submissionId: `MOCK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
          status: "mocked" 
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("Submission Error:", error);
    
    // Handle specific Mongo errors
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to save submission. Please check your database connection." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json({ error: "Team ID is required" }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectDB();
      const submissions = await Submission.find({ teamId });
      
      // Calculate basic stats for now
      const points = submissions.length * 250; // 250 points per submission/action
      const rank = Math.max(1, 100 - submissions.length * 10); // Mock rank calculation

      return NextResponse.json({
        teamId,
        submissions: submissions.map(s => ({
          type: s.type,
          submittedAt: s.submittedAt,
          id: s._id
        })),
        stats: {
          points,
          rank,
          status: "active"
        }
      });
    } else {
      // Mock data for local testing
      return NextResponse.json({
        teamId,
        submissions: [],
        stats: {
          points: 1250,
          rank: 42,
          status: "mock-active"
        }
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
