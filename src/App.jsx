import React, { useState, useEffect } from 'react';
import { Shield, BarChart3, Link, Lock, Info, Menu, X, Activity, AlertTriangle, CheckCircle, Globe, Database, Target } from 'lucide-react';
import { motion } from 'framer-motion';
// ===================================
// CONSTANTS
// ===================================
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';


const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Shield },
  { id: 'analysis', label: 'Data Analysis', icon: BarChart3 },
  { id: 'phishing', label: 'Phishing Detection', icon: Link },
  { id: 'defense', label: 'Defense Techniques', icon: Lock },
  { id: 'about', label: 'About', icon: Info }
];

const ATTACK_TYPES = [
  { icon: AlertTriangle, title: 'Ransomware', desc: 'Malware that encrypts files and demands payment', color: 'red' },
  { icon: Target, title: 'Phishing', desc: 'Fraudulent attempts to obtain sensitive information', color: 'orange' },
  { icon: Activity, title: 'DDoS', desc: 'Overwhelming systems with traffic to cause disruption', color: 'yellow' }
];

const COMMON_ATTACKS = [
  { name: 'SQL Injection', impact: 'Critical', desc: 'Inserting malicious SQL code into queries' },
  { name: 'Cross-Site Scripting', impact: 'High', desc: 'Injecting malicious scripts into web pages' },
  { name: 'Man-in-the-Middle', impact: 'Critical', desc: 'Intercepting communication between parties' },
  { name: 'Zero-Day Exploit', impact: 'Critical', desc: 'Attacking unknown vulnerabilities' },
  { name: 'Social Engineering', impact: 'High', desc: 'Manipulating people to divulge information' },
  { name: 'Malware', impact: 'High', desc: 'Software designed to cause damage or gain access' }
];

const DEFENSE_CATEGORIES = [
  {
    title: 'Strong Authentication',
    icon: Lock,
    tips: [
      'Use multi-factor authentication (MFA)',
      'Create complex, unique passwords',
      'Use password managers',
      'Enable biometric security'
    ]
  },
  {
    title: 'Network Security',
    icon: Globe,
    tips: [
      'Use VPN for public networks',
      'Enable firewall protection',
      'Regularly update router firmware',
      'Segment network infrastructure'
    ]
  },
  {
    title: 'Data Protection',
    icon: Database,
    tips: [
      'Regular data backups',
      'Encrypt sensitive information',
      'Implement access controls',
      'Monitor data access logs'
    ]
  },
  {
    title: 'Security Awareness',
    icon: AlertTriangle,
    tips: [
      'Train employees regularly',
      'Recognize phishing attempts',
      'Verify sender identities',
      'Report suspicious activity'
    ]
  }
];

const INCIDENT_RESPONSE = [
  { step: '1', title: 'Identify', desc: 'Detect and analyze the threat' },
  { step: '2', title: 'Contain', desc: 'Isolate affected systems' },
  { step: '3', title: 'Eradicate', desc: 'Remove the threat completely' },
  { step: '4', title: 'Recover', desc: 'Restore normal operations' }
];

// ===================================
// UI COMPONENTS
// ===================================
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
  </div>
);

const AttackCard = ({ icon: Icon, title, desc, color }) => (
  <div className={`bg-gradient-to-br from-gray-800 to-gray-900 border border-${color}-500/30 rounded-xl p-6 hover:scale-105 transition-transform`}>
    <Icon className={`w-12 h-12 text-${color}-500 mb-4`} />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);

const MetricCard = ({ label, value }) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
    <Database className="w-8 h-8 text-blue-500 mb-2" />
    <p className="text-gray-400 text-sm mb-1">{label.replace(/_/g, ' ').toUpperCase()}</p>
    <p className="text-3xl font-bold text-white">{value}%</p>
  </div>
);

const DefenseCategory = ({ title, icon: Icon, tips }) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
    <Icon className="w-12 h-12 text-green-500 mb-4" />
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <ul className="space-y-3">
      {tips.map((tip, j) => (
        <li key={j} className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
          <span className="text-gray-300">{tip}</span>
        </li>
      ))}
    </ul>
  </div>
);

// ===================================
// LAYOUT COMPONENTS
// ===================================
const Navbar = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">CyberShield</span>
          </div>

          <div className="hidden md:flex space-x-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activePage === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-2 space-y-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activePage === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center text-gray-400">
        <p>&copy; 2024 CyberShield. All rights reserved.</p>
        <p className="text-sm mt-2">Protecting your digital assets with advanced threat intelligence</p>
      </div>
    </div>
  </footer>
);

