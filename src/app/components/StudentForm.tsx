"use client";
import { useState, useEffect } from "react";

export default function StudentForm() {
	const [form, setForm] = useState({
		name: "",
		dob: "",
		gender: "",
		current_grade: "",
		parent_id: "",
	});
	const [parents, setParents] = useState<any[]>([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		fetch("/api/parents")
			.then((res) => res.json())
			.then((data) => setParents(data));
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");
		const res = await fetch("/api/students", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...form, dob: new Date(form.dob) }),
		});
		if (res.ok) {
			setForm({
				name: "",
				dob: "",
				gender: "",
				current_grade: "",
				parent_id: "",
			});
			setMessage("Student created!");
		} else {
			const data = await res.json();
			setMessage(data.error || "Error creating student");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				name="name"
				value={form.name}
				onChange={handleChange}
				placeholder="Name"
				required
			/>
			<input
				name="dob"
				value={form.dob}
				onChange={handleChange}
				placeholder="Date of Birth"
				type="date"
				required
			/>
			<select
				name="gender"
				value={form.gender}
				onChange={handleChange}
				required
			>
				<option value="">Gender</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="other">Other</option>
			</select>
			<input
				name="current_grade"
				value={form.current_grade}
				onChange={handleChange}
				placeholder="Current Grade"
				required
			/>
			<select
				name="parent_id"
				value={form.parent_id}
				onChange={handleChange}
				required
			>
				<option value="">Select Parent</option>
				{parents.map((p) => (
					<option key={p._id} value={p._id}>
						{p.name} ({p.email})
					</option>
				))}
			</select>
			<button type="submit">Create</button>
			{message && <div className="text-green-600 mt-2">{message}</div>}
		</form>
	);
}
