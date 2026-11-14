import React from 'react';
import { 
  Workflow, 
  FileDown, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  ArrowRight, 
  Clock, 
  Database, 
  Cpu, 
  GitFork, 
  MessageSquare, 
  Calendar 
} from 'lucide-react';

export default function N8nWorkflowViewer() {
  const handleDownloadWorkflow = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}gym-automation-workflow.json`;
    link.download = 'gym-automation-workflow.json';
    link.click();
  };

  const workflowSteps = [
    {
      step: "01",
      icon: Clock,
      title: "Daily Cron Trigger",
      desc: "Executes every morning at 09:00 AM automatically.",
      tech: "n8n Schedule Trigger",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400"
    },
    {
      step: "02",
      icon: Database,
      title: "Fetch Member Database",
      desc: "Pulls all active & expired members from Google Sheet or database.",
      tech: "Google Sheets / Webhook",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400"
    },
    {
      step: "03",
      icon: Cpu,
      title: "Calculate Expiry & Logic",
      desc: "Calculates difference between today and expiryDate. Flags ≤ 3 days & expired.",
      tech: "n8n Code Node (JS)",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400"
    },
    {
      step: "04",
      icon: GitFork,
      title: "IF Condition Filter",
      desc: "Checks if reminder was already sent today to prevent spamming.",
      tech: "n8n IF Node",
      color: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400"
    },
    {
      step: "05",
      icon: MessageSquare,
      title: "Dispatch WhatsApp API",
      desc: "Sends personalized WhatsApp reminder with instant UPI QR & payment link.",
      tech: "WhatsApp API / HTTP Node",
      color: "from-emerald-500/20 to-cyan-500/10 border-emerald-500/30 text-emerald-400"
    },
    {
      step: "06",
      icon: Calendar,
      title: "Owner Morning Summary",
      desc: "Compiles total active, expiring & expired counts and sends to gym owner.",
      tech: "Daily Report Bot",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-cyan-500/15 via-blue-600/10 to-transparent border border-cyan-500/25 p-5 sm:p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">n8n Automation Pipeline</h2>
              <p className="text-xs text-slate-300">
                The exact zero-code / low-code workflow pipeline featured in the viral Instagram Reel!
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadWorkflow}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <FileDown className="w-4 h-4" />
            <span>Download n8n Workflow (.json)</span>
          </button>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Execution Flow Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map((node, index) => {
            const Icon = node.icon;
            return (
              <div 
                key={node.step}
                className={`p-5 rounded-2xl border bg-gradient-to-b ${node.color} bg-slate-900/80 relative overflow-hidden group hover:scale-[1.02] transition-all`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-950/80 border border-white/10 text-slate-300">
                    NODE #{node.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-white/10 text-white group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-sm font-black text-white">{node.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {node.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{node.tech}</span>
                  <span className="text-emerald-400 font-bold">Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* n8n Import Instructions Guide */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          How to Setup this Automation in n8n (Step-by-Step):
        </h3>

        <ol className="space-y-2.5 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
          <li>
            <strong className="text-white">Download Workflow:</strong> Click the <span className="text-cyan-400 font-semibold">"Download n8n Workflow (.json)"</span> button above.
          </li>
          <li>
            <strong className="text-white">Open n8n:</strong> Log in to your self-hosted n8n (Docker / Render / Railway) or n8n Cloud account.
          </li>
          <li>
            <strong className="text-white">Import Workflow:</strong> Click on <span className="font-semibold text-slate-100">Workflows &rarr; Import from File</span> and upload the downloaded <code className="px-1.5 py-0.5 rounded bg-slate-950 text-cyan-400 font-mono">gym-automation-workflow.json</code>.
          </li>
          <li>
            <strong className="text-white">Connect Google Sheet:</strong> Paste your Google Sheet spreadsheet ID containing the member columns (<code className="px-1 py-0.5 rounded bg-slate-950 text-slate-300">Name, Phone, Plan, Joined, Expiry, Status</code>).
          </li>
          <li>
            <strong className="text-white">Configure WhatsApp:</strong> Add your WhatsApp Cloud API Token or webhook to trigger direct automated WhatsApp messages.
          </li>
          <li>
            <strong className="text-white">Activate:</strong> Switch the workflow toggle to <span className="text-emerald-400 font-bold">ACTIVE</span>! The automation will execute every morning without requiring any manual effort.
          </li>
        </ol>
      </div>

    </div>
  );
}
