"use client";
import { useEffect, useState } from 'react';

const weekdays = [
	'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export default function WeeklyClassTable() {
	const [classes, setClasses] = useState<any[]>([]);
	const [students, setStudents] = useState<any[]>([]);
	const [selectedStudent, setSelectedStudent] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetch('/api/classes')
			.then(res => res.json())
			.then(data => setClasses(data));
		fetch('/api/students')
			.then(res => res.json())
			.then(data => setStudents(data));
	}, []);

	const handleRegister = async (classId: string) => {
		if (!selectedStudent) {
			setMessage('Please select a student');
			return;
		}
		setMessage('');
		const res = await fetch(`/api/classes/${classId}/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ student_id: selectedStudent }),
		});
		const data = await res.json();
		if (res.ok) {
			setMessage('Registration successful!');
		} else {
			setMessage(data.error || 'Registration failed');
		}
	};

	return (
		<div>
			<div className="mb-4">
				<label className="mr-2">Select Student:</label>
				<select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="input input-bordered">
					<option value="">-- Select --</option>
					{students.map((s) => (
						<option key={s._id} value={s._id}>{s.name}</option>
					))}
				</select>
			</div>
			{message && <div className="mb-4 text-green-600">{message}</div>}
			<table className="table w-full">
				<thead>
					<tr>
						<th>Day</th>
						<th>Time Slot</th>
						<th>Class Name</th>
						<th>Subject</th>
						<th>Teacher</th>
						<th>Register</th>
					</tr>
				</thead>
				<tbody>
					{weekdays.map(day => (
						classes.filter(c => c.day_of_week === day).map(c => (
							<tr key={c._id}>
								<td>{day}</td>
								<td>{c.time_slot}</td>
								<td>{c.name}</td>
								<td>{c.subject}</td>
								<td>{c.teacher_name}</td>
								<td>
									<button className="btn btn-sm btn-primary" onClick={() => handleRegister(c._id)}>Register</button>
								</td>
							</tr>
						))
					))}
				</tbody>
			</table>
		</div>
	);
}