// ===================================
// PAGE COMPONENTS
// ===================================
const HomePage = ({ setActivePage }) => (
  <div className="space-y-12 animate-fade-in">
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-black rounded-2xl p-8 md:p-12">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-4">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="h-8 w-8 border border-blue-400 rounded"></div>
          ))}
        </div>
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Cyber Security Intelligence
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          Advanced threat analysis and protection systems
        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => setActivePage('analysis')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
            Explore Data
          </button>
          <button onClick={() => setActivePage('phishing')} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
            Scan URL
          </button>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {ATTACK_TYPES.map((attack, i) => (
        <AttackCard key={i} {...attack} />
      ))}
    </div>

    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6">Common Attack Types</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {COMMON_ATTACKS.map((type, i) => (
          <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-semibold text-white">{type.name}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                type.impact === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
              }`}>
                {type.impact}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{type.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AnalysisPage = () => {
  const [edaData, setEdaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/eda/data_accuracy`);
      if (!response.ok) throw new Error("Failed to fetch EDA data");

      const data = await response.json();
      setEdaData(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-8 border border-blue-500/30">
        <h1 className="text-4xl font-bold text-white mb-4">Data Analysis Dashboard</h1>
        <p className="text-blue-200">
          Comprehensive exploratory data analysis of cyber attack patterns
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-900/30 border border-red-500 rounded-xl p-8 text-center">
          <p className="text-red-400">Error: {error}</p>
          <button 
            onClick={loadData}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>
        </div>
      ) : edaData ? (
        <>
          {/* METRIC CARDS */}
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(edaData.data_quality).map(([key, value]) => (
              <MetricCard key={key} label={key} value={value} />
            ))}
          </div>

          {/* STATIC CHARTS WITH BOXES */}
          <div className="flex flex-col items-center space-y-12 mt-8">

            <ChartBox title="Top 20 Attack Types">
              <img 
                src="/static/eda/top_20_attack_types.png"
                className="w-full rounded-xl border border-gray-600"
                alt="Top 20 Attack Types"
              />
            </ChartBox>

            <ChartBox title="Top 15 Countries">
              <img 
                src="/static/eda/top_15_countries.png"
                className="w-full rounded-xl border border-gray-600"
                alt="Top Countries"
              />
            </ChartBox>

            <ChartBox title="Top 10 Target Industries">
              <img 
                src="/static/eda/top_10_target_industries.png"
                className="w-full rounded-xl border border-gray-600"
                alt="Industries"
              />
            </ChartBox>

            <ChartBox title="Attack vs Impact">
              <img 
                src="/static/eda/attack_vs_impact_text.png"
                className="w-full rounded-xl border border-gray-600"
                alt="Attack vs Impact"
              />
            </ChartBox>

            <ChartBox title="Financial Loss vs Affected Users">
              <img 
                src="/static/eda/financial_loss_vs_affected_users.png"
                className="w-full rounded-xl border border-gray-600"
                alt="Loss vs Users"
              />
            </ChartBox>

            <ChartBox title="Correlation Heatmap">
              <img 
                src="/static/eda/correlation_heatmap.png"
                className="w-full rounded-xl border border-gray-600"
                alt="Correlation Heatmap"
              />
            </ChartBox>
          </div>
        </>
      ) : null}
    </div>
  );
};

// 🎨 CHART BOX COMPONENT
const ChartBox = ({ title, children }) => (
  <motion.div
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-lg w-full md:w-3/4"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-2xl font-bold text-white mb-6 text-center">{title}</h3>
    {children}
  </motion.div>
);




