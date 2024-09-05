import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "database", "data.json");
  const data = fs.readFileSync(filePath, "utf8");
  const products = JSON.parse(data);
  return NextResponse.json(products);
}
export async function POST(req: NextRequest) {
  const userRequest = await req.json();
  const filePath = path.join(process.cwd(), "database", "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (userRequest.type === "user") {
    const newUserId =
      data.users.length > 0 ? data.users[data.users.length - 1].id + 1 : 1;
    const newUser = { ...userRequest, id: newUserId };
    data.users.push(newUser);
  } else if (userRequest.type === "course") {
    const newCourseId =
      data.courses.length > 0
        ? data.courses[data.courses.length - 1].id + 1
        : 1;
    const newCourse = { ...userRequest, id: newCourseId };
    data.courses.push(newCourse);
  } else if (userRequest.type === "question") {
    const newQuestionId =
      data.questions.length > 0
        ? data.questions[data.questions.length - 1].id + 1
        : 1;
    const newQuestion = { ...userRequest, id: newQuestionId };
    data.questions.push(newQuestion);
  } else if (userRequest.type === "examSubject") {
    const newExamSubjectId =
      data.examSubjects.length > 0
        ? data.examSubjects[data.examSubjects.length - 1].id + 1
        : 1;
    const newExamSubject = { ...userRequest, id: newExamSubjectId };
    data.examSubjects.push(newExamSubject);
  } else if (userRequest.type === "exam") {
    const newExamId =
      data.exams.length > 0 ? data.exams[data.exams.length - 1].id + 1 : 1;
    const newExam = { ...userRequest, id: newExamId };
    data.exams.push(newExam);
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  return NextResponse.json(data);
}
