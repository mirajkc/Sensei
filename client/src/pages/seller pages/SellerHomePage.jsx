import React from 'react'
import SellerNavbar from '../../components/seller components/SellerNavbar'

const SellerHomePage = () => {
  return (
    <div>
      <SellerNavbar />
     1. Dashboard Stats

This section usually gives a quick overview of key metrics. Examples:

Total Courses – Number of courses created by the instructor/admin.

Enrolled Students – Total number of students enrolled across all courses.

Active Courses – Courses currently active or ongoing.

Revenue (optional) – Earnings from courses (if paid).

Recent Activity – Latest enrollments, submissions, or course updates.

UI idea: Cards with icons and numbers at the top of the dashboard.

2. Add Course

This section allows instructors/admins to create a new course.
Fields can include:

Course Name

Description

Category/Subject

Start and End Date

Price (if paid)

Course Image or Video thumbnail

Upload Course Content (lectures, PDF, videos, quizzes)

UI idea: A form with input fields and a “Create Course” button. Could also include drag-and-drop file uploads.

3. My Courses

Here, instructors/admins can see and manage all courses they created.

Edit course details

Delete course

View student progress for each course

Duplicate course (optional)

UI idea: Cards or a table showing course name, category, number of enrolled students, and action buttons (Edit/Delete/View).

4. Enrolled Students

This section shows all students enrolled in courses.

Filter by course or date

View student profile

Check progress/completion status

Contact student (optional)
    </div>
  )
}

export default SellerHomePage