const PhishingPage = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    console.log('Scanning URL:', url);
    try {
      const response = await fetch(`${API_BASE}/phishing/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (!response.ok) throw new Error('Failed to detect phishing');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to analyze URL' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-8 border border-purple-500/30">
        <h1 className="text-4xl font-bold text-white mb-4">Phishing Link Detection</h1>
        <p className="text-purple-200">Analyze URLs for potential phishing threats using VirusTotal API</p>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Enter URL to Analyze</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={handleScan}
            disabled={!url || loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            {loading ? 'Analyzing...' : 'Scan URL'}
          </button>
        </div>

        {result && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className={`rounded-xl p-6 border-2 ${
              result.verdict === 'Phishing' ? 'bg-red-900/30 border-red-500' :
              result.verdict === 'Suspicious' ? 'bg-orange-900/30 border-orange-500' :
              result.error ? 'bg-gray-900/30 border-gray-500' :
              'bg-green-900/30 border-green-500'
            }`}>
              {result.error ? (
                <>
                  <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Error</h3>
                  <p className="text-gray-400 text-center">{result.error}</p>
                </>
              ) : (
                <>
                  {result.verdict === 'Legitimate' && <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />}
                  {result.verdict === 'Suspicious' && <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto mb-4" />}
                  {result.verdict === 'Phishing' && <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />}
                  
                  <h3 className="text-2xl font-bold text-white text-center mb-2">
                    {result.verdict}
                  </h3>
                  <p className="text-gray-300 text-center break-all">{result.url}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Check URL', desc: 'Verify suspicious links before clicking', icon: Link },
          { title: 'Domain Analysis', desc: 'Examine domain reputation and history', icon: Globe },
          { title: 'Real-time Scanning', desc: 'Powered by VirusTotal database', icon: Activity }
        ].map((feature, i) => (
          <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <feature.icon className="w-10 h-10 text-purple-500 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DefensePage = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-gradient-to-r from-green-900 to-teal-900 rounded-xl p-8 border border-green-500/30">
      <h1 className="text-4xl font-bold text-white mb-4">Defense Techniques</h1>
      <p className="text-green-200">Best practices and safety measures to protect against cyber threats</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {DEFENSE_CATEGORIES.map((category, i) => (
        <DefenseCategory key={i} {...category} />
      ))}
    </div>

    <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-8 border border-red-500/30">
      <h2 className="text-2xl font-bold text-white mb-4">Incident Response Plan</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {INCIDENT_RESPONSE.map((phase, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              {phase.step}
            </div>
            <h4 className="text-white font-bold mb-1">{phase.title}</h4>
            <p className="text-gray-400 text-sm">{phase.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-xl p-8 border border-indigo-500/30">
      <h1 className="text-4xl font-bold text-white mb-4">About CyberShield</h1>
      <p className="text-indigo-200">Advanced cybersecurity intelligence and threat analysis platform</p>
    </div>

    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        CyberShield is a comprehensive cybersecurity platform that combines data analysis, threat detection, and educational resources to help organizations and individuals protect against cyber threats.
      </p>
      <p className="text-gray-300 leading-relaxed">
        Our platform leverages machine learning, real-time threat intelligence, and extensive attack pattern analysis to provide actionable insights and proactive defense mechanisms.
      </p>
    </div>

    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Tech Stack</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Frontend</h3>
          <ul className="space-y-2">
            <li className="text-gray-300">⚛️ React 18</li>
            <li className="text-gray-300">🎨 Tailwind CSS</li>
            <li className="text-gray-300">🎯 Lucide Icons</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Backend</h3>
          <ul className="space-y-2">
            <li className="text-gray-300">⚡ FastAPI</li>
            <li className="text-gray-300">🐍 Python</li>
            <li className="text-gray-300">🔍 VirusTotal API</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Data Analysis</h3>
          <ul className="space-y-2">
            <li className="text-gray-300">📊 Pandas</li>
            <li className="text-gray-300">📈 Matplotlib</li>
            <li className="text-gray-300">🎨 Seaborn</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Features</h3>
          <ul className="space-y-2">
            <li className="text-gray-300">📊 EDA Visualization</li>
            <li className="text-gray-300">🔒 Phishing Detection</li>
            <li className="text-gray-300">📱 Responsive Design</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Contact</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-gray-800/50 rounded-lg">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Support</h3>
          <p className="text-gray-400">support@cybershield.com</p>
        </div>
        <div className="text-center p-6 bg-gray-800/50 rounded-lg">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Website</h3>
          <p className="text-gray-400">www.cybershield.com</p>
        </div>
        <div className="text-center p-6 bg-gray-800/50 rounded-lg">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Status</h3>
          <p className="text-gray-400">All systems operational</p>
        </div>
      </div>
    </div>
  </div>
);

// ===================================
// MAIN APP COMPONENT
// ===================================
const CyberSecurityDashboard = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage setActivePage={setActivePage} />;
      case 'analysis': return <AnalysisPage />;
      case 'phishing': return <PhishingPage />;
      case 'defense': return <DefensePage />;
      case 'about': return <AboutPage />;
      default: return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>

      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default CyberSecurityDashboard;