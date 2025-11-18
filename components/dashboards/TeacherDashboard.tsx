
import React, { useState, useMemo } from 'react';
import { User, Teacher as TeacherType, Course, Student } from '../../types';
import { MOCK_TEACHERS, MOCK_ANNOUNCEMENTS, MOCK_STUDENTS } from '../../constants';
import Header from '../common/Header';

const TeacherDashboard: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
    const initialTeacherData = MOCK_TEACHERS.find(t => t.id === user.id) as TeacherType;
    const [teacher, setTeacher] = useState(initialTeacherData);
    const [isEditing, setIsEditing] = useState(false);
    const [view, setView] = useState<'dashboard' | 'students'>('dashboard');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTeacher(prev => ({...prev, [name]: value}));
    }

    const ProfileCard: React.FC = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">My Profile</h2>
            {!isEditing ? (
                <div className="space-y-4">
                    <p><strong>Subject:</strong> {teacher.subject}</p>
                    <p><strong>Email:</strong> {teacher.email}</p>
                    <p><strong>Contact:</strong> {teacher.contact}</p>
                    <p><strong>Office:</strong> {teacher.office}</p>
                    <button onClick={() => setIsEditing(true)} className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition">Edit Profile</button>
                </div>
            ) : (
                <div className="space-y-4">
                     <input type="text" name="subject" value={teacher.subject} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Subject" />
                     <input type="text" name="contact" value={teacher.contact} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Contact" />
                     <input type="text" name="office" value={teacher.office} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Office" />
                     <button onClick={() => setIsEditing(false)} className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">Save Changes</button>
                </div>
            )}
        </div>
    );

    const ScheduleCard: React.FC<{ schedule: Course[] }> = ({ schedule }) => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">My Schedule</h2>
            <div className="space-y-4">
                {schedule.map(course => (
                    <div key={course.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                        <p className="font-semibold">{course.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{course.time} - Room {course.room}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
    const AnnouncementsCard: React.FC = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">School Announcements</h2>
            <div className="space-y-4">
                {MOCK_ANNOUNCEMENTS.map(ann => (
                    <div key={ann.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border-l-4 border-yellow-400">
                        <p className="font-bold">{ann.title} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">- {ann.date}</span></p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{ann.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const DashboardView = () => (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <ProfileCard />
            </div>
            <div className="lg:col-span-2 space-y-8">
                <ScheduleCard schedule={teacher.schedule} />
                <AnnouncementsCard />
            </div>
        </div>
    );

    const StudentManagementView = () => {
        const [allStudents, setAllStudents] = useState<Student[]>(MOCK_STUDENTS);
        const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
        const [reportText, setReportText] = useState("");
        const [reportMood, setReportMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');

        const myStudents = useMemo(() => {
            const teacherCourseIds = teacher.schedule.map(c => c.id);
            return allStudents.filter(student => 
                student.courses.some(course => teacherCourseIds.includes(course.id))
            );
        }, [allStudents, teacher.schedule]);

        const handleAddReport = () => {
            if (!selectedStudent || !reportText) return;

            const newReport = {
                id: `DR${Date.now()}`,
                teacher: teacher.name,
                date: new Date().toISOString().split('T')[0],
                report: reportText,
                mood: reportMood
            };

            const updatedStudents = allStudents.map(s => 
                s.id === selectedStudent.id 
                ? { ...s, dailyReports: [newReport, ...s.dailyReports] }
                : s
            );
            setAllStudents(updatedStudents);
            setSelectedStudent(updatedStudents.find(s => s.id === selectedStudent.id) || null);
            setReportText('');
            setReportMood('neutral');
        };

        const handleAttendanceChange = (courseName: string, status: 'present' | 'absent' | 'late') => {
            if (!selectedStudent) return;
            const today = new Date().toISOString().split('T')[0];
            
            const updatedStudents = allStudents.map(s => {
                if (s.id !== selectedStudent.id) return s;

                let attendanceToday = s.attendance.find(a => a.date === today);
                if (attendanceToday) {
                    const updatedRecords = attendanceToday.records.map(r => r.courseName === courseName ? { ...r, status } : r);
                    const updatedAttendanceDay = { ...attendanceToday, records: updatedRecords };
                    return { ...s, attendance: s.attendance.map(a => a.date === today ? updatedAttendanceDay : a) };
                } else {
                    // This part is for simulation, assumes teacher courses are student courses for the day
                    const newRecord = { courseName, status };
                    const studentCoursesToday = s.courses
                        .filter(c => teacher.schedule.some(tc => tc.id === c.id))
                        .map(c => ({ courseName: c.name, status: 'present' as 'present' | 'absent' | 'late'}));
                    
                    const finalRecords = studentCoursesToday.map(r => r.courseName === courseName ? newRecord : r);
                    
                    const newAttendanceDay = { date: today, records: finalRecords };
                    return { ...s, attendance: [newAttendanceDay, ...s.attendance] };
                }
            });
            setAllStudents(updatedStudents);
            setSelectedStudent(updatedStudents.find(s => s.id === selectedStudent.id) || null);
        };
        
        return (
            <div className="flex flex-col md:flex-row gap-8 h-[calc(100vh-200px)]">
                {/* Student List */}
                <div className="md:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">My Students ({myStudents.length})</h2>
                    <ul className="space-y-2">
                        {myStudents.map(s => (
                            <li key={s.id} onClick={() => setSelectedStudent(s)} className={`p-3 rounded-md cursor-pointer flex items-center space-x-3 transition ${selectedStudent?.id === s.id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                <img src={s.avatarUrl} alt={s.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{s.name}</p>
                                    <p className={`text-xs ${selectedStudent?.id === s.id ? 'text-indigo-200' : 'text-gray-500'}`}>Class {s.class}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Student Details */}
                <div className="md:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-y-auto">
                    {selectedStudent ? (
                        <div>
                            <div className="flex items-center space-x-4 pb-4 border-b dark:border-gray-700 mb-4">
                                <img src={selectedStudent.avatarUrl} alt={selectedStudent.name} className="w-16 h-16 rounded-full border-2 border-indigo-500" />
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                                    <p className="text-gray-500 dark:text-gray-400">Class {selectedStudent.class}</p>
                                </div>
                            </div>

                            {/* Daily Report Form */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Add Daily Report</h3>
                                <textarea value={reportText} onChange={e => setReportText(e.target.value)} rows={3} placeholder={`Write a report for ${selectedStudent.name}...`} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 mb-2"></textarea>
                                <div className="flex items-center justify-between">
                                     <div className="flex items-center space-x-2">
                                        <span>Mood:</span>
                                        <button onClick={() => setReportMood('happy')} className={`px-2 py-1 rounded ${reportMood === 'happy' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>😊</button>
                                        <button onClick={() => setReportMood('neutral')} className={`px-2 py-1 rounded ${reportMood === 'neutral' ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>😐</button>
                                        <button onClick={() => setReportMood('sad')} className={`px-2 py-1 rounded ${reportMood === 'sad' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>😔</button>
                                     </div>
                                    <button onClick={handleAddReport} className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition">Add Report</button>
                                </div>
                            </div>
                            
                            {/* Attendance */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Today's Attendance</h3>
                                <div className="space-y-2">
                                    {teacher.schedule.filter(c => selectedStudent.courses.some(sc => sc.id === c.id)).map(course => {
                                        const attendanceRecord = selectedStudent.attendance.find(a => a.date === new Date().toISOString().split('T')[0])?.records.find(r => r.courseName === course.name);
                                        const status = attendanceRecord?.status || 'present';
                                        return (
                                            <div key={course.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                                                <p>{course.name}</p>
                                                <div className="flex space-x-1">
                                                    <button onClick={() => handleAttendanceChange(course.name, 'present')} className={`px-2 py-1 text-xs rounded ${status === 'present' ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>Present</button>
                                                    <button onClick={() => handleAttendanceChange(course.name, 'absent')} className={`px-2 py-1 text-xs rounded ${status === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>Absent</button>
                                                    <button onClick={() => handleAttendanceChange(course.name, 'late')} className={`px-2 py-1 text-xs rounded ${status === 'late' ? 'bg-yellow-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>Late</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                            <p>Select a student to view their details and manage reports/attendance.</p>
                        </div>
                    )}
                </div>
            </div>
        )
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header user={user} onLogout={onLogout} title="Teacher Dashboard" />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-2 flex space-x-2">
                        <button onClick={() => setView('dashboard')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${view === 'dashboard' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            Dashboard
                        </button>
                        <button onClick={() => setView('students')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${view === 'students' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            Manage Students
                        </button>
                    </div>

                    {view === 'dashboard' && <DashboardView />}
                    {view === 'students' && <StudentManagementView />}
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;