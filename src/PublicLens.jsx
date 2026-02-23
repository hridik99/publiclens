import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { Search, MapPin, Users, TrendingUp, Shield, ChevronRight, Bell, LogOut, Settings, Eye, FileText, AlertCircle, CheckCircle, Clock, Upload, Filter, Grid, Map, Building, Activity, Home, BarChart2, User, Menu, X, ChevronDown, ArrowRight, Plus, Camera, Check, AlertTriangle, RefreshCw, Download, Layers, Info, Flag, Database, Lock, Navigation, Calendar, MessageSquare, ThumbsUp, ThumbsDown, Trash2, Edit, MoreVertical } from "lucide-react";

// ============================================================
// MOCK DATA
// ============================================================
const CONSTITUENCIES = [
  { id: 1, name: "Jaipur City", district: "Jaipur", type: "Assembly", mla: "Rajesh Sharma", mp: "Arjun Singh", mlaPhoto: null, mpPhoto: null, attendance: 87, questions: 42, mlalad: { allocated: 2500000, utilized: 1875000 }, mplad: { allocated: 5000000, utilized: 3250000 }, schools: 312, phc: 28, roads: 847, water: 145, issues: 234 },
  { id: 2, name: "Jodhpur", district: "Jodhpur", type: "Assembly", mla: "Priya Mehta", mp: "Vikram Rathore", mlaPhoto: null, mpPhoto: null, attendance: 91, questions: 67, mlalad: { allocated: 2500000, utilized: 2100000 }, mplad: { allocated: 5000000, utilized: 4100000 }, schools: 278, phc: 22, roads: 712, water: 118, issues: 189 },
  { id: 3, name: "Udaipur", district: "Udaipur", type: "Assembly", mla: "Suresh Kumar", mp: "Anita Patel", mlaPhoto: null, mpPhoto: null, attendance: 72, questions: 31, mlalad: { allocated: 2500000, utilized: 1450000 }, mplad: { allocated: 5000000, utilized: 2750000 }, schools: 198, phc: 19, roads: 623, water: 97, issues: 312 },
  { id: 4, name: "Ajmer", district: "Ajmer", type: "Assembly", mla: "Manoj Verma", mp: "Deepak Yadav", mlaPhoto: null, mpPhoto: null, attendance: 83, questions: 55, mlalad: { allocated: 2500000, utilized: 2050000 }, mplad: { allocated: 5000000, utilized: 3900000 }, schools: 245, phc: 24, roads: 698, water: 132, issues: 156 },
  { id: 5, name: "Kota", district: "Kota", type: "Assembly", mla: "Sanjay Gupta", mp: "Rekha Singh", mlaPhoto: null, mpPhoto: null, attendance: 95, questions: 78, mlalad: { allocated: 2500000, utilized: 2350000 }, mplad: { allocated: 5000000, utilized: 4500000 }, schools: 289, phc: 31, roads: 789, water: 167, issues: 98 },
  { id: 6, name: "Bikaner", district: "Bikaner", type: "Assembly", mla: "Kavita Joshi", mp: "Ramesh Bishnoi", mlaPhoto: null, mpPhoto: null, attendance: 78, questions: 38, mlalad: { allocated: 2500000, utilized: 1680000 }, mplad: { allocated: 5000000, utilized: 2980000 }, schools: 167, phc: 15, roads: 534, water: 89, issues: 267 },
  { id: 7, name: "Alwar", district: "Alwar", type: "Assembly", mla: "Dinesh Chauhan", mp: "Sunita Sharma", mlaPhoto: null, mpPhoto: null, attendance: 68, questions: 24, mlalad: { allocated: 2500000, utilized: 1250000 }, mplad: { allocated: 5000000, utilized: 2100000 }, schools: 223, phc: 21, roads: 612, water: 103, issues: 345 },
  { id: 8, name: "Bhilwara", district: "Bhilwara", type: "Assembly", mla: "Geeta Rawat", mp: "Harish Nagar", mlaPhoto: null, mpPhoto: null, attendance: 89, questions: 61, mlalad: { allocated: 2500000, utilized: 2200000 }, mplad: { allocated: 5000000, utilized: 3800000 }, schools: 256, phc: 26, roads: 734, water: 141, issues: 123 },
];

const ISSUES_DATA = [
  { id: 1, constituency_id: 1, category: "Road", description: "Potholes on NH-48 near Sindhi Camp causing accidents", reports: 47, status: "Under Review", lat: 26.9124, lng: 75.7873, date: "2024-01-15" },
  { id: 2, constituency_id: 1, category: "Water", description: "No water supply for 3 days in Vaishali Nagar sector 5", reports: 89, status: "Resolved", lat: 26.9215, lng: 75.7432, date: "2024-01-18" },
  { id: 3, constituency_id: 2, category: "Electricity", description: "Frequent power cuts in Shastri Nagar area", reports: 34, status: "In Progress", lat: 26.3019, lng: 73.0169, date: "2024-01-20" },
  { id: 4, constituency_id: 3, category: "Health", description: "PHC at Fatehpura non-functional for 2 weeks", reports: 62, status: "Under Review", lat: 24.5854, lng: 73.7125, date: "2024-01-22" },
  { id: 5, constituency_id: 1, category: "Education", description: "School building roof damaged, classes held outside", reports: 28, status: "Resolved", lat: 26.8887, lng: 75.8071, date: "2024-01-25" },
  { id: 6, constituency_id: 4, category: "Road", description: "Bridge on Loni river needs urgent repair", reports: 93, status: "In Progress", lat: 26.4499, lng: 74.6399, date: "2024-01-28" },
  { id: 7, constituency_id: 5, category: "Water", description: "Contaminated water supply in Talwandi ward", reports: 71, status: "Under Review", lat: 25.2138, lng: 75.8648, date: "2024-02-01" },
  { id: 8, constituency_id: 2, category: "Education", description: "Teacher shortage in Govt. Secondary School No. 3", reports: 19, status: "Pending", lat: 26.2889, lng: 73.0001, date: "2024-02-03" },
];

const PROJECTS = [
  { id: 1, name: "Road Widening NH-48 Bypass", location: "Jaipur North", cost: 450000, status: "Completed", category: "Roads", year: 2023 },
  { id: 2, name: "Community Health Center Renovation", location: "Malviya Nagar", cost: 380000, status: "In Progress", category: "Health", year: 2024 },
  { id: 3, name: "Solar Street Lighting - Phase 1", location: "Various Wards", cost: 290000, status: "Completed", category: "Electricity", year: 2023 },
  { id: 4, name: "Water Treatment Plant Upgrade", location: "Sanganer", cost: 520000, status: "In Progress", category: "Water", year: 2024 },
  { id: 5, name: "Primary School Building Construction", location: "Muhana", cost: 340000, status: "Tendered", category: "Education", year: 2024 },
  { id: 6, name: "Storm Drain Construction Phase 2", location: "Civil Lines", cost: 210000, status: "Completed", category: "Drainage", year: 2023 },
];

const FUND_MONTHLY = [
  { month: "Apr", allocated: 208333, utilized: 150000 },
  { month: "May", allocated: 208333, utilized: 195000 },
  { month: "Jun", allocated: 208333, utilized: 180000 },
  { month: "Jul", allocated: 208333, utilized: 220000 },
  { month: "Aug", allocated: 208333, utilized: 165000 },
  { month: "Sep", allocated: 208333, utilized: 195000 },
  { month: "Oct", allocated: 208333, utilized: 210000 },
  { month: "Nov", allocated: 208333, utilized: 175000 },
  { month: "Dec", allocated: 208333, utilized: 225000 },
  { month: "Jan", allocated: 208333, utilized: 160000 },
];

const ISSUE_TREND = [
  { week: "W1", Road: 12, Water: 8, Electricity: 15, Health: 5, Education: 3 },
  { week: "W2", Road: 18, Water: 14, Electricity: 12, Health: 8, Education: 6 },
  { week: "W3", Road: 9, Water: 22, Electricity: 10, Health: 11, Education: 4 },
  { week: "W4", Road: 24, Water: 16, Electricity: 18, Health: 7, Education: 9 },
  { week: "W5", Road: 15, Water: 11, Electricity: 21, Health: 14, Education: 7 },
  { week: "W6", Road: 20, Water: 19, Electricity: 13, Health: 9, Education: 12 },
];

const CATEGORY_COLORS = {
  Road: "#F59E0B",
  Water: "#3B82F6",
  Electricity: "#8B5CF6",
  Health: "#EF4444",
  Education: "#10B981",
  Drainage: "#6B7280",
};

