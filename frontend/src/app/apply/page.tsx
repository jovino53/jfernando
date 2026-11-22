'use client';

import { useState } from 'react';
import { CheckCircle, Upload, ArrowRight, Briefcase, MapPin, DollarSign, Clock, Building2, Star, ChevronRight, FileText, User, Mail, Phone, Linkedin, Globe, GraduationCap, Calendar } from 'lucide-react';

const openPositions = [
  { id: '1', title: 'Desenvolvedor Full Stack', dept: 'Tecnologia', location: 'São Paulo - SP', type: 'CLT', salary: 'R$ 10.000 - R$ 15.000', description: 'Buscamos dev sênior com experiência em React, Node.js e PostgreSQL.' },
  { id: '2', title: 'Gerente de Projetos', dept: 'TI', location: 'Remoto', type: 'CLT', salary: 'R$ 14.000 - R$ 20.000', description: 'Líder experiente para gerenciar projetos ágeis de grande porte.' },
  { id: '3', title: 'Analista de Marketing Digital', dept: 'Marketing', location: 'São Paulo - SP', type: 'CLT', salary: 'R$ 6.000 - R$ 9.000', description: 'Profissional com experiência em SEO, Google Ads e redes sociais.' },
  { id: '4', title: 'Designer UX/UI', dept: 'Marketing', location: 'Híbrido', type: 'CLT', salary: 'R$ 7.000 - R$ 11.000', description: 'Designer criativo com foco em experiência do usuário.' },
  { id: '5', title: 'Engenheiro DevOps', dept: 'Tecnologia', location: 'Remoto', type: 'CLT', salary: 'R$ 13.000 - R$ 18.000', description: 'Especialista em AWS, Docker, Kubernetes e CI/CD.' },
  { id: '6', title: 'Analista de Dados Senior', dept: 'Tecnologia', location: 'São Paulo - SP', type: 'CLT', salary: 'R$ 11.000 - R$ 16.000', description: 'Profissional de dados com Python, SQL e Power BI.' },
];

