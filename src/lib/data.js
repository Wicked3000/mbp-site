import crypto from 'crypto';
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

const mockNotices = [
  { id: 1, title: 'Important Update: Term 3 School Fees', body: 'All outstanding school fees for Term 3 must be deposited into the provincial trust account before July 10th, 2026.' },
  { id: 2, title: 'Teacher Postings 2026', body: 'The final list of teacher deployments for remote schools has been published. Please check the eRODSS portal for confirmation.' },
  { id: 3, title: 'Weather Alert', body: 'Schools in the island districts are advised to monitor marine weather warnings and take necessary precautions.' },
];

const mockNews = [
  {
    id: 1,
    title: 'Term 3 Commences Soon',
    summary: 'All primary and secondary schools across the province are preparing for the start of Term 3. Teachers are advised to review the updated syllabus materials.',
    full_story: 'The Milne Bay Province Division of Education wishes to inform all schools, teachers, parents and guardians that the third academic term officially commences on Monday 15 June 2026.\n\nTeachers are reminded to collect and review the updated syllabus materials from their district education offices before the first day of term. School administrators are asked to confirm staffing, class lists and inspection schedules with their district coordinators.\n\nParents and guardians are encouraged to settle outstanding school fees and purchase required stationary ahead of time. Further advisory circulars will be issued in the coming weeks.',
    image_url: 'https://placehold.co/600x400/eeeeee/999999?text=Term+3+Commences',
    published_at: '2026-06-15',
    is_breaking: 1
  },
  {
    id: 2,
    title: 'New TVET Facilities Opening',
    summary: 'The Kwato VET Centre has officially opened its new technical workshop, expanding opportunities for vocational training in the region.',
    full_story: 'The Kwato Vocational Education and Training (VET) Centre officially opened its new technical workshop on Tuesday 2 June 2026.\n\nThe workshop will run accredited courses in automotive engineering, carpentry and electrical installation, giving students hands-on practical experience with modern tools and equipment.\n\nEnrolment for the 2027 academic year is now open. Interested students should submit their Grade 12 certificates and school references to the centre administration before the end of Term 3.',
    image_url: 'https://placehold.co/600x400/eeeeee/999999?text=TVET+Opening',
    published_at: '2026-06-02',
    is_breaking: 0
  },
  {
    id: 3,
    title: 'Provincial Education Board Meeting',
    summary: 'The quarterly PEB meeting concluded with new resolutions regarding remote school funding and teacher deployment for the upcoming academic year.',
    full_story: 'The Milne Bay Provincial Education Board (PEB) held its quarterly meeting and concluded with several key resolutions for the next academic year.\n\nRemote school funding allocations were approved, prioritising island and rural districts with limited resources. Teacher deployment schedules were also reviewed, with new postings to be published on the eRODSS portal by the end of the month.\n\nA full summary of the resolutions will be circulated to all district education coordinators and school principals.',
    image_url: 'https://placehold.co/600x400/eeeeee/999999?text=PEB+Meeting',
    published_at: '2026-05-28',
    is_breaking: 0
  },
];

const mockLatestNews = [
  {
    id: 1,
    title: 'Department of Education | Papua New Guinea',
    is_external: 1,
    external_url: 'https://www.education.gov.pg/',
    news_id: null
  },
  {
    id: 2,
    title: 'Term 3 Commences Soon',
    is_external: 0,
    external_url: '',
    news_id: 1
  },
];

let dbSeeded = false;

async function checkDb() {
  // Don't cache failures - test connection on each call
  const available = await testConnection();
  if (available && !dbSeeded) {
    dbSeeded = true;
    await seedDatabase();
  }
  return available;
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
      console.error('Database insert failed:', error);
      throw new Error(`Database insert failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist student');
}

export async function deleteStudent(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM students WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete failed:', error);
      throw new Error(`Database delete failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete student');
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
      console.error('Database insert contact failed:', error);
      throw new Error(`Database insert contact failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist contact');
}

export async function deleteContact(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM contacts WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete contact failed:', error);
      throw new Error(`Database delete contact failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete contact');
}

export async function fetchNotices() {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [rows] = await pool.execute('SELECT * FROM notices ORDER BY created_at DESC, id DESC');
      return rows;
    } catch (error) {
      console.error('Database fetch notices failed, falling back to mock data:', error.message);
    }
  }
  return mockNotices;
}