const ADMIN_USERS = [
  { id: 1, name: "Rohit Sharma", phone: "+91 98765 43210", epic: "EPIC_VERIFIED", role: "citizen", joined: "2024-01-05", issues: 7, verified: true },
  { id: 2, name: "Priya Singh", phone: "+91 87654 32109", epic: null, role: "citizen", joined: "2024-01-12", issues: 3, verified: false },
  { id: 3, name: "Amit Kumar", phone: "+91 76543 21098", epic: "EPIC_VERIFIED", role: "citizen", joined: "2024-01-18", issues: 12, verified: true },
  { id: 4, name: "Sunita Devi", phone: "+91 65432 10987", epic: null, role: "citizen", joined: "2024-01-25", issues: 1, verified: false },
];

// ============================================================
// DESIGN TOKENS & HELPERS
// ============================================================
const fmt = (n) => n >= 10000000 ? `₹${(n/10000000).toFixed(1)}Cr` : n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${(n/1000).toFixed(0)}K`;
const pct = (u, a) => Math.round((u/a)*100);
const statusColor = (s) => ({ "Completed": "text-emerald-600 bg-emerald-50", "In Progress": "text-blue-600 bg-blue-50", "Tendered": "text-amber-600 bg-amber-50", "Pending": "text-gray-500 bg-gray-100", "Resolved": "text-emerald-600 bg-emerald-50", "Under Review": "text-amber-600 bg-amber-50" }[s] || "text-gray-500 bg-gray-100");
const categoryIcon = (cat) => ({ Road: "🛣️", Water: "💧", Electricity: "⚡", Health: "🏥", Education: "📚", Drainage: "🌊" }[cat] || "📌");

// ============================================================
// SHARED COMPONENTS
// ============================================================
function StatCard({ icon, label, value, sub, color = "blue", trend }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    amber: "from-amber-500 to-amber-600",
    emerald: "from-emerald-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    rose: "from-rose-500 to-rose-600",
    slate: "from-slate-600 to-slate-700",
  };
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white text-lg shadow-sm`}>
          {icon}
        </div>
        {trend != null && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"}`}>
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm font-medium text-gray-600 mt-0.5">{label}</div>
        {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
      </div>
    </div>
  );
}

function ProgressBar({ value, max, color = "blue", label, sublabel }) {
  const pctVal = Math.min(100, Math.round((value/max)*100));
  const colors = { blue: "bg-blue-500", amber: "bg-amber-500", emerald: "bg-emerald-500", rose: "bg-rose-500" };
  return (
    <div>
      {label && <div className="flex justify-between text-sm mb-1.5"><span className="font-medium text-gray-700">{label}</span><span className="text-gray-500">{pctVal}%</span></div>}
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]} rounded-full transition-all duration-700`} style={{ width: `${pctVal}%` }} />
      </div>
      {sublabel && <div className="text-xs text-gray-400 mt-1">{sublabel}</div>}
    </div>
  );
}

function Badge({ label, color = "blue" }) {
  const colors = {
    blue: "text-blue-700 bg-blue-50 border-blue-200",
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-200",
    amber: "text-amber-700 bg-amber-50 border-amber-200",
    rose: "text-rose-700 bg-rose-50 border-rose-200",
    purple: "text-purple-700 bg-purple-50 border-purple-200",
    gray: "text-gray-600 bg-gray-50 border-gray-200",
  };
  return <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${colors[color]}`}>{label}</span>;
}

