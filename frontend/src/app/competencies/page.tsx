'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Skill {
  name: string;
  level: number;
  category: 'Técnica' | 'Comportamental' | 'Idioma' | 'Ferramenta';
}

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  skills: Skill[];
}

const initialEmployees: Employee[] = [
  {
    id: 1, name: 'João Silva', department: 'TI', position: 'Desenvolvedor',
    skills: [
      { name: 'React.js', level: 5, category: 'Técnica' },
      { name: 'TypeScript', level: 4, category: 'Técnica' },
      { name: 'Node.js', level: 4, category: 'Técnica' },
      { name: 'PostgreSQL', level: 3, category: 'Técnica' },
      { name: 'Docker', level: 3, category: 'Ferramenta' },
      { name: 'Git', level: 5, category: 'Ferramenta' },
      { name: 'Inglês', level: 4, category: 'Idioma' },
      { name: 'Trabalho em Equipe', level: 4, category: 'Comportamental' },
    ],
  },
  {
    id: 2, name: 'Maria Santos', department: 'RH', position: 'Gerente',
    skills: [
      { name: 'Liderança', level: 5, category: 'Comportamental' },
      { name: 'Comunicação', level: 5, category: 'Comportamental' },
      { name: 'Mediação de Conflitos', level: 4, category: 'Comportamental' },
      { name: 'Excel Avançado', level: 4, category: 'Ferramenta' },
      { name: 'Inglês', level: 3, category: 'Idioma' },
      { name: 'Gestão de Pessoas', level: 5, category: 'Comportamental' },
      { name: 'PowerPoint', level: 4, category: 'Ferramenta' },
    ],
  },
  {
    id: 3, name: 'Pedro Costa', department: 'Financeiro', position: 'Analista',
    skills: [
      { name: 'Excel Avançado', level: 5, category: 'Ferramenta' },
      { name: 'Contabilidade', level: 4, category: 'Técnica' },
      { name: 'Análise Financeira', level: 4, category: 'Técnica' },
      { name: 'SAP', level: 3, category: 'Ferramenta' },
      { name: 'Power BI', level: 3, category: 'Ferramenta' },
      { name: 'Atenção a Detalhes', level: 5, category: 'Comportamental' },
      { name: 'Espanhol', level: 2, category: 'Idioma' },
    ],
  },
  {
    id: 4, name: 'Ana Oliveira', department: 'Marketing', position: 'Coordenadora',
    skills: [
      { name: 'Marketing Digital', level: 5, category: 'Técnica' },
      { name: 'Google Analytics', level: 4, category: 'Ferramenta' },
      { name: 'SEO', level: 4, category: 'Técnica' },
      { name: 'Facebook Ads', level: 5, category: 'Ferramenta' },
      { name: 'Photoshop', level: 3, category: 'Ferramenta' },
      { name: 'Liderança', level: 4, category: 'Comportamental' },
      { name: 'Inglês', level: 5, category: 'Idioma' },
      { name: 'Espanhol', level: 3, category: 'Idioma' },
      { name: 'Copywriting', level: 4, category: 'Técnica' },
    ],
  },
  {
    id: 5, name: 'Carlos Souza', department: 'Marketing', position: 'Designer',
    skills: [
      { name: 'Figma', level: 5, category: 'Ferramenta' },
      { name: 'Photoshop', level: 5, category: 'Ferramenta' },
      { name: 'Illustrator', level: 5, category: 'Ferramenta' },
      { name: 'UI/UX Design', level: 4, category: 'Técnica' },
      { name: 'HTML/CSS', level: 4, category: 'Técnica' },
      { name: 'Criatividade', level: 5, category: 'Comportamental' },
    ],
  },
  {
    id: 6, name: 'Fernanda Lima', department: 'TI', position: 'Desenvolvedora',
    skills: [
      { name: 'Python', level: 5, category: 'Técnica' },
      { name: 'Django', level: 4, category: 'Técnica' },
      { name: 'React.js', level: 3, category: 'Técnica' },
      { name: 'PostgreSQL', level: 4, category: 'Técnica' },
      { name: 'AWS', level: 3, category: 'Ferramenta' },
      { name: 'Scrum', level: 4, category: 'Comportamental' },
      { name: 'Inglês', level: 4, category: 'Idioma' },
    ],
  },
  {
    id: 7, name: 'Ricardo Pereira', department: 'Financeiro', position: 'Contador',
    skills: [
      { name: 'Contabilidade', level: 5, category: 'Técnica' },
      { name: 'Fiscalidade', level: 5, category: 'Técnica' },
      { name: 'SAP', level: 4, category: 'Ferramenta' },
      { name: 'Excel Avançado', level: 5, category: 'Ferramenta' },
      { name: 'Legislação Trabalhista', level: 4, category: 'Técnica' },
    ],
  },
  {
    id: 8, name: 'Juliana Mendes', department: 'RH', position: 'Recursos Humanos',
    skills: [
      { name: 'Recrutamento', level: 5, category: 'Técnica' },
      { name: 'Seleção', level: 5, category: 'Técnica' },
      { name: 'Comunicação', level: 4, category: 'Comportamental' },
      { name: 'Empatia', level: 5, category: 'Comportamental' },
      { name: 'Excel', level: 3, category: 'Ferramenta' },
      { name: 'Inglês', level: 2, category: 'Idioma' },
    ],
  },
];

const allSkillNames = [
  'React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Git', 'Python', 'Django',
  'Java', 'C#', '.NET', 'Angular', 'Vue.js', 'Next.js', 'Express.js', 'MongoDB',
  'AWS', 'Azure', 'Google Cloud', 'Linux', 'Kubernetes', 'CI/CD',
  'Excel Avançado', 'Power BI', 'SAP', 'Salesforce', 'Tableau',
  'Figma', 'Photoshop', 'Illustrator', 'After Effects', 'Canva',
  'Google Analytics', 'SEO', 'Facebook Ads', 'Google Ads', 'LinkedIn Ads',
  'Marketing Digital', 'Copywriting', 'UX Writing', 'UI/UX Design',
  'HTML/CSS', 'JavaScript', 'SQL', 'R', 'PowerShell',
  'Liderança', 'Comunicação', 'Mediação de Conflitos', 'Gestão de Pessoas',
  'Trabalho em Equipe', 'Proatividade', 'Criatividade', 'Empatia',
  'Atenção a Detalhes', 'Pensamento Crítico', 'Resolução de Problemas',
  'Scrum', 'Kanban', 'Gestão de Projetos',
  'Inglês', 'Espanhol', 'Francês', 'Mandarim',
  'Contabilidade', 'Fiscalidade', 'Análise Financeira', 'Legislação Trabalhista',
  'Recrutamento', 'Seleção', 'Treinamento',
];

const categories: Skill['category'][] = ['Técnica', 'Comportamental', 'Idioma', 'Ferramenta'];

