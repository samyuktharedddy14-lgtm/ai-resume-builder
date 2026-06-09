import { ResumeData, TemplateId } from '../lib/types';
import { Printer } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const templateId = data.template_id as TemplateId;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex justify-end mb-4 no-print">
        <button onClick={handlePrint} className="btn-secondary text-sm py-2">
          <Printer className="w-4 h-4 mr-1.5" /> Print Resume
        </button>
      </div>
      <div className="resume-print">
        {templateId === 'modern' && <ModernTemplate data={data} />}
        {templateId === 'classic' && <ClassicTemplate data={data} />}
        {templateId === 'minimal' && <MinimalTemplate data={data} />}
        {templateId === 'bold' && <BoldTemplate data={data} />}
        {templateId === 'elegant' && <ElegantTemplate data={data} />}
      </div>
    </div>
  );
}

function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${className}`}>{children}</h3>;
}

/* ========== MODERN TEMPLATE ========== */
function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-[850px] mx-auto" style={{ minHeight: '1100px' }}>
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <div className="w-full md:w-72 bg-slate-800 text-white p-8 flex-shrink-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold leading-tight">{data.full_name || 'Your Name'}</h1>
            <div className="w-10 h-1 bg-blue-500 rounded mt-3" />
          </div>

          <div className="space-y-5 text-sm">
            {data.email && (
              <div>
                <p className="text-slate-400 uppercase text-xs font-semibold tracking-wider mb-1">Email</p>
                <p className="break-all">{data.email}</p>
              </div>
            )}
            {data.phone && (
              <div>
                <p className="text-slate-400 uppercase text-xs font-semibold tracking-wider mb-1">Phone</p>
                <p>{data.phone}</p>
              </div>
            )}
            {data.location && (
              <div>
                <p className="text-slate-400 uppercase text-xs font-semibold tracking-wider mb-1">Location</p>
                <p>{data.location}</p>
              </div>
            )}
            {data.linkedin && (
              <div>
                <p className="text-slate-400 uppercase text-xs font-semibold tracking-wider mb-1">LinkedIn</p>
                <p className="break-all">{data.linkedin}</p>
              </div>
            )}
            {data.website && (
              <div>
                <p className="text-slate-400 uppercase text-xs font-semibold tracking-wider mb-1">Website</p>
                <p className="break-all">{data.website}</p>
              </div>
            )}
          </div>

          {data.skills.length > 0 && (
            <div className="mt-8">
              <p className="text-slate-400 uppercase text-xs font-semibold tracking-wider mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.certifications.length > 0 && (
            <div className="mt-8">
              <p className="text-slate-400 uppercase text-xs font-semibold tracking-wider mb-3">Certifications</p>
              <ul className="space-y-1.5 text-sm">
                {data.certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {data.summary && (
            <div className="mb-6">
              <SectionTitle className="text-slate-800 border-b border-slate-200 pb-1">Professional Summary</SectionTitle>
              <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && data.experience[0].company && (
            <div className="mb-6">
              <SectionTitle className="text-slate-800 border-b border-slate-200 pb-1">Experience</SectionTitle>
              <div className="space-y-4">
                {data.experience.filter((e) => e.company).map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{exp.position}</p>
                        <p className="text-sm text-blue-600">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {exp.start_date} — {exp.end_date}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && data.education[0].institution && (
            <div className="mb-6">
              <SectionTitle className="text-slate-800 border-b border-slate-200 pb-1">Education</SectionTitle>
              <div className="space-y-3">
                {data.education.filter((e) => e.institution).map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{edu.degree} in {edu.field}</p>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500 whitespace-nowrap ml-4">
                        <p>{edu.start_date} — {edu.end_date}</p>
                        {edu.cgpa && <p className="text-blue-600 font-medium">CGPA: {edu.cgpa}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.projects.length > 0 && data.projects[0].name && (
            <div>
              <SectionTitle className="text-slate-800 border-b border-slate-200 pb-1">Projects</SectionTitle>
              <div className="space-y-3">
                {data.projects.filter((p) => p.name).map((proj, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-900">{proj.name}</p>
                    {proj.description && <p className="text-sm text-gray-600 mt-0.5">{proj.description}</p>}
                    {proj.technologies && (
                      <p className="text-xs text-blue-600 mt-1">{proj.technologies}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========== CLASSIC TEMPLATE ========== */
function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white shadow-xl rounded-lg p-10 max-w-[850px] mx-auto" style={{ minHeight: '1100px' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide uppercase">{data.full_name || 'Your Name'}</h1>
        <div className="flex items-center justify-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span className="text-gray-300">|</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.location && <span className="text-gray-300">|</span>}
          {data.location && <span>{data.location}</span>}
        </div>
        {(data.linkedin || data.website) && (
          <div className="flex items-center justify-center gap-3 mt-1 text-sm text-gray-600">
            {data.linkedin && <span>{data.linkedin}</span>}
            {data.linkedin && data.website && <span className="text-gray-300">|</span>}
            {data.website && <span>{data.website}</span>}
          </div>
        )}
      </div>

      {data.summary && (
        <div className="mb-5">
          <SectionTitle className="text-gray-900 border-b border-gray-300 pb-1">Professional Summary</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && data.experience[0].company && (
        <div className="mb-5">
          <SectionTitle className="text-gray-900 border-b border-gray-300 pb-1">Experience</SectionTitle>
          <div className="space-y-4">
            {data.experience.filter((e) => e.company).map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-gray-900">{exp.position} — <span className="font-normal italic">{exp.company}</span></p>
                  <span className="text-xs text-gray-500">{exp.start_date} – {exp.end_date}</span>
                </div>
                {exp.description && <p className="text-sm text-gray-700 mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && data.education[0].institution && (
        <div className="mb-5">
          <SectionTitle className="text-gray-900 border-b border-gray-300 pb-1">Education</SectionTitle>
          <div className="space-y-3">
            {data.education.filter((e) => e.institution).map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <p className="font-bold text-gray-900">{edu.degree} in {edu.field}</p>
                  <p className="text-sm italic text-gray-600">{edu.institution}</p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>{edu.start_date} – {edu.end_date}</p>
                  {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-5">
          <SectionTitle className="text-gray-900 border-b border-gray-300 pb-1">Skills</SectionTitle>
          <p className="text-sm text-gray-700">{data.skills.join('  •  ')}</p>
        </div>
      )}

      {data.projects.length > 0 && data.projects[0].name && (
        <div className="mb-5">
          <SectionTitle className="text-gray-900 border-b border-gray-300 pb-1">Projects</SectionTitle>
          <div className="space-y-3">
            {data.projects.filter((p) => p.name).map((proj, i) => (
              <div key={i}>
                <p className="font-bold text-gray-900">{proj.name}</p>
                {proj.description && <p className="text-sm text-gray-700 mt-0.5">{proj.description}</p>}
                {proj.technologies && <p className="text-xs text-gray-500 mt-0.5">Tech: {proj.technologies}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.certifications.length > 0 && (
        <div>
          <SectionTitle className="text-gray-900 border-b border-gray-300 pb-1">Certifications</SectionTitle>
          <p className="text-sm text-gray-700">{data.certifications.join('  •  ')}</p>
        </div>
      )}
    </div>
  );
}

/* ========== MINIMAL TEMPLATE ========== */
function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white shadow-xl rounded-lg p-10 max-w-[850px] mx-auto" style={{ minHeight: '1100px' }}>
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900">{data.full_name || 'Your Name'}</h1>
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span>·</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.location && <span>·</span>}
          {data.location && <span>{data.location}</span>}
          {data.location && data.linkedin && <span>·</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.linkedin && data.website && <span>·</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-7">
          <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && data.experience[0].company && (
        <div className="mb-7">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Experience</h3>
          <div className="space-y-5">
            {data.experience.filter((e) => e.company).map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium text-gray-900">{exp.position} at {exp.company}</p>
                  <span className="text-xs text-gray-400">{exp.start_date} — {exp.end_date}</span>
                </div>
                {exp.description && <p className="text-sm text-gray-500 mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && data.education[0].institution && (
        <div className="mb-7">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Education</h3>
          <div className="space-y-3">
            {data.education.filter((e) => e.institution).map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <p className="text-sm text-gray-900">{edu.degree} in {edu.field} — {edu.institution}{edu.cgpa ? ` (CGPA: ${edu.cgpa})` : ''}</p>
                <span className="text-xs text-gray-400">{edu.start_date} — {edu.end_date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-7">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Skills</h3>
          <p className="text-sm text-gray-700">{data.skills.join(' / ')}</p>
        </div>
      )}

      {data.projects.length > 0 && data.projects[0].name && (
        <div className="mb-7">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Projects</h3>
          <div className="space-y-3">
            {data.projects.filter((p) => p.name).map((proj, i) => (
              <div key={i}>
                <p className="text-sm font-medium text-gray-900">{proj.name}</p>
                {proj.description && <p className="text-sm text-gray-500 mt-0.5">{proj.description}</p>}
                {proj.technologies && <p className="text-xs text-gray-400 mt-0.5">{proj.technologies}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.certifications.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Certifications</h3>
          <p className="text-sm text-gray-700">{data.certifications.join(' / ')}</p>
        </div>
      )}
    </div>
  );
}

/* ========== BOLD TEMPLATE ========== */
function BoldTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-[850px] mx-auto" style={{ minHeight: '1100px' }}>
      {/* Header */}
      <div className="bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-extrabold tracking-tight">{data.full_name || 'Your Name'}</h1>
        <div className="flex items-center gap-3 mt-3 text-sm text-gray-300 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span className="text-amber-500">|</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.location && <span className="text-amber-500">|</span>}
          {data.location && <span>{data.location}</span>}
        </div>
        {(data.linkedin || data.website) && (
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-300">
            {data.linkedin && <span>{data.linkedin}</span>}
            {data.linkedin && data.website && <span className="text-amber-500">|</span>}
            {data.website && <span>{data.website}</span>}
          </div>
        )}
      </div>

      <div className="p-8">
        {data.summary && (
          <div className="mb-6">
            <SectionTitle className="text-gray-900 border-b-2 border-amber-500 pb-1">Summary</SectionTitle>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && data.experience[0].company && (
          <div className="mb-6">
            <SectionTitle className="text-gray-900 border-b-2 border-amber-500 pb-1">Experience</SectionTitle>
            <div className="space-y-4">
              {data.experience.filter((e) => e.company).map((exp, i) => (
                <div key={i} className="border-l-4 border-amber-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-extrabold text-gray-900 text-lg">{exp.position}</p>
                      <p className="text-sm text-amber-600 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {exp.start_date} — {exp.end_date}
                    </span>
                  </div>
                  {exp.description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && data.education[0].institution && (
          <div className="mb-6">
            <SectionTitle className="text-gray-900 border-b-2 border-amber-500 pb-1">Education</SectionTitle>
            <div className="space-y-3">
              {data.education.filter((e) => e.institution).map((edu, i) => (
                <div key={i} className="border-l-4 border-amber-500 pl-4">
                  <p className="font-extrabold text-gray-900">{edu.degree} in {edu.field}</p>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>{edu.start_date} — {edu.end_date}</span>
                    {edu.cgpa && <span className="font-semibold text-amber-600">CGPA: {edu.cgpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="mb-6">
            <SectionTitle className="text-gray-900 border-b-2 border-amber-500 pb-1">Skills</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-gray-900 text-white text-sm font-semibold rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.projects.length > 0 && data.projects[0].name && (
          <div className="mb-6">
            <SectionTitle className="text-gray-900 border-b-2 border-amber-500 pb-1">Projects</SectionTitle>
            <div className="space-y-3">
              {data.projects.filter((p) => p.name).map((proj, i) => (
                <div key={i} className="border-l-4 border-amber-500 pl-4">
                  <p className="font-extrabold text-gray-900">{proj.name}</p>
                  {proj.description && <p className="text-sm text-gray-600 mt-0.5">{proj.description}</p>}
                  {proj.technologies && <p className="text-xs text-gray-500 mt-1">{proj.technologies}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div>
            <SectionTitle className="text-gray-900 border-b-2 border-amber-500 pb-1">Certifications</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert, i) => (
                <span key={i} className="px-3 py-1.5 bg-amber-50 text-amber-800 text-sm font-semibold rounded border border-amber-200">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========== ELEGANT TEMPLATE ========== */
function ElegantTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white shadow-xl rounded-lg max-w-[850px] mx-auto" style={{ minHeight: '1100px' }}>
      {/* Header */}
      <div className="p-10 pb-6 border-b border-stone-200">
        <h1 className="font-display text-4xl font-semibold text-stone-800 tracking-tight">{data.full_name || 'Your Name'}</h1>
        <div className="flex items-center gap-4 mt-3 text-sm text-stone-500 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span className="text-stone-300">—</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.location && <span className="text-stone-300">—</span>}
          {data.location && <span>{data.location}</span>}
        </div>
        {(data.linkedin || data.website) && (
          <div className="flex items-center gap-4 mt-1 text-sm text-stone-500">
            {data.linkedin && <span>{data.linkedin}</span>}
            {data.linkedin && data.website && <span className="text-stone-300">—</span>}
            {data.website && <span>{data.website}</span>}
          </div>
        )}
      </div>

      <div className="p-10 pt-6">
        {data.summary && (
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold text-stone-800 mb-2">Profile</h3>
            <div className="w-8 h-0.5 bg-stone-400 mb-3" />
            <p className="text-sm text-stone-600 leading-relaxed italic">{data.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && data.experience[0].company && (
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold text-stone-800 mb-2">Experience</h3>
            <div className="w-8 h-0.5 bg-stone-400 mb-4" />
            <div className="space-y-5">
              {data.experience.filter((e) => e.company).map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-stone-800">{exp.position}</p>
                    <span className="text-xs text-stone-400 italic">{exp.start_date} — {exp.end_date}</span>
                  </div>
                  <p className="text-sm text-stone-500 italic mb-1">{exp.company}</p>
                  {exp.description && <p className="text-sm text-stone-600 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && data.education[0].institution && (
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold text-stone-800 mb-2">Education</h3>
            <div className="w-8 h-0.5 bg-stone-400 mb-4" />
            <div className="space-y-3">
              {data.education.filter((e) => e.institution).map((edu, i) => (
                <div key={i} className="flex justify-between items-baseline">
                  <div>
                    <p className="font-semibold text-stone-800">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-stone-500 italic">{edu.institution}</p>
                  </div>
                  <div className="text-right text-xs text-stone-400">
                    <p className="italic">{edu.start_date} — {edu.end_date}</p>
                    {edu.cgpa && <p className="font-medium text-stone-600">CGPA: {edu.cgpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold text-stone-800 mb-2">Skills</h3>
            <div className="w-8 h-0.5 bg-stone-400 mb-3" />
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {data.skills.map((skill, i) => (
                <span key={i} className="text-sm text-stone-700">{skill}{i < data.skills.length - 1 ? ',' : ''}</span>
              ))}
            </div>
          </div>
        )}

        {data.projects.length > 0 && data.projects[0].name && (
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold text-stone-800 mb-2">Projects</h3>
            <div className="w-8 h-0.5 bg-stone-400 mb-4" />
            <div className="space-y-3">
              {data.projects.filter((p) => p.name).map((proj, i) => (
                <div key={i}>
                  <p className="font-semibold text-stone-800">{proj.name}</p>
                  {proj.description && <p className="text-sm text-stone-600 mt-0.5 italic">{proj.description}</p>}
                  {proj.technologies && <p className="text-xs text-stone-400 mt-0.5">{proj.technologies}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div>
            <h3 className="font-display text-lg font-semibold text-stone-800 mb-2">Certifications</h3>
            <div className="w-8 h-0.5 bg-stone-400 mb-3" />
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {data.certifications.map((cert, i) => (
                <span key={i} className="text-sm text-stone-700">{cert}{i < data.certifications.length - 1 ? ',' : ''}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