function TabNav({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${active === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ title, sub, action }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {sub && <p className="text-sm text-gray-500 mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ============================================================
// NAVIGATION
// ============================================================
function Sidebar({ page, setPage, user, setUser }) {
  const navItems = [
    { id: "home", icon: <Home size={18}/>, label: "State Overview" },
    { id: "constituencies", icon: <MapPin size={18}/>, label: "Constituencies" },
    { id: "funds", icon: <BarChart2 size={18}/>, label: "Fund Tracker" },
    { id: "infrastructure", icon: <Building size={18}/>, label: "Infrastructure" },
    { id: "issues", icon: <AlertCircle size={18}/>, label: "Public Issues" },
    { id: "profile", icon: <User size={18}/>, label: "My Dashboard" },
    ...(user?.role === "admin" ? [{ id: "admin", icon: <Settings size={18}/>, label: "Admin CMS", divider: true }] : []),
  ];

  return (
    <aside className="w-64 bg-[#0F172A] flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <Eye size={18} className="text-white"/>
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-none">PublicLens</div>
            <div className="text-blue-300 text-xs mt-0.5">Rajasthan Civic Platform</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(item => (
          <div key={item.id}>
            {item.divider && <div className="my-2 border-t border-white/10"/>}
            <button onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${page === item.id ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
              {item.icon}
              {item.label}
            </button>
          </div>
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-2">
        {user ? (
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="text-white text-sm font-semibold leading-none">{user.name}</div>
                <div className="text-slate-400 text-xs mt-0.5 capitalize">{user.role}</div>
              </div>
              {user.verified && <Shield size={14} className="ml-auto text-emerald-400"/>}
            </div>
            <button onClick={() => setUser(null)} className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white text-xs py-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <LogOut size={13}/> Sign Out
            </button>
          </div>
        ) : (
          <button onClick={() => setPage("login")}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
            Sign In / Register
          </button>
        )}
        <div className="text-center text-slate-600 text-xs">v1.0.0 MVP · Neutral · Open Data</div>
      </div>
    </aside>
  );
}

// ============================================================
// PAGE: HOME / STATE OVERVIEW
// ============================================================
function HomePage({ setPage, setSelectedConstituency }) {
  const [search, setSearch] = useState("");
  const filtered = CONSTITUENCIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.district.toLowerCase().includes(search.toLowerCase())
  );

  const totalFunds = CONSTITUENCIES.reduce((s, c) => s + c.mlalad.allocated + c.mplad.allocated, 0);
  const totalUtilized = CONSTITUENCIES.reduce((s, c) => s + c.mlalad.utilized + c.mplad.utilized, 0);
  const totalIssues = CONSTITUENCIES.reduce((s, c) => s + c.issues, 0);

  const issuesByCategory = [
    { name: "Road", value: ISSUES_DATA.filter(i => i.category === "Road").reduce((s,i)=>s+i.reports,0) },
    { name: "Water", value: ISSUES_DATA.filter(i => i.category === "Water").reduce((s,i)=>s+i.reports,0) },
    { name: "Electricity", value: ISSUES_DATA.filter(i => i.category === "Electricity").reduce((s,i)=>s+i.reports,0) },
    { name: "Health", value: ISSUES_DATA.filter(i => i.category === "Health").reduce((s,i)=>s+i.reports,0) },
    { name: "Education", value: ISSUES_DATA.filter(i => i.category === "Education").reduce((s,i)=>s+i.reports,0) },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#0F172A] rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 30% 50%, #3B82F6 0%, transparent 60%), radial-gradient(circle at 80% 20%, #60A5FA 0%, transparent 50%)"}}/>
        <div className="relative z-10">
          <Badge label="Rajasthan · 2024–25 Data" color="blue"/>
          <h1 className="text-3xl font-black text-white mt-3 leading-tight">Rajasthan Civic Intelligence<br/><span className="text-blue-300">State Dashboard</span></h1>
          <p className="text-slate-300 mt-2 text-sm max-w-xl">Neutral, structured public data for every constituency across Rajasthan. Track funds, infrastructure, and civic issues transparently.</p>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setPage("constituencies")} className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
              Explore Constituencies <ArrowRight size={15}/>
            </button>
            <button onClick={() => setPage("issues")} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              View Issue Heatmap
            </button>
          </div>
        </div>
      </div>

      {/* State Metrics */}
      <div>
        <SectionHeader title="Rajasthan at a Glance" sub="Real-time aggregated data from all constituencies"/>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="🏛️" label="Total Constituencies" value="200" sub="Assembly seats" color="blue" trend={0}/>
          <StatCard icon="👥" label="Total MLAs" value="200" sub="Active representatives" color="slate" trend={0}/>
          <StatCard icon="💰" label="Total Fund Allocation" value={fmt(totalFunds)} sub="MLALAD + MPLAD combined" color="emerald" trend={12}/>
          <StatCard icon="📊" label="Utilization Rate" value={`${pct(totalUtilized,totalFunds)}%`} sub="Funds utilized state-wide" color="amber" trend={8}/>
        </div>
      </div>

      {/* Search + Issue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionHeader title="Search Constituency" action={<Badge label={`${CONSTITUENCIES.length} loaded`} color="gray"/>}/>
          <div className="relative mb-4">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by constituency name or district..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"/>
          </div>
          <div className="grid gap-3">
            {filtered.slice(0, 6).map(c => (
              <button key={c.id} onClick={() => { setSelectedConstituency(c); setPage("constituency-detail"); }}
                className="bg-white border border-gray-100 rounded-xl p-4 text-left hover:shadow-md hover:border-blue-200 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-sm">
                      {c.name.substring(0,2)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{c.name}</div>
                      <div className="text-xs text-gray-400">{c.district} District</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-gray-400">Fund Util.</div>
                      <div className="text-sm font-bold text-emerald-600">{pct(c.mlalad.utilized, c.mlalad.allocated)}%</div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-gray-400">Issues</div>
                      <div className="text-sm font-bold text-rose-500">{c.issues}</div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors"/>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {filtered.length > 6 && (
            <button onClick={() => setPage("constituencies")} className="mt-3 w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2">
              View all {filtered.length} constituencies →
            </button>
          )}
        </div>

        <div>
          <SectionHeader title="Issue Categories" sub="State-wide aggregated reports"/>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={issuesByCategory} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {issuesByCategory.map((entry) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name]}/>
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v} reports`, n]}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {issuesByCategory.map(cat => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{background: CATEGORY_COLORS[cat.name]}}/>
                    <span className="text-gray-600">{cat.name}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Issue Trend */}
      <div>
        <SectionHeader title="Weekly Issue Trend" sub="6-week rolling window across all districts"/>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ISSUE_TREND}>
              <defs>
                {Object.entries(CATEGORY_COLORS).slice(0,5).map(([k,v]) => (
                  <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={v} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={v} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="week" tick={{fontSize:12}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:12}} axisLine={false} tickLine={false}/>
              <Tooltip/>
              {Object.entries(CATEGORY_COLORS).slice(0,5).map(([k,v]) => (
                <Area key={k} type="monotone" dataKey={k} stroke={v} strokeWidth={2} fill={`url(#grad-${k})`}/>
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Updates */}
      <div>
        <SectionHeader title="Recent Data Updates" sub="Latest additions to the platform"/>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "💰", title: "MLALAD Fund Data Updated", desc: "Q3 2024-25 fund utilization data for 198 constituencies uploaded", time: "2 hours ago", type: "funds" },
            { icon: "🏗️", title: "Infrastructure Survey", desc: "Road & water project data refreshed for Jaipur, Jodhpur districts", time: "Yesterday", type: "infra" },
            { icon: "👥", title: "MLA Attendance Updated", desc: "Winter Session 2024 attendance data now reflects for all MLAs", time: "3 days ago", type: "profile" },
          ].map((u, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="text-2xl mb-2">{u.icon}</div>
              <div className="font-semibold text-gray-900 text-sm">{u.title}</div>
              <div className="text-xs text-gray-500 mt-1">{u.desc}</div>
              <div className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Clock size={11}/>{u.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGE: CONSTITUENCIES LIST
// ============================================================
function ConstituenciesPage({ setPage, setSelectedConstituency }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const filtered = CONSTITUENCIES
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.district.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "utilization") return pct(b.mlalad.utilized, b.mlalad.allocated) - pct(a.mlalad.utilized, a.mlalad.allocated);
      if (sort === "issues") return b.issues - a.issues;
      if (sort === "attendance") return b.attendance - a.attendance;
      return 0;
    });

  return (
    <div className="p-6 space-y-6">
      <SectionHeader title="All Constituencies" sub={`${CONSTITUENCIES.length} constituencies loaded · Rajasthan Assembly`}/>
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-60">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search constituency or district..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"/>
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none cursor-pointer">
          <option value="name">Sort: Name</option>
          <option value="utilization">Sort: Fund Utilization</option>
          <option value="issues">Sort: Most Issues</option>
          <option value="attendance">Sort: MLA Attendance</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-2">Constituency</div>
          <div className="text-center">MLA Attendance</div>
          <div className="text-center">Fund Util.</div>
          <div className="text-center">Open Issues</div>
          <div className="text-center">Action</div>
        </div>
        {filtered.map((c, i) => (
          <div key={c.id} className={`grid grid-cols-6 gap-4 px-5 py-4 items-center hover:bg-blue-50/50 transition-colors ${i < filtered.length-1 ? "border-b border-gray-50" : ""}`}>
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-700 text-xs font-black">
                {c.name.substring(0,2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{c.name}</div>
                <div className="text-xs text-gray-400">{c.district}</div>
              </div>
            </div>
            <div className="text-center">
              <span className={`text-sm font-bold ${c.attendance >= 85 ? "text-emerald-600" : c.attendance >= 70 ? "text-amber-600" : "text-rose-500"}`}>
                {c.attendance}%
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-blue-600">{pct(c.mlalad.utilized, c.mlalad.allocated)}%</span>
              <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{width:`${pct(c.mlalad.utilized, c.mlalad.allocated)}%`}}/>
              </div>
            </div>
            <div className="text-center">
              <span className={`text-sm font-bold ${c.issues > 250 ? "text-rose-500" : c.issues > 150 ? "text-amber-600" : "text-emerald-600"}`}>
                {c.issues}
              </span>
            </div>
            <div className="text-center">
              <button onClick={() => { setSelectedConstituency(c); setPage("constituency-detail"); }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                View →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// PAGE: CONSTITUENCY DETAIL
// ============================================================
function ConstituencyDetailPage({ constituency, setPage }) {
  const [tab, setTab] = useState("overview");
  const c = constituency;
  if (!c) return <div className="p-6 text-gray-500">No constituency selected.</div>;

  const fundCategoryBreakdown = [
    { name: "Roads", value: Math.round(c.mlalad.allocated * 0.35) },
    { name: "Health", value: Math.round(c.mlalad.allocated * 0.20) },
    { name: "Education", value: Math.round(c.mlalad.allocated * 0.18) },
    { name: "Water", value: Math.round(c.mlalad.allocated * 0.15) },
    { name: "Other", value: Math.round(c.mlalad.allocated * 0.12) },
  ];

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => setPage("constituencies")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        ← Back to Constituencies
      </button>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge label={`${c.district} District`} color="blue"/>
            <h1 className="text-2xl font-black text-white mt-2">{c.name}</h1>
            <p className="text-slate-300 text-sm mt-1">Assembly Constituency · Rajasthan</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
              <div className="text-white font-bold">{c.mla}</div>
              <div className="text-slate-300 text-xs mt-0.5">MLA</div>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
              <div className="text-white font-bold">{c.mp}</div>
              <div className="text-slate-300 text-xs mt-0.5">MP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <TabNav
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "funds", label: "Funds" },
          { id: "infrastructure", label: "Infrastructure" },
          { id: "issues", label: "Public Issues" },
          { id: "documents", label: "Documents" },
        ]}
        active={tab} onChange={setTab}
      />

      {/* Overview Tab */}
      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="📅" label="MLA Attendance" value={`${c.attendance}%`} sub="Winter Session 2024" color={c.attendance >= 85 ? "emerald" : c.attendance >= 70 ? "amber" : "rose"}/>
            <StatCard icon="❓" label="Questions Asked" value={c.questions} sub="Legislative session" color="blue"/>
            <StatCard icon="💰" label="MLALAD Utilized" value={`${pct(c.mlalad.utilized, c.mlalad.allocated)}%`} sub={`${fmt(c.mlalad.utilized)} of ${fmt(c.mlalad.allocated)}`} color="emerald"/>
            <StatCard icon="🏛️" label="MPLAD Utilized" value={`${pct(c.mplad.utilized, c.mplad.allocated)}%`} sub={`${fmt(c.mplad.utilized)} of ${fmt(c.mplad.allocated)}`} color="purple"/>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Fund Utilization Overview</h3>
              <div className="space-y-4">
                <div>
                  <ProgressBar value={c.mlalad.utilized} max={c.mlalad.allocated} color="blue"
                    label="MLALAD Fund" sublabel={`${fmt(c.mlalad.utilized)} utilized of ${fmt(c.mlalad.allocated)}`}/>
                </div>
                <div>
                  <ProgressBar value={c.mplad.utilized} max={c.mplad.allocated} color="purple"
                    label="MPLAD Fund" sublabel={`${fmt(c.mplad.utilized)} utilized of ${fmt(c.mplad.allocated)}`}/>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Issue Density by Category</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={[
                  { cat: "Road", val: 47 }, { cat: "Water", val: 89 },
                  { cat: "Power", val: 34 }, { cat: "Health", val: 28 }, { cat: "Edu", val: 19 },
                ]} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
                  <XAxis dataKey="cat" tick={{fontSize:11}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false}/>
                  <Tooltip/>
                  <Bar dataKey="val" fill="#3B82F6" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Funds Tab */}
      {tab === "funds" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">MLALAD Fund — 2024-25</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-blue-700">{fmt(c.mlalad.allocated)}</div>
                  <div className="text-xs text-blue-500 mt-0.5">Allocated</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-emerald-700">{fmt(c.mlalad.utilized)}</div>
                  <div className="text-xs text-emerald-500 mt-0.5">Utilized</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-amber-700">{fmt(c.mlalad.allocated - c.mlalad.utilized)}</div>
                  <div className="text-xs text-amber-500 mt-0.5">Remaining</div>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Category Breakdown</h4>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={fundCategoryBreakdown} cx="50%" cy="50%" outerRadius={65} dataKey="value" label={({name,percent}) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                    {fundCategoryBreakdown.map((_, idx) => (
                      <Cell key={idx} fill={["#3B82F6","#EF4444","#10B981","#06B6D4","#8B5CF6"][idx]}/>
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => fmt(v)}/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Monthly Disbursement Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={FUND_MONTHLY} barSize={14}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
                  <XAxis dataKey="month" tick={{fontSize:11}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}K`}/>
                  <Tooltip formatter={(v) => fmt(v)}/>
                  <Bar dataKey="allocated" fill="#E0F2FE" name="Allocated" radius={[3,3,0,0]}/>
                  <Bar dataKey="utilized" fill="#3B82F6" name="Utilized" radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Project-Level Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Project Name","Location","Cost","Category","Status"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {PROJECTS.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{p.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 flex items-center gap-1.5"><MapPin size={12}/>{p.location}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-blue-700">{fmt(p.cost)}</td>
                      <td className="px-4 py-3 text-sm">{categoryIcon(p.category)} {p.category}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(p.status)}`}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Infrastructure Tab */}
      {tab === "infrastructure" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="🏫" label="Schools" value={c.schools} sub="Govt. + Aided" color="blue"/>
            <StatCard icon="🏥" label="PHC / CHC" value={c.phc} sub="Health centers" color="rose"/>
            <StatCard icon="🛣️" label="Road Length" value={`${c.roads}km`} sub="State + District roads" color="amber"/>
            <StatCard icon="💧" label="Water Projects" value={c.water} sub="Active schemes" color="blue"/>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Infrastructure Coverage</h3>
              {[
                { label: "School Coverage", value: c.schools, max: 400, color: "blue", sub: `${c.schools} of ~400 target` },
                { label: "Health Access", value: c.phc, max: 40, color: "rose", sub: `${c.phc} PHC/CHC of 40 target` },
                { label: "Road Connectivity", value: c.roads, max: 1000, color: "amber", sub: `${c.roads}km of 1000km goal` },
                { label: "Water Scheme Coverage", value: c.water, max: 200, color: "blue", sub: `${c.water} of 200 target` },
              ].map(item => (
                <div key={item.label} className="mb-4">
                  <ProgressBar {...item}/>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Infrastructure Comparison</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[
                  { name: c.name, schools: c.schools, phc: c.phc*10, roads: c.roads/10 },
                  { name: "Avg.", schools: 240, phc: 230, roads: 70 },
                ]} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
                  <XAxis dataKey="name" tick={{fontSize:12}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false}/>
                  <Tooltip/>
                  <Bar dataKey="schools" fill="#3B82F6" name="Schools" radius={[3,3,0,0]}/>
                  <Bar dataKey="phc" fill="#EF4444" name="PHC (×10)" radius={[3,3,0,0]}/>
                  <Bar dataKey="roads" fill="#F59E0B" name="Roads (÷10)" radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 text-center mt-2">Scaled values for visual comparison</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Layers size={16}/> Layer Toggle (Map Preview)</h3>
            <p className="text-sm text-gray-500 mb-4">Select infrastructure layers to view on constituency map</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Schools", icon: "🏫", color: "blue", count: c.schools },
                { label: "Health Centers", icon: "🏥", color: "rose", count: c.phc },
                { label: "Roads", icon: "🛣️", color: "amber", count: `${c.roads}km` },
                { label: "Water Schemes", icon: "💧", color: "blue", count: c.water },
              ].map(layer => (
                <div key={layer.label} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-colors">
                  <span className="text-lg">{layer.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{layer.label}</div>
                    <div className="text-xs text-gray-400">{layer.count} points</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-white rounded-xl border border-gray-200 h-48 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Map size={32} className="mx-auto mb-2 opacity-30"/>
                <p className="text-sm">Interactive map renders with live data integration</p>
                <p className="text-xs mt-1 text-gray-300">Connect Google Maps / Mapbox API key to enable</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Issues Tab */}
      {tab === "issues" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StatCard icon="🔴" label="Open Issues" value={c.issues} sub="Aggregated reports" color="rose"/>
            <StatCard icon="✅" label="Resolved" value={Math.round(c.issues * 0.34)} sub="Last 90 days" color="emerald"/>
            <StatCard icon="🔄" label="In Progress" value={Math.round(c.issues * 0.28)} sub="Being addressed" color="amber"/>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Issue Clusters</h3>
              <div className="flex gap-2">
                {["All", "Road", "Water", "Electricity", "Health", "Education"].map(f => (
                  <button key={f} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-600 font-medium transition-colors">{f}</button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {ISSUES_DATA.filter(i => i.constituency_id === c.id || c.id <= 2).slice(0, 4).map(issue => (
                <div key={issue.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                        {categoryIcon(issue.category)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">{issue.description.substring(0,60)}...</span>
                          <Badge label={issue.category} color={issue.category === "Road" ? "amber" : issue.category === "Water" ? "blue" : issue.category === "Health" ? "rose" : "emerald"}/>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Users size={11}/>{issue.reports} reports</span>
                          <span className="flex items-center gap-1"><Calendar size={11}/>{issue.date}</span>
                          <span className="flex items-center gap-1"><MapPin size={11}/>{c.name}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColor(issue.status)}`}>{issue.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {tab === "documents" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Official source documents and references for {c.name} constituency</p>
          {[
            { name: "MLA Fund Utilization Report — Q3 2024-25", type: "PDF", size: "2.4 MB", date: "Jan 2025", source: "State Finance Dept." },
            { name: "Infrastructure Status Report 2023-24", type: "PDF", size: "1.8 MB", date: "Dec 2024", source: "PWD Rajasthan" },
            { name: "Assembly Session Attendance — Winter 2024", type: "PDF", size: "0.6 MB", date: "Dec 2024", source: "Rajasthan Assembly" },
            { name: "Constituency Demographic Profile", type: "PDF", size: "3.1 MB", date: "Nov 2024", source: "Election Commission" },
            { name: "MPLAD Sanctioned Projects List", type: "XLSX", size: "1.2 MB", date: "Jan 2025", source: "Ministry of Statistics" },
          ].map((doc, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
                  <FileText size={18} className="text-rose-500"/>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{doc.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{doc.source} · {doc.size} · {doc.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={doc.type} color="gray"/>
                <button className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                  <Download size={15}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// PAGE: FUND TRACKER
// ============================================================
function FundTrackerPage() {
  const [view, setView] = useState("mlalad");
  const totalAlloc = CONSTITUENCIES.reduce((s, c) => s + c.mlalad.allocated, 0);
  const totalUtil = CONSTITUENCIES.reduce((s, c) => s + c.mlalad.utilized, 0);
  const mplaAlloc = CONSTITUENCIES.reduce((s, c) => s + c.mplad.allocated, 0);
  const mplaUtil = CONSTITUENCIES.reduce((s, c) => s + c.mplad.utilized, 0);

  const topPerformers = [...CONSTITUENCIES].sort((a,b) => pct(b.mlalad.utilized,b.mlalad.allocated) - pct(a.mlalad.utilized,a.mlalad.allocated)).slice(0,5);
  const underperformers = [...CONSTITUENCIES].sort((a,b) => pct(a.mlalad.utilized,a.mlalad.allocated) - pct(b.mlalad.utilized,b.mlalad.allocated)).slice(0,5);

  return (
    <div className="p-6 space-y-6">
      <SectionHeader title="Fund Tracker" sub="MLALAD & MPLAD fund utilization across Rajasthan"/>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="💰" label="MLALAD Allocated" value={fmt(totalAlloc)} sub="State-wide total" color="blue"/>
        <StatCard icon="✅" label="MLALAD Utilized" value={fmt(totalUtil)} sub={`${pct(totalUtil,totalAlloc)}% utilization`} color="emerald" trend={8}/>
        <StatCard icon="🏛️" label="MPLAD Allocated" value={fmt(mplaAlloc)} sub="MP area development" color="purple"/>
        <StatCard icon="📊" label="MPLAD Utilized" value={fmt(mplaUtil)} sub={`${pct(mplaUtil,mplaAlloc)}% utilization`} color="amber" trend={5}/>
      </div>

      <div className="flex gap-3 items-center">
        <TabNav tabs={[{id:"mlalad",label:"MLALAD Funds"},{id:"mplad",label:"MPLAD Funds"},{id:"projects",label:"All Projects"}]} active={view} onChange={setView}/>
      </div>

      {(view === "mlalad" || view === "mplad") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Top Performing Constituencies</h3>
            <div className="space-y-3">
              {topPerformers.map((c, i) => {
                const util = view === "mplad" ? pct(c.mplad.utilized, c.mplad.allocated) : pct(c.mlalad.utilized, c.mlalad.allocated);
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="text-xs font-black text-gray-400 w-5">#{i+1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-gray-800">{c.name}</span><span className="text-sm font-bold text-emerald-600">{util}%</span></div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{width:`${util}%`}}/></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Needs Attention</h3>
            <div className="space-y-3">
              {underperformers.map((c, i) => {
                const util = view === "mplad" ? pct(c.mplad.utilized, c.mplad.allocated) : pct(c.mlalad.utilized, c.mlalad.allocated);
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <AlertTriangle size={14} className="text-amber-500 flex-shrink-0"/>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1"><span className="text-sm font-semibold text-gray-800">{c.name}</span><span className="text-sm font-bold text-amber-600">{util}%</span></div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-amber-400 rounded-full" style={{width:`${util}%`}}/></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Constituency-wise Utilization Chart</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={CONSTITUENCIES.map(c => ({
                name: c.name.split(" ")[0],
                allocated: view === "mplad" ? c.mplad.allocated : c.mlalad.allocated,
                utilized: view === "mplad" ? c.mplad.utilized : c.mlalad.utilized,
              }))} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
                <XAxis dataKey="name" tick={{fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v => fmt(v)}/>
                <Tooltip formatter={v => fmt(v)}/>
                <Bar dataKey="allocated" fill="#E0F2FE" name="Allocated" radius={[3,3,0,0]}/>
                <Bar dataKey="utilized" fill="#3B82F6" name="Utilized" radius={[3,3,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {view === "projects" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">All Projects</h3>
            <Badge label={`${PROJECTS.length} projects`} color="blue"/>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Project Name","Location","Cost","Category","Year","Status"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {PROJECTS.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{p.location}</td>
                    <td className="px-4 py-3 text-sm font-bold text-blue-700">{fmt(p.cost)}</td>
                    <td className="px-4 py-3 text-sm">{categoryIcon(p.category)} {p.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{p.year}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(p.status)}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PAGE: INFRASTRUCTURE
// ============================================================
function InfrastructurePage() {
  const [activeLayer, setActiveLayer] = useState("schools");
  const totalSchools = CONSTITUENCIES.reduce((s,c)=>s+c.schools,0);
  const totalPHC = CONSTITUENCIES.reduce((s,c)=>s+c.phc,0);
  const totalRoads = CONSTITUENCIES.reduce((s,c)=>s+c.roads,0);
  const totalWater = CONSTITUENCIES.reduce((s,c)=>s+c.water,0);

  const infraByConst = CONSTITUENCIES.map(c => ({
    name: c.name.split(" ")[0],
    schools: c.schools, phc: c.phc, roads: Math.round(c.roads/10), water: c.water,
  }));

  return (
    <div className="p-6 space-y-6">
      <SectionHeader title="Infrastructure Overview" sub="State-wide infrastructure data aggregated from all constituencies"/>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🏫" label="Total Schools" value={totalSchools.toLocaleString()} sub="Govt. + Aided" color="blue" trend={3}/>
        <StatCard icon="🏥" label="PHC / CHC" value={totalPHC} sub="Health centers" color="rose" trend={5}/>
        <StatCard icon="🛣️" label="Total Roads" value={`${totalRoads.toLocaleString()}km`} sub="State & District" color="amber" trend={7}/>
        <StatCard icon="💧" label="Water Schemes" value={totalWater} sub="Active projects" color="blue" trend={12}/>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Constituency-wise Infrastructure Comparison</h3>
        <div className="flex gap-2 mb-4 flex-wrap">
          {[
            { id: "schools", label: "🏫 Schools", color: "#3B82F6" },
            { id: "phc", label: "🏥 Health Centers", color: "#EF4444" },
            { id: "roads", label: "🛣️ Roads (÷10km)", color: "#F59E0B" },
            { id: "water", label: "💧 Water Schemes", color: "#06B6D4" },
          ].map(l => (
            <button key={l.id} onClick={() => setActiveLayer(l.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${activeLayer === l.id ? "text-white border-transparent shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}
              style={activeLayer === l.id ? {background: l.color, borderColor: l.color} : {}}>
              {l.label}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={infraByConst} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="name" tick={{fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false}/>
            <Tooltip/>
            <Bar dataKey={activeLayer} fill={{ schools:"#3B82F6", phc:"#EF4444", roads:"#F59E0B", water:"#06B6D4" }[activeLayer]} radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Infrastructure Map Layers</h3>
          <p className="text-sm text-gray-500 mb-4">Toggle layers to visualize infrastructure density across constituencies</p>
          <div className="space-y-2">
            {[
              { label: "Primary Schools", count: Math.round(totalSchools*0.6), color: "#3B82F6", status: "active" },
              { label: "Secondary Schools", count: Math.round(totalSchools*0.4), color: "#6366F1", status: "active" },
              { label: "Primary Health Centers", count: Math.round(totalPHC*0.7), color: "#EF4444", status: "active" },
              { label: "Community Health Centers", count: Math.round(totalPHC*0.3), color: "#F97316", status: "active" },
              { label: "State Highways", count: Math.round(totalRoads*0.2), color: "#F59E0B", status: "active" },
              { label: "District Roads", count: Math.round(totalRoads*0.8), color: "#D97706", status: "active" },
              { label: "Piped Water Projects", count: Math.round(totalWater*0.65), color: "#06B6D4", status: "active" },
              { label: "Borewells & Wells", count: Math.round(totalWater*0.35), color: "#0EA5E9", status: "active" },
            ].map((layer, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{background: layer.color}}/>
                  <span className="text-sm text-gray-700">{layer.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{layer.count.toLocaleString()} units</span>
                  <div className="w-8 h-5 bg-blue-500 rounded-full flex items-center justify-end pr-0.5 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full shadow"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Coverage Gaps Analysis</h3>
          <div className="space-y-4">
            {[
              { label: "School Coverage (< 3km radius)", covered: 78, gap: 22, unit: "of population" },
              { label: "Health Center Access (< 5km)", covered: 64, gap: 36, unit: "of villages" },
              { label: "All-Weather Road Connectivity", covered: 82, gap: 18, unit: "of habitations" },
              { label: "Piped Water Coverage", covered: 71, gap: 29, unit: "of households" },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="text-gray-500">{item.covered}% covered</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 rounded-l-full" style={{width:`${item.covered}%`}}/>
                  <div className="h-full bg-rose-200" style={{width:`${item.gap}%`}}/>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-emerald-600 font-medium">Covered</span>
                  <span className="text-rose-500 font-medium">{item.gap}% gap · {item.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-amber-50 rounded-xl p-4 border border-amber-100">
            <div className="flex items-start gap-2">
              <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5"/>
              <div>
                <div className="text-sm font-semibold text-amber-800">Priority Attention Areas</div>
                <div className="text-xs text-amber-700 mt-1">Alwar, Bikaner, and Udaipur constituencies have below-average health center coverage. Cross-reference with MPLAD fund utilization for intervention planning.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGE: PUBLIC ISSUES
// ============================================================
function PublicIssuesPage({ setPage, user }) {
  const [timeFilter, setTimeFilter] = useState("30");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState(null);

  const filtered = ISSUES_DATA.filter(i =>
    (categoryFilter === "All" || i.category === categoryFilter)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Public Issues</h1>
          <p className="text-sm text-gray-500 mt-0.5">Aggregated civic issue clusters — individual reports anonymized</p>
        </div>
        {user ? (
          <button onClick={() => setPage("submit-issue")} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
            <Plus size={15}/> Report an Issue
          </button>
        ) : (
          <button onClick={() => setPage("login")} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
            <Lock size={14}/> Login to Report
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <StatCard icon="📍" label="Total Clusters" value={ISSUES_DATA.length} sub="Across all constituencies" color="rose"/>
        <StatCard icon="👥" label="Total Reports" value={ISSUES_DATA.reduce((s,i)=>s+i.reports,0)} sub="Aggregated citizen reports" color="blue"/>
        <StatCard icon="✅" label="Resolved" value={ISSUES_DATA.filter(i=>i.status==="Resolved").length} sub="Last 90 days" color="emerald"/>
        <StatCard icon="⏳" label="Under Review" value={ISSUES_DATA.filter(i=>i.status==="Under Review").length} sub="Awaiting action" color="amber"/>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {["7","30","90"].map(d => (
            <button key={d} onClick={() => setTimeFilter(d)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${timeFilter === d ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
              {d} Days
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All","Road","Water","Electricity","Health","Education"].map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold border transition-all ${categoryFilter === cat ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
              {cat !== "All" && categoryIcon(cat)} {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Visualization */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Issue Density Heatmap</h3>
        <div className="grid grid-cols-8 gap-1.5 mb-3">
          {CONSTITUENCIES.map((c) => {
            const density = c.issues;
            const alpha = Math.min(1, density / 350);
            const intensity = Math.round(alpha * 100);
            return (
              <div key={c.id} title={`${c.name}: ${c.issues} issues`}
                className="aspect-square rounded-lg cursor-pointer hover:scale-110 transition-transform relative group"
                style={{background: `rgba(239,68,68,${0.15 + alpha*0.8})`}}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white/90 text-center leading-tight">{c.name.split(" ")[0].substring(0,3)}</span>
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {c.name}: {c.issues}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Low density</span>
          <div className="flex gap-0.5">
            {[0.15,0.3,0.45,0.6,0.75,0.9].map((a,i) => (
              <div key={i} className="w-6 h-3 rounded" style={{background:`rgba(239,68,68,${a})`}}/>
            ))}
          </div>
          <span>High density</span>
        </div>
      </div>

      {/* Issue Clusters */}
      <div className="grid gap-4">
        <SectionHeader title="Issue Clusters" sub={`${filtered.length} active clusters`}/>
        {filtered.map(issue => (
          <div key={issue.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-50 flex-shrink-0">
                {categoryIcon(issue.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-gray-900">{issue.description}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1"><Users size={11} className="text-blue-400"/><strong className="text-blue-600 font-bold">{issue.reports}</strong> reports</span>
                      <span className="flex items-center gap-1"><MapPin size={11}/>{CONSTITUENCIES.find(c=>c.id===issue.constituency_id)?.name}</span>
                      <span className="flex items-center gap-1"><Calendar size={11}/>{issue.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge label={issue.category} color={issue.category === "Road" ? "amber" : issue.category === "Water" ? "blue" : issue.category === "Health" ? "rose" : "emerald"}/>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(issue.status)}`}>{issue.status}</span>
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden w-full max-w-xs">
                  <div className="h-full bg-blue-500 rounded-full" style={{width:`${Math.min(100, issue.reports/1.5)}%`}}/>
                </div>
              </div>
            </div>
            {selectedIssue?.id === issue.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-400 text-xs mb-1">GPS Cluster</div>
                  <div className="font-mono text-xs text-gray-700">{issue.lat.toFixed(4)}, {issue.lng.toFixed(4)}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-400 text-xs mb-1">First Reported</div>
                  <div className="font-medium text-gray-700">{issue.date}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-400 text-xs mb-1">Cluster Size</div>
                  <div className="font-medium text-gray-700">{issue.reports} anonymous reports</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// PAGE: LOGIN
// ============================================================
function LoginPage({ setUser, setPage }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const sendOTP = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); }, 1200);
  };
  const verifyOTP = () => {
    if (otp.length < 4) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("setup"); }, 1000);
  };
  const complete = () => {
    if (!name) return;
    setUser({ id: Date.now(), name, phone, role: "citizen", verified: false });
    setPage("profile");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
          <Eye size={28} className="text-white"/>
        </div>
        <h1 className="text-2xl font-black text-gray-900">PublicLens</h1>
        <p className="text-gray-500 text-sm mt-1">Citizen Login · Secure & Private</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        {/* Steps */}
        <div className="flex items-center gap-2 mb-6">
          {["Phone", "Verify OTP", "Setup Profile"].map((s, i) => {
            const stepIds = ["phone","otp","setup"];
            const current = stepIds.indexOf(step);
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i <= current ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                  {i < current ? <Check size={12}/> : i+1}
                </div>
                <span className={`text-xs font-medium ${i <= current ? "text-gray-700" : "text-gray-400"}`}>{s}</span>
                {i < 2 && <div className={`flex-1 h-0.5 ${i < current ? "bg-blue-600" : "bg-gray-100"}`}/>}
              </div>
            );
          })}
        </div>

        {step === "phone" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Mobile Number</label>
              <div className="flex gap-2">
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 flex items-center text-sm font-medium text-gray-600">+91</div>
                <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,"").slice(0,10))}
                  placeholder="98765 43210" className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  type="tel"/>
              </div>
            </div>
            <button onClick={sendOTP} disabled={phone.length < 10 || loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              {loading ? <><RefreshCw size={16} className="animate-spin"/> Sending...</> : "Send OTP"}
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700 font-medium text-center">
              OTP sent to +91 {phone}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Enter 6-digit OTP</label>
              <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,"").slice(0,6))}
                placeholder="••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                type="tel" maxLength={6}/>
            </div>
            <button onClick={verifyOTP} disabled={otp.length < 4 || loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              {loading ? <><RefreshCw size={16} className="animate-spin"/> Verifying...</> : "Verify OTP"}
            </button>
            <button className="w-full text-sm text-gray-500 hover:text-gray-700 py-2">Resend OTP</button>
          </div>
        )}

        {step === "setup" && (
          <div className="space-y-4">
            <div className="text-center text-emerald-600 font-semibold text-sm flex items-center justify-center gap-2 mb-2">
              <CheckCircle size={16}/> Phone verified!
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Your Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"/>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <div className="flex items-start gap-2 text-xs text-amber-700">
                <Shield size={14} className="flex-shrink-0 mt-0.5"/>
                <span>EPIC Verification (optional) available after setup. Verified citizens can submit more detailed reports.</span>
              </div>
            </div>
            <button onClick={complete} disabled={!name}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-200 disabled:text-gray-400 text-white py-3 rounded-xl font-semibold transition-colors">
              Complete Setup
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        DPDP Act compliant · No data sold · EPIC hash only stored
      </p>
    </div>
  );
}

// ============================================================
// PAGE: CITIZEN PROFILE / DASHBOARD
// ============================================================
function ProfilePage({ user, setPage }) {
  if (!user) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-96 text-center">
        <Lock size={48} className="text-gray-200 mb-4"/>
        <h2 className="text-xl font-bold text-gray-700">Login Required</h2>
        <p className="text-gray-400 mt-2 mb-5 text-sm">Sign in to access your citizen dashboard</p>
        <button onClick={() => setPage("login")} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-500 transition-colors">Login / Register</button>
      </div>
    );
  }

  const myIssues = ISSUES_DATA.slice(0,3);

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-black text-white">{user.name}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge label={user.verified ? "EPIC Verified" : "Basic Account"} color={user.verified ? "emerald" : "gray"}/>
              <span className="text-slate-300 text-xs">{user.phone}</span>
            </div>
          </div>
          {!user.verified && (
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs px-3 py-2 rounded-xl font-semibold transition-colors flex items-center gap-1.5">
              <Shield size={13}/> Verify EPIC
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="📍" label="Issues Submitted" value={myIssues.length} sub="Last 90 days" color="blue"/>
        <StatCard icon="✅" label="Issues Resolved" value={1} sub="Your submissions" color="emerald"/>
        <StatCard icon="🏛️" label="My Constituency" value="Jaipur City" sub="Based on registration" color="slate"/>
        <StatCard icon="⭐" label="Civic Score" value={user.verified ? "85/100" : "40/100"} sub="Engagement level" color="amber"/>
      </div>

      {/* My Constituency Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">My Constituency — Jaipur City</h3>
          <button onClick={() => setPage("constituency-detail")} className="text-xs text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg">Full View →</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "MLA Attendance", value: "87%", sub: "Rajesh Sharma", color: "emerald" },
            { label: "Fund Utilized", value: "75%", sub: "MLALAD 2024-25", color: "blue" },
            { label: "Open Issues", value: "234", sub: "In your area", color: "rose" },
          ].map(item => (
            <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
              <div className={`text-xl font-black ${item.color === "emerald" ? "text-emerald-600" : item.color === "blue" ? "text-blue-600" : "text-rose-500"}`}>{item.value}</div>
              <div className="text-xs font-semibold text-gray-700 mt-0.5">{item.label}</div>
              <div className="text-xs text-gray-400">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* My Submitted Issues */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">My Submitted Issues</h3>
          <button onClick={() => setPage("submit-issue")} className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5">
            <Plus size={12}/> New Issue
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {myIssues.map(issue => (
            <div key={issue.id} className="px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{categoryIcon(issue.category)}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{issue.description.substring(0,50)}...</div>
                    <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                      <span>{issue.date}</span>
                      <span>·</span>
                      <span>{issue.reports} reports in cluster</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColor(issue.status)}`}>{issue.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EPIC Upgrade CTA */}
      {!user.verified && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <Shield size={22}/>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-emerald-900">Upgrade to Verified Citizen</h3>
              <p className="text-sm text-emerald-700 mt-1">Link your EPIC (Voter ID) to get a verification badge, submit detailed issue reports, and contribute to constituency analytics.</p>
              <div className="flex gap-2 mt-3">
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2">
                  <Shield size={14}/> Verify EPIC Card
                </button>
                <button className="text-emerald-600 text-sm px-4 py-2 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PAGE: ISSUE SUBMISSION
// ============================================================
function IssueSubmitPage({ user, setPage }) {
  const [form, setForm] = useState({ category: "", description: "", gps: "", anonymous: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  if (!user) {
    return (
      <div className="p-6 text-center mt-12">
        <Lock size={48} className="mx-auto text-gray-200 mb-3"/>
        <h2 className="font-bold text-gray-700">Login Required</h2>
        <p className="text-gray-400 text-sm mt-1 mb-4">You must be logged in to report issues</p>
        <button onClick={() => setPage("login")} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold">Login</button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="p-6 text-center mt-12 max-w-md mx-auto">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={36} className="text-emerald-500"/>
        </div>
        <h2 className="text-xl font-black text-gray-900">Issue Reported!</h2>
        <p className="text-gray-500 mt-2 text-sm">Your report has been submitted and added to the cluster map. Thank you for contributing to civic transparency.</p>
        <div className="bg-gray-50 rounded-xl p-4 mt-5 text-left">
          <div className="text-xs text-gray-400 mb-2">Submission Details</div>
          <div className="space-y-1 text-sm">
            <div><span className="text-gray-500">Category:</span> <span className="font-semibold">{form.category}</span></div>
            <div><span className="text-gray-500">Anonymous:</span> <span className="font-semibold">{form.anonymous ? "Yes" : "No"}</span></div>
            <div><span className="text-gray-500">Status:</span> <span className="font-semibold text-amber-600">Pending Review</span></div>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setPage("issues")} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-500 transition-colors">View Issues Map</button>
          <button onClick={() => { setSubmitted(false); setForm({ category:"",description:"",gps:"",anonymous:false }); }} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors">Submit Another</button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!form.category || !form.description) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-5">
      <div>
        <button onClick={() => setPage("issues")} className="text-sm text-gray-400 hover:text-gray-600 mb-3 flex items-center gap-1.5">← Back to Issues</button>
        <h1 className="text-2xl font-black text-gray-900">Report an Issue</h1>
        <p className="text-sm text-gray-500 mt-1">Civic reports are aggregated anonymously. Individual data is never shared.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
        {/* Category */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Issue Category *</label>
          <div className="grid grid-cols-3 gap-2">
            {["Road","Water","Electricity","Health","Education","Other"].map(cat => (
              <button key={cat} onClick={() => setForm(f => ({...f, category: cat}))}
                className={`py-3 rounded-xl text-sm font-semibold border transition-all ${form.category === cat ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"}`}>
                {categoryIcon(cat)} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Description *</label>
          <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
            placeholder="Describe the civic issue clearly. E.g., 'Large pothole on main road near bus stop, causing daily accidents'"
            rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"/>
          <div className="text-right text-xs text-gray-300 mt-1">{form.description.length}/500</div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Photo Evidence (optional)</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
            <Camera size={24} className="mx-auto text-gray-300 mb-2"/>
            <p className="text-sm text-gray-400">Click to upload or drag a photo</p>
            <p className="text-xs text-gray-300 mt-1">JPEG, PNG up to 5MB</p>
          </div>
        </div>

        {/* GPS */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Location</label>
          <div className="flex gap-2">
            <input value={form.gps} onChange={e => setForm(f=>({...f,gps:e.target.value}))}
              placeholder="GPS auto-detected or enter manually"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"/>
            <button onClick={() => setForm(f => ({...f, gps: "26.9124, 75.7873"}))}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 flex-shrink-0">
              <MapPin size={15}/> Detect
            </button>
          </div>
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-gray-700">Anonymous Report</div>
            <div className="text-xs text-gray-400 mt-0.5">Your name won't be associated with this issue</div>
          </div>
          <button onClick={() => setForm(f => ({...f, anonymous: !f.anonymous}))}
            className={`w-12 h-6 rounded-full transition-colors flex items-center ${form.anonymous ? "bg-blue-500 justify-end pr-0.5" : "bg-gray-300 justify-start pl-0.5"}`}>
            <div className="w-5 h-5 bg-white rounded-full shadow-sm"/>
          </button>
        </div>

        <button onClick={handleSubmit} disabled={!form.category || !form.description || loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
          {loading ? <><RefreshCw size={16} className="animate-spin"/> Submitting...</> : "Submit Issue Report"}
        </button>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
        <div className="flex items-start gap-2 text-xs text-amber-700">
          <Info size={14} className="flex-shrink-0 mt-0.5"/>
          <span>Reports are moderated before appearing publicly. Cluster logic groups nearby reports to protect individual privacy. Abuse of this system may result in account suspension.</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGE: ADMIN CMS
// ============================================================
function AdminPage({ user }) {
  const [adminTab, setAdminTab] = useState("dashboard");
  const [pendingIssues, setPendingIssues] = useState(ISSUES_DATA.map(i => ({...i, adminStatus: "pending"})));

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-center mt-12">
        <Lock size={48} className="mx-auto text-rose-200 mb-3"/>
        <h2 className="font-bold text-gray-700">Admin Access Required</h2>
        <p className="text-gray-400 text-sm mt-1">You don't have permission to view this page</p>
      </div>
    );
  }

  const approveIssue = (id) => setPendingIssues(p => p.map(i => i.id===id ? {...i, adminStatus:"approved"} : i));
  const rejectIssue = (id) => setPendingIssues(p => p.map(i => i.id===id ? {...i, adminStatus:"rejected"} : i));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center">
          <Settings size={20} className="text-white"/>
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900">Admin CMS</h1>
          <p className="text-sm text-gray-500">PublicLens Data Management Console</p>
        </div>
      </div>

      <TabNav
        tabs={[{id:"dashboard",label:"Dashboard"},{id:"upload",label:"Data Upload"},{id:"moderation",label:"Moderation"},{id:"users",label:"Users"},{id:"audit",label:"Audit Log"}]}
        active={adminTab} onChange={setAdminTab}
      />

      {adminTab === "dashboard" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="👥" label="Total Users" value={ADMIN_USERS.length + 1847} sub="Registered accounts" color="blue"/>
            <StatCard icon="✅" label="Verified Users" value={ADMIN_USERS.filter(u=>u.verified).length + 423} sub="EPIC verified" color="emerald"/>
            <StatCard icon="⚠️" label="Pending Issues" value={pendingIssues.filter(i=>i.adminStatus==="pending").length} sub="Awaiting review" color="amber"/>
            <StatCard icon="🗄️" label="Data Last Updated" value="2h ago" sub="Constituency data" color="slate"/>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Data Upload Status</h3>
              <div className="space-y-3">
                {[
                  { name: "MLA Profiles", last: "Jan 15, 2025", status: "Current", pct: 98 },
                  { name: "Fund Data (MLALAD)", last: "Jan 20, 2025", status: "Current", pct: 94 },
                  { name: "Fund Data (MPLAD)", last: "Jan 18, 2025", status: "Current", pct: 91 },
                  { name: "Infrastructure Data", last: "Dec 28, 2024", status: "Needs Update", pct: 78 },
                  { name: "Project Records", last: "Jan 10, 2025", status: "Current", pct: 89 },
                ].map(item => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <span className={`font-semibold ${item.status==="Current" ? "text-emerald-600" : "text-amber-600"}`}>{item.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.status==="Current" ? "bg-emerald-500" : "bg-amber-400"}`} style={{width:`${item.pct}%`}}/>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 w-24 flex-shrink-0 text-right">{item.last}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Upload, label: "Upload MLA Data", color: "blue" },
                  { icon: Database, label: "Upload Fund Data", color: "emerald" },
                  { icon: Building, label: "Upload Infra Data", color: "amber" },
                  { icon: Download, label: "Export Reports", color: "purple" },
                  { icon: RefreshCw, label: "Sync Clusters", color: "slate" },
                  { icon: AlertCircle, label: "Review Flagged", color: "rose" },
                ].map(action => (
                  <button key={action.label} className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-semibold transition-all hover:shadow-sm ${
                    action.color === "blue" ? "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100" :
                    action.color === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" :
                    action.color === "amber" ? "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100" :
                    action.color === "purple" ? "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100" :
                    action.color === "rose" ? "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100" :
                    "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100"
                  }`}>
                    <action.icon size={16}/>{action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {adminTab === "upload" && (
        <div className="space-y-5">
          {[
            { title: "MLA Data Upload", desc: "Upload MLA profiles, attendance records, session data", fields: ["Name", "Party", "Education", "Assets", "Attendance %", "Questions Asked"] },
            { title: "Fund Data Upload", desc: "Upload MLALAD/MPLAD allocation and utilization data", fields: ["Representative ID", "Year", "Allocation", "Utilized", "Project Count"] },
            { title: "Infrastructure Data", desc: "Upload schools, PHC, roads, water scheme counts", fields: ["Constituency ID", "Schools", "PHC/CHC", "Road km", "Water Schemes"] },
          ].map(module => (
            <div key={module.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900">{module.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5 mb-4">{module.desc}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {module.fields.map(f => (
                  <div key={f} className="bg-gray-50 rounded-lg px-3 py-2 text-xs font-medium text-gray-600">{f}</div>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
                  <Upload size={20} className="mx-auto text-gray-300 mb-1.5"/>
                  <p className="text-sm text-gray-400">Drop CSV/XLSX file or click to browse</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 rounded-xl font-semibold text-sm transition-colors flex-shrink-0">Upload</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {adminTab === "moderation" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Issue Moderation Panel</h3>
              <Badge label={`${pendingIssues.filter(i=>i.adminStatus==="pending").length} pending`} color="amber"/>
            </div>
            <div className="divide-y divide-gray-50">
              {pendingIssues.map(issue => (
                <div key={issue.id} className={`px-5 py-4 ${issue.adminStatus !== "pending" ? "opacity-60" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{categoryIcon(issue.category)}</span>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{issue.description}</div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                          <span><strong>{issue.reports}</strong> reports</span>
                          <span>·</span>
                          <span>{issue.category}</span>
                          <span>·</span>
                          <span>{issue.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {issue.adminStatus === "pending" ? (
                        <>
                          <button onClick={() => approveIssue(issue.id)} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                            <ThumbsUp size={12}/> Approve
                          </button>
                          <button onClick={() => rejectIssue(issue.id)} className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                            <ThumbsDown size={12}/> Reject
                          </button>
                          <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                            <Flag size={12}/> Flag
                          </button>
                        </>
                      ) : (
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${issue.adminStatus==="approved" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                          {issue.adminStatus === "approved" ? "✓ Approved" : "✗ Rejected"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {adminTab === "users" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Registered Users</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Name","Phone","EPIC","Role","Joined","Issues","Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ADMIN_USERS.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{u.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{u.phone}</td>
                  <td className="px-4 py-3">{u.verified ? <Badge label="Verified" color="emerald"/> : <Badge label="Basic" color="gray"/>}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 capitalize">{u.role}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{u.joined}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">{u.issues}</td>
                  <td className="px-4 py-3"><Badge label="Active" color="emerald"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {adminTab === "audit" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Audit Log</h3>
            <p className="text-sm text-gray-400 mt-0.5">All admin actions are logged for transparency</p>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { action: "FUND_DATA_UPLOAD", user: "admin@publenlens.gov", detail: "MLALAD Q3 data for 198 constituencies", time: "2025-01-21 14:32:18", type: "upload" },
              { action: "ISSUE_APPROVED", user: "admin@publenlens.gov", detail: "Issue #3 — Jodhpur electricity cuts", time: "2025-01-21 13:15:44", type: "moderation" },
              { action: "ISSUE_REJECTED", user: "admin@publenlens.gov", detail: "Issue #9 — Duplicate report flagged", time: "2025-01-21 12:58:02", type: "moderation" },
              { action: "MLA_PROFILE_UPDATE", user: "admin@publenlens.gov", detail: "Updated attendance data — Winter Session 2024", time: "2025-01-20 18:44:31", type: "upload" },
              { action: "USER_EPIC_VERIFIED", user: "system", detail: "User ID #1847 — Rohit Sharma", time: "2025-01-20 16:20:15", type: "user" },
              { action: "CLUSTER_MERGED", user: "admin@publenlens.gov", detail: "Merged 3 road issue clusters — Jaipur City", time: "2025-01-20 11:05:29", type: "cluster" },
            ].map((log, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${log.type === "upload" ? "bg-blue-50" : log.type === "moderation" ? "bg-amber-50" : log.type === "user" ? "bg-emerald-50" : "bg-purple-50"}`}>
                  {log.type === "upload" ? <Upload size={14} className="text-blue-500"/> :
                   log.type === "moderation" ? <CheckCircle size={14} className="text-amber-500"/> :
                   log.type === "user" ? <User size={14} className="text-emerald-500"/> :
                   <Layers size={14} className="text-purple-500"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-700">{log.action}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-500">{log.user}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate">{log.detail}</div>
                </div>
                <div className="text-xs text-gray-300 flex-shrink-0 font-mono">{log.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function PublicLens() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState({ id: 999, name: "Admin User", phone: "+91 99999 00000", role: "admin", verified: true });
  const [selectedConstituency, setSelectedConstituency] = useState(CONSTITUENCIES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch(page) {
      case "home": return <HomePage setPage={setPage} setSelectedConstituency={setSelectedConstituency}/>;
      case "constituencies": return <ConstituenciesPage setPage={setPage} setSelectedConstituency={setSelectedConstituency}/>;
      case "constituency-detail": return <ConstituencyDetailPage constituency={selectedConstituency} setPage={setPage}/>;
      case "funds": return <FundTrackerPage/>;
      case "infrastructure": return <InfrastructurePage/>;
      case "issues": return <PublicIssuesPage setPage={setPage} user={user}/>;
      case "login": return <LoginPage setUser={setUser} setPage={setPage}/>;
      case "profile": return <ProfilePage user={user} setPage={setPage}/>;
      case "submit-issue": return <IssueSubmitPage user={user} setPage={setPage}/>;
      case "admin": return <AdminPage user={user}/>;
      default: return <HomePage setPage={setPage} setSelectedConstituency={setSelectedConstituency}/>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`* { font-family: 'DM Sans', sans-serif; } ::-webkit-scrollbar{width:6px;height:6px} ::-webkit-scrollbar-track{background:#F8FAFC} ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px} ::-webkit-scrollbar-thumb:hover{background:#94A3B8}`}</style>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar page={page} setPage={setPage} user={user} setUser={setUser}/>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex-shrink-0"><Sidebar page={p => { setPage(p); setSidebarOpen(false); }} setPage={p => { setPage(p); setSidebarOpen(false); }} user={user} setUser={setUser}/></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)}/>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Menu size={20} className="text-gray-700"/>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Eye size={14} className="text-white"/>
            </div>
            <span className="font-bold text-gray-900">PublicLens</span>
          </div>
          {user ? (
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user.name.charAt(0)}
            </div>
          ) : (
            <button onClick={() => setPage("login")} className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">Login</button>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
