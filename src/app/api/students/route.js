import { NextResponse } from 'next/server';
import { fetchStudents, addStudent, deleteStudent } from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get('school') || '';
    const grade = parseInt(searchParams.get('grade') || '0', 10);
    const students = await fetchStudents(school, grade);
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.candidate_name || !body.primary_school || !body.destination_school || !body.grade) {
      return NextResponse.json({ error: 'Missing required student fields' }, { status: 400 });
    }
    const student = await addStudent(body);
    return NextResponse.json({ success: true, student });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }
    await deleteStudent(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
