"use client";
import Footer from "@/components/user/Footer/Footer";
import Header from "@/components/user/Header/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
}
const colors = [
  "bg-teal-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-yellow-500",
];
export default function Page() {
  const [data, setData] = useState<{ courses: Course[] } | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api")
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">BÀI THI HOT:</h2>
          <div className="flex space-x-4">
            <select className="border rounded px-3 py-2">
              <option>Chọn lớp</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Chọn môn</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Chọn bộ sách</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Chọn chương</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>Chọn bài</option>
            </select>
            <button className="bg-teal-500 text-white px-4 py-2 rounded">
              <i className="fas fa-search mr-2" />
            </button>
          </div>
        </section>
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data &&
            data.courses.map((course: Course) => {
              const randomColorClass =
                colors[Math.floor(Math.random() * colors.length)];
              return (
                <div
                  key={course.id}
                  className={`${randomColorClass} text-white p-6 rounded-lg shadow-md`}
                >
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-sm">{course.description}</p>
                  <div className="mt-4 text-sm">
                    {Math.floor(Math.random() * 100)} bài đề
                  </div>
                </div>
              );
            })}
        </section>
      </main>
      <Footer />
    </div>
  );
}
