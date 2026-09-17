import mysql from 'mysql2/promise';

// Initial seed data for students (matching setup_db.sql + additional schools)
let mockStudents = [
  { id: 1, candidate_name: 'Julian Kepas', primary_school: 'Alotau Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 2, candidate_name: 'Belinda Thomas', primary_school: 'Cameron Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 3, candidate_name: 'David Tau', primary_school: 'Alotau Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 4, candidate_name: 'Sarah Noah', primary_school: 'Kwagila Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 5, candidate_name: 'Michael Abel', primary_school: 'Gurney Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 6, candidate_name: 'Grace Oliver', primary_school: 'Alotau Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
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

async function getDbConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'mysql.railway.internal',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'ydxqzsUvGTMEbFhBqmSJrcuPAXcKsJqS',
      database: process.env.DB_NAME || 'railway',
      connectTimeout: 2000,
    });
    return connection;
  } catch {
    return null;
  }
}

export async function fetchStudents(school = '', grade = 0) {
  const db = await getDbConnection();
  if (db) {
    try {
      let query = 'SELECT * FROM students WHERE 1=1';
      const params = [];
      if (school) {
        query += ' AND destination_school = ?';
        params.push(school);
      }
      if (grade && grade > 0) {
        query += ' AND grade = ?';
        params.push(grade);
      }
      const [rows] = await db.execute(query, params);
      await db.end();
      return rows;
    } catch {
      if (db) await db.end();
    }
  }

  // Fallback to in-memory store
  return mockStudents.filter(s => {
    const matchSchool = !school || s.destination_school.toLowerCase().includes(school.toLowerCase());
    const matchGrade = !grade || s.grade === Number(grade);
    return matchSchool && matchGrade;
  });
}

export async function addStudent(student) {
  const db = await getDbConnection();
  if (db) {
    try {
      const [res] = await db.execute(
        'INSERT INTO students (candidate_name, primary_school, grade, destination_school, status, gender) VALUES (?, ?, ?, ?, ?, ?)',
        [student.candidate_name, student.primary_school, student.grade, student.destination_school, student.status || 'Selected', student.gender || 'M']
      );
      await db.end();
      return { id: res.insertId, ...student };
    } catch {
      if (db) await db.end();
    }
  }

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
  const db = await getDbConnection();
  if (db) {
    try {
      await db.execute('DELETE FROM students WHERE id = ?', [id]);
      await db.end();
      return true;
    } catch {
      if (db) await db.end();
    }
  }

  mockStudents = mockStudents.filter(s => s.id !== Number(id));
  return true;
}

export async function fetchContacts() {
  const db = await getDbConnection();
  if (db) {
    try {
      const [rows] = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC');
      await db.end();
      return rows;
    } catch {
      if (db) await db.end();
    }
  }

  return mockContacts;
}

export async function addContact(contact) {
  const db = await getDbConnection();
  if (db) {
    try {
      const [res] = await db.execute(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [contact.name, contact.email, contact.message]
      );
      await db.end();
      return { id: res.insertId, ...contact, created_at: new Date().toISOString() };
    } catch {
      if (db) await db.end();
    }
  }

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
  const db = await getDbConnection();
  if (db) {
    try {
      await db.execute('DELETE FROM contacts WHERE id = ?', [id]);
      await db.end();
      return true;
    } catch {
      if (db) await db.end();
    }
  }

  mockContacts = mockContacts.filter(c => c.id !== Number(id));
  return true;
}
