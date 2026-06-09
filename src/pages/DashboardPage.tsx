import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { ResumeData } from '../lib/types';
import { FileText, Plus, LogOut, Clock, Layout, ArrowRight, Trash2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchResumes();
  }, [user]);

  const fetchResumes = async () => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setResumes(data as ResumeData[]);
    }
    setLoading(false);
  };

  const handleNewResume = () => {
    navigate('/resume/edit');
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('resumes').delete().eq('id', id);
    if (!error) {
      setResumes((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="section-container flex items-center justify-between h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ResumeAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
            <button onClick={handleSignOut} className="btn-secondary text-sm py-2 px-4">
              <LogOut className="w-4 h-4 mr-1.5" /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Resumes</h1>
            <p className="mt-1 text-gray-600">Create, edit, and manage your professional resumes</p>
          </div>
          <button onClick={handleNewResume} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" /> New Resume
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="card p-16 text-center animate-fade-in">
            <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Layout className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No resumes yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Create your first resume by entering your details and choosing a professional template.
            </p>
            <button onClick={handleNewResume} className="btn-primary text-lg">
              Create Your First Resume <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="card p-6 cursor-pointer group hover:-translate-y-1 transition-all duration-300"
                onClick={() => navigate(`/resume/edit/${resume.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(resume.id!);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{resume.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{resume.full_name || 'No name set'}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium capitalize">
                    {resume.template_id} template
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(resume.updated_at || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
