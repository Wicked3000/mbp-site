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

const mockVetStudents = [
  { id: 1, candidate_name: 'Binan Rian', primary_school: 'Goilanai', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 2, candidate_name: 'Ezekiel Abiah', primary_school: 'Alotau', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'F' },
  { id: 3, candidate_name: 'Morris Joel', primary_school: 'Alotau', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 4, candidate_name: 'Nelson Nelson', primary_school: 'Alotau', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 5, candidate_name: 'Rupi Judeith', primary_school: 'Alotau', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'F' },
  { id: 6, candidate_name: 'Haro Lewardy', primary_school: 'Alotau', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 7, candidate_name: 'Napora Isaac', primary_school: 'Kuiaro', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 8, candidate_name: 'Newton Roselyn Jenny', primary_school: 'Rabe', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'F' },
  { id: 9, candidate_name: 'Jemmy Cyril', primary_school: 'Gwarume', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 10, candidate_name: 'Georey Glenda', primary_school: 'Gwarume', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'F' },
  { id: 11, candidate_name: 'Bunag Rodney', primary_school: 'Gwarume', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 12, candidate_name: 'Anderson Numasuba', primary_school: 'Gwarume', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 13, candidate_name: 'Walua Davids', primary_school: 'Gwarume', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 14, candidate_name: 'Inaru Danny', primary_school: 'Ululoga', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 15, candidate_name: 'Jemmy Sharlot', primary_school: 'Ululoga', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'F' },
  { id: 16, candidate_name: 'Walua Churoll', primary_school: 'Ululoga', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 17, candidate_name: 'Tauris Michael', primary_school: 'Rabaraba', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 18, candidate_name: 'Nikel Willie', primary_school: 'Rabaraba', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'M' },
  { id: 19, candidate_name: 'Momen Miriam', primary_school: 'Rabaraba', destination_school: 'Kwato VET Centre', status: 'Selected', gender: 'F' },
];

