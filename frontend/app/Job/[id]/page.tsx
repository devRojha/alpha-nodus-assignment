'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Admin = {
  email: string;
};


type Job = {
    id: string;
    title: string;
    description: string;
    location: string;
    salary: number | null;
    createdAt: string;
    adminEmail: string;
    admin: Admin;
    _count: {
        applications: number
    }
};

export default function Job() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    console.log(id)
    const fetchJob = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/job/:${id}`
        );

        if (res.data?.success) {
          setJob(res.data.response);
        }
      } catch (err) {
        console.error('Failed to fetch job', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!job) {
    return <p className="text-center">Job not found</p>;
  }

  return (
    <div className="mx-6 shadow-md rounded-md p-6 h-screen overflow-auto space-y-4">
      {/* Title */}
      <div className="flex font-bold text-xl mb-6">
        {job.title}
      </div>

      <div className="text-zinc-700">
        <h1 className='font-bold text-xl'>Description</h1>
        <p className='text-zinc-600 mb-4'>
          {job.description}
        </p>

        <p>
          <strong>Location:</strong> {job.location}
        </p>

        <p>
          <strong>Salary:</strong>{' '}
          {job.salary ? `₹${job.salary}` : 'Not disclosed'}
        </p>

        <p className='mb-4'>
          <strong>Posted on:</strong> {job.createdAt.split('T')[0]}
        </p>

        <hr />

        {/* Applications */}
        <div>
          <h2 className="font-semibold my-2">
            Active Applications ({job._count.applications})
          </h2>
        </div>
      </div>
      <button onClick={()=> router.push(`/Application/${id}`)} className='border px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-800 active:text-blue-700'>Apply</button>
    </div>
  );
}
