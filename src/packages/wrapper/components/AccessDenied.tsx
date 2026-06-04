import { ShieldAlert, Database, Lock } from "lucide-react"

export const AccessDenied = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] w-full p-8">
            <div className="max-w-md w-full bg-white rounded-3xl border border-red-100 shadow-2xl shadow-red-500/5 overflow-hidden">
                <div className="bg-red-50 p-8 flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-200 blur-2xl opacity-40 rounded-full animate-pulse"></div>
                        <div className="relative bg-white p-5 rounded-2xl shadow-lg shadow-red-200/50">
                            <ShieldAlert size={48} className="text-red-500" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Access Denied</h2>
                        <p className="text-red-600 font-bold text-xs uppercase tracking-[0.2em]">Insufficient Permissions</p>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                <Database size={20} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-900">Automatic Configuration</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    There are some <span className="font-bold text-gray-700">SQL Views</span> missing and this app automatically generates and manages them to power its data analytics and reporting engine.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                                <Lock size={20} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-900">Missing Authority</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Your account does not have the <span className="font-mono bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-100">F_SQLVIEW_PUBLIC_ADD</span> authority required for this process.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <p className="text-center text-xs text-gray-400 font-medium">
                            Please contact your system administrator to request the necessary permissions to use DHIS2 Audit Vision.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
