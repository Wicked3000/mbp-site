import { NextResponse } from 'next/server';
import { fetchStudents } from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const school = searchParams.get('school') || '';
    const grade = parseInt(searchParams.get('grade') || '0', 10);

    const students = await fetchStudents(school, grade);
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch students: ' + error.message },
      { status: 500 }
    );
  }
}
