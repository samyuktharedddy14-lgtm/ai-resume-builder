import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { FileText, Sparkles, Layout, Download, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Smart Data Collection',
      description: 'Enter your details through an intuitive form — education, experience, skills, projects, and more.',
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: '5 Professional Templates',
      description: 'Choose from Modern, Classic, Minimal, Bold, and Elegant templates designed by professionals.',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Live Preview',
      description: 'See your resume update in real-time as you type. No more guesswork about the final result.',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Print & Save',
      description: 'Print your resume directly or save it to your account. Come back and edit anytime.',
    },
  ];

  const steps = [
    { step: '1', text: 'Create your free account' },
    { step: '2', text: 'Fill in your resume details' },
    { step: '3', text: 'Pick a professional template' },
    { step: '4', text: 'Edit and download your resume' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="section-container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ResumeAI</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-primary text-sm">
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-secondary text-sm">
                  Sign In
                </button>
                <button onClick={() => navigate('/signup')} className="btn-primary text-sm">
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Build your resume in minutes
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 animate-slide-up">
              Create a Resume<br />
              <span className="text-primary-600">That Stands Out</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              Choose from professionally designed templates, enter your details, and download a polished resume — all in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <button
                onClick={() => navigate('/signup')}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Building for Free <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary text-lg px-8 py-4"
              >
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need</h2>
            <p className="mt-4 text-lg text-gray-600">From data entry to download, we've got you covered.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="card p-8 text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Four simple steps to your perfect resume.</p>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-6 card p-6 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  <span className="text-lg text-gray-800 font-medium">{step.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-500" />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Build Your Resume?</h2>
          <p className="mt-4 text-lg text-primary-100 max-w-xl mx-auto">
            Join thousands of job seekers who've created professional resumes with ResumeAI.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            Create Your Resume <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-gray-400">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">ResumeAI</span>
          </div>
          <p className="text-sm">&copy; 2026 ResumeAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
