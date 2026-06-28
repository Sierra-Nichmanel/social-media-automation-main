import { CheckCheckIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

interface PlatformPickerModalProps {
  isOpen: boolean;
  connectedIds: string[];
  connecting: string | null;
  onClose: () => void;
  onConnect: (platformId: string) => void;
}

const PlatformPickerModal = ({
  isOpen,
  connectedIds,
  connecting,
  onClose,
  onConnect,
}: PlatformPickerModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center backdrop-blur transition-opacity duration-300">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100 transition-all duration-300 ease-out scale-95 opacity-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shadow">
          <h2 className="text-xl font-semibold">Connect Account</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
          >
            <XIcon className="size-4" />
          </button>
        </div>
        {/* Platform List */}
        <div className="flex flex-col gap-2 mt-4">
          {PLATFORMS.map((p) => {
            const isConnected = connectedIds.includes(p.id);
            const isConnecting = connecting === p.id;
            const Icon = p.icon; // Capitalize variable to use it as a component

            return (
              <button
                key={p.id}
                disabled={isConnecting || isConnected}
                onClick={() => onConnect(p.id)}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${isConnected ? "opacity-60 cursor-not-allowed" : "border-slate-200 bg-slate-50 border hover:bg-slate-100 hover:border-slate-300 cursor-pointer"} ${isConnecting ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`size-5 ${isConnected ? "text-red-600" : "text-slate-500"}`}
                  />

                  {/* Label */}
                  <div className="text-left">
                    <div
                      className={`text-sm ${isConnected ? "text-red-700" : "text-slate-800"}`}
                    >
                      {p.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {/* Fixed missing quotes on "Already Connected" */}
                      {isConnected ? "Already Connected" : p.description}
                    </div>
                  </div>
                </div>

                {/* Status */}
                {isConnected && (
                  <CheckCheckIcon className="text-green-500 size-4 shrink-0" />
                )}
                {isConnecting && (
                  <div className="size-4 border-2 border-red-600 rounded-full border-t-transparent shrink-0 animate-spin" />
                )}
                {!isConnected && !isConnecting && (
                  <ExternalLinkIcon className="size-3 text-slate-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlatformPickerModal;
