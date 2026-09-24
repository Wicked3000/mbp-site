import { NextResponse } from 'next/server';
import { fetchVetStudents, addVetStudent, deleteVetStudent } from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get('school') || '';
    const students = await fetchVetStudents(school);
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch VET students' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.candidate_name || !body.primary_school || !body.destination_school) {
      return NextResponse.json({ error: 'Missing required VET student fields' }, { status: 400 });
    }
    const student = await addVetStudent(body);
    return NextResponse.json({ success: true, student });
  } catch (error) {
    console.error('Add VET student error:', error);
    return NextResponse.json({ error: 'Failed to add VET student' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }
    await deleteVetStudent(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete VET student error:', error);
    return NextResponse.json({ error: 'Failed to delete VET student' }, { status: 500 });
  }
}