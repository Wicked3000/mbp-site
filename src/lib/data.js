// Mock student data for Milne Bay Province Selection Lists
// This data persists in memory and is used when no database is configured

let mockStudents = [
  { id: 1, candidate_name: 'Julian Kepas', primary_school: 'Alotau Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 2, candidate_name: 'Belinda Thomas', primary_school: 'Cameron Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 3, candidate_name: 'David Tau', primary_school: 'Alotau Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 4, candidate_name: 'Sarah Noah', primary_school: 'Kwagila Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 5, candidate_name: 'Michael Abel', primary_school: 'Gurney Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 7, candidate_name: 'John Wesley', primary_school: 'Duau Primary', grade: 9, destination_school: 'Duau High School', status: 'Selected', gender: 'M' },
  { id: 8, candidate_name: 'Alice Kula', primary_school: 'Duau Primary', grade: 9, destination_school: 'Duau High School', status: 'Selected', gender: 'F' },
  { id: 9, candidate_name: 'Thomas Namuri', primary_school: 'Logea Primary', grade: 9, destination_school: 'Duau High School', status: 'Selected', gender: 'M' },
  { id: 10, candidate_name: 'Paul Lona', primary_school: 'KB Primary', grade: 9, destination_school: 'Duau High School', status: 'Selected', gender: 'M' },
  { id: 11, candidate_name: 'Mary Bani', primary_school: 'Duau Primary', grade: 9, destination_school: 'Duau High School', status: 'Selected', gender: 'F' },
  { id: 12, candidate_name: 'Peter Didymus', primary_school: 'Hagita Sec (Lower)', grade: 11, destination_school: 'Hagita Secondary School', status: 'Selected', gender: 'M' },
  { id: 13, candidate_name: 'Esther Moses', primary_school: 'Hagita Sec (Lower)', grade: 11, destination_school: 'Hagita Secondary School', status: 'Selected', gender: 'F' },
  { id: 14, candidate_name: 'Stephen Keke', primary_school: 'Santa Maria Sec (Lower)', grade: 11, destination_school: 'Hagita Secondary School', status: 'Selected', gender: 'M' },
  { id: 15, candidate_name: 'Ruth Kila', primary_school: 'Hagita Sec (Lower)', grade: 11, destination_school: 'Hagita Secondary School', status: 'Selected', gender: 'F' },
  { id: 16, candidate_name: 'Simon Peter', primary_school: 'Holy Name Sec (Lower)', grade: 11, destination_school: 'Holy Name Secondary School', status: 'Selected', gender: 'M' },
  { id: 17, candidate_name: 'Martha John', primary_school: 'Holy Name Sec (Lower)', grade: 11, destination_school: 'Holy Name Secondary School', status: 'Selected', gender: 'F' },
  { id: 18, candidate_name: 'Lazarus Mary', primary_school: 'Cameron Sec (Lower)', grade: 11, destination_school: 'Holy Name Secondary School', status: 'Selected', gender: 'M' },
];

let mockContacts = [
  { id: 1, name: 'David Kila', email: 'david.kila@gmail.com', message: 'Inquiring about Grade 9 selection list verification dates for Cameron Secondary.', created_at: new Date('2026-09-15T10:30:00Z').toISOString() },
  { id: 2, name: 'Mary Anne', email: 'm.anne@education.gov.pg', message: 'Requesting updated teacher posting circular for Woodlark Junior High.', created_at: new Date('2026-09-16T14:15:00Z').toISOString() },
];

let nextStudentId = 19;
let nextContactId = 3;

// ============================================
// STUDENT FUNCTIONS
// ============================================

export async function fetchStudents(school = '', grade = 0) {
  // Filter mock students by school and/or grade
  return mockStudents.filter(s => {
    const matchSchool = !school || s.destination_school.toLowerCase().includes(school.toLowerCase());
    const matchGrade = !grade || s.grade === Number(grade);
    return matchSchool && matchGrade;
  });
}

export async function addStudent(student) {
  const newStudent = {
    id: nextStudentId++,
    candidate_name: student.candidate_name,
    primary_school: student.primary_school,
    grade: Number(student.grade),
    destination_school: student.destination_school,
    status: student.status || 'Selected',
    gender: student.gender || 'M'
  };
  mockStudents.unshift(newStudent);
  return newStudent;
}

export async function deleteStudent(id) {
  mockStudents = mockStudents.filter(s => s.id !== Number(id));
  return true;
}

// ============================================
// CONTACT FUNCTIONS
// ============================================

export async function fetchContacts() {
  return mockContacts;
}

export async function addContact(contact) {
  const newContact = {
    id: nextContactId++,
    name: contact.name,
    email: contact.email,
    message: contact.message,
    created_at: new Date().toISOString()
  };
  mockContacts.unshift(newContact);
  return newContact;
}

export async function deleteContact(id) {
  mockContacts = mockContacts.filter(c => c.id !== Number(id));
  return true;
}