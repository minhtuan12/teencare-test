import Link from "next/link";

export default function () {
	return (
		<div className="min-h-screen flex flex-col">
			<nav className="bg-gray-100 p-4 flex !gap-4">
				<Link href="/parents" className="text-blue-600 hover:underline">
					Parents
				</Link>
				<Link
					href="/students"
					className="text-blue-600 hover:underline"
				>
					Students
				</Link>
				<Link href="/classes" className="text-blue-600 hover:underline">
					Classes
				</Link>
			</nav>
		</div>
	);
}
