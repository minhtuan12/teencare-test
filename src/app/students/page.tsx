import { Suspense } from "react";
import StudentForm from "../components/StudentForm";

export default function StudentsPage() {
	return (
		<main>
			<h1>Create Student</h1>
			<StudentForm />
		</main>
	);
}
