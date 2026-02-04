import React, { useState, useEffect } from 'react';
import {
    Bot, Users, Zap, CheckCircle2, ArrowRight, Shield, Rocket,
    LineChart, Mail, BarChart3, Lock, Play, Search, MessageSquare,
    LayoutDashboard, Database, TrendingUp, XCircle, Check, Book, Download,
    Video, FileText, ChevronDown, CheckCircle, AlertCircle, Calendar,
    Bell, Settings, LogOut, Plus, Filter, MoreHorizontal, Send, User, Briefcase, MapPin, Menu
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}


// --- COMPONENTS ---

const Navigation = () => {
    return (
        <header className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#0B0F1A]/80">
            <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2" data-aos="fade-down">
                    <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                        <Rocket size={18} className="fill-white/20" />
                    </div>
                    <span className="font-bold text-xl text-white tracking-tight">Outrech</span>
                </Link>

                <div className="flex items-center gap-6" data-aos="fade-down" data-aos-delay="100">
                    <Link to="/" className="hidden md:block text-sm font-medium hover:text-white transition-colors text-slate-400">Home</Link>
                    <Link to="/resources" className="hidden md:block text-sm font-medium hover:text-white transition-colors text-slate-400">Resources</Link>
                    <Link to="/pricing" className="hidden md:block text-sm font-medium hover:text-white transition-colors text-slate-400">Pricing</Link>
                    <div className="h-4 w-px bg-white/10 hidden md:block"></div>
                    <Link to="/login" className="text-sm font-medium hover:text-white transition-colors text-slate-400">Login</Link>
                    <button className="bg-white text-[#0B0F1A] hover:bg-slate-200 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-white/10">
                        Get Early Access
                    </button>
                </div>
            </div>
        </header>
    );
};

const Footer = () => (
    <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-sm bg-[#0B0F1A]">
        <p>&copy; 2026 OUTRECH SYSTEMS inc. All rights reserved.</p>
    </footer>
);

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    setAuthenticated(true);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                setAuthenticated(false);
                navigate('/login');
            } else if (session) {
                setAuthenticated(true);
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    if (loading) return (
        <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="text-slate-400 text-sm font-medium animate-pulse">Verifying Access...</div>
            </div>
        </div>
    );

    return authenticated ? children : null;
};

