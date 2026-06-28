import {
  AlertCircleIcon,
  CheckCheckIcon,
  PlusIcon,
  UnplugIcon,
} from "lucide-react";
import { PLATFORMS } from "../assets/assets";

interface AccountListProps {
  accounts: any[];
  onDisconnect: (accountId: string) => Promise<void>;
}

const AccountList = ({ accounts, onDisconnect }: AccountListProps) => {
  const handleDisconnect = async (accountId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to disconnect this account?",
    );
    if (!confirm) return;
    await onDisconnect(accountId);
  };

  if (accounts.length === 0)
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center py-20 px-6">
        <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
          <PlusIcon className="size-6 text-slate-500 opacity-50" />
        </div>
        <p className="text-slate-700 text-lg">No accounts connected</p>
        <p className="text-slate-400 text-sm mt-1 max-w-xs text-center">
          Connect your accounts to start scheduling posts and automating content
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-4">
      {accounts.map((account, index) => {
        const meta = PLATFORMS.find((p) => p.id === account.platform);
        if (!meta) return null;

        return (
          <div
            key={index}
            className="group bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-300 hover:shadow-md transition-all duration-200"
          >
            <div className="size-12 flex justify-center items-center bg-slate-50 rounded-xl shrink-0">
              <meta.icon className="size-5 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-700 truncate">
                {account.handle}
              </div>
              <div className="text-sm text-slate-500 mt-0.5">{meta.name}</div>
            </div>
            <div className="flex gap-1.5m items-center shrink-0">
              {account.status === "connected" ? (
                <>
                  <CheckCheckIcon className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    Connected
                  </span>
                </>
              ) : (
                <>
                  <AlertCircleIcon className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    Disconnected
                  </span>
                </>
              )}
              <button
                onClick={() => handleDisconnect(account._id)}
                className=" flex flex-row items-center gap-1 ml-2 p-2 hover:bg-red-50 hover:text-red-600 text-slate-500 rounded-lg transition-colors"
                title="Disconnect Account"
              >
                <UnplugIcon className="size-4" />
                <span className="text-xs">Disconnect</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountList;
