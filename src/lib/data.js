import { getPool, testConnection } from './database';

const mockStudents = [
  { id: 1, candidate_name: 'Julian Kepas', primary_school: 'Alotau Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 2, candidate_name: 'Belinda Thomas', primary_school: 'Cameron Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 3, candidate_name: 'David Tau', primary_school: 'Alotau Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 4, candidate_name: 'Sarah Noah', primary_school: 'Kwagila Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 5, candidate_name: 'Michael Abel', primary_school: 'Gurney Primary', grade: 9, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
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

  // Grade 11 - Cameron Secondary School
  { id: 19, candidate_name: 'John Smith', primary_school: 'Alotau Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 20, candidate_name: 'Mary Kila', primary_school: 'Gurney Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 21, candidate_name: 'Peter Waiko', primary_school: 'Duau Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 22, candidate_name: 'Grace Omena', primary_school: 'Hagita Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 23, candidate_name: 'Samuel Kila', primary_school: 'Kiriwina Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 24, candidate_name: 'Anna Misima', primary_school: 'Misima Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 25, candidate_name: 'David Yeleyamba', primary_school: 'Yeleyamba Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 26, candidate_name: 'Lucy Santa', primary_school: 'Santa Maria Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },
  { id: 27, candidate_name: 'Michael Suau', primary_school: 'Suau Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'M' },
  { id: 28, candidate_name: 'Rebecca Wesley', primary_school: 'Wesley Primary School', grade: 11, destination_school: 'Cameron Secondary School', status: 'Selected', gender: 'F' },

  // Grade 11 - Duau High School
  { id: 29, candidate_name: 'James Duau', primary_school: 'Duau Primary School', grade: 11, destination_school: 'Duau High School', status: 'Selected', gender: 'M' },
  { id: 30, candidate_name: 'Linda Duau', primary_school: 'Duau Primary School', grade: 11, destination_school: 'Duau High School', status: 'Selected', gender: 'F' },
  { id: 31, candidate_name: 'Robert Logea', primary_school: 'Logea Primary School', grade: 11, destination_school: 'Duau High School', status: 'Selected', gender: 'M' },
  { id: 32, candidate_name: 'Susan KB', primary_school: 'KB Primary School', grade: 11, destination_school: 'Duau High School', status: 'Selected', gender: 'F' },

  // Grade 11 - Kiriwina High School
  { id: 33, candidate_name: 'Thomas Kiriwina', primary_school: 'Kiriwina Primary School', grade: 11, destination_school: 'Kiriwina High School', status: 'Selected', gender: 'M' },
  { id: 34, candidate_name: 'Helen Kiriwina', primary_school: 'Kiriwina Primary School', grade: 11, destination_school: 'Kiriwina High School', status: 'Selected', gender: 'F' },

  // Grade 11 - Misima High School
  { id: 35, candidate_name: 'David Misima', primary_school: 'Misima Primary School', grade: 11, destination_school: 'Misima High School', status: 'Selected', gender: 'M' },
  { id: 36, candidate_name: 'Sarah Misima', primary_school: 'Misima Primary School', grade: 11, destination_school: 'Misima High School', status: 'Selected', gender: 'F' },

  // Grade 11 - Santa Maria Secondary School
  { id: 37, candidate_name: 'Paul Santa', primary_school: 'Santa Maria Primary School', grade: 11, destination_school: 'Santa Maria Secondary School', status: 'Selected', gender: 'M' },
  { id: 38, candidate_name: 'Mary Santa', primary_school: 'Santa Maria Primary School', grade: 11, destination_school: 'Santa Maria Secondary School', status: 'Selected', gender: 'F' },

  // Grade 11 - Wesley Secondary School
  { id: 39, candidate_name: 'John Wesley Jr', primary_school: 'Wesley Primary School', grade: 11, destination_school: 'Wesley Secondary School', status: 'Selected', gender: 'M' },
  { id: 40, candidate_name: 'Grace Wesley', primary_school: 'Wesley Primary School', grade: 11, destination_school: 'Wesley Secondary School', status: 'Selected', gender: 'F' },
];

const mockContacts = [
  { id: 1, name: 'David Kila', email: 'david.kila@gmail.com', message: 'Inquiring about Grade 9 selection list verification dates for Cameron Secondary.', created_at: new Date('2026-09-15T10:30:00Z').toISOString() },
  { id: 2, name: 'Mary Anne', email: 'm.anne@education.gov.pg', message: 'Requesting updated teacher posting circular for Woodlark Junior High.', created_at: new Date('2026-09-16T14:15:00Z').toISOString() },
];

let dbAvailable = null;

async function checkDb() {
  if (dbAvailable !== null) return dbAvailable;
  dbAvailable = await testConnection();
  return dbAvailable;
}

function filterMockStudents(school = '', grade = 0) {
  return mockStudents.filter(s => {
    const matchSchool = !school || s.destination_school.toLowerCase().includes(school.toLowerCase());
    const matchGrade = !grade || s.grade === Number(grade);
    return matchSchool && matchGrade;
  });
}

export async function fetchStudents(school = '', grade = 0) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      let query = 'SELECT * FROM students WHERE 1=1';
      const params = [];
      if (school) {
        query += ' AND destination_school = ?';
        params.push(school);
      }
      if (grade > 0) {
        query += ' AND grade = ?';
        params.push(grade);
      }
      const [rows] = await pool.execute(query, params);
      if (rows.length > 0) return rows;
    } catch (error) {
      console.error('Database fetch failed, falling back to mock data:', error.message);
    }
  }
  return filterMockStudents(school, grade);
}

