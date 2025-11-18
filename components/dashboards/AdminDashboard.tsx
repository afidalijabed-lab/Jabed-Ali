
import React, { useState, useCallback } from 'react';
import { User, Student, Teacher, UserRole } from '../../types';
import { MOCK_STUDENTS, MOCK_TEACHERS } from '../../constants';
import Header from '../common/Header';

const UserCard: React.FC<{ 
    user: Student | Teacher, 
    onRemove: (id: number) => void,
    onViewDetails: (user: Student | Teacher) => void 
}> = ({ user, onRemove, onViewDetails }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center text-center space-y-3 transition-transform transform hover:scale-105">
            <img src={user.avatarUrl} alt={user.name} className="w-20 h-20 rounded-full border-4 border-indigo-200 dark:border-indigo-700" />
            <div className="flex-1">
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                 <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full text-white ${user.role === UserRole.Student ? 'bg-blue-500' : 'bg-green-500'}`}>
                    {user.role}
                </span>
            </div>
            <div className="flex space-x-2 w-full">
                <button 
                    onClick={() => onViewDetails(user)}
                    className="flex-1 px-3 py-2 rounded-md text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition"
                >
                    View Details
                </button>
                <button 
                    onClick={() => onRemove(user.id)}
                    className="flex-1 px-3 py-2 rounded-md text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

const Modal: React.FC<{ isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

const AdminDashboard: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
    const [view, setView] = useState<'students' | 'teachers'>('students');
    const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
    const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Student | Teacher | null>(null);
    const [newUser, setNewUser] = useState<Partial<Student & Teacher>>({ name: '', email: '', password: ''});

    const handleRemoveUser = (id: number) => {
        if (window.confirm('Are you sure you want to remove this user? This action cannot be undone.')) {
            if (view === 'students') {
                setStudents(students.filter(s => s.id !== id));
            } else {
                setTeachers(teachers.map(t => t.id === id ? {...t, status: 'suspended'} : t).filter(t => t.id !== id));
            }
        }
    };
    
    const handleViewDetails = (user: Student | Teacher) => {
        setSelectedUser(user);
        setIsViewModalOpen(true);
    };

    const handleAddUser = () => {
        const id = Math.floor(Math.random() * 10000);
        const avatarUrl = `https://picsum.photos/seed/${id}/200`;

        if (view === 'students') {
            const student: Student = {
                ...(newUser as Omit<Student, 'id' | 'avatarUrl' | 'role'>),
                id,
                avatarUrl,
                role: UserRole.Student,
                courses: [], assignments: [], reports: [], dailyReports: [], attendance: [],
                status: 'active',
            };
            setStudents([...students, student]);
        } else {
            const teacher: Teacher = {
                 ...(newUser as Omit<Teacher, 'id' | 'avatarUrl' | 'role'>),
                id,
                avatarUrl,
                role: UserRole.Teacher,
                schedule: [],
                status: 'active'
            };
            setTeachers([...teachers, teacher]);
        }
        setIsAddModalOpen(false);
        setNewUser({ name: '', email: '', password: '' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };
    
    const generateRandomPassword = useCallback(() => {
        const randomPass = Math.random().toString(36).slice(-8);
        setNewUser(prev => ({ ...prev, password: randomPass }));
    }, []);

    const DetailsView = () => (
        selectedUser && (
            <div className="space-y-3 text-sm">
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p className="bg-gray-100 dark:bg-gray-700 p-2 rounded"><strong>Password:</strong> {selectedUser.password}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                {selectedUser.role === UserRole.Student && <p><strong>Class:</strong> {(selectedUser as Student).class}</p>}
                {selectedUser.role === UserRole.Teacher && <p><strong>Subject:</strong> {(selectedUser as Teacher).subject}</p>}
                <button onClick={() => setIsViewModalOpen(false)} className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition">Close</button>
            </div>
        )
    );
    
    const AddUserForm = () => (
        <form onSubmit={e => { e.preventDefault(); handleAddUser(); }} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" value={newUser.name} onChange={handleInputChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <input type="email" name="email" placeholder="Email Address" value={newUser.email} onChange={handleInputChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <div className="flex space-x-2">
                <input type="text" name="password" placeholder="Password" value={newUser.password} onChange={handleInputChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                <button type="button" onClick={generateRandomPassword} className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition">Generate</button>
            </div>
            {view === 'students' && <input type="number" name="class" placeholder="Class" onChange={handleInputChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />}
            {view === 'teachers' && <input type="text" name="subject" placeholder="Subject" onChange={handleInputChange} required className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />}
            <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Save</button>
            </div>
        </form>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Header user={user} onLogout={onLogout} title="Admin Dashboard" />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-2 flex space-x-2">
                        <button 
                            onClick={() => setView('students')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${view === 'students' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            Manage Students
                        </button>
                        <button 
                            onClick={() => setView('teachers')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${view === 'teachers' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            Manage Teachers
                        </button>
                    </div>

                    <div className="mb-6 text-right">
                        <button onClick={() => { setIsAddModalOpen(true); setNewUser({ name: '', email: '', password: '' }); }} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition transform hover:-translate-y-0.5">
                            + Add {view === 'students' ? 'Student' : 'Teacher'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {(view === 'students' ? students : teachers).map(usr => (
                            <UserCard key={usr.id} user={usr} onRemove={handleRemoveUser} onViewDetails={handleViewDetails} />
                        ))}
                    </div>
                </div>
            </main>
            
            <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="User Details">
                <DetailsView />
            </Modal>
            
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={`Add New ${view === 'students' ? 'Student' : 'Teacher'}`}>
                <AddUserForm />
            </Modal>
        </div>
    );
};

export default AdminDashboard;