const steps = ['Selecionar Vaga', 'Dados Pessoais', 'Experiência', 'Revisão'];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', cpf: '', linkedin: '', portfolio: '',
    city: '', state: 'SP',
    experienceYears: 0, educationLevel: 'Superior Completo', expectedSalary: '',
    availability: 'Imediata',
    skills: '', coverLetter: '',
  });

  const selectedPos = openPositions.find(p => p.id === selectedPosition);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Candidatura Enviada!</h1>
          <p className="text-gray-500 mb-6">Sua candidatura para <strong>{selectedPos?.title}</strong> foi recebida com sucesso. Nossa equipe analisará seu perfil e entraremos em contato em breve.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-gray-500 mb-1">Próximos passos:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-700"><span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">1</span> Análise de currículo</li>
              <li className="flex items-center gap-2 text-sm text-gray-700"><span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">2</span> Triagem por RH</li>
              <li className="flex items-center gap-2 text-sm text-gray-700"><span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">3</span> Entrevista</li>
              <li className="flex items-center gap-2 text-sm text-gray-700"><span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">4</span> Proposta</li>
            </ul>
          </div>
          <button onClick={() => { setSubmitted(false); setStep(0); setSelectedPosition(null); setForm({ name: '', email: '', phone: '', cpf: '', linkedin: '', portfolio: '', city: '', state: 'SP', experienceYears: 0, educationLevel: 'Superior Completo', expectedSalary: '', availability: 'Imediata', skills: '', coverLetter: '' }); }}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition">
            Nova Candidatura
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800">
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Nexus RH AI</h1>
            <p className="text-sm text-white/70">Portal de Carreiras</p>
          </div>
          <span className="text-sm text-white/80">Processo seletivo aberto</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${i === step ? 'bg-white text-primary-700 shadow-lg' : i < step ? 'bg-green-500 text-white' : 'bg-white/20 text-white/60'}`}>
                {i < step ? <CheckCircle size={16} /> : <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-xs">{i + 1}</span>}
                <span className="hidden md:inline">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 mx-1 ${i < step ? 'bg-green-500' : 'bg-white/20'}`}></div>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Selecione a vaga de interesse</h2>
              <p className="text-sm text-gray-500 mb-6">Escolha a posição que melhor se encaixa no seu perfil</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {openPositions.map((pos) => (
                  <button key={pos.id} onClick={() => setSelectedPosition(pos.id)}
                    className={`text-left p-5 rounded-2xl border-2 transition ${selectedPosition === pos.id ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center"><Building2 size={20} /></div>
                      {selectedPosition === pos.id && <CheckCircle size={20} className="text-primary-600" />}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{pos.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">{pos.dept} • {pos.type}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {pos.location}</span>
                      <span className="flex items-center gap-1"><DollarSign size={12} /> {pos.salary}</span>
                    </div>
                    <p className="text-xs text-gray-400">{pos.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Dados Pessoais</h2>
              <p className="text-sm text-gray-500 mb-6">Preencha suas informações de contato</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1"><label className="text-sm font-medium text-gray-700 mb-1 block">Nome Completo *</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Seu nome completo" /></div></div>
                <div className="col-span-2 md:col-span-1"><label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="seu@email.com" /></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Telefone *</label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="(11) 99999-9999" /></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">CPF</label><input type="text" value={form.cpf} onChange={e => setForm({...form, cpf: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="000.000.000-00" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">LinkedIn</label><div className="relative"><Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="linkedin.com/in/..." /></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Portfólio</label><div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" value={form.portfolio} onChange={e => setForm({...form, portfolio: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="seusite.com" /></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Cidade</label><input type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Estado</label><select value={form.state} onChange={e => setForm({...form, state: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(s => <option key={s} value={s}>{s}</option>)}
                </select></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Experiência Profissional</h2>
              <p className="text-sm text-gray-500 mb-6">Conte-nos sobre sua formação e experiência</p>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Anos de Experiência</label><div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="number" value={form.experienceYears} onChange={e => setForm({...form, experienceYears: Number(e.target.value)})} className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" min={0} /></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Escolaridade</label><div className="relative"><GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><select value={form.educationLevel} onChange={e => setForm({...form, educationLevel: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {['Ensino Médio', 'Superior Incompleto', 'Superior Completo', 'Pós-graduação', 'MBA', 'Mestrado', 'Doutorado'].map(l => <option key={l} value={l}>{l}</option>)}
                </select></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Pretensão Salarial (R$)</label><div className="relative"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" value={form.expectedSalary} onChange={e => setForm({...form, expectedSalary: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: 10000" /></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Disponibilidade</label><div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><select value={form.availability} onChange={e => setForm({...form, availability: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {['Imediata', '15 dias', '30 dias', '60 dias', '90 dias'].map(a => <option key={a} value={a}>{a}</option>)}
                </select></div></div>
                <div className="col-span-2"><label className="text-sm font-medium text-gray-700 mb-1 block">Habilidades (separadas por vírgula)</label><input type="text" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="React, Node.js, SQL, Python..." /></div>
                <div className="col-span-2"><label className="text-sm font-medium text-gray-700 mb-1 block">Carta de Apresentação</label><textarea rows={4} value={form.coverLetter} onChange={e => setForm({...form, coverLetter: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" placeholder="Conte por que é o candidato ideal para esta vaga..." /></div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Revisão da Candidatura</h2>
              <p className="text-sm text-gray-500 mb-6">Confirme seus dados antes de enviar</p>
              <div className="space-y-4">
                <div className="bg-primary-50 rounded-2xl p-5 border border-primary-100">
                  <p className="text-xs text-primary-600 font-medium mb-1">Vaga Selecionada</p>
                  <p className="text-lg font-bold text-primary-800">{selectedPos?.title}</p>
                  <p className="text-sm text-primary-600">{selectedPos?.dept} • {selectedPos?.location} • {selectedPos?.salary}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Nome</p><p className="text-sm font-medium text-gray-800">{form.name || '—'}</p></div>
                  <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Email</p><p className="text-sm font-medium text-gray-800">{form.email || '—'}</p></div>
                  <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Telefone</p><p className="text-sm font-medium text-gray-800">{form.phone || '—'}</p></div>
                  <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Localização</p><p className="text-sm font-medium text-gray-800">{form.city}, {form.state}</p></div>
                  <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Experiência</p><p className="text-sm font-medium text-gray-800">{form.experienceYears} anos</p></div>
                  <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Escolaridade</p><p className="text-sm font-medium text-gray-800">{form.educationLevel}</p></div>
                </div>
                {form.skills && (
                  <div><p className="text-xs text-gray-500 mb-2">Habilidades</p><div className="flex flex-wrap gap-2">{form.skills.split(',').map((s, i) => <span key={i} className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{s.trim()}</span>)}</div></div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm font-medium">Voltar</button>
            ) : <div />}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} disabled={step === 0 && !selectedPosition}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-2">
                Próximo <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit}
                className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm font-medium flex items-center gap-2">
                <CheckCircle size={16} /> Enviar Candidatura
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}