import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { CircularLoader } from '@dhis2/ui';
import Table from '../../components/table/Table';
import { Search, Edit2, Trash2, Group, Grid, TableIcon } from 'lucide-react';
import { DataStoreConfigState } from '../../packages/wrapper/types/DataStoreSchema';
import MonitoringGroupCard from '../../components/monitoringGroups/MonitoringGroupCard';
import { monitoringGroupsHeaders } from '../../constants/common/monitoringGroupsHeaders';
import MonitoringGroupsModal from '../../components/monitoringGroups/MonitoringGroupModal';
import { MonitoringGroup } from '../../types/monitoringGroups/MonitoringGroupsTypes';
import { useGetDataStore } from '../../packages/wrapper/hooks/dataStore/useGetDataStore';
import DeleteMonitoringGroupsModal from '../../components/monitoringGroups/DeleteMonitoringGroupModal';


export default function MonitoringGroups() {
  // Groups from dataStore
  const { loading, refetch } = useGetDataStore()
  const values = useRecoilValue(DataStoreConfigState)
  const [groups, setGroups] = useState<MonitoringGroup[]>(values?.monitoringGroups);
  // View mode
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [editingGroup, setEditingGroup] = useState<MonitoringGroup | null>(null);

  useEffect(() => {
    setGroups(values?.monitoringGroups)
  }, [values])

  const filteredGroups = groups?.filter(g =>
    g.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    g.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleOpenModal = (group?: MonitoringGroup) => {
    if (group) {
      setEditingGroup(group);
    } else {
      setEditingGroup(null);
    }
    setIsModalOpen(true);
  };

  const handleDeleteGroup = (group?: MonitoringGroup) => {
    if (group) {
      setEditingGroup(group);
    } else {
      setEditingGroup(null);
    }
    setIsDeleteModalOpen(true);
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
        <button onClick={() => handleDeleteGroup(item)} className="text-[#64748b] hover:text-[#ef4444] cursor-pointer">
          <Trash2 size={16} />
        </button>
      </div>

    }))
    return formattedData
  }

  return (
    <div className="space-y-5">
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
            placeholder="Search by object name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode == "grid" ? "table" : "grid")}
            className="flex items-center gap-2 px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-xs font-medium text-[#0f172a] hover:bg-[#f8fafc] cursor-pointer focus:outline-none focus:ring-1 focus:border-transparent"
          >
            {viewMode == "grid" ? <TableIcon size={15} /> : <Grid size={15} />}
            {viewMode == "grid" ? <>Table</> : <>Grid</>}
          </button>

          <MonitoringGroupsModal onCompleteSave={refetch} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editingGroup={editingGroup} setEditingGroup={setEditingGroup} />
        </div>
      </div>

      {
        viewMode == "grid" ?
          <>
            {
              loading ?
                <div className='flex items-center justify-center'>
                  <CircularLoader />
                </div>
                :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGroups?.map(group => (
                    <MonitoringGroupCard group={group} handleDeleteGroup={handleDeleteGroup} handleOpenModal={handleOpenModal} />
                  ))}
                </div>
            }
          </>
          :
          <Table
            description=''
            loading={loading}
            title='Metadata Grouping'
            setSelectedChange={{} as any}
            header={monitoringGroupsHeaders}
            tabledata={rowsFormatter(groups)}
          />
      }
      <DeleteMonitoringGroupsModal deletingGroup={editingGroup} isModalOpen={isDeleteModalOpen} setDeletingGroup={setEditingGroup} setIsModalOpen={setIsDeleteModalOpen} onCompleteDelete={refetch} />
    </div>
  );
}