export async function addStudent(student) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'INSERT INTO students (candidate_name, primary_school, grade, destination_school, status, gender) VALUES (?, ?, ?, ?, ?, ?)',
        [student.candidate_name, student.primary_school, student.grade, student.destination_school, student.status || 'Selected', student.gender || 'M']
      );
      return { ...student, id: result.insertId };
    } catch (error) {
      console.error('Database insert failed, falling back to mock data:', error.message);
    }
  }
  // Fallback to mock data
  const newStudent = {
    id: Date.now(),
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
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM students WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete failed:', error.message);
    }
  }
  // Fallback
  const idx = mockStudents.findIndex(s => s.id === Number(id));
  if (idx !== -1) mockStudents.splice(idx, 1);
  return true;
}

export async function fetchContacts() {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [rows] = await pool.execute('SELECT * FROM contacts ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      console.error('Database fetch contacts failed, falling back to mock data:', error.message);
    }
  }
  return mockContacts;
}

export async function addContact(contact) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [contact.name, contact.email, contact.message]
      );
      return { ...contact, id: result.insertId, created_at: new Date().toISOString() };
    } catch (error) {
      console.error('Database insert contact failed, falling back to mock data:', error.message);
    }
  }
  const newContact = {
    id: Date.now(),
    name: contact.name,
    email: contact.email,
    message: contact.message,
    created_at: new Date().toISOString()
  };
  mockContacts.unshift(newContact);
  return newContact;
}

export async function deleteContact(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM contacts WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete contact failed:', error.message);
    }
  }
  const idx = mockContacts.findIndex(c => c.id === Number(id));
  if (idx !== -1) mockContacts.splice(idx, 1);
  return true;
}

export async function seedDatabase() {
  const useDb = await checkDb();
  if (!useDb) return { success: false, message: 'Database not available' };

  try {
    const pool = getPool();
    
    // Create tables if they don't exist
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        candidate_name VARCHAR(255) NOT NULL,
        primary_school VARCHAR(255) NOT NULL,
        grade INT NOT NULL,
        destination_school VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Selected',
        gender VARCHAR(10) DEFAULT 'M',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Check if students table is empty
    const [studentRows] = await pool.execute('SELECT COUNT(*) as count FROM students');
    if (studentRows[0].count === 0) {
      // Seed with mock data
      for (const student of mockStudents) {
        await pool.execute(
          'INSERT INTO students (candidate_name, primary_school, grade, destination_school, status, gender) VALUES (?, ?, ?, ?, ?, ?)',
          [student.candidate_name, student.primary_school, student.grade, student.destination_school, student.status, student.gender]
        );
      }
    }
    
    // Check if contacts table is empty
    const [contactRows] = await pool.execute('SELECT COUNT(*) as count FROM contacts');
    if (contactRows[0].count === 0) {
      for (const contact of mockContacts) {
        await pool.execute(
          'INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, ?)',
          [contact.name, contact.email, contact.message, contact.created_at]
        );
      }
    }
    
    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('Database seeding failed:', error.message);
    return { success: false, message: error.message };
  }
}