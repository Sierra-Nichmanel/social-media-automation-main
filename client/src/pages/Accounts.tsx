import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { dummyAccountsData, PLATFORMS } from "../assets/assets";
import AccountList from "../components/AccountList";
import PlatformPickerModal from "../components/PlatformPickerModal";

const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [, setShowPlatformPicker] = useState(false);

  const fetchAccounts = async (
    isSync = false,
    platform?: string | null,
    SuccessMsg?: string,
  ) => {
    setAccounts(dummyAccountsData);
    console.log(isSync, platform, SuccessMsg);
  };

  useEffect(()=>{
    fetchAccounts()
  }, []); 
  
  const handleConnect = (platformId : string) => {
    setConnecting(platformId);
    setTimeout(() => {
      setConnecting(null)
      setAccounts((prev) => [...prev, dummyAccountsData[0]])
      setShowPlatformPicker(false);
    }, 1000);
    
  };

  const handleDisconnect = (accountId: string) => {
    setAccounts(accounts.filter((a) => a._id !== accountId));
  };

  const connectedIds = accounts.map((a) => a.platform);

  

  const handleOpenAuthWindow = () => {
    // TODO: Open Auth window
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
        <div>
          <h2 className="text-xl text-slate-900">Connected Accounts</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {accounts.length} of {PLATFORMS.length} platforms connected
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-all w-full sm:w-auto justify-center"
        >
          <PlusIcon className="size-4" /> Connect Accounts
        </button>
      </div>

      {/* Platform Picker Modal */}
      {isModalOpen && (
        <PlatformPickerModal
        isOpen={isModalOpen}
        connectedIds={connectedIds}
        connecting={connecting}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnect}
        />
      )}

      {/* Connected Accounts List */}
      <AccountList accounts={accounts} onDisconnect={handleDisconnect} />
    </div>
  );
};

export default Accounts;
