import React from 'react';
import { 
  Workflow, 
  FileDown, 
  Layers, 
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
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800"
    },
    {
      step: "02",
      icon: Database,
      title: "Fetch Member Database",
      desc: "Pulls all active & expired members from Google Sheet or database.",
      tech: "Google Sheets / Webhook",
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800"
    },
    {
      step: "03",
      icon: Cpu,
      title: "Calculate Expiry & Logic",
      desc: "Calculates difference between today and expiryDate. Flags ≤ 3 days & expired.",
      tech: "n8n Code Node (JS)",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800"
    },
    {
      step: "04",
      icon: GitFork,
      title: "IF Condition Filter",
      desc: "Checks if reminder was already sent today to prevent spamming.",
      tech: "n8n IF Node",
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800"
    },
    {
      step: "05",
      icon: MessageSquare,
      title: "Dispatch WhatsApp API",
      desc: "Sends personalized WhatsApp reminder with instant UPI QR & payment link.",
      tech: "WhatsApp API / HTTP Node",
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800"
    },
    {
      step: "06",
      icon: Calendar,
      title: "Owner Morning Summary",
      desc: "Compiles total active, expiring & expired counts and sends to gym owner.",
      tech: "Daily Report Bot",
      color: "text-pink-600 bg-pink-50 dark:bg-pink-950/60 border-pink-200 dark:border-pink-800"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">n8n Automation Pipeline</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The exact workflow pipeline featured in the viral Instagram Reel.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadWorkflow}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {workflowSteps.map((node) => {
            const Icon = node.icon;
            return (
              <div 
                key={node.step}
                className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden space-y-2 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    NODE #{node.step}
                  </span>
                  <div className={`p-2 rounded-xl border ${node.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{node.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {node.desc}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{node.tech}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* n8n Import Instructions Guide */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-3 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          How to Setup this Automation in n8n (Step-by-Step):
        </h3>

        <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside leading-relaxed">
          <li>
            <strong className="text-slate-900 dark:text-white">Download Workflow:</strong> Click the <span className="text-emerald-600 dark:text-emerald-400 font-semibold">"Download n8n Workflow (.json)"</span> button above.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Open n8n:</strong> Log in to your self-hosted n8n (Docker / Render / Railway) or n8n Cloud account.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Import Workflow:</strong> Click on <span className="font-semibold text-slate-800 dark:text-slate-200">Workflows &rarr; Import from File</span> and upload <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 font-mono">gym-automation-workflow.json</code>.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Connect Google Sheet:</strong> Paste your spreadsheet ID containing member columns (<code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300">Name, Phone, Plan, Joined, Expiry, Status</code>).
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Connect WhatsApp:</strong> Add your WhatsApp Cloud API Token or webhook to trigger automated WhatsApp messages.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Activate:</strong> Switch the workflow toggle to <span className="text-emerald-600 dark:text-emerald-400 font-bold">ACTIVE</span>! The automation executes every morning.
          </li>
        </ol>
      </div>

    </div>
  );
}
