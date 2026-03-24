import Link from "next/link";
import React from "react";
import "./globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html suppressHydrationWarning>
			<body suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
};

export default Layout;
