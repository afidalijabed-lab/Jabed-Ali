import { User, Student, Teacher, Course, Assignment, Announcement, UserRole, Report, DailyReport, Attendance } from './types';

export const MOCK_COURSES: Course[] = [
  { id: 'C101', name: 'Introduction to Physics', time: 'Mon/Wed 9:00-10:30', room: 'Sci-101', teacher: 'Dr. Evelyn Reed' },
  { id: 'C102', name: 'Calculus I', time: 'Tue/Thu 11:00-12:30', room: 'Math-203', teacher: 'Dr. Evelyn Reed' },
  { id: 'C103', name: 'World History', time: 'Mon/Wed 13:00-14:30', room: 'Hist-301', teacher: 'Mr. David Chen' },
  { id: 'C104', name: 'English Literature', time: 'Tue/Thu 9:00-10:30', room: 'Lit-102', teacher: 'Mr. David Chen' },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: 'A1', course: 'Introduction to Physics', title: 'Lab Report 1', dueDate: '2024-10-15', grade: 'A-' },
  { id: 'A2', course: 'Calculus I', title: 'Problem Set 3', dueDate: '2024-10-18', grade: 'B+' },
  { id: 'A3', course: 'World History', title: 'Essay on Roman Empire', dueDate: '2024-10-20', grade: 'A' },
  { id: 'A4', course: 'English Literature', title: 'Shakespeare Analysis', dueDate: '2024-10-22', grade: 'In Progress' },
];

export const MOCK_REPORTS: Report[] = [
    { id: 'R1', course: 'Introduction to Physics', title: 'Mid-Term Performance Report', teacher: 'Dr. Evelyn Reed', date: '2024-11-01', fileUrl: '#' },
    { id: 'R2', course: 'Calculus I', title: 'Mid-Term Performance Report', teacher: 'Dr. Evelyn Reed', date: '2024-11-01', fileUrl: '#' },
    { id: 'R3', course: 'World History', title: 'Mid-Term Performance Report', teacher: 'Mr. David Chen', date: '2024-11-02', fileUrl: '#' },
    { id: 'R4', course: 'English Literature', title: 'Mid-Term Performance Report', teacher: 'Mr. David Chen', date: '2024-11-02', fileUrl: '#' },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
    { id: 1, title: 'Mid-term Exams Schedule', content: 'Mid-term exams will be held from Oct 25th to Oct 30th. Please check the detailed schedule on the portal.', author: 'Admin', date: '2024-10-05' },
    { id: 2, title: 'Annual Sports Day', content: 'The annual sports day is scheduled for Nov 15th. Sign up for events by Nov 1st.', author: 'Admin', date: '2024-10-02' },
];

export const MOCK_DAILY_REPORTS_ALICE: DailyReport[] = [
    { id: 'DR1', teacher: 'Dr. Evelyn Reed', date: '2024-10-25', report: 'Alice was very participative in Physics class today! Showed great understanding of the concepts.', mood: 'happy' },
    { id: 'DR2', teacher: 'Dr. Evelyn Reed', date: '2024-10-24', report: 'Completed the calculus quiz with a good score. Keep up the good work.', mood: 'happy' },
];
export const MOCK_DAILY_REPORTS_BOB: DailyReport[] = [
    { id: 'DR3', teacher: 'Mr. David Chen', date: '2024-10-25', report: 'Bob needs to focus more during the history lecture. Seemed a bit distracted.', mood: 'neutral' }
];
export const MOCK_DAILY_REPORTS_CHARLIE: DailyReport[] = [
    { id: 'DR4', teacher: 'Dr. Evelyn Reed', date: '2024-10-25', report: 'Charlie was a bit distracted in class today.', mood: 'neutral' },
    { id: 'DR5', teacher: 'Mr. David Chen', date: '2024-10-25', report: 'Good work on the literature essay draft. The arguments are well-structured.', mood: 'happy' },
];

export const MOCK_ATTENDANCE_ALICE: Attendance[] = [
    { 
        date: '2024-10-25', 
        records: [
            { courseName: 'Introduction to Physics', status: 'present' },
            { courseName: 'Calculus I', status: 'present' }
        ] 
    },
    { 
        date: '2024-10-24', 
        records: [
            { courseName: 'Introduction to Physics', status: 'present' },
            { courseName: 'Calculus I', status: 'late' }
        ] 
    },
];
export const MOCK_ATTENDANCE_BOB: Attendance[] = [
    { date: '2024-10-25', records: [{ courseName: 'World History', status: 'present' }, { courseName: 'English Literature', status: 'present' }] }
];
export const MOCK_ATTENDANCE_CHARLIE: Attendance[] = [
    { date: '2024-10-25', records: [{ courseName: 'Calculus I', status: 'present' }, { courseName: 'World History', status: 'absent' }] }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.j@school.edu',
    password: 'password',
    role: UserRole.Student,
    avatarUrl: 'https://picsum.photos/seed/alice/200',
    class: 10,
    courses: MOCK_COURSES.slice(0, 2),
    assignments: MOCK_ASSIGNMENTS.slice(0, 2),
    reports: MOCK_REPORTS.slice(0,2),
    dailyReports: MOCK_DAILY_REPORTS_ALICE,
    attendance: MOCK_ATTENDANCE_ALICE,
    status: 'active',
  },
  {
    id: 2,
    name: 'Bob Williams',
    email: 'bob.w@school.edu',
    password: 'password',
    role: UserRole.Student,
    avatarUrl: 'https://picsum.photos/seed/bob/200',
    class: 9,
    courses: MOCK_COURSES.slice(2, 4),
    assignments: MOCK_ASSIGNMENTS.slice(2, 4),
    reports: MOCK_REPORTS.slice(2,4),
    dailyReports: MOCK_DAILY_REPORTS_BOB,
    attendance: MOCK_ATTENDANCE_BOB,
    status: 'active',
  },
   {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie.b@school.edu',
    password: 'password',
    role: UserRole.Student,
    avatarUrl: 'https://picsum.photos/seed/charlie/200',
    class: 8,
    courses: MOCK_COURSES.slice(1, 3),
    assignments: MOCK_ASSIGNMENTS.slice(1, 3),
    reports: MOCK_REPORTS.slice(1,3),
    dailyReports: MOCK_DAILY_REPORTS_CHARLIE,
    attendance: MOCK_ATTENDANCE_CHARLIE,
    status: 'suspended',
  },
];

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: 101,
    name: 'Dr. Evelyn Reed',
    email: 'evelyn.r@school.edu',
    password: 'password',
    role: UserRole.Teacher,
    avatarUrl: 'https://picsum.photos/seed/evelyn/200',
    subject: 'Physics & Math',
    contact: 'evelyn.r@school.edu',
    office: 'Sci-205',
    schedule: MOCK_COURSES.slice(0, 2),
    status: 'active',
  },
  {
    id: 102,
    name: 'Mr. David Chen',
    email: 'david.c@school.edu',
    password: 'password',
    role: UserRole.Teacher,
    avatarUrl: 'https://picsum.photos/seed/david/200',
    subject: 'History & Literature',
    contact: 'david.c@school.edu',
    office: 'Arts-110',
    schedule: MOCK_COURSES.slice(2, 4),
    status: 'active',
  },
];

export const MOCK_ADMIN: User = {
  id: 1001,
  name: 'Admin User',
  email: 'admin123',
  password: 'admin123',
  role: UserRole.Admin,
  avatarUrl: 'https://picsum.photos/seed/admin/200',
};

export const MOCK_USERS: (Student | Teacher | User)[] = [
  ...MOCK_STUDENTS,
  ...MOCK_TEACHERS,
  MOCK_ADMIN
];