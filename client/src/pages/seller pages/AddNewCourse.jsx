import React, { useState } from "react";
import SellerNavbar from "../../components/seller components/SellerNavbar";
import SellerSidebar from "../../components/seller components/SellerSidebar";
import useAppContext from "../../context/AppContext";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const AddNewCourse = () => {
  const { theme } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [trailer, setTrailer] = useState(""); //* free preview video
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnail) {
      setMessage("Please upload a thumbnail");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("trailer", trailer);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discountedPrice", discountedPrice);
    formData.append("image", thumbnail);

    setLoading(true);
    setMessage("");

    try {
  setLoading(true);
  const res = await axios.post('/api/course/addcourse', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  const data = res.data;

  if (data.success) {
    setMessage(`Course created successfully! ID: ${data.courseId}`);
    setTitle("");
    setCategory("");
    setTrailer("");
    setDescription("");
    setPrice("");
    setDiscountedPrice("");
    setThumbnail(null);

    navigate(`/seller/editcourse/${data.courseId}`);
  } else {
    setMessage(data.message);
  }
} catch (err) {
  setMessage("Server error: " + err.message);
} finally {
  setLoading(false);
}
  };

  return (
    <div className="flex flex-col h-screen">
      <SellerNavbar />
      <div className="flex flex-1">
        <SellerSidebar />
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h1 className="text-3xl font-semibold mb-4 text-center">Add a New Course</h1>

          <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
            <div>
              <label>Course Title</label>
              <input
                type="text"
                placeholder="Eg: Web Development 101"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">-- Select Category --</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Data Science">Data Science</option>
                <option value="Front End Development">Front End Development</option>
                <option value="Back End Development">Back End Development</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label>Thumbnail</label>
              <input
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="w-full"
                required
              />
            </div>

            <div>
              <label>Trailer Video (YouTube link)</label>
              <input
                type="text"
                placeholder="https://www.youtube.com/..."
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
                rows={4}
                required
              ></textarea>
            </div>

            <div>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="$10"
                required
              />
            </div>

            <div>
              <label>Discounted Price</label>
              <input
                type="number"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="$09"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add Course"}
            </button>

            {message && <p className="mt-2 text-center">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewCourse;
