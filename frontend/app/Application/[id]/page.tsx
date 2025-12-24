'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Application() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [resume, setResume] = useState<File | null>(null);
    const [coverLetter, setCoverLetter] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

    const handleFileChange = (
        file: File | null,
        setter: React.Dispatch<React.SetStateAction<File | null>>
        ) => {

        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            alert('File size must be less than 20 MB');
            return;
        }

        setter(file);
    };


  const submitfun = async () => {
    if (!id || !name || !email || !phone || !resume) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('jobId', id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('resume', resume);

      if (coverLetter) {
        formData.append('coverLetter', coverLetter);
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/application/:${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data?.success) {
        alert('Application submitted successfully');
        router.push('/');
      }
    } 
    catch (err) {
      console.error('Application failed', err);
      alert('Failed to submit application');
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 text-black">
      <div className="h-full flex flex-col justify-center">
        <div className="flex justify-center">
          <div className="flex flex-col border border-zinc-600 rounded-lg px-10 py-10">
            <div className="text-center text-2xl font-bold font-serif mb-4">
              Application Form
            </div>

            <label className="my-2">Full Name <span className='text-red-700'>*</span></label>
            <input
                required
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder='John O Corner'
                className="mb-8 border border-black rounded-md py-2 px-2 w-[300px]"
            />

            <label className="my-2">Email <span className='text-red-700'>*</span></label>
            <input
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder='abc@gmail.com'
                className="mb-8 border border-black rounded-md py-2 px-2 w-[300px]"
            />

            <label className="my-2">Phone <span className='text-red-700'>*</span></label>
            <input
                required
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                placeholder='1234567890'
                className="mb-8 border border-black rounded-md py-2 px-2 w-[300px]"
            />

            <p className='italic text-sm text-zinc-500 mb-4'>The below document size should less than 20 MB</p>

            <label>Resume <span className='text-red-700'>*</span></label>
            <input
                required
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null, setResume)}
                className="mb-8"
            />

            <label>Cover Letter</label>
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null, setCoverLetter)}
            />

            <div className="mt-8 flex justify-center">
              <button
                onClick={submitfun}
                disabled={loading}
                className="border px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-800 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
