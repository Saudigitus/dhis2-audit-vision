import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, FolderGit2, Layers, X, Check, Activity } from 'lucide-react';

interface GroupItem {
  id: string;
  name: string;
  type: 'program' | 'dataSet';
}

interface ViewGroup {
  id: string;
  name: string;
  description: string;
  items: GroupItem[];
  createdAt: string;
}

const initialGroups: ViewGroup[] = [
  {
    id: 'g1',
    name: 'HIV/SIDA',
    description: 'Monitoramento de todos os programas e datasets relacionados ao HIV',
    createdAt: '2026-04-10',
    items: [
      { id: 'p1', name: 'HIV Care and Treatment', type: 'program' },
      { id: 'p2', name: 'PMTCT', type: 'program' },
      { id: 'ds1', name: 'HIV Monthly Summary', type: 'dataSet' },
    ],
  },
  {
    id: 'g2',
    name: 'Malaria',
    description: 'Programas de controle da Malaria',
    createdAt: '2026-04-11',
    items: [
      { id: 'p3', name: 'Malaria Case Investigation', type: 'program' },
      { id: 'ds2', name: 'Malaria Weekly Report', type: 'dataSet' },
    ],
  },
];

const availableItems: GroupItem[] = [
  { id: 'p1', name: 'HIV Care and Treatment', type: 'program' },
  { id: 'p2', name: 'PMTCT', type: 'program' },
  { id: 'p3', name: 'Malaria Case Investigation', type: 'program' },
  { id: 'p4', name: 'TB Program', type: 'program' },
  { id: 'p5', name: 'COVID-19 Vaccination', type: 'program' },
  { id: 'ds1', name: 'HIV Monthly Summary', type: 'dataSet' },
  { id: 'ds2', name: 'Malaria Weekly Report', type: 'dataSet' },
  { id: 'ds3', name: 'TB Register', type: 'dataSet' },
  { id: 'ds4', name: 'Facility Assessment', type: 'dataSet' },
];

export default function MonitoringGroups() {
  const [groups, setGroups] = useState<ViewGroup[]>(initialGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedItems, setSelectedItems] = useState<GroupItem[]>([]);
  const [itemSearch, setItemSearch] = useState('');

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailableItems = availableItems.filter(item => 
    item.name.toLowerCase().includes(itemSearch.toLowerCase()) &&
    !selectedItems.find(si => si.id === item.id)
  );

  const handleOpenModal = (group?: ViewGroup) => {
    if (group) {
      setEditingId(group.id);
      setGroupName(group.name);
      setGroupDescription(group.description);
      setSelectedItems([...group.items]);
    } else {
      setEditingId(null);
      setGroupName('');
      setGroupDescription('');
      setSelectedItems([]);
    }
    setIsModalOpen(true);
  };

  const handleSaveGroup = () => {
    if (!groupName.trim()) return;

    if (editingId) {
      setGroups(groups.map(g => g.id === editingId ? {
        ...g,
        name: groupName,
        description: groupDescription,
        items: selectedItems
      } : g));
    } else {
      setGroups([...groups, {
        id: `g${Date.now()}`,
        name: groupName,
        description: groupDescription,
        createdAt: new Date().toISOString().split('T')[0],
        items: selectedItems
      }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
  };

  const toggleItemSelection = (item: GroupItem) => {
    if (selectedItems.find(si => si.id === item.id)) {
      setSelectedItems(selectedItems.filter(si => si.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Grupos de Visualização</h1>
          <p className="text-sm text-[#64748b] mt-1">Agrupe Programas e DataSets para monitorar alterações de forma conjunta.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-xl text-sm font-bold hover:bg-[#2563eb] transition-all cursor-pointer shadow-lg shadow-[#3b82f6]/20"
        >
          <Plus size={18} />
          Novo Grupo
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
        <input
          type="text"
          placeholder="Buscar grupos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
        />
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => (
          <div key={group.id} className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-[#0f172a]">{group.name}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(group)} className="text-[#64748b] hover:text-[#3b82f6] cursor-pointer">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDeleteGroup(group.id)} className="text-[#64748b] hover:text-[#ef4444] cursor-pointer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-[#64748b] mb-4 line-clamp-2 min-h-[40px]">{group.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-[#475569]">
                <FolderGit2 size={16} className="text-[#3b82f6]" />
                <span className="font-medium">{group.items.filter(i => i.type === 'program').length} Programas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#475569]">
                <Layers size={16} className="text-[#8b5cf6]" />
                <span className="font-medium">{group.items.filter(i => i.type === 'dataSet').length} DataSets</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[#e2e8f0] flex justify-between items-center text-xs text-[#94a3b8]">
              <span>Criado em {group.createdAt}</span>
              <button className="text-[#3b82f6] font-medium hover:underline cursor-pointer flex items-center gap-1">
                <Activity size={14} /> Monitorar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-[#e2e8f0]">
              <h2 className="text-xl font-bold text-[#0f172a]">{editingId ? 'Editar Grupo' : 'Novo Grupo de Visualização'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#64748b] hover:bg-[#f1f5f9] p-2 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8">
              {/* Form Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Nome do Grupo</label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Ex: HIV/SIDA Monitor"
                    className="w-full px-4 py-2 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Descrição</label>
                  <textarea
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="Descreva o propósito deste grupo..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] resize-none"
                  />
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-bold text-[#0f172a] mb-3">Itens Selecionados ({selectedItems.length})</h4>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedItems.length === 0 ? (
                      <p className="text-sm text-[#94a3b8] italic">Nenhum item selecionado.</p>
                    ) : (
                      selectedItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                          <div className="flex items-center gap-2">
                            {item.type === 'program' ? <FolderGit2 size={16} className="text-[#3b82f6]" /> : <Layers size={16} className="text-[#8b5cf6]" />}
                            <span className="text-sm font-medium text-[#0f172a]">{item.name}</span>
                          </div>
                          <button onClick={() => toggleItemSelection(item)} className="text-[#ef4444] hover:bg-[#fee2e2] p-1 rounded cursor-pointer">
                            <X size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Item Selection */}
              <div className="flex-1 border-l border-[#e2e8f0] pl-0 md:pl-8 flex flex-col">
                <h4 className="text-sm font-bold text-[#0f172a] mb-3">Adicionar Programas e DataSets</h4>
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                  <input
                    type="text"
                    placeholder="Buscar metadata..."
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar min-h-[300px]">
                  {filteredAvailableItems.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => toggleItemSelection(item)}
                      className="flex justify-between items-center p-3 border border-[#e2e8f0] rounded-lg cursor-pointer hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.type === 'program' ? <FolderGit2 size={18} className="text-[#3b82f6]" /> : <Layers size={18} className="text-[#8b5cf6]" />}
                        <div>
                          <p className="text-sm font-medium text-[#0f172a]">{item.name}</p>
                          <p className="text-[11px] text-[#64748b] uppercase tracking-wider">{item.type}</p>
                        </div>
                      </div>
                      <Plus size={16} className="text-[#94a3b8]" />
                    </div>
                  ))}
                  {filteredAvailableItems.length === 0 && (
                    <p className="text-sm text-[#94a3b8] text-center py-4">Nenhum item encontrado.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#e2e8f0] flex justify-end gap-3 bg-[#f8fafc] rounded-b-2xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-medium text-[#64748b] bg-white border border-[#e2e8f0] rounded-xl hover:bg-[#f1f5f9] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveGroup}
                disabled={!groupName.trim()}
                className="px-5 py-2.5 text-sm font-bold text-white bg-[#3b82f6] rounded-xl hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-2"
              >
                <Check size={16} />
                Salvar Grupo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
