'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { User, Shield, Bell, CreditCard, Settings, Palette, Globe, Key, Mail, Smartphone, Building, Save, CheckCircle, AlertCircle } from 'lucide-react';

const tabs = [
  { id: 'profile', name: 'Perfil', icon: User },
  { id: 'security', name: 'Segurança', icon: Shield },
  { id: 'notifications', name: 'Notificações', icon: Bell },
  { id: 'billing', name: 'Cobrança', icon: CreditCard },
  { id: 'integrations', name: 'Integrações', icon: Settings },
  { id: 'appearance', name: 'Aparência', icon: Palette },
];

const notificationSettings = [
  { id: 'email', label: 'Email', description: 'Receber notificações por email', enabled: true },
  { id: 'push', label: 'Push', description: 'Notificações no navegador', enabled: true },
  { id: 'whatsapp', label: 'WhatsApp', description: 'Notificações via WhatsApp', enabled: false },
  { id: 'slack', label: 'Slack', description: 'Integração com Slack', enabled: false },
];

const integrations = [
  { id: 'google', name: 'Google Workspace', description: 'Sincronizar contas e calendários', connected: true, icon: '🔗' },
  { id: 'microsoft', name: 'Microsoft 365', description: 'Integrar com Outlook e Teams', connected: false, icon: '🔗' },
  { id: 'slack', name: 'Slack', description: 'Notificações e comandos', connected: false, icon: '💬' },
  { id: 'zoom', name: 'Zoom', description: 'Reuniões automáticas', connected: true, icon: '📹' },
  { id: 'bamboo', name: 'BambooHR', description: 'Migração de dados', connected: false, icon: '🌲' },
  { id: 'workday', name: 'Workday', description: 'Sincronização de funcionários', connected: false, icon: '📊' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState('');
  const [notifications, setNotifications] = useState(notificationSettings);
  const [profile, setProfile] = useState({
    name: 'Admin Nexus HR',
    email: 'admin@nexushr.ai',
    company: 'Nexus RH AI',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 99999-9999',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
  });
  const [security, setSecurity] = useState({
    twoFactor: true,
    sessions: 3,
    lastPasswordChange: '15/06/2026',
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
    showToast('Configuração de notificação atualizada');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {toast && (
            <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '1s' }}>
              <CheckCircle size={20} /><p className="font-medium text-sm">{toast}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
              <p className="text-sm text-gray-500 mt-1">Gerencie seu perfil, segurança e preferências</p>
            </div>
            <button onClick={() => showToast('Configurações salvas com sucesso!')} className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2">
              <Save size={16} /> Salvar Alterações
            </button>
          </div>

          <div className="flex gap-6">
            <div className="w-64 bg-white rounded-2xl shadow-sm p-4 h-fit">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${activeTab === tab.id ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <tab.icon size={18} />
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Perfil do Administrador</h2>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center text-2xl font-bold">AN</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{profile.name}</h3>
                      <p className="text-sm text-gray-500">{profile.email}</p>
                      <p className="text-xs text-gray-400 mt-1">Administrador desde Janeiro 2026</p>
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Alterar Foto</button>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div><label className="text-sm font-medium text-gray-700 mb-1 block">Nome Completo</label><input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-1 block">Email</label><input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-1 block">Empresa</label><input type="text" value={profile.company} onChange={(e) => setProfile({...profile, company: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-1 block">CNPJ</label><input type="text" value={profile.cnpj} onChange={(e) => setProfile({...profile, cnpj: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-1 block">Telefone</label><input type="text" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-1 block">Fuso Horário</label><select value={profile.timezone} onChange={(e) => setProfile({...profile, timezone: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"><option value="America/Sao_Paulo">Horário de Brasília</option><option value="America/Manaus">Horário da Amazônia</option><option value="America/Noronha">Horário de Fernando de Noronha</option></select></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-1 block">Idioma</label><select value={profile.language} onChange={(e) => setProfile({...profile, language: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"><option value="pt-BR">Português (Brasil)</option><option value="en-US">English (US)</option><option value="es">Español</option></select></div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Segurança da Conta</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><Key size={20} /></div>
                          <div>
                            <p className="font-medium text-gray-800">Autenticação em Duas Etapas</p>
                            <p className="text-xs text-gray-500">Adicione uma camada extra de segurança</p>
                          </div>
                        </div>
                        <button onClick={() => { setSecurity({...security, twoFactor: !security.twoFactor}); showToast('Autenticação 2FA atualizada'); }}
                          className={`w-12 h-6 rounded-full transition ${security.twoFactor ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transition transform ${security.twoFactor ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><Globe size={20} /></div>
                          <div>
                            <p className="font-medium text-gray-800">Sessões Ativas</p>
                            <p className="text-xs text-gray-500">{security.sessions} dispositivos conectados</p>
                          </div>
                        </div>
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">Encerrar Todas</button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center"><Shield size={20} /></div>
                          <div>
                            <p className="font-medium text-gray-800">Última Alteração de Senha</p>
                            <p className="text-xs text-gray-500">{security.lastPasswordChange}</p>
                          </div>
                        </div>
                        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Alterar Senha</button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Log de Atividades</h3>
                    <div className="space-y-3">
                      {[
                        { action: 'Login realizado', time: 'Hoje, 14:30', ip: '192.168.1.100', status: 'success' },
                        { action: 'Senha alterada', time: '15/06/2026, 10:15', ip: '192.168.1.100', status: 'info' },
                        { action: 'Tentativa de login falhou', time: '10/06/2026, 08:45', ip: '10.0.0.50', status: 'error' },
                      ].map((log, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${log.status === 'success' ? 'bg-green-100 text-green-600' : log.status === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            {log.status === 'success' ? <CheckCircle size={16} /> : log.status === 'error' ? <AlertCircle size={16} /> : <Key size={16} />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{log.action}</p>
                            <p className="text-xs text-gray-400">{log.time} • IP: {log.ip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Preferências de Notificação</h2>
                  <div className="space-y-4">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-800">{notif.label}</p>
                          <p className="text-xs text-gray-500">{notif.description}</p>
                        </div>
                        <button onClick={() => toggleNotification(notif.id)}
                          className={`w-12 h-6 rounded-full transition ${notif.enabled ? 'bg-primary-500' : 'bg-gray-300'}`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transition transform ${notif.enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800 font-medium mb-1">📧 Resumo Semanal</p>
                    <p className="text-xs text-blue-600">Receba um resumo semanal das atividades e métricas importantes por email.</p>
                    <button className="mt-2 text-xs text-blue-700 font-medium hover:text-blue-800">Configurar Horário de Envio</button>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-primary-100 text-sm">Plano Atual</p>
                        <h3 className="text-2xl font-bold">PROFESSIONAL</h3>
                        <p className="text-primary-100 text-sm mt-1">R$ 497/mês • Próximo pagamento: 01/08/2026</p>
                      </div>
                      <button className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition">Alterar Plano</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Histórico de Pagamentos</h3>
                    <div className="space-y-3">
                      {[
                        { date: '01/07/2026', amount: 'R$ 497,00', status: 'Pago', method: 'Cartão •••• 1234' },
                        { date: '01/06/2026', amount: 'R$ 497,00', status: 'Pago', method: 'Cartão •••• 1234' },
                        { date: '01/05/2026', amount: 'R$ 497,00', status: 'Pago', method: 'Cartão •••• 1234' },
                      ].map((payment, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
                          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><CreditCard size={20} /></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{payment.date}</p>
                            <p className="text-xs text-gray-500">{payment.method}</p>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{payment.amount}</span>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">{payment.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Integrações</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.map((integration) => (
                      <div key={integration.id} className="border rounded-xl p-4 hover:shadow-md transition">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{integration.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{integration.name}</h4>
                            <p className="text-xs text-gray-500">{integration.description}</p>
                          </div>
                          <button className={`px-4 py-2 rounded-xl text-sm font-medium transition ${integration.connected ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}>
                            {integration.connected ? 'Conectado' : 'Conectar'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Aparência</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">Tema</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {['Claro', 'Escuro', 'Sistema'].map((theme) => (
                          <button key={theme} className={`p-4 rounded-xl border-2 transition ${theme === 'Claro' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <div className={`w-full h-20 rounded-lg mb-2 ${theme === 'Claro' ? 'bg-white border' : theme === 'Escuro' ? 'bg-gray-800' : 'bg-gradient-to-r from-white to-gray-800'}`}></div>
                            <p className="text-sm font-medium text-gray-700">{theme}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">Cor de Destaque</h3>
                      <div className="flex gap-3">
                        {['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#10b981'].map((color) => (
                          <button key={color} className="w-10 h-10 rounded-full border-2 border-white shadow hover:scale-110 transition" style={{ backgroundColor: color }}></button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">Densidade</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {['Compacto', 'Padrão', 'Confortável'].map((density) => (
                          <button key={density} className={`p-3 rounded-xl border-2 transition ${density === 'Padrão' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <p className="text-sm font-medium text-gray-700">{density}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}