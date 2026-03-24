"use client";
import { useState } from "react";

export default function ParentForm() {
	const [form, setForm] = useState({ name: "", phone: "", email: "" });
	const [message, setMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");
		const res = await fetch("/api/parents", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		if (res.ok) {
			setForm({ name: "", phone: "", email: "" });
			setMessage("Parent created!");
		} else {
			const data = await res.json();
			setMessage(data.error || "Error creating parent");
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
				name="phone"
				value={form.phone}
				onChange={handleChange}
				placeholder="Phone"
				required
			/>
			<input
				name="email"
				value={form.email}
				onChange={handleChange}
				placeholder="Email"
				required
				type="email"
			/>
			<button type="submit">Create</button>
			{message && <div className="text-green-600 mt-2">{message}</div>}
		</form>
	);
}
