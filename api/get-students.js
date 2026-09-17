const mysql = require('mysql2/promise');

const defaultStudents = [
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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const school = (req.query && req.query.school) || '';
  const grade = parseInt((req.query && req.query.grade) || '0', 10);

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'hayabusa.proxy.rlwy.net',
      port: process.env.DB_PORT || 39501,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'ydxqzsUvGTMEbFhBqmSJrcuPAXcKsJqS',
      database: process.env.DB_NAME || 'railway',
      connectTimeout: 2000
    });

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

    const [rows] = await connection.execute(query, params);
    res.status(200).json(rows);
  } catch {
    const filtered = defaultStudents.filter(s => {
      const matchSchool = !school || s.destination_school.toLowerCase().includes(school.toLowerCase());
      const matchGrade = !grade || s.grade === grade;
      return matchSchool && matchGrade;
    });
    res.status(200).json(filtered);
  } finally {
    if (connection) await connection.end().catch(() => {});
  }
};