
import React, { useState } from 'react';
import { User, Student as StudentType, Course, Assignment, Report, DailyReport, Attendance } from '../../types';
import { MOCK_STUDENTS, MOCK_ANNOUNCEMENTS } from '../../constants';
import Header from '../common/Header';

const DashboardView: React.FC<{ student: StudentType }> = ({ student }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <ScheduleCard schedule={student.courses} />
            <AssignmentsCard assignments={student.assignments} />
            <ReportsCard reports={student.reports} />
        </div>
        <div className="lg:col-span-1 space-y-6">
            <AnnouncementsCard />
            <DailyReportsCard reports={student.dailyReports} />
        </div>
    </div>
);

const ScheduleCard: React.FC<{ schedule: Course[] }> = ({ schedule }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">My Schedule</h2>
        <div className="space-y-4">
            {schedule.map(course => (
                <div key={course.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <p className="font-semibold">{course.name} <span className="text-sm font-normal text-gray-500">- {course.teacher}</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{course.time} - Room {course.room}</p>
                </div>
            ))}
        </div>
    </div>
);

const AssignmentsCard: React.FC<{ assignments: Assignment[] }> = ({ assignments }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Upcoming Assignments</h2>
        <div className="space-y-3">
            {assignments.map(assignment => (
                <div key={assignment.id} className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{assignment.title} <span className="text-sm font-normal text-gray-500">- {assignment.course}</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Due: {assignment.dueDate}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${assignment.grade === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'}`}>{assignment.grade}</span>
                </div>
            ))}
        </div>
    </div>
);

const ReportsCard: React.FC<{ reports: Report[] }> = ({ reports }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Performance Reports</h2>
        <div className="space-y-3">
            {reports.map(report => (
                <div key={report.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <div>
                        <p className="font-semibold">{report.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{report.course} - {report.teacher} ({report.date})</p>
                    </div>
                    <a href={report.fileUrl} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Download</a>
                </div>
            ))}
        </div>
    </div>
);

const AnnouncementsCard: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Announcements</h2>
        <div className="space-y-4">
            {MOCK_ANNOUNCEMENTS.map(ann => (
                <div key={ann.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border-l-4 border-blue-400">
                    <p className="font-bold">{ann.title} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">- {ann.date}</span></p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{ann.content}</p>
                </div>
            ))}
        </div>
    </div>
);

const DailyReportsCard: React.FC<{ reports: DailyReport[] }> = ({ reports }) => {
    const moodIcons = {
        happy: '😊',
        neutral: '😐',
        sad: '😔',
    };
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">Daily Teacher Notes</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {reports.map(report => (
                     <div key={report.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                        <div className="flex justify-between items-start">
                             <div>
                                 <p className="font-semibold text-sm">{report.teacher} <span className="font-normal text-xs text-gray-500 dark:text-gray-400">- {report.date}</span></p>
                                 <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{report.report}</p>
                             </div>
                             <span className="text-2xl">{moodIcons[report.mood]}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AttendanceView: React.FC<{ attendance: Attendance[] }> = ({ attendance }) => {
    const [selectedDate, setSelectedDate] = useState(attendance[0]?.date || '');

    const selectedRecord = attendance.find(a => a.date === selectedDate);
    const statusClasses = {
        present: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
        absent: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
        late: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
             <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">My Attendance</h2>
             <div className="mb-4">
                <label htmlFor="attendance-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Date:</label>
                <select id="attendance-date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full md:w-1/3 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500">
                    {attendance.map(a => <option key={a.date} value={a.date}>{new Date(a.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</option>)}
                </select>
             </div>
             {selectedRecord ? (
                <div className="space-y-3">
                    {selectedRecord.records.map(record => (
                        <div key={record.courseName} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                            <p className="font-semibold">{record.courseName}</p>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusClasses[record.status]}`}>
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                        </div>
                    ))}
                </div>
             ) : <p>No records found for this date.</p>}
        </div>
    );
};


const StudentDashboard: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
    const student = MOCK_STUDENTS.find(s => s.id === user.id) as StudentType;
    const [activeTab, setActiveTab] = useState<'dashboard' | 'attendance'>('dashboard');

    const renderContent = () => {
        switch(activeTab) {
            case 'dashboard':
                return <DashboardView student={student} />;
            case 'attendance':
                return <AttendanceView attendance={student.attendance} />;
            default:
                return null;
        }
    };

    const TabButton: React.FC<{tab: 'dashboard' | 'attendance', label: string}> = ({ tab, label }) => (
        <button 
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${activeTab === tab ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Header user={user} onLogout={onLogout} title="Student Dashboard" />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-2 flex space-x-2">
                       <TabButton tab="dashboard" label="Dashboard" />
                       <TabButton tab="attendance" label="Attendance" />
                    </div>

                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
