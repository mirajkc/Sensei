import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAppContext from '../../context/AppContext.jsx';

const EnrolledCourses = () => {
  const { theme } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const getEnrolledCourseDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/getenrolledcourses');
      if (!data.success) {
        toast.error(data.message);
      } else {
        setCourses(data.enrolledCourses);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrolledCourseDetails();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
    </div>
  );
};

export default EnrolledCourses;