const mockFodeStudents = [
  { id: 1, candidate_name: 'Boine Ensail', primary_school: 'Lelohoa', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
  { id: 2, candidate_name: 'John Nationty', primary_school: 'Lelohoa', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
  { id: 3, candidate_name: 'Kagubuy Vivian Brig', primary_school: 'Lelohoa', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
  { id: 4, candidate_name: 'Oben Roseanne', primary_school: 'Lelohoa', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
  { id: 5, candidate_name: 'Richard Tomali Pithal', primary_school: 'Lelohoa', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
  { id: 6, candidate_name: 'Tommy George', primary_school: 'Lelohoa', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'M' },
  { id: 7, candidate_name: 'Benjamin Isabellina', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
  { id: 8, candidate_name: 'Didia Lane Jacinta', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
  { id: 9, candidate_name: 'Gini Andrew', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'M' },
  { id: 10, candidate_name: 'Harold Melilyn', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
  { id: 11, candidate_name: 'Leod Brian', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'M' },
  { id: 12, candidate_name: 'Petra Jenine', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
  { id: 13, candidate_name: 'Peniamin Garry', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'M' },
  { id: 14, candidate_name: 'Stanley Melanie', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'M' },
  { id: 15, candidate_name: 'Tuiwala Daniel', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'M' },
  { id: 16, candidate_name: 'Tioni Traceyl', primary_school: 'Pabe', destination_school: 'FODE Intake 2026', status: 'Selected', gender: 'F' },
];

const mockContacts = [
  { id: 1, name: 'David Kila', email: 'david.kila@gmail.com', phone: '+675 7123 4567', message: 'Inquiring about Grade 9 selection list verification dates for Cameron Secondary.', created_at: new Date('2026-09-15T10:30:00Z').toISOString() },
  { id: 2, name: 'Mary Anne', email: 'm.anne@education.gov.pg', phone: '+675 7234 5678', message: 'Requesting updated teacher posting circular for Woodlark Junior High.', created_at: new Date('2026-09-16T14:15:00Z').toISOString() },
];

const mockWhatsappSubscribers = [
  { id: 1, phone: '+675 7123 4567', name: 'David Kila', source: 'homepage', created_at: new Date('2026-09-15T10:30:00Z').toISOString() },
  { id: 2, phone: '+675 7234 5678', name: 'Mary Anne', source: 'homepage', created_at: new Date('2026-09-16T14:15:00Z').toISOString() },
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

const mockNewsBanners = [
  {
    id: 1,
    image_url: 'assets/slider/island.png',
    title: 'Discover Milne Bay',
    subtitle: 'Providing quality education and fostering unity across our islands, mountains, and seas.',
    order_index: 0,
    active: 1
  },
  {
    id: 2,
    image_url: 'assets/slider/school.png',
    title: 'Empowering the Future',
    subtitle: 'Modern educational pathways and bright opportunities for every child.',
    order_index: 1,
    active: 1
  },
  {
    id: 3,
    image_url: 'assets/slider/culture.png',
    title: 'Preserving Our Heritage',
    subtitle: 'Embracing our vibrant cultural heritage while advancing towards a prosperous future.',
    order_index: 2,
    active: 1
  },
];

const mockPageBanners = [
  {
    id: 1,
    page_key: 'about',
    title: 'About Milne Bay Province',
    subtitle: 'Our Land, Our People, Our Education',
    image_url: 'assets/about/banner.png'
  },
  {
    id: 2,
    page_key: 'basic',
    title: 'Basic Education',
    subtitle: 'Foundations for the Future of Milne Bay',
    image_url: 'assets/basic/banner.png'
  },
  {
    id: 3,
    page_key: 'post',
    title: 'Post Primary Education',
    subtitle: 'Secondary & High School Pathways in Milne Bay Province',
    image_url: 'assets/post/banner.png'
  },
  {
    id: 4,
    page_key: 'vet',
    title: 'Vocational Education',
    subtitle: 'Skills Oriented Pathways in Milne Bay Province',
    image_url: 'assets/vet/banner.png'
  },
  {
    id: 5,
    page_key: 'fode',
    title: 'Flexible Open & Distance Education',
    subtitle: 'Alternative Pathways to Academic Success in Milne Bay',
    image_url: 'assets/fode/banner.png'
  },
];

const mockWelcomeMessage = {
  id: 1,
  code: 'welcome',
  kicker: 'Milne Bay Province Division of Education',
  title: 'Welcome to Our Province',
  message: 'Warm greetings from the Milne Bay Province Division of Education. We are proud to serve more than 48,000 students across 345 schools, from our island communities to the mainland.\n\nOur vision is a well-educated and healthy population that is self reliant, wise in the use of its resources, and able to participate meaningfully in the social and economic development of our province and nation.\n\nWe invite you to explore our site to learn about our schools, programs, news, and the many pathways we offer every child to succeed.',
  image_url: 'assets/about/img1.png',
  active: 1
};

const mockPolicyCategories = [
  {
    id: 1,
    name: 'Governance & Administration',
    slug: 'governance-administration',
    description: 'Policies guiding school governance, leadership, accountability, and provincial administration.',
    order_index: 0,
    active: 1
  },
  {
    id: 2,
    name: 'Curriculum & Assessment',
    slug: 'curriculum-assessment',
    description: 'Curriculum standards, assessment procedures, and learning resources for schools across the province.',
    order_index: 1,
    active: 1
  },
  {
    id: 3,
    name: 'Student Welfare & Safety',
    slug: 'student-welfare-safety',
    description: 'Guidelines for student wellbeing, protection, inclusion, and safe learning environments.',
    order_index: 2,
    active: 1
  },
  {
    id: 4,
    name: 'Finance & Procurement',
    slug: 'finance-procurement',
    description: 'Financial management, procurement, reporting, and resource allocation policies.',
    order_index: 3,
    active: 1
  }
];

const mockPolicyDocuments = [
  {
    id: 1,
    category_id: 1,
    category_name: 'Governance & Administration',
    title: 'Provincial School Governance Framework',
    description: 'Roles, responsibilities, and accountability requirements for provincial schools and education leaders.',
    document_url: '/assets/downloads/education_plan.pdf',
    thumbnail_url: '/assets/plans/edu-plan-cover.png',
    file_type: 'PDF',
    file_size: '2.4 MB',
    order_index: 0,
    active: 1,
    published_at: '2026-06-20'
  },
  {
    id: 2,
    category_id: 2,
    category_name: 'Curriculum & Assessment',
    title: 'Curriculum Implementation Guidelines',
    description: 'Standards and procedures for delivering the national curriculum in Milne Bay Province schools.',
    document_url: '/assets/downloads/syllabus_updates.pdf',
    thumbnail_url: '/assets/slider/school.png',
    file_type: 'PDF',
    file_size: '1.8 MB',
    order_index: 0,
    active: 1,
    published_at: '2026-06-12'
  },
  {
    id: 3,
    category_id: 3,
    category_name: 'Student Welfare & Safety',
    title: 'Student Welfare and Child Protection Policy',
    description: 'Minimum safeguards and response procedures for protecting students in all learning environments.',
    document_url: '/assets/downloads/peb_circulars.pdf',
    thumbnail_url: '/assets/slider/culture.png',
    file_type: 'PDF',
    file_size: '1.2 MB',
    order_index: 0,
    active: 1,
    published_at: '2026-05-28'
  },
  {
    id: 4,
    category_id: 4,
    category_name: 'Finance & Procurement',
    title: 'School Financial Management Policy',
    description: 'Financial planning, approval, reporting, and procurement controls for provincial schools.',
    document_url: '/assets/downloads/school_fee_structures.pdf',
    thumbnail_url: '/assets/slider/island.png',
    file_type: 'PDF',
    file_size: '1.5 MB',
    order_index: 0,
    active: 1,
    published_at: '2026-05-15'
  }
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

export async function fetchVetStudents(school = '') {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      let query = 'SELECT * FROM vet_students WHERE 1=1';
      const params = [];
      if (school) {
        query += ' AND destination_school = ?';
        params.push(school);
      }
      const [rows] = await pool.execute(query + ' ORDER BY id ASC', params);
      if (rows.length > 0) return rows;
    } catch (error) {
      console.error('Database fetch vet students failed, falling back to mock data:', error.message);
    }
  }
  return mockVetStudents.filter(s => !school || s.destination_school.toLowerCase().includes(school.toLowerCase()));
}

export async function addVetStudent(student) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'INSERT INTO vet_students (candidate_name, primary_school, destination_school, status, gender) VALUES (?, ?, ?, ?, ?)',
        [student.candidate_name, student.primary_school, student.destination_school, student.status || 'Selected', student.gender || 'M']
      );
      return { ...student, id: result.insertId };
    } catch (error) {
      console.error('Database insert vet student failed:', error);
      throw new Error(`Database insert vet student failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist VET student');
}

export async function deleteVetStudent(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM vet_students WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete vet student failed:', error);
      throw new Error(`Database delete vet student failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete VET student');
}

export async function fetchFodeStudents(school = '') {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      let query = 'SELECT * FROM fode_students WHERE 1=1';
      const params = [];
      if (school) {
        query += ' AND destination_school = ?';
        params.push(school);
      }
      const [rows] = await pool.execute(query + ' ORDER BY id ASC', params);
      if (rows.length > 0) return rows;
    } catch (error) {
      console.error('Database fetch fode students failed, falling back to mock data:', error.message);
    }
  }
  return mockFodeStudents.filter(s => !school || s.destination_school.toLowerCase().includes(school.toLowerCase()));
}

export async function addFodeStudent(student) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'INSERT INTO fode_students (candidate_name, primary_school, destination_school, status, gender) VALUES (?, ?, ?, ?, ?)',
        [student.candidate_name, student.primary_school, student.destination_school, student.status || 'Selected', student.gender || 'M']
      );
      return { ...student, id: result.insertId };
    } catch (error) {
      console.error('Database insert fode student failed:', error);
      throw new Error(`Database insert fode student failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist FODE student');
}

export async function deleteFodeStudent(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM fode_students WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete fode student failed:', error);
      throw new Error(`Database delete fode student failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete FODE student');
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
        'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
        [contact.name, contact.email, contact.phone || '', contact.message]
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

// --- WhatsApp Group & Channel Subscription ---

export async function fetchWhatsappSubscribers() {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [rows] = await pool.execute('SELECT * FROM whatsapp_subscribers ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      console.error('Database fetch whatsapp subscribers failed, falling back to mock data:', error.message);
    }
  }
  return mockWhatsappSubscribers;
}

export async function addWhatsappSubscriber(sub) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'INSERT INTO whatsapp_subscribers (phone, name, source) VALUES (?, ?, ?)',
        [sub.phone, sub.name || '', sub.source || 'homepage']
      );
      return { id: result.insertId, ...sub, created_at: new Date().toISOString() };
    } catch (error) {
      console.error('Database insert whatsapp subscriber failed:', error);
      throw new Error(`Database insert whatsapp subscriber failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist whatsapp subscriber');
}

export async function deleteWhatsappSubscriber(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM whatsapp_subscribers WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete whatsapp subscriber failed:', error);
      throw new Error(`Database delete whatsapp subscriber failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete whatsapp subscriber');
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

// --- News Page Banner Management ---

export async function fetchNewsBanners() {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [rows] = await pool.execute(
        'SELECT * FROM news_banners WHERE active = 1 ORDER BY order_index ASC, id ASC'
      );
      return rows;
    } catch (error) {
      console.error('Database fetch news banners failed, falling back to mock data:', error.message);
    }
  }
  return mockNewsBanners.filter((b) => b.active === 1).sort((a, b) => a.order_index - b.order_index);
}

export async function fetchAllNewsBanners() {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [rows] = await pool.execute(
        'SELECT * FROM news_banners ORDER BY order_index ASC, id ASC'
      );
      return rows;
    } catch (error) {
      console.error('Database fetch all news banners failed, falling back to mock data:', error.message);
    }
  }
  return [...mockNewsBanners].sort((a, b) => a.order_index - b.order_index);
}

export async function addNewsBanner(banner) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'INSERT INTO news_banners (image_url, title, subtitle, order_index, active) VALUES (?, ?, ?, ?, ?)',
        [banner.image_url || '', banner.title || '', banner.subtitle || '', banner.order_index || 0, banner.active ? 1 : 0]
      );
      return { id: result.insertId, ...banner };
    } catch (error) {
      console.error('Database insert news banner failed:', error);
      throw new Error(`Database insert news banner failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist news banner');
}

export async function updateNewsBanner(id, banner) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'UPDATE news_banners SET image_url = ?, title = ?, subtitle = ?, order_index = ?, active = ? WHERE id = ?',
        [banner.image_url || '', banner.title || '', banner.subtitle || '', banner.order_index || 0, banner.active ? 1 : 0, id]
      );
      if (result.affectedRows === 0) throw new Error('News banner not found');
      return { id, ...banner };
    } catch (error) {
      console.error('Database update news banner failed:', error);
      throw new Error(`Database update news banner failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot update news banner');
}

export async function deleteNewsBanner(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM news_banners WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete news banner failed:', error);
      throw new Error(`Database delete news banner failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete news banner');
}

// --- Page Banner Management (About, Basic, Post Primary, VET, FODE) ---

export async function fetchPageBanners() {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [rows] = await pool.execute(
        'SELECT * FROM page_banners ORDER BY id ASC'
      );
      return rows;
    } catch (error) {
      console.error('Database fetch page banners failed, falling back to mock data:', error.message);
    }
  }
  return [...mockPageBanners];
}

export async function getPageBanner(page) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [rows] = await pool.execute(
        'SELECT * FROM page_banners WHERE page_key = ? LIMIT 1',
        [page]
      );
      if (rows.length > 0) return rows[0];
    } catch (error) {
      console.error(`Database fetch page banner "${page}" failed, falling back to mock data:`, error.message);
    }
  }
  return mockPageBanners.find((b) => b.page_key === page) || null;
}

export async function updatePageBanner(id, banner) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'UPDATE page_banners SET title = ?, subtitle = ?, image_url = ? WHERE id = ?',
        [banner.title || '', banner.subtitle || '', banner.image_url || '', id]
      );
      if (result.affectedRows === 0) throw new Error('Page banner not found');
      return { id, ...banner };
    } catch (error) {
      console.error('Database update page banner failed:', error);
      throw new Error(`Database update page banner failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot update page banner');
}

// --- Welcome Message ---

export async function getWelcomeMessage() {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [rows] = await pool.execute(
        'SELECT * FROM welcome_messages WHERE code = ? LIMIT 1',
        ['welcome']
      );
      if (rows.length > 0) return rows[0];
    } catch (error) {
      console.error('Database fetch welcome message failed, falling back to mock data:', error.message);
    }
  }
  return { ...mockWelcomeMessage };
}

export async function updateWelcomeMessage(id, msg) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'UPDATE welcome_messages SET kicker = ?, title = ?, message = ?, image_url = ?, active = ? WHERE id = ?',
        [msg.kicker || '', msg.title || '', msg.message || '', msg.image_url || '', msg.active ? 1 : 0, id]
      );
      if (result.affectedRows === 0) throw new Error('Welcome message not found');
      return { id, ...msg };
    } catch (error) {
      console.error('Database update welcome message failed:', error);
      throw new Error(`Database update welcome message failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot update welcome message');
}

// --- Policy Management ---

export async function fetchPolicyCategories() {
  // Static for now
  return mockPolicyCategories;
}

export async function fetchPolicyDocuments(categoryId = null) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      if (categoryId) {
        const [rows] = await pool.execute('SELECT * FROM policies WHERE category_id = ? ORDER BY order_index ASC, id DESC', [categoryId]);
        return rows;
      }
      const [rows] = await pool.execute('SELECT * FROM policies ORDER BY category_id ASC, order_index ASC, id DESC');
      return rows;
    } catch (error) {
      console.error('Database fetch policies failed, falling back to mock data:', error.message);
    }
  }
  let docs = [...mockPolicyDocuments];
  if (categoryId) docs = docs.filter(d => Number(d.category_id) === Number(categoryId));
  return docs.sort((a, b) => a.order_index - b.order_index);
}

export async function addPolicyDocument(doc) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const publishedAt = doc.published_at || new Date().toISOString().split('T')[0];
      const [result] = await pool.execute(
        'INSERT INTO policies (category_id, category_name, title, description, document_url, thumbnail_url, file_type, file_size, order_index, active, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [doc.category_id, doc.category_name || '', doc.title, doc.description || '', doc.document_url || '', doc.thumbnail_url || '', doc.file_type || 'PDF', doc.file_size || '', doc.order_index || 0, doc.active === undefined ? 1 : (doc.active ? 1 : 0), publishedAt]
      );
      return { id: result.insertId, ...doc, published_at: publishedAt };
    } catch (error) {
      console.error('Database insert policy failed:', error);
      throw new Error(`Database insert policy failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot persist policy document');
}

export async function updatePolicyDocument(id, doc) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      const [result] = await pool.execute(
        'UPDATE policies SET category_id = ?, category_name = ?, title = ?, description = ?, document_url = ?, thumbnail_url = ?, file_type = ?, file_size = ?, order_index = ?, active = ?, published_at = ? WHERE id = ?',
        [doc.category_id, doc.category_name || '', doc.title, doc.description || '', doc.document_url || '', doc.thumbnail_url || '', doc.file_type || 'PDF', doc.file_size || '', doc.order_index || 0, doc.active === undefined ? 1 : (doc.active ? 1 : 0), doc.published_at, id]
      );
      if (result.affectedRows === 0) throw new Error('Policy document not found');
      return { id, ...doc };
    } catch (error) {
      console.error('Database update policy failed:', error);
      throw new Error(`Database update policy failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot update policy document');
}

export async function deletePolicyDocument(id) {
  const useDb = await checkDb();
  if (useDb) {
    try {
      const pool = getPool();
      await pool.execute('DELETE FROM policies WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Database delete policy failed:', error);
      throw new Error(`Database delete policy failed: ${error.message}`);
    }
  }
  throw new Error('Database not available - cannot delete policy document');
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
        phone VARCHAR(50) DEFAULT '',
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migrate existing contacts tables to add the phone column if needed
    try {
      const [contactCols] = await pool.execute(
        "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'contacts'"
      );
      const contactColNames = contactCols.map((c) => c.COLUMN_NAME);
      if (!contactColNames.includes('phone')) {
        await pool.execute('ALTER TABLE contacts ADD COLUMN phone VARCHAR(50) DEFAULT \'\' AFTER email');
      }
    } catch (error) {
      console.error('Contacts table migration warning:', error.message);
    }

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS vet_students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        candidate_name VARCHAR(255) NOT NULL,
        primary_school VARCHAR(255) NOT NULL,
        destination_school VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Selected',
        gender VARCHAR(10) DEFAULT 'M',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS fode_students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        candidate_name VARCHAR(255) NOT NULL,
        primary_school VARCHAR(255) NOT NULL,
        destination_school VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Selected',
        gender VARCHAR(10) DEFAULT 'M',
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

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS news_banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(500) NOT NULL DEFAULT '',
        title VARCHAR(255) NOT NULL DEFAULT '',
        subtitle TEXT,
        order_index INT NOT NULL DEFAULT 0,
        active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS page_banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_key VARCHAR(50) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL DEFAULT '',
        subtitle TEXT,
        image_url VARCHAR(500) NOT NULL DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS welcome_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        kicker VARCHAR(255) NOT NULL DEFAULT '',
        title VARCHAR(255) NOT NULL DEFAULT '',
        message TEXT,
        image_url VARCHAR(500) NOT NULL DEFAULT '',
        active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS policies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        category_name VARCHAR(255) NOT NULL DEFAULT '',
        title VARCHAR(255) NOT NULL,
        description TEXT,
        document_url VARCHAR(500) DEFAULT '',
        thumbnail_url VARCHAR(500) DEFAULT '',
        file_type VARCHAR(50) DEFAULT 'PDF',
        file_size VARCHAR(50) DEFAULT '',
        order_index INT NOT NULL DEFAULT 0,
        active TINYINT(1) NOT NULL DEFAULT 1,
        published_at DATE NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS whatsapp_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(50) NOT NULL,
        name VARCHAR(255) DEFAULT '',
        source VARCHAR(50) DEFAULT 'homepage',
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
          'INSERT INTO contacts (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?)',
          [contact.name, contact.email, contact.phone || '', contact.message, contact.created_at]
        );
      }
    }

    // Check if vet_students table is empty
    const [vetStudentRows] = await pool.execute('SELECT COUNT(*) as count FROM vet_students');
    if (vetStudentRows[0].count === 0) {
      for (const student of mockVetStudents) {
        await pool.execute(
          'INSERT INTO vet_students (candidate_name, primary_school, destination_school, status, gender) VALUES (?, ?, ?, ?, ?)',
          [student.candidate_name, student.primary_school, student.destination_school, student.status, student.gender]
        );
      }
    }

    // Check if fode_students table is empty
    const [fodeStudentRows] = await pool.execute('SELECT COUNT(*) as count FROM fode_students');
    if (fodeStudentRows[0].count === 0) {
      for (const student of mockFodeStudents) {
        await pool.execute(
          'INSERT INTO fode_students (candidate_name, primary_school, destination_school, status, gender) VALUES (?, ?, ?, ?, ?)',
          [student.candidate_name, student.primary_school, student.destination_school, student.status, student.gender]
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

    // Check if news_banners table is empty
    const [bannerRows] = await pool.execute('SELECT COUNT(*) as count FROM news_banners');
    if (bannerRows[0].count === 0) {
      for (const banner of mockNewsBanners) {
        await pool.execute(
          'INSERT INTO news_banners (image_url, title, subtitle, order_index, active) VALUES (?, ?, ?, ?, ?)',
          [banner.image_url, banner.title, banner.subtitle, banner.order_index, banner.active]
        );
      }
    }

    // Ensure the five page banners (About, Basic, Post Primary, VET, FODE) exist
    for (const banner of mockPageBanners) {
      await pool.execute(
        'INSERT IGNORE INTO page_banners (page_key, title, subtitle, image_url) VALUES (?, ?, ?, ?)',
        [banner.page_key, banner.title || '', banner.subtitle || '', banner.image_url || '']
      );
    }

    // Ensure the welcome message row exists
    await pool.execute(
      'INSERT IGNORE INTO welcome_messages (code, kicker, title, message, image_url, active) VALUES (?, ?, ?, ?, ?, ?)',
      [mockWelcomeMessage.code, mockWelcomeMessage.kicker || '', mockWelcomeMessage.title || '', mockWelcomeMessage.message || '', mockWelcomeMessage.image_url || '', mockWelcomeMessage.active ?? 1]
    );

    // Check if policies table is empty
    const [policyRows] = await pool.execute('SELECT COUNT(*) as count FROM policies');
    if (policyRows[0].count === 0) {
      for (const doc of mockPolicyDocuments) {
        await pool.execute(
          'INSERT INTO policies (category_id, category_name, title, description, document_url, thumbnail_url, file_type, file_size, order_index, active, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [doc.category_id, doc.category_name, doc.title, doc.description, doc.document_url, doc.thumbnail_url, doc.file_type, doc.file_size, doc.order_index, doc.active, doc.published_at]
        );
      }
    }

    // Check if whatsapp_subscribers table is empty
    const [waRows] = await pool.execute('SELECT COUNT(*) as count FROM whatsapp_subscribers');
    if (waRows[0].count === 0) {
      for (const sub of mockWhatsappSubscribers) {
        await pool.execute(
          'INSERT INTO whatsapp_subscribers (phone, name, source) VALUES (?, ?, ?)',
          [sub.phone, sub.name, sub.source]
        );
      }
    }

    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('Database seeding failed:', error.message);
    return { success: false, message: error.message };
  }
}