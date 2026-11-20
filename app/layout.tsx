import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "学生党员先锋力考核工作台",
  description: "入党积极分子七大先锋力任务申报、审核与积分量化评价工作台",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
