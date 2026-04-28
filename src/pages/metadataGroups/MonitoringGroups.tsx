import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Table from '../../components/table/Table';
import { DataStoreConfigState } from '../../packages/wrapper/types/DataStoreSchema';
import MonitoringGroupCard from '../../components/monitoringGroups/MonitoringGroupCard';
import { monitoringGroupsHeaders } from '../../constants/common/monitoringGroupsHeaders';
import MonitoringGroupsModal from '../../components/monitoringGroups/MonitoringGroupModal';
import { MonitoringGroup, MonitoringGroupItem } from '../../types/monitoringGroups/MonitoringGroupsTypes';
import { Plus, Search, Edit2, Trash2, FolderGit2, Layers, X, Check, Activity, Group, Table2, Grid2X2 } from 'lucide-react';


export default function MonitoringGroups() {
  // Groups from dataStore
  const values = useRecoilValue(DataStoreConfigState)
  const [groups, setGroups] = useState<MonitoringGroup[]>(values?.monitoringGroups);

  // View mode
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedItems, setSelectedItems] = useState<MonitoringGroupItem[]>([]);
  const [itemSearch, setItemSearch] = useState('');

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const handleOpenModal = (group?: MonitoringGroup) => {
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


  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
  };

  function rowsFormatter(data: MonitoringGroup[]) {
    if (!data) return []

    const formattedData = data?.map((item: MonitoringGroup) => ({
      id: item?.id,
      name: item?.name,
      createdAt: item?.createdAt,
      updatedAt: item?.updatedAt,
      description: item?.description,
      programs: item?.items?.filter((val) => val?.type == "program")?.length,
      dataSets: item?.items?.filter((val) => val?.type == "dataSet")?.length,
      action: <div className="flex gap-2">
        <button onClick={() => handleOpenModal(item)} className="text-[#64748b] hover:text-[#3b82f6] cursor-pointer">
          <Edit2 size={16} />
        </button>
        <button onClick={() => handleDeleteGroup(item.id)} className="text-[#64748b] hover:text-[#ef4444] cursor-pointer">
          <Trash2 size={16} />
        </button>
      </div>

    }))
    return formattedData
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Group size={20} className="text-[#3b82f6]" />
            <span className="text-lg font-bold text-[#0f172a]">Metadata Grouping</span>
          </div>
        </div>
        <div className="flex items-center gap-3">  </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search by object name or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setViewMode(viewMode == "grid" ? "table" : "grid")}
            className="text-[#64748b] hover:text-[#3b82f6] cursor-pointer">
            {viewMode == "grid" ? <Table2 /> : <Grid2X2 />}
          </button>
          <MonitoringGroupsModal />
        </div>
      </div>

      <>
        {
          viewMode == "grid" ?
            <>
              {/* Groups Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(group => (
                  <MonitoringGroupCard group={group} handleDeleteGroup={handleDeleteGroup} handleOpenModal={handleOpenModal} />
                ))}
              </div>
            </>
            :
            <>
              {/* Table */}
              <Table
                description=''
                title='Metadata Grouping'
                setDetailTab={{} as any}
                setSelectedChange={{} as any}
                header={monitoringGroupsHeaders}
                tabledata={rowsFormatter(groups)}
              />
            </>
        }
      </>
    </div>
  );
}
