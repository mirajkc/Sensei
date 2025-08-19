import React, { useEffect, useState } from 'react'
import useAppContext from '../../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddNewLesson = ({courseId}) => {
  const {theme} = useAppContext()
  const [loading,setLoading] = useState(false)
  const [lessons , setLessons] = useState([])

  const getAllLesson = async() => {
    try {
      setLoading(true)
      const {data} = await axios.get(`/api/course/getalllesson/manage/${courseId}`)
      if(!data.succes){
        toast.error(data.message)
      }
      setLessons(data.lessons)

    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ getAllLesson }, [courseId])
  return (
    <div className='h-screen w-auto py-4' >
      <div>
        <h1 className=' text-2xl font-bold' >Edit and create new lessons</h1>
      </div>
      <div className='display flex bg-white-200 rounded-sm shadow h-auto w-auto' >
        <p>Here in this section we will map all the courses</p>
        <div>
          {
            lessons.length === 0 ? (
              <div>
                <p>No lesson found</p>
              </div>
            ) : (
              <div>
                lesson exist here
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default AddNewLesson
