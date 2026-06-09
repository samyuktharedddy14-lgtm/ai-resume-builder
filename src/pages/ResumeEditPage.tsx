import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { ResumeData, EMPTY_RESUME, EducationEntry, ExperienceEntry, ProjectEntry, TemplateId } from '../lib/types';
import {
  FileText, ChevronRight, ChevronLeft, Save, Eye, Plus, X, Trash2,
  User, Briefcase, GraduationCap, Code, Award, Layout, ArrowRight
} from 'lucide-react';
import TemplateCard from '../components/TemplateCard';
import ResumePreview from '../components/ResumePreview';

const STEPS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Layout },
  { id: 'template', label: 'Template', icon: Award },
];

export default function ResumeEditPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const [resume, setResume] = useState<ResumeData>({ ...EMPTY_RESUME });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!id);
  const [showPreview, setShowPreview] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (id) loadResume(id);
  }, [id, user]);

  const loadResume = async (resumeId: string) => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .maybeSingle();

    if (data && !error) {
      setResume({
        ...data,
        education: data.education || [],
        experience: data.experience || [],
        skills: data.skills || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
      });
    }
    setLoading(false);
  };

  const saveResume = async () => {
    setSaving(true);
    if (id) {
      await supabase.from('resumes').update({
        ...resume,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
    } else {
      const { data } = await supabase.from('resumes').insert({
        ...resume,
      }).select('id').single();

      if (data) {
        navigate(`/resume/edit/${data.id}`, { replace: true });
      }
    }
    setSaving(false);
  };

  const updateField = useCallback((field: keyof ResumeData, value: string) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', field: '', cgpa: '', start_date: '', end_date: '' }],
    }));
  };

  const updateEducation = (index: number, field: keyof EducationEntry, value: string) => {
    setResume((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const removeEducation = (index: number) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', start_date: '', end_date: '', description: '' }],
    }));
  };

  const updateExperience = (index: number, field: keyof ExperienceEntry, value: string) => {
    setResume((prev) => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const removeExperience = (index: number) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', technologies: '', link: '' }],
    }));
  };

  const updateProject = (index: number, field: keyof ProjectEntry, value: string) => {
    setResume((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const removeProject = (index: number) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setResume((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setResume((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const addCertification = () => {
    if (certInput.trim()) {
      setResume((prev) => ({ ...prev, certifications: [...prev.certifications, certInput.trim()] }));
      setCertInput('');
    }
  };

  const removeCertification = (index: number) => {
    setResume((prev) => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  const StepIcon = STEPS[step].icon;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="section-container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ResumeAI</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary text-sm py-2"
            >
              <Eye className="w-4 h-4 mr-1.5" /> {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={saveResume} className="btn-primary text-sm py-2" disabled={saving}>
              <Save className="w-4 h-4 mr-1.5" /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </nav>

      {/* Step Progress */}
      <div className="bg-white border-b border-gray-100">
        <div className="section-container py-4">
          <div className="flex items-center justify-between overflow-x-auto gap-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    i === step
                      ? 'bg-primary-600 text-white shadow-sm'
                      : i < step
                      ? 'bg-primary-50 text-primary-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="flex-1 section-container py-8">
        {showPreview ? (
          <div className="animate-scale-in">
            <div className="max-w-[850px] mx-auto">
              <ResumePreview data={resume} />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Step 0: Personal Info */}
            {step === 0 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <StepIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-gray-600">Your basic contact details</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Resume Title</label>
                    <input
                      type="text"
                      value={resume.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="input-field"
                      placeholder="e.g. Software Engineer Resume"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={resume.full_name}
                      onChange={(e) => updateField('full_name', e.target.value)}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={resume.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={resume.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="input-field"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                    <input
                      type="text"
                      value={resume.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="input-field"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label>
                    <input
                      type="url"
                      value={resume.linkedin}
                      onChange={(e) => updateField('linkedin', e.target.value)}
                      className="input-field"
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Website / Portfolio</label>
                    <input
                      type="url"
                      value={resume.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      className="input-field"
                      placeholder="johndoe.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Professional Summary</label>
                    <textarea
                      value={resume.summary}
                      onChange={(e) => updateField('summary', e.target.value)}
                      className="input-field min-h-[100px] resize-y"
                      placeholder="A brief summary of your professional background and career objectives..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Education */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                      <p className="text-gray-600">Your academic background</p>
                    </div>
                  </div>
                  <button onClick={addEducation} className="btn-secondary text-sm py-2">
                    <Plus className="w-4 h-4 mr-1.5" /> Add
                  </button>
                </div>

                {resume.education.map((edu, i) => (
                  <div key={i} className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Education #{i + 1}</span>
                      {resume.education.length > 1 && (
                        <button onClick={() => removeEducation(i)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(i, 'institution', e.target.value)}
                          className="input-field"
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(i, 'degree', e.target.value)}
                          className="input-field"
                          placeholder="Degree (e.g. B.Tech)"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => updateEducation(i, 'field', e.target.value)}
                          className="input-field"
                          placeholder="Field of Study"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={edu.cgpa}
                          onChange={(e) => updateEducation(i, 'cgpa', e.target.value)}
                          className="input-field"
                          placeholder="CGPA / GPA"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={edu.start_date}
                          onChange={(e) => updateEducation(i, 'start_date', e.target.value)}
                          className="input-field"
                          placeholder="Start (e.g. 2020)"
                        />
                        <input
                          type="text"
                          value={edu.end_date}
                          onChange={(e) => updateEducation(i, 'end_date', e.target.value)}
                          className="input-field"
                          placeholder="End (e.g. 2024)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Experience */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
                      <p className="text-gray-600">Your professional experience</p>
                    </div>
                  </div>
                  <button onClick={addExperience} className="btn-secondary text-sm py-2">
                    <Plus className="w-4 h-4 mr-1.5" /> Add
                  </button>
                </div>

                {resume.experience.map((exp, i) => (
                  <div key={i} className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Experience #{i + 1}</span>
                      {resume.experience.length > 1 && (
                        <button onClick={() => removeExperience(i)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(i, 'company', e.target.value)}
                          className="input-field"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(i, 'position', e.target.value)}
                          className="input-field"
                          placeholder="Job Title"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.start_date}
                          onChange={(e) => updateExperience(i, 'start_date', e.target.value)}
                          className="input-field"
                          placeholder="Start (e.g. Jan 2022)"
                        />
                        <input
                          type="text"
                          value={exp.end_date}
                          onChange={(e) => updateExperience(i, 'end_date', e.target.value)}
                          className="input-field"
                          placeholder="End (e.g. Present)"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(i, 'description', e.target.value)}
                          className="input-field min-h-[80px] resize-y"
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Skills */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Code className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                    <p className="text-gray-600">Your technical and soft skills</p>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="input-field flex-1"
                      placeholder="Type a skill and press Enter (e.g. React, Python)"
                    />
                    <button onClick={addSkill} className="btn-primary px-4">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium"
                      >
                        {skill}
                        <button onClick={() => removeSkill(i)} className="hover:text-primary-900 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    {resume.skills.length === 0 && (
                      <p className="text-sm text-gray-400 py-2">No skills added yet</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
                    <p className="text-gray-600">Your professional certifications</p>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={certInput}
                      onChange={(e) => setCertInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                      className="input-field flex-1"
                      placeholder="Type a certification and press Enter"
                    />
                    <button onClick={addCertification} className="btn-accent px-4">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resume.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-50 text-accent-700 rounded-lg text-sm font-medium"
                      >
                        {cert}
                        <button onClick={() => removeCertification(i)} className="hover:text-accent-900 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    {resume.certifications.length === 0 && (
                      <p className="text-sm text-gray-400 py-2">No certifications added yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Projects */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Layout className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
                      <p className="text-gray-600">Your notable projects</p>
                    </div>
                  </div>
                  <button onClick={addProject} className="btn-secondary text-sm py-2">
                    <Plus className="w-4 h-4 mr-1.5" /> Add
                  </button>
                </div>

                {resume.projects.map((proj, i) => (
                  <div key={i} className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Project #{i + 1}</span>
                      {resume.projects.length > 1 && (
                        <button onClick={() => removeProject(i)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updateProject(i, 'name', e.target.value)}
                          className="input-field"
                          placeholder="Project Name"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <textarea
                          value={proj.description}
                          onChange={(e) => updateProject(i, 'description', e.target.value)}
                          className="input-field min-h-[60px] resize-y"
                          placeholder="Brief description of the project..."
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={proj.technologies}
                          onChange={(e) => updateProject(i, 'technologies', e.target.value)}
                          className="input-field"
                          placeholder="Technologies used (e.g. React, Node.js)"
                        />
                      </div>
                      <div>
                        <input
                          type="url"
                          value={proj.link}
                          onChange={(e) => updateProject(i, 'link', e.target.value)}
                          className="input-field"
                          placeholder="Project link (optional)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 5: Template Selection */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                    <p className="text-gray-600">Select the style that fits your resume</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(['modern', 'classic', 'minimal', 'bold', 'elegant'] as TemplateId[]).map((tid) => (
                    <TemplateCard
                      key={tid}
                      templateId={tid}
                      selected={resume.template_id === tid}
                      onSelect={() => updateField('template_id', tid)}
                    />
                  ))}
                </div>

                <div className="card p-6 mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                  <div className="max-w-[850px] mx-auto">
                    <ResumePreview data={resume} />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                className={step === 0 ? 'invisible' : 'btn-secondary'}
              >
                <ChevronLeft className="w-4 h-4 mr-1.5" /> Previous
              </button>

              {step < STEPS.length - 1 ? (
                <button onClick={() => setStep(step + 1)} className="btn-primary">
                  Next <ChevronRight className="w-4 h-4 ml-1.5" />
                </button>
              ) : (
                <button
                  onClick={async () => {
                    await saveResume();
                    setShowPreview(true);
                  }}
                  className="btn-accent"
                >
                  <Eye className="w-4 h-4 mr-1.5" /> Preview Resume <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
