'use client'; // If using Next.js App Router

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

type JobFormData = {
  title: string;
  description: string;
  location: string;
  salary: string; 
};

export default function JobForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    location: '',
    salary: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare payload: Convert salary to Integer if it exists, otherwise null/undefined
      const payload = {
        ...formData,
        salary: formData.salary ? parseInt(formData.salary) : null, 
      };

      // Replace with your actual backend URL
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/job`, payload, {
          headers: {
                authorization : localStorage.getItem("token")
          }
      });

      alert('Job posted successfully!');
      
      setFormData({ title: '', description: '', location: '', salary: '' });

    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-sm mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a New Job</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Senior Backend Engineer"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description - Required */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the role, responsibilities, and requirements..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location - Required */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. New York, NY or Remote"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Salary - Optional (Int?) */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
            Salary (Annual) <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. 120000"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md transition-colors 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Posting...' : 'Create Job'}
        </button>

      </form>
    </div>
  );
}