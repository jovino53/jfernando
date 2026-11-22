'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  status: 'Ativo' | 'Inativo' | 'Férias' | 'Afastado';
  phone: string;
  admissionDate: string;
  salary: string;
}

const initialEmployees: Employee[] = [
  { id: 1, name: 'João Silva', email: 'joao@nexus.com', position: 'Desenvolvedor', department: 'TI', status: 'Ativo', phone: '(11) 99999-0001', admissionDate: '2022-03-15', salary: 'R$ 8.500' },
  { id: 2, name: 'Maria Santos', email: 'maria@nexus.com', position: 'Gerente', department: 'RH', status: 'Ativo', phone: '(11) 99999-0002', admissionDate: '2021-01-10', salary: 'R$ 12.000' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@nexus.com', position: 'Analista', department: 'Financeiro', status: 'Ativo', phone: '(11) 99999-0003', admissionDate: '2023-06-01', salary: 'R$ 7.200' },
  { id: 4, name: 'Ana Oliveira', email: 'ana@nexus.com', position: 'Coordenadora', department: 'Marketing', status: 'Férias', phone: '(11) 99999-0004', admissionDate: '2020-08-20', salary: 'R$ 9.800' },
  { id: 5, name: 'Carlos Souza', email: 'carlos@nexus.com', position: 'Designer', department: 'Marketing', status: 'Ativo', phone: '(11) 99999-0005', admissionDate: '2023-02-14', salary: 'R$ 6.500' },
  { id: 6, name: 'Fernanda Lima', email: 'fernanda@nexus.com', position: 'Desenvolvedora', department: 'TI', status: 'Ativo', phone: '(11) 99999-0006', admissionDate: '2022-09-05', salary: 'R$ 8.800' },
  { id: 7, name: 'Ricardo Pereira', email: 'ricardo@nexus.com', position: 'Contador', department: 'Financeiro', status: 'Inativo', phone: '(11) 99999-0007', admissionDate: '2019-11-30', salary: 'R$ 7.500' },
  { id: 8, name: 'Juliana Mendes', email: 'juliana@nexus.com', position: 'Recursos Humanos', department: 'RH', status: 'Ativo', phone: '(11) 99999-0008', admissionDate: '2021-07-12', salary: 'R$ 6.800' },
];

const emptyEmployee: Employee = { id: 0, name: '', email: '', position: '', department: '', status: 'Ativo', phone: '', admissionDate: '', salary: '' };

const departments = ['TI', 'RH', 'Financeiro', 'Marketing', 'Operações', 'Vendas'];
const positions = ['Desenvolvedor', 'Gerente', 'Analista', 'Coordenadora', 'Designer', 'Contador', 'Recursos Humanos', 'Assistente', 'Diretor', 'Estagiário'];
const statuses: Employee['status'][] = ['Ativo', 'Inativo', 'Férias', 'Afastado'];

const statusColors: Record<Employee['status'], string> = {
  'Ativo': 'bg-green-100 text-green-800',
  'Inativo': 'bg-gray-100 text-gray-800',
  'Férias': 'bg-blue-100 text-blue-800',
  'Afastado': 'bg-yellow-100 text-yellow-800',
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState<Employee>(emptyEmployee);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = employees.filter((e) => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.position.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || e.department === filterDept;
    const matchStatus = !filterStatus || e.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const openNew = () => { setForm(emptyEmployee); setEditing(null); setShowModal(true); };
  const openEdit = (emp: Employee) => { setForm(emp); setEditing(emp); setShowModal(true); };

  const handleSave = () => {
    if (!form.name || !form.email || !form.position || !form.department) {
      showToast('Preencha todos os campos obrigatórios');
      return;
    }
    if (editing) {
      setEmployees(employees.map((e) => (e.id === editing.id ? form : e)));
      showToast('Colaborador atualizado com sucesso!');
    } else {
      const newId = Math.max(...employees.map((e) => e.id)) + 1;
      setEmployees([...employees, { ...form, id: newId }]);
      showToast('Colaborador adicionado com sucesso!');
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter((e) => e.id !== id));
    setShowDeleteConfirm(null);
    showToast('Colaborador removido com sucesso!');
  };

  const toggleStatus = (emp: Employee) => {
    const nextStatus: Record<Employee['status'], Employee['status']> = { 'Ativo': 'Inativo', 'Inativo': 'Ativo', 'Férias': 'Ativo', 'Afastado': 'Ativo' };
    setEmployees(employees.map((e) => (e.id === emp.id ? { ...e, status: nextStatus[e.status] } : e)));
    showToast(`Status de ${emp.name} alterado`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {toast && (
            <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg animate-pulse">
              {toast}
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Colaboradores</h1>
              <p className="text-sm text-gray-500 mt-1">{filtered.length} colaborador(es) encontrado(s)</p>
            </div>
            <button onClick={openNew} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2">
              <span>+</span> Novo Colaborador
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Buscar por nome, email ou cargo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todos os departamentos</option>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todos os status</option>
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {(search || filterDept || filterStatus) && (
                <button onClick={() => { setSearch(''); setFilterDept(''); setFilterStatus(''); }} className="text-gray-500 hover:text-gray-700 underline text-sm">
                  Limpar filtros
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cargo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departamento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">Nenhum colaborador encontrado</td></tr>
                ) : (
                  filtered.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                            {employee.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{employee.name}</div>
                            <div className="text-xs text-gray-400">Admissão: {employee.admissionDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => toggleStatus(employee)} className={`px-2 py-1 text-xs font-medium rounded-full cursor-pointer hover:opacity-80 ${statusColors[employee.status]}`}>
                          {employee.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button onClick={() => openEdit(employee)} className="text-blue-600 hover:text-blue-900 mr-3" title="Editar">Editar</button>
                        <button onClick={() => setShowDeleteConfirm(employee.id)} className="text-red-600 hover:text-red-900" title="Excluir">Excluir</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">{editing ? 'Editar Colaborador' : 'Novo Colaborador'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="email@nexus.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo *</label>
                <select value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">Selecione</option>
                  {positions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento *</label>
                <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">Selecione</option>
                  {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="(11) 99999-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Admissão</label>
                <input type="date" value={form.admissionDate} onChange={(e) => setForm({ ...form, admissionDate: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salário</label>
                <input type="text" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="R$ 0.000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Employee['status'] })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancelar</button>
              <button onClick={handleSave} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">{editing ? 'Salvar Alterações' : 'Adicionar'}</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Confirmar Exclusão</h2>
            <p className="text-gray-600 mb-6">Tem certeza que deseja excluir este colaborador? Esta ação não pode ser desfeita.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancelar</button>
              <button onClick={() => handleDelete(showDeleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
