import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const LessonDetails = ({courseDetails}) => {
  const [loading , setLoading] = useState(false)
 

  //* get the single lesson data dynamically 
  const {lessonId , courseId} = useParams()
  const lessonDetails = courseDetails?.course?.lessons?.find ( item => item._id.toString() === lessonId.toString() ) ?? "Null no data";
  console.log(courseDetails?.currentlyIn ?? "Not getting currently in data");
  
  

  //* track the progress upon completing next lesson
  const trackUserProgress = async() => {
    try {
      const {data} = await axios.get(`/api/user/trackuserprogress/${courseId}/${lessonId}`)
      if(!data?.success){
      toast.error(data?.message)
    }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{trackUserProgress()} , [courseDetails , lessonId , courseId])

  
  return (
    <div>
      {lessonDetails.title}
    </div>
  )
}

export default LessonDetails