const categoryColors: Record<Skill['category'], { bg: string; text: string; dot: string }> = {
  'Técnica': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Comportamental': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  'Idioma': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  'Ferramenta': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

const levelLabels = ['', 'Básico', 'Intermediário', 'Avançado', 'Especialista', 'Expert'];

export default function CompetenciesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showNewSkillForm, setShowNewSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({ name: '', level: 3, category: 'Técnica' });
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [toast, setToast] = useState('');
  const [view, setView] = useState<'grid' | 'byEmployee'>('byEmployee');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filteredEmployees = employees.filter((e) => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const getAllSkills = () => {
    const skillsMap = new Map<string, { skill: Skill; employeeCount: number; employees: string[] }>();
    employees.forEach((emp) => {
      emp.skills.forEach((skill) => {
        const key = skill.name;
        if (!skillsMap.has(key)) {
          skillsMap.set(key, { skill, employeeCount: 0, employees: [] });
        }
        const entry = skillsMap.get(key)!;
        entry.employeeCount++;
        entry.employees.push(emp.name);
      });
    });
    return Array.from(skillsMap.values()).filter((s) => !filterCategory || s.skill.category === filterCategory);
  };

  const handleAddSkill = () => {
    if (!selectedEmp || !newSkill.name) return;
    if (selectedEmp.skills.some((s) => s.name === newSkill.name)) {
      showToast('Esta habilidade já foi adicionada');
      return;
    }
    setEmployees(employees.map((e) =>
      e.id === selectedEmp.id ? { ...e, skills: [...e.skills, newSkill] } : e
    ));
    setSelectedEmp({ ...selectedEmp, skills: [...selectedEmp.skills, newSkill] });
    setNewSkill({ name: '', level: 3, category: 'Técnica' });
    setShowNewSkillForm(false);
    showToast('Habilidade adicionada com sucesso!');
  };

  const handleRemoveSkill = (empId: number, skillName: string) => {
    setEmployees(employees.map((e) =>
      e.id === empId ? { ...e, skills: e.skills.filter((s) => s.name !== skillName) } : e
    ));
    if (selectedEmp) {
      setSelectedEmp({ ...selectedEmp, skills: selectedEmp.skills.filter((s) => s.name !== skillName) });
    }
    showToast('Habilidade removida');
  };

  const handleUpdateLevel = (empId: number, skillName: string, newLevel: number) => {
    const update = (emp: Employee) => ({
      ...emp,
      skills: emp.skills.map((s) => s.name === skillName ? { ...s, level: newLevel } : s),
    });
    setEmployees(employees.map((e) => e.id === empId ? update(e) : e));
    if (selectedEmp && selectedEmp.id === empId) {
      setSelectedEmp(update(selectedEmp));
    }
  };

  const availableSkills = allSkillNames.filter(
    (name) => !selectedEmp?.skills.some((s) => s.name === name)
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {toast && (
            <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg animate-pulse">{toast}</div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Competências</h1>
              <p className="text-sm text-gray-500 mt-1">Gerencie habilidades e competências dos colaboradores</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setView('byEmployee')} className={`px-3 py-2 rounded-lg text-sm font-medium ${view === 'byEmployee' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border'}`}>Por Colaborador</button>
              <button onClick={() => setView('grid')} className={`px-3 py-2 rounded-lg text-sm font-medium ${view === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border'}`}>Todas as Habilidades</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <input type="text" placeholder="Buscar colaborador ou departamento..." value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todas categorias</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {view === 'byEmployee' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEmployees.map((emp) => (
                <div key={emp.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                      {emp.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{emp.name}</h3>
                      <p className="text-xs text-gray-500">{emp.position} — {emp.department}</p>
                    </div>
                    <button onClick={() => { setSelectedEmp(emp); setShowSkillModal(true); }} className="text-primary-600 hover:text-primary-800 text-sm font-medium">+ Habilidade</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {emp.skills
                      .filter((s) => !filterCategory || s.category === filterCategory)
                      .map((skill) => {
                        const colors = categoryColors[skill.category];
                        return (
                          <div key={skill.name} className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${colors.bg} ${colors.text} cursor-pointer hover:ring-2 hover:ring-primary-300`} onClick={() => handleUpdateLevel(emp.id, skill.name, skill.level >= 5 ? 1 : skill.level + 1)}>
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></span>
                            {skill.name}
                            <span className="ml-0.5 opacity-70">{skill.level}★</span>
                            <button onClick={(e) => { e.stopPropagation(); handleRemoveSkill(emp.id, skill.name); }} className="ml-1 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600">&times;</button>
                          </div>
                        );
                      })}
                  </div>
                  {emp.skills.filter((s) => !filterCategory || s.category === filterCategory).length === 0 && (
                    <p className="text-sm text-gray-400 mt-2">Nenhuma habilidade nesta categoria</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Habilidade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nível Médio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Colaboradores</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nível</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getAllSkills().sort((a, b) => b.employeeCount - a.employeeCount).map(({ skill, employeeCount, employees: empNames }) => {
                    const colors = categoryColors[skill.category];
                    return (
                      <tr key={skill.name} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{skill.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text}`}>{skill.category}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{levelLabels[skill.level]}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{employeeCount}</span>
                          <span className="text-xs text-gray-400 ml-1">({empNames.join(', ')})</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div key={star} className={`w-3 h-3 rounded-full ${star <= skill.level ? 'bg-primary-500' : 'bg-gray-200'}`} />
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {showSkillModal && selectedEmp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Habilidades de {selectedEmp.name}</h2>
                <p className="text-sm text-gray-500">{selectedEmp.skills.length} habilidade(s) cadastrada(s)</p>
              </div>
              <button onClick={() => setShowSkillModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="p-6">
              {selectedEmp.skills.map((skill) => {
                const colors = categoryColors[skill.category];
                return (
                  <div key={skill.name} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
                      <div>
                        <span className="font-medium text-gray-900 text-sm">{skill.name}</span>
                        <span className={`ml-2 text-xs ${colors.text}`}>{skill.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} onClick={() => handleUpdateLevel(selectedEmp.id, skill.name, star)} className={`w-5 h-5 rounded-full transition-colors ${star <= skill.level ? 'bg-primary-500' : 'bg-gray-200 hover:bg-primary-200'}`} />
                        ))}
                      </div>
                      <button onClick={() => handleRemoveSkill(selectedEmp.id, skill.name)} className="text-red-400 hover:text-red-600 text-lg">&times;</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-6 border-t">
              {!showNewSkillForm ? (
                <button onClick={() => setShowNewSkillForm(true)} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-400 hover:text-primary-600 transition-colors">+ Adicionar Nova Habilidade</button>
              ) : (
                <div className="space-y-3">
                  <select value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">Selecione uma habilidade</option>
                    {availableSkills.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="flex gap-3">
                    <select value={newSkill.category} onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as Skill['category'] })} className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Nível:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setNewSkill({ ...newSkill, level: star })} className={`w-6 h-6 rounded-full ${star <= newSkill.level ? 'bg-primary-500' : 'bg-gray-200 hover:bg-primary-200'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleAddSkill} className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Adicionar</button>
                    <button onClick={() => setShowNewSkillForm(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