// --- PAGES ---

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    // Add logout handler
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const SidebarItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === id ? 'bg-purple-600/10 text-purple-400 border border-purple-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
            <Icon size={18} />
            {label}
        </button>
    );
    // ... [rest of DashboardPage stays as is until Sidebar Logic]

    return (
        <div className="min-h-screen bg-[#0B0F1A] flex font-sans text-slate-300 selection:bg-purple-500/30">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#0F121C] flex flex-col fixed h-full z-20">
                <div className="p-6 flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                        <Rocket size={18} className="fill-white/20" />
                    </div>
                    <span className="font-bold text-xl text-white tracking-tight">Outrech</span>
                </div>

                <div className="px-4 space-y-1 flex-1">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-4">Menu</div>
                    <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" />
                    <SidebarItem id="leads" icon={Users} label="ICP & Leads" />
                    <SidebarItem id="campaigns" icon={Zap} label="Campaigns" />
                    <SidebarItem id="inbox" icon={MessageSquare} label="Unified Inbox" />
                    <SidebarItem id="analytics" icon={BarChart3} label="Analytics" />
                    <SidebarItem id="settings" icon={Settings} label="Settings" />
                </div>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-white truncate">Alex Founder</div>
                            <div className="text-xs text-slate-500 truncate">Pro Plan</div>
                        </div>
                        <LogOut size={16} className="text-slate-500 cursor-pointer hover:text-white" onClick={handleLogout} />
                    </div>
                </div>
            </aside>
// [Rest of render unchanged]

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h2>
                        <p className="text-slate-500 text-sm">Real-time data updates every 5 mins.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="bg-white text-[#0B0F1A] px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                            <Plus size={16} /> Quick Action
                        </button>
                    </div>
                </header>

                {/* --- OVERVIEW TAB --- */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { label: "Active Campaigns", val: "3", icon: Zap, color: "text-purple-400", bg: "bg-purple-400/10" },
                                { label: "Messages Sent", val: "1,240", icon: Send, color: "text-blue-400", bg: "bg-blue-400/10" },
                                { label: "Replies", val: "86", icon: MessageSquare, color: "text-green-400", bg: "bg-green-400/10" },
                                { label: "Booked Calls", val: "12", icon: Calendar, color: "text-orange-400", bg: "bg-orange-400/10" }
                            ].map((s, i) => (
                                <div key={i} className="bg-[#131722] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-lg ${s.bg} ${s.color}`}><s.icon size={20} /></div>
                                        <span className="text-xs font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded-full">+12%</span>
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{s.val}</div>
                                    <div className="text-slate-500 text-sm">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-[#131722] border border-white/5 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-6">Campaign Performance</h3>
                                <div className="h-64 flex items-end justify-between gap-2">
                                    {[35, 50, 45, 70, 60, 75, 55, 65, 80, 70, 85, 90].map((h, i) => (
                                        <div key={i} className="w-full bg-purple-900/20 rounded-t-sm relative group">
                                            <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[#131722] border border-white/5 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-6">Live Feed</h3>
                                <div className="space-y-6">
                                    {[
                                        { user: "Sarah Jenkins", action: "replied to", target: "SaaS Outreach", time: "2m ago" },
                                        { user: "Mike T.", action: "booked a call", target: "Calendar", time: "15m ago" },
                                        { user: "System", action: "enriched", target: "50 leads", time: "1h ago" },
                                    ].map((act, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
                                            <div>
                                                <div className="text-sm text-white">
                                                    <span className="font-bold">{act.user}</span> <span className="text-slate-400">{act.action}</span> <span className="text-purple-400">{act.target}</span>
                                                </div>
                                                <div className="text-xs text-slate-600">{act.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- LEADS TAB --- */}
                {activeTab === 'leads' && (
                    <div className="bg-[#131722] border border-white/5 rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex gap-4">
                            <div className="flex-1 bg-[#0F121C] border border-white/10 rounded-lg flex items-center px-4">
                                <Search size={18} className="text-slate-500 mr-2" />
                                <input type="text" placeholder="Search leads by name, company, or title..." className="bg-transparent border-none focus:outline-none text-white text-sm w-full py-3" />
                            </div>
                            <button className="px-4 py-2 border border-white/10 rounded-lg text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium"><Filter size={16} /> Filters</button>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 flex items-center gap-2 text-sm font-bold"><Plus size={16} /> Import Leads</button>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs text-slate-500 uppercase border-b border-white/5 bg-white/5">
                                    <th className="px-6 py-4 font-bold">Prospect</th>
                                    <th className="px-6 py-4 font-bold">Company</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold">Activity</th>
                                    <th className="px-6 py-4 font-bold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { name: "John Doe", role: "CEO", co: "TechFlow", status: "Hot", statusCol: "text-red-400 bg-red-400/10", last: "Replied 2h ago" },
                                    { name: "Alice Smith", role: "Founder", co: "GrowthAI", status: "Contacted", statusCol: "text-blue-400 bg-blue-400/10", last: "Sent 1d ago" },
                                    { name: "Robert Fox", role: "VP Sales", co: "SalesInc", status: "New", statusCol: "text-slate-400 bg-white/10", last: "Added 3d ago" },
                                    { name: "Emily Davis", role: "Director", co: "CreateM", status: "Warm", statusCol: "text-orange-400 bg-orange-400/10", last: "Opened 4h ago" },
                                ].map((lead, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center text-purple-400 font-bold border border-white/5">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white text-sm">{lead.name}</div>
                                                    <div className="text-xs text-slate-500">{lead.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-300 flex items-center gap-2"><Briefcase size={14} className="text-slate-500" /> {lead.co}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${lead.statusCol}`}>{lead.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-400">{lead.last}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-500 hover:text-white"><MoreHorizontal size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- CAMPAIGNS TAB --- */}
                {activeTab === 'campaigns' && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Create New Card */}
                            <div className="bg-[#131722] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group min-h-[250px]">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                                    <Plus size={32} />
                                </div>
                                <h3 className="font-bold text-white text-lg">Create Campaign</h3>
                                <p className="text-slate-500 text-sm mt-2">Start a new outreach sequence</p>
                            </div>

                            {[
                                { name: "SaaS Founders Outreach", status: "Active", sent: 1240, reply: "14%", leads: 4500 },
                                { name: "Agency Partnership", status: "Paused", sent: 850, reply: "8.5%", leads: 1200 },
                                { name: "Webinar Invites", status: "Completed", sent: 3200, reply: "22%", leads: 3200 },
                            ].map((c, i) => (
                                <div key={i} className="bg-[#131722] border border-white/5 rounded-xl p-6 flex flex-col hover:border-white/20 transition-all">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${c.status === 'Active' ? 'bg-green-500/10 text-green-400' : c.status === 'Paused' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-500/10 text-slate-400'}`}>
                                            {c.status}
                                        </div>
                                        <button className="text-slate-500 hover:text-white"><Settings size={18} /></button>
                                    </div>
                                    <h3 className="font-bold text-white text-xl mb-2">{c.name}</h3>
                                    <p className="text-slate-500 text-sm mb-6">{c.leads} Leads Targeted</p>

                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-xs text-slate-500 mb-1">Sent</div>
                                            <div className="text-lg font-bold text-white">{c.sent}</div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-xs text-slate-500 mb-1">Reply Rate</div>
                                            <div className="text-lg font-bold text-white">{c.reply}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- INBOX TAB (Simplified) --- */}
                {activeTab === 'inbox' && (
                    <div className="flex h-[calc(100vh-140px)] bg-[#131722] border border-white/5 rounded-xl overflow-hidden">
                        <div className="w-80 border-r border-white/5 flex flex-col">
                            <div className="p-4 border-b border-white/5">
                                <input type="text" placeholder="Search inbox..." className="w-full bg-[#0F121C] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 ${i === 1 ? 'bg-purple-500/10 border-l-2 border-l-purple-500' : ''}`}>
                                        <div className="flex justify-between mb-1">
                                            <span className="font-bold text-white text-sm">John Doe</span>
                                            <span className="text-xs text-slate-500">2m</span>
                                        </div>
                                        <p className="text-xs text-slate-400 truncate">Hey, thanks for reaching out. I'd be interested in...</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col bg-[#0F121C]">
                            <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                <div className="font-bold text-white">John Doe <span className="text-slate-500 font-normal text-sm ml-2">CEO at TechFlow</span></div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-white/5 rounded text-xs text-slate-300">Mark Lead</button>
                                    <button className="px-3 py-1 bg-white/5 rounded text-xs text-slate-300">View Profile</button>
                                </div>
                            </div>
                            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                                <div className="flex justify-end">
                                    <div className="bg-purple-600 text-white p-3 rounded-l-xl rounded-tr-xl max-w-sm text-sm">Hi John, saw you're scaling TechFlow. Quick question...</div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="bg-[#1A1E29] text-slate-300 p-3 rounded-r-xl rounded-tl-xl max-w-sm text-sm border border-white/10">Hey, thanks for reaching out. I'd be interested in seeing a demo.</div>
                                </div>
                            </div>
                            <div className="p-4 border-t border-white/5">
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Type a reply..." className="flex-1 bg-[#131722] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                                    <button className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500"><Send size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Placeholders for other tabs */}
                {(activeTab === 'analytics' || activeTab === 'settings') && (
                    <div className="flex flex-col items-center justify-center h-96 text-slate-500">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <Settings size={32} />
                        </div>
                        <h3 className="text-white font-bold text-lg">Module Under Construction</h3>
                        <p>This section is coming in the V2 update.</p>
                    </div>
                )}

            </main>
        </div>
    );
};

const HomePage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('submitting');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        setEmail('');
    };

    return (
        <main className="relative z-10 w-full">
            {/* --- HERO SECTION --- */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-20 px-4 relative">
                <div className="text-center max-w-4xl mx-auto mb-16 relative z-20">
                    {/* Pill Label */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-8 backdrop-blur-sm" data-aos="fade-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        New: LinkedIn Voice Automation
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]" data-aos="fade-up" data-aos-delay="100">
                        The LinkedIn Sales <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-indigo-400">System.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                        Stop playing the "connection request" lottery. Automate your prospecting, personalize every message, and book qualified sales calls on autopilot.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up" data-aos-delay="300">
                        <button onClick={() => navigate('/login')} className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all flex items-center gap-2">
                            Get Early Access <ArrowRight size={18} />
                        </button>
                        <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-all flex items-center gap-2">
                            <Play size={18} fill="currentColor" /> See Workflow
                        </button>
                    </div>
                </div>

                {/* --- DASHBOARD PREVIEW UI (Coded) --- */}
                <div className="w-full max-w-5xl mx-auto relative perspective-1000" data-aos="fade-up" data-aos-delay="500">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-2xl"></div>
                    <div className="relative bg-[#131722] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">

                        {/* Sidebar */}
                        <div className="w-full md:w-64 bg-[#0F121C] border-r border-white/5 p-4 flex flex-col gap-2">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3 mt-2">Main Menu</div>
                            {['Dashboard', 'Sales Nav Search', 'Sequence Builder', 'Smart Inbox', 'Safety Health'].map((item, i) => (
                                <div key={item} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${i === 0 ? 'bg-purple-600/10 text-purple-400 border border-purple-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                                    {i === 0 && <LayoutDashboard size={16} />}
                                    {i === 1 && <Search size={16} />}
                                    {i === 2 && <Zap size={16} />}
                                    {i === 3 && <Mail size={16} />}
                                    {i === 4 && <Shield size={16} />}
                                    {item}
                                </div>
                            ))}
                            <div className="mt-auto p-4 bg-gradient-to-br from-purple-900/20 to-transparent rounded-xl border border-white/5">
                                <div className="text-white text-sm font-bold mb-1">Scale Plan</div>
                                <div className="text-xs text-slate-500 mb-3">5,000 / 10,000 credits</div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="bg-purple-500 w-1/2 h-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 p-6 md:p-8 bg-[#131722] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-[#131722] to-[#131722]">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-white font-bold text-xl">LinkedIn Command Center</h3>
                                    <p className="text-slate-500 text-sm">Welcome back, Alex.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10"><React.Fragment><span className="sr-only">Calendar</span><div className="w-4 h-4" /></React.Fragment></button>
                                    <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                        <Zap size={14} fill="black" /> New Campaign
                                    </button>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                {[
                                    { label: 'Connections Sent', val: '2,543', change: '+12%', icon: <Users size={16} className="text-blue-400" />, bg: 'bg-blue-500/10' },
                                    { label: 'Acceptance Rate', val: '42%', change: '+5%', icon: <CheckCircle2 size={16} className="text-purple-400" />, bg: 'bg-purple-500/10' },
                                    { label: 'Reply Rate', val: '18.4%', change: '+1.2%', icon: <MessageSquare size={16} className="text-green-400" />, bg: 'bg-green-500/10' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-[#1A1E29] border border-white/5 p-4 rounded-xl">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
                                            <span className="text-xs font-medium text-green-400 bg-green-900/20 px-1.5 py-0.5 rounded">{stat.change}</span>
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                                        <div className="text-xs text-slate-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Chart Area mockup */}
                            <div className="bg-[#1A1E29] border border-white/5 p-6 rounded-xl h-48 flex items-end justify-between gap-2 relative overflow-hidden">
                                <div className="absolute top-6 left-6 text-sm font-semibold text-white">Campaign Performance</div>
                                {[35, 55, 45, 70, 65, 85, 95].map((h, i) => (
                                    <div key={i} className="w-full bg-purple-600/20 rounded-t-sm relative group">
                                        <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* --- PROBLEM SECTION --- */}
            <section className="py-24 px-4 bg-[#0F121C]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The "LinkedIn Grind"</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">You’re spending your day prospecting, not selling. It stops today.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Manual Research", desc: "Scrolling specifically for hours to find 'mostly okay' leads.", icon: <Search size={24} className="text-red-400" /> },
                            { title: "Generic Spam", desc: "Sending 'Hi [Name]' templates that get ignored instantly.", icon: <XCircle size={24} className="text-orange-400" /> },
                            { title: "Account Anxiety", desc: "Living in fear of the 'You've been restricted' ban hammer.", icon: <Shield size={24} className="text-yellow-400" /> },
                            { title: "The Rollercoaster", desc: "One week of leads, three weeks of silence.", icon: <TrendingUp size={24} className="text-slate-400" /> }
                        ].map((pain, i) => (
                            <div key={i} className="bg-[#131722] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors" data-aos="fade-up" data-aos-delay={i * 100}>
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">{pain.icon}</div>
                                <h3 className="font-bold text-white mb-2">{pain.title}</h3>
                                <p className="text-sm text-slate-400 leading-snug">{pain.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* --- FEATURES SECTION --- */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="max-w-6xl mx-auto space-y-32">

                    {/* Feature 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1" data-aos="fade-right">
                            <div className="text-purple-400 font-bold tracking-wider text-sm mb-2 uppercase">01. AI Lead Intelligence</div>
                            <h3 className="text-4xl font-bold text-white mb-6">Don't just find leads. Understand them.</h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Most tools just scrape names. Outrech builds a psychological profile. We scrape Sales Navigator and enrich data to flag prospects who are actually active.
                            </p>
                            <ul className="space-y-4">
                                {['Deep Search: Granular precision filters', 'Enrichment: Auto-fetch company size & funding', 'Activity Insights: Strike while they are active'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-white font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center"><Check size={14} strokeWidth={3} /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1" data-aos="fade-left">
                            <div className="bg-[#131722] border border-white/10 p-2 rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-[#0F121C] rounded-xl p-6 border border-white/5">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
                                        <div>
                                            <div className="text-white font-bold">List: SaaS Founders &gt; $1M ARR</div>
                                            <div className="text-xs text-green-400">1,204 Verified Leads Found</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                                                    <div>
                                                        <div className="w-24 h-2 bg-slate-700 rounded mb-1"></div>
                                                        <div className="w-16 h-2 bg-slate-800 rounded"></div>
                                                    </div>
                                                </div>
                                                <div className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded">High Intent</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2 (Reversed) */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="flex-1" data-aos="fade-left">
                            <div className="text-purple-400 font-bold tracking-wider text-sm mb-2 uppercase">02. The Personalization Engine</div>
                            <h3 className="text-4xl font-bold text-white mb-6">Outreach that feels 1-on-1. Scale that feels infinite.</h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Generic copy kills deals. Our AI models analyze your prospect’s profile to write hyper-relevant openers that reference their recent posts or headline.
                            </p>
                            <ul className="space-y-4">
                                {['Context-Aware: References specific posts', 'Smart Sequences: Connection -> Value Drop -> Call', 'Tone Match: Direct for Founders, Empathetic for HR'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-white font-medium">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center"><Check size={14} strokeWidth={3} /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1" data-aos="fade-right">
                            <div className="bg-[#131722] border border-white/10 p-2 rounded-2xl shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-[#0F121C] rounded-xl p-6 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-50"><Zap size={100} className="text-white/5" /></div>
                                    <div className="text-slate-500 text-sm mb-4">Generating LinkedIn opener...</div>
                                    <div className="bg-purple-900/20 border border-purple-500/20 p-4 rounded-lg text-slate-300 text-sm leading-relaxed mb-4">
                                        "Hey Alex, just saw your recent post about <span className="bg-purple-500/20 text-purple-300 px-1 rounded">scaling agency ops</span>. Totally agree that automation is key. We actually help agencies like <span className="text-white font-bold">FlowMedia</span> solve this by..."
                                    </div>
                                    <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-bold text-sm">Send Connection Request</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- COMPARISON SECTION --- */}
            <section className="py-24 px-4 bg-[#0F121C]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">The Old Way vs. Outrech</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Old Way */}
                        <div className="bg-[#131722] p-8 rounded-2xl border border-red-500/10 relative overflow-hidden opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="font-bold text-red-400 mb-6 text-xl">MANUAL LINKEDIN</div>
                            <ul className="space-y-4">
                                {[
                                    'Hours/day: 3-4 hours grind',
                                    'Safety: High risk (human error)',
                                    'Personalization: Copy-paste templates',
                                    'Reply Rate: 15-20% avg'
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-slate-400">
                                        <XCircle size={18} className="text-red-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Outrech Way */}
                        <div className="bg-[#131722] p-8 rounded-2xl border border-purple-500/30 relative overflow-hidden shadow-2xl shadow-purple-900/20 transform md:-translate-y-4">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                            <div className="font-bold text-white mb-6 text-xl flex items-center gap-2">
                                THE OUTRECH SYSTEM <CheckCircle2 size={20} className="text-green-500" />
                            </div>
                            <ul className="space-y-4">
                                {[
                                    'Hours/day: 15 minutes',
                                    'Safety: 100% Cloud-Simulated',
                                    'Personalization: Unique AI-generated messages',
                                    'Reply Rate: 35-45%'
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-white font-medium">
                                        <CheckCircle2 size={18} className="text-purple-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- CTA SECTION --- */}
            <section className="py-32 px-4 text-center relative overflow-hidden">
                {/* BGs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">Stop chasing clients. <br /> Let them come to you.</h2>
                    <p className="text-xl text-slate-400 mb-10">Join the rigorous agencies automating their growth with Outrech.</p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                        <button onClick={() => navigate('/login')} className="w-full bg-white text-[#0B0F1A] px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/10 whitespace-nowrap">
                            Get Started Now
                        </button>
                    </div>
                    <div className="text-sm text-slate-600">Secure access. Instant activation.</div>
                </div>
            </section>
        </main>
    );
}

const ResourcesPage = () => {
    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Resources & Guides</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">Master the art of LinkedIn mastery. Strategies, templates, and playbooks used by top agencies.</p>
            </div>

            {/* Featured Resource */}
            <div className="bg-[#131722] border border-white/10 rounded-2xl overflow-hidden md:flex mb-16 shadow-2xl">
                <div className="md:w-1/2 bg-purple-900/10 p-12 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
                    <Book size={100} className="text-purple-400 relative z-10" />
                </div>
                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                    <div className="text-purple-400 font-bold text-sm tracking-wider uppercase mb-2">Featured Playbook</div>
                    <h2 className="text-3xl font-bold text-white mb-4">The "No-Span" Outreach Bible</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Learn exactly how we scaled an agency from $0 to $50k MRR using only LinkedIn DMs. Includes copy-paste templates, follow-up timelines, and profile optimization checklists.
                    </p>
                    <button className="self-start flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                        Download Now <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
                {["All Resources", "Guides", "Templates", "Case Studies", "Safety"].map((f, i) => (
                    <button key={i} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${i === 0 ? 'bg-purple-600 border-purple-600 text-white' : 'bg-transparent border-white/10 text-slate-400 hover:text-white hover:border-white/30'}`}>
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { label: "TEMPLATE", title: "5 High-Converting DM Openers", type: "Doc", time: "5 min read" },
                    { label: "GUIDE", title: "LinkedIn Safety: How to Avoid Bans", type: "Guide", time: "10 min read" },
                    { label: "CASE STUDY", title: "How FlowMedia Added 12 Clients in 30 Days", type: "Story", time: "8 min read" },
                    { label: "VIDEO", title: "Setting Up Your First Campaign", type: "Tutorial", time: "15 min watch" },
                    { label: "TEMPLATE", title: "The Perfect Follow-Up Sequence", type: "Doc", time: "3 min read" },
                    { label: "GUIDE", title: "Navigating Sales Navigator Like a Pro", type: "Guide", time: "12 min read" },
                ].map((item, i) => (
                    <div key={i} className="group bg-[#0F121C] border border-white/5 rounded-xl p-6 hover:border-purple-500/30 transition-all hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-6">
                            <div className="px-3 py-1 bg-white/5 rounded text-xs font-bold text-slate-300 uppercase">{item.label}</div>
                            {item.label === 'VIDEO' ? <Video size={18} className="text-slate-500" /> : <FileText size={18} className="text-slate-500" />}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                        <div className="mt-auto pt-4 flex items-center gap-3 text-sm text-slate-500">
                            <span>{item.time}</span> • <span>Free Access</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Newsletter CTA */}
            <div className="mt-24 p-12 bg-gradient-to-r from-purple-900/20 to-indigo-900/10 rounded-2xl border border-white/5 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Join 15,000+ Smart Sellers</h3>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">Get one actionable LinkedIn sales tip in your inbox every Tuesday. No fluff, just revenue.</p>
                <div className="flex max-w-md mx-auto gap-2">
                    <input type="email" placeholder="Enter your email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    <button className="bg-purple-600 text-white font-bold px-6 rounded-lg hover:bg-purple-500 transition-colors">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

const PricingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h1>
                <p className="text-slate-400 max-w-2xl mx-auto mb-10">Start for free. Scale when you see results. No hidden fees or "talk to sales" buttons.</p>

                <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/5 relative">
                    <div className="px-6 py-2 rounded-full text-sm font-bold text-white bg-white/10 shadow-sm relative z-10">Monthly</div>
                    <div className="px-6 py-2 rounded-full text-sm font-bold text-slate-500 hover:text-white cursor-pointer relative z-10 transition-colors">
                        Yearly <span className="text-green-400 text-xs ml-1">-20%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Starter */}
                <div className="bg-[#0F121C] border border-white/5 rounded-2xl p-8 flex flex-col hover:border-white/10 transition-colors">
                    <div className="text-lg font-bold text-slate-300 mb-2">Starter</div>
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-4xl font-bold text-white">$49</span><span className="text-slate-500 mb-1">/mo</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-8">Perfect for solo founders validating their offer.</p>
                    <button onClick={() => navigate('/login')} className="w-full py-3 rounded-lg border border-white/10 text-white font-bold hover:bg-white/5 transition-colors mb-8">Get Started</button>

                    <div className="space-y-4">
                        {[
                            '1 LinkedIn Account',
                            '500 Leads / mo',
                            'Basic Outreach Sequences',
                            'Standard Support'
                        ].map(f => (
                            <div key={f} className="flex items-center gap-3 text-sm text-slate-300">
                                <Check size={16} className="text-slate-500" /> {f}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pro */}
                <div className="bg-[#131722] border border-purple-500/50 rounded-2xl p-8 flex flex-col relative shadow-2xl shadow-purple-900/20 transform md:-translate-y-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                    <div className="absolute top-4 right-4 bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20">Most Popular</div>

                    <div className="text-lg font-bold text-white mb-2">Growth</div>
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-5xl font-bold text-white">$99</span><span className="text-slate-500 mb-1">/mo</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-8">For serious sellers scaling their pipeline.</p>
                    <button onClick={() => navigate('/login')} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all mb-8">Get Started</button>

                    <div className="space-y-4">
                        {[
                            '3 LinkedIn Accounts',
                            '2,500 Leads / mo',
                            'Advanced Personalization AI',
                            'Smart Inbox + CRM Sync',
                            'Priority Support',
                            'A/B Testing'
                        ].map(f => (
                            <div key={f} className="flex items-center gap-3 text-sm text-white font-medium">
                                <Check size={16} className="text-purple-400" /> {f}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agency */}
                <div className="bg-[#0F121C] border border-white/5 rounded-2xl p-8 flex flex-col hover:border-white/10 transition-colors">
                    <div className="text-lg font-bold text-slate-300 mb-2">Agency</div>
                    <div className="flex items-end gap-1 mb-6">
                        <span className="text-4xl font-bold text-white">$249</span><span className="text-slate-500 mb-1">/mo</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-8">White-label ready for lead gen agencies.</p>
                    <button onClick={() => navigate('/login')} className="w-full py-3 rounded-lg border border-white/10 text-white font-bold hover:bg-white/5 transition-colors mb-8">Contact Sales</button>

                    <div className="space-y-4">
                        {[
                            '10+ LinkedIn Accounts',
                            'Unlimited Leads',
                            'White-Label Dashboard',
                            'API Access',
                            'Dedicated Success Manager'
                        ].map(f => (
                            <div key={f} className="flex items-center gap-3 text-sm text-slate-300">
                                <Check size={16} className="text-slate-500" /> {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-16 text-slate-500 text-sm">
                <p>Get started today with our powerful LinkedIn sales system. No credit card required.</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                    <span className="flex items-center gap-1"><Shield size={14} /> 256-bit Encryption</span>
                    <span className="flex items-center gap-1"><Lock size={14} /> GDPR Compliant</span>
                </div>
            </div>
        </div>
    );
};


const LoginPage = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                    redirectTo: window.location.origin + '/dashboard',
                },
            });
            if (error) throw error;
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                        }
                    }
                });
                if (error) throw error;
                setMessage("Success! Please check your email to verify your account.");
                setLoading(false);
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative px-4 pt-20">
            {/* BGs */}
            <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md bg-[#131722] border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg mx-auto mb-4">
                        <Rocket size={24} className="fill-white/20" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
                    <p className="text-slate-400 text-sm mt-2">
                        {isSignUp ? 'Join Outrech to start scaling your LinkedIn outreach.' : 'Enter your credentials to access the command center.'}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle size={16} />
                        {message}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleAuth}>
                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                            <input
                                type="text"
                                className="w-full bg-[#0F121C] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Alex Founder"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={isSignUp}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-[#0F121C] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase">Password</label>
                            {!isSignUp && <a href="#" className="text-xs text-purple-400 hover:text-purple-300">Forgot?</a>}
                        </div>
                        <input
                            type="password"
                            className="w-full bg-[#0F121C] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {!isSignUp && (
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="remember" className="rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-600" />
                            <label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer">Keep me logged in</label>
                        </div>
                    )}

                    <button disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                    </button>

                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                        <span className="relative bg-[#131722] px-3 text-xs text-slate-500 uppercase">Or continue with</span>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full bg-white text-[#0B0F1A] font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        Google
                    </button>
                </form>

                <div className="mt-8 text-center text-sm border-t border-white/5 pt-6">
                    <p className="text-slate-500 mb-2">{isSignUp ? 'Already have an account?' : "Don't have an account?"}</p>
                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
                        className="text-white font-bold hover:text-purple-400 transition-colors underline underline-offset-4"
                    >
                        {isSignUp ? 'Sign In' : 'Create an Account'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function App() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
        });
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <div className="font-sans bg-[#0B0F1A] text-slate-300 min-h-screen w-full overflow-x-hidden selection:bg-purple-500/30 flex flex-col">

                {/* --- Background Ambient Glows --- */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vh] bg-purple-900/20 blur-[120px] rounded-full opacity-40 mix-blend-screen animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vh] bg-indigo-900/10 blur-[100px] rounded-full opacity-30 mix-blend-screen"></div>
                </div>

                <ConditionalLayout />

            </div>
        </Router>
    );
}

const ConditionalLayout = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <>
            {!isDashboard && <Navigation />}

            <div className={`flex-1 relative z-10 w-full ${isDashboard ? 'h-full' : ''}`}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>

            {!isDashboard && <Footer />}
        </>
    );
}

export default App;