export async function addNotice(notice) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'INSERT INTO notices (title, body) VALUES (?, ?)',
        [notice.title, notice.body]
      );
      return { ...notice, id: result.insertId, created_at: new Date().toISOString() };
    } catch (error) {
      console.error('Database insert notice failed:', error);
      throw new Error(`Database insert notice failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist notice');
}

export async function updateNotice(id, notice) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'UPDATE notices SET title = ?, body = ? WHERE id = ?',
        [notice.title, notice.body, id]
      );
      if (result.affectedRows === 0) throw new Error('Notice not found');
      return { ...notice, id };
    } catch (error) {
      console.error('Database update notice failed:', error);
      throw new Error(`Database update notice failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot update notice');
}

export async function deleteNotice(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM notices WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete notice failed:', error);
      throw new Error(`Database delete notice failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete notice');
}

export async function fetchNews(breakingOnly = false) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      if (breakingOnly) {
        const [rows] = await pool.execute(
          'SELECT * FROM news_items WHERE is_breaking = 1 ORDER BY published_at DESC, id DESC LIMIT 4'
        );
        return rows;
      }
      const [rows] = await pool.execute('SELECT * FROM news_items ORDER BY published_at DESC, id DESC');
      return rows;
    } catch (error) {
      console.error('Database fetch news failed, falling back to mock data:', error.message);
    }
  }
  if (breakingOnly) {
    return mockNews.filter((n) => n.is_breaking).slice(0, 4);
  }
  return mockNews;
}

export async function addNewsItem(item) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const publishedAt = item.published_at || new Date().toISOString();
      const [result] = await pool.execute(
        'INSERT INTO news_items (title, summary, full_story, image_url, published_at, is_breaking) VALUES (?, ?, ?, ?, ?, ?)',
        [item.title, item.summary, item.full_story || item.summary, item.image_url || '', publishedAt, item.is_breaking ? 1 : 0]
      );
      return { ...item, full_story: item.full_story || item.summary, is_breaking: item.is_breaking ? 1 : 0, id: result.insertId, published_at: publishedAt };
    } catch (error) {
      console.error('Database insert news failed:', error);
      throw new Error(`Database insert news failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist news item');
}

export async function updateNewsItem(id, item) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'UPDATE news_items SET title = ?, summary = ?, full_story = ?, image_url = ?, published_at = ?, is_breaking = ? WHERE id = ?',
        [item.title, item.summary, item.full_story || item.summary, item.image_url || '', item.published_at, item.is_breaking ? 1 : 0, id]
      );
      if (result.affectedRows === 0) throw new Error('News item not found');
      return { ...item, full_story: item.full_story || item.summary, is_breaking: item.is_breaking ? 1 : 0, id };
    } catch (error) {
      console.error('Database update news failed:', error);
      throw new Error(`Database update news failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot update news item');
}

export async function deleteNewsItem(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM news_items WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete news failed:', error);
      throw new Error(`Database delete news failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete news item');
}

export async function fetchLatestNews() {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [rows] = await pool.execute('SELECT * FROM latest_news ORDER BY id DESC LIMIT 4');
      return rows;
    } catch (error) {
      console.error('Database fetch latest news failed, falling back to mock data:', error.message);
    }
  }
  return mockLatestNews;
}

async function normalizeLatestNewsItem(item) {
  const isExternal = item.is_external === 1 || item.link_type === 'external' ? 1 : 0;
  return {
    title: String(item.title || '').trim(),
    is_external: isExternal,
    external_url: isExternal ? String(item.external_url || '').trim() : '',
    news_id: isExternal ? null : (item.news_id ? Number(item.news_id) : null)
  };
}

export async function addLatestNewsItem(item) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const norm = await normalizeLatestNewsItem(item);
      const [result] = await pool.execute(
        'INSERT INTO latest_news (title, is_external, external_url, news_id) VALUES (?, ?, ?, ?)',
        [norm.title, norm.is_external, norm.external_url, norm.news_id]
      );
      return { id: result.insertId, ...norm };
    } catch (error) {
      console.error('Database insert latest news failed:', error);
      throw new Error(`Database insert latest news failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist latest news item');
}

export async function updateLatestNewsItem(id, item) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const norm = await normalizeLatestNewsItem(item);
      const [result] = await pool.execute(
        'UPDATE latest_news SET title = ?, is_external = ?, external_url = ?, news_id = ? WHERE id = ?',
        [norm.title, norm.is_external, norm.external_url, norm.news_id, id]
      );
      if (result.affectedRows === 0) throw new Error('Latest news item not found');
      return { id, ...norm };
    } catch (error) {
      console.error('Database update latest news failed:', error);
      throw new Error(`Database update latest news failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot update latest news item');
}

export async function deleteLatestNewsItem(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM latest_news WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete latest news failed:', error);
      throw new Error(`Database delete latest news failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete latest news item');
}

export async function verifyAdmin(username, password) {
  const useDb = await checkDb();
  if (!useDb) return null;
  try {
    const pool = getPool();
    const [rows] = await pool.execute(
      'SELECT password_hash FROM admins WHERE username = ?',
      [username]
    );
    if (rows.length === 0) return false;
    const [saltHex, hashHex] = rows[0].password_hash.split(':');
    const storedHash = Buffer.from(hashHex, 'hex');
    const candidateHash = crypto.scryptSync(password || '', Buffer.from(saltHex, 'hex'), storedHash.length);
    return crypto.timingSafeEqual(candidateHash, storedHash);
  } catch (error) {
    console.error('Admin verification error:', error.message);
    return null;
  }
}

export async function seedDatabase() {
  const useDb = await testConnection();
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

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(512) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS notices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS news_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        summary TEXT NOT NULL,
        full_story TEXT NOT NULL,
        image_url VARCHAR(500) DEFAULT '',
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_breaking TINYINT(1) NOT NULL DEFAULT 0
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS latest_news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        is_external TINYINT(1) NOT NULL DEFAULT 0,
        external_url VARCHAR(500) DEFAULT '',
        news_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migrate older news tables (body column) to summary/full_story if needed
    const [newsCols] = await pool.execute(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'news_items'"
    );
    const newsColNames = newsCols.map((c) => c.COLUMN_NAME);
    try {
      if (!newsColNames.includes('summary')) {
        await pool.execute('ALTER TABLE news_items ADD COLUMN summary TEXT NULL AFTER body');
      }
      if (!newsColNames.includes('full_story')) {
        await pool.execute('ALTER TABLE news_items ADD COLUMN full_story TEXT NULL AFTER summary');
      }
      await pool.execute('UPDATE news_items SET summary = body WHERE summary IS NULL OR summary = \'\'');
      await pool.execute('UPDATE news_items SET full_story = COALESCE(NULLIF(full_story, \'\'), summary) WHERE full_story IS NULL OR full_story = \'\'');
      if (!newsColNames.includes('is_breaking')) {
        await pool.execute('ALTER TABLE news_items ADD COLUMN is_breaking TINYINT(1) NOT NULL DEFAULT 0');
        await pool.execute('UPDATE news_items SET is_breaking = 1 WHERE id = 1');
      }
    } catch (error) {
      console.error('News table migration warning:', error.message);
    }
    
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

    // Seed default admin user if admins table is empty
    const [adminRows] = await pool.execute('SELECT COUNT(*) as count FROM admins');
    if (adminRows[0].count === 0) {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const salt = crypto.randomBytes(16);
      const hash = crypto.scryptSync(adminPassword, salt, 32);
      await pool.execute(
        'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
        [adminUsername, `${salt.toString('hex')}:${hash.toString('hex')}`]
      );
    }

    // Check if notices table is empty
    const [noticeRows] = await pool.execute('SELECT COUNT(*) as count FROM notices');
    if (noticeRows[0].count === 0) {
      for (const notice of mockNotices) {
        await pool.execute(
          'INSERT INTO notices (title, body) VALUES (?, ?)',
          [notice.title, notice.body]
        );
      }
    }

    // Check if news table is empty
    const [newsRows] = await pool.execute('SELECT COUNT(*) as count FROM news_items');
    if (newsRows[0].count === 0) {
      for (const item of mockNews) {
        await pool.execute(
          'INSERT INTO news_items (title, summary, full_story, image_url, published_at, is_breaking) VALUES (?, ?, ?, ?, ?, ?)',
          [item.title, item.summary, item.full_story, item.image_url, item.published_at, item.is_breaking ? 1 : 0]
        );
      }
    }

    // Check if latest news table is empty
    const [latestRows] = await pool.execute('SELECT COUNT(*) as count FROM latest_news');
    if (latestRows[0].count === 0) {
      for (const item of mockLatestNews) {
        await pool.execute(
          'INSERT INTO latest_news (title, is_external, external_url, news_id) VALUES (?, ?, ?, ?)',
          [item.title, item.is_external, item.external_url, item.news_id]
        );
      }
    }

    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('Database seeding failed:', error.message);
    return { success: false, message: error.message };
  }
}