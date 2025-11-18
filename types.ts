
export enum UserRole {
  Admin = 'admin',
  Teacher = 'teacher',
  Student = 'student',
}

export interface User {
  id: number;
  name: string;
  email: string;
  password;
  role: UserRole;
  avatarUrl: string;
  status?: 'active' | 'suspended';
}

export interface Course {
  id: string;
  name: string;
  time: string;
  room: string;
  teacher: string;
}

export interface Assignment {
  id: string;
  course: string;
  title: string;
  dueDate: string;
  grade: string;
}

export interface Report {
    id: string;
    course: string;
    title: string;
    teacher: string;
    date: string;
    fileUrl: string;
}

export interface DailyReport {
    id: string;
    teacher: string;
    date: string;
    report: string;
    mood: 'happy' | 'neutral' | 'sad';
}

export interface Attendance {
    date: string;
    records: {
        courseName: string;
        status: 'present' | 'absent' | 'late';
    }[];
}


export interface Student extends User {
  role: UserRole.Student;
  class: number;
  courses: Course[];
  assignments: Assignment[];
  reports: Report[];
  dailyReports: DailyReport[];
  attendance: Attendance[];
}

export interface Teacher extends User {
  role: UserRole.Teacher;
  subject: string;
  contact: string;
  office: string;
  schedule: Course[];
}

export interface Announcement {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
}