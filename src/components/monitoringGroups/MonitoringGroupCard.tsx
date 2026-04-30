import { FunctionComponent } from "react";
import { Activity, Edit2, FolderGit2, Layers, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MonitoringGroup } from "../../types/monitoringGroups/MonitoringGroupsTypes";

interface MonitoringGroupCardProps {
    group: MonitoringGroup
    handleDeleteGroup: (arg: MonitoringGroup) => void
    handleOpenModal: (arg: MonitoringGroup) => void
}

const MonitoringGroupCard: FunctionComponent<MonitoringGroupCardProps> = (props) => {
    const { group, handleOpenModal, handleDeleteGroup } = props
    const navigate = useNavigate()

    return (
        <div key={group.id} className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-[#0f172a]">{group.name}</h3>
                <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(group)} className="text-[#64748b] hover:text-[#3b82f6] cursor-pointer">
                        <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteGroup(group)} className="text-[#64748b] hover:text-[#ef4444] cursor-pointer">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            <p className="text-sm text-[#64748b] mb-4 line-clamp-2 min-h-10">{group.description}</p>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#475569]">
                    <FolderGit2 size={16} className="text-[#3b82f6]" />
                    <span className="font-medium">{group?.items?.filter(i => i.type === 'program').length} Programs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#475569]">
                    <Layers size={16} className="text-[#8b5cf6]" />
                    <span className="font-medium">{group?.items?.filter(i => i.type === 'dataSet').length} DataSets</span>
                </div>
            </div>

            <div className="pt-4 border-t border-[#e2e8f0] flex justify-between items-center text-xs text-[#94a3b8]">
                <span>Created at {group.createdAt}</span>
                <span>Updated at {group.updatedAt}</span>
                <button onClick={()=>navigate(`/change-explorer?group=${group.id}&groupName=${group.name}`)} className="text-[#3b82f6] font-medium hover:underline cursor-pointer flex items-center gap-1">
                    <Activity size={14} /> Monitor
                </button>
            </div>
        </div>
    );
}

export default MonitoringGroupCard;