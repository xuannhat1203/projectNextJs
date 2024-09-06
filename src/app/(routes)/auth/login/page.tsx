"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
}

interface ExamSubject {
  id: number;
  title: string;
  description: string;
  courseId: number;
}

interface Exam {
  id: number;
  title: string;
  description: string;
  duration: number;
  examSubjectId: number;
}

interface Question {
  id: number;
  question: string;
  examId: number;
  options: string[];
  answer: string;
}

interface UserAnswer {
  id: number;
  useId: number;
  exampId: number;
  score: number;
}

interface User {
  id: number;
  username: string;
  passWord: string;
  email: string;
  role: number;
  profilePicture: string;
  status: number;
}

interface Data {
  courses: Course[];
  accountAdmin: {
    email: string;
    passWord: string;
  };
  examSubjects: ExamSubject[];
  exam: Exam[];
  questions: Question[];
  userAnswers: UserAnswer[];
  users: User[];
}

export default function Page() {
  const [data, setData] = useState<Data | null>(null);
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get<Data>("http://localhost:3000/api")
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const handleLogin = () => {
    const listUser = data.users;
    const find = listUser.find((user) => user.email === email);
    if (find) {
      if (find.status === 1) {
        setError("Tài khoản bị chặn. Vui lòng liên hệ với quản trị viên!");
        return;
      } else if (find.passWord === passWord) {
        router.push("/admin/HomeAdmin");
      } else {
        setError("Sai mật khẩu. Vui lòng thử lại!");
      }
    } else {
      setError("Sai email. Vui lòng thử lại!");
    }
  };

  return (
    <div className="h-screen bg-[#9A616D]">
      <div className="container mx-auto py-5 h-full flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg flex overflow-hidden">
            <div className="hidden md:block md:w-1/2">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="p-6 lg:p-8">
                <form>
                  <div className="flex items-center mb-6">
                    <i className="fas fa-cubes text-3xl mr-3 text-[#ff6219]"></i>
                    <span className="text-4xl font-bold">Login</span>
                  </div>

                  <h5 className="text-xl font-normal mb-6 pb-3 tracking-wide">
                    Sign into your account
                  </h5>

                  <div className="relative mb-6">
                    <input
                      type="email"
                      id="email"
                      className="form-input block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative mb-6">
                    <input
                      type="password"
                      id="password"
                      className="form-input block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                      placeholder="Password"
                      onChange={(e) => setPassWord(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="mb-4 text-red-600">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <button
                      type="button"
                      className="bg-black text-white py-2 px-4 rounded-lg w-full text-lg"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>

                  <a href="#!" className="text-sm text-gray-600">
                    Forgot password?
                  </a>
                  <p className="text-gray-600 mt-2">
                    Don't have an account?{" "}
                    <a
                      onClick={() => router.push("/auth/register")}
                      href="#!"
                      className="text-indigo-600"
                    >
                      Register here
                    </a>
                  </p>
                  <div className="mt-4">
                    <a href="#!" className="text-sm text-gray-600 mr-4">
                      Terms of use.
                    </a>
                    <a href="#!" className="text-sm text-gray-600">
                      Privacy policy
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
