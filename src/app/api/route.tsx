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
export async function PUT(req: NextRequest) {
  try {
    const updatedData = await req.json();
    const filePath = path.join(process.cwd(), "database", "data.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (updatedData.type === "user" && typeof updatedData.id === "number") {
      const userIndex = data.users.findIndex(
        (user: any) => user.id === updatedData.id
      );
      if (userIndex !== -1) {
        data.users[userIndex] = { ...data.users[userIndex], ...updatedData };
      }
    } else if (
      updatedData.type === "course" &&
      typeof updatedData.id === "number"
    ) {
      const courseIndex = data.courses.findIndex(
        (course: any) => course.id === updatedData.id
      );
      if (courseIndex !== -1) {
        data.courses[courseIndex] = {
          ...data.courses[courseIndex],
          ...updatedData,
        };
      }
    } else if (
      updatedData.type === "examSubject" &&
      typeof updatedData.id === "number"
    ) {
      const examSubjectIndex = data.examSubjects.findIndex(
        (course: any) => course.id === updatedData.id
      );
      if (examSubjectIndex !== -1) {
        data.examSubjects[examSubjectIndex] = {
          ...data.examSubjects[examSubjectIndex],
          ...updatedData,
        };
      }
    } else if (
      updatedData.type === "exam" &&
      typeof updatedData.id === "number"
    ) {
      const examIndex = data.exam.findIndex(
        (course: any) => course.id === updatedData.id
      );
      if (examIndex !== -1) {
        data.exam[examIndex] = {
          ...data.exam[examIndex],
          ...updatedData,
        };
      }
    } else if (
      updatedData.type === "question" &&
      typeof updatedData.id === "number"
    ) {
      const questionIndex = data.questions.findIndex(
        (question: any) => question.id === updatedData.id
      );
      if (questionIndex !== -1) {
        data.questions[questionIndex] = {
          ...data.questions[questionIndex],
          ...updatedData,
        };
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update data" });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userRequest = await req.json();
    const { id, type } = userRequest;
    const filePath = path.join(process.cwd(), "database", "data.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (type === "course") {
      const findIndex = data.courses.findIndex(
        (course: any) => course.id === id
      );
      if (findIndex !== -1) {
        data.courses.splice(findIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        return NextResponse.json(data.courses);
      }
    } else if (type === "exam") {
      const findIndex = data.exam.findIndex((course: any) => course.id === id);
      if (findIndex !== -1) {
        data.exam.splice(findIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        return NextResponse.json(data.exam);
      }
    } else if (type === "examSubject") {
      const findIndex = data.examSubjects.findIndex(
        (course: any) => course.id === id
      );
      if (findIndex !== -1) {
        data.examSubjects.splice(findIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        return NextResponse.json(data.examSubjects);
      }
    } else if (type === "question") {
      const findIndex = data.questions.findIndex(
        (course: any) => course.id === id
      );
      if (findIndex !== -1) {
        data.questions.splice(findIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        return NextResponse.json(data.questions);
      }
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
