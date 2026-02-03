import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, BookOpen, Users, Home as HomeIcon, User as UserIcon, Camera, Send, 
  Paperclip, MoreVertical, Search, MessageCircle, LogOut, Settings, ChevronRight, 
  MapPin, Image as ImageIcon, Heart, Video, Phone, Mic, MicOff, VideoOff, Gift, 
  Plus, Bell, CheckCircle, UserPlus, X, Edit2, ShoppingBag, Map, Ghost, 
  Smile, AlertTriangle, Clock, Calendar, Award, Play, Pause, Flame, Trash2, CheckSquare, Square, Info,
  Mail, Lock, Eye, EyeOff, ArrowRight, Gavel, FileText, Ban, UserX, Flag, Check, XCircle,
  Zap, Coffee, Brain, Timer, Trophy, Star, Medal
} from 'lucide-react';
import { AppView, MainTab, User, Group, Message, Post, Comment, StudyRoom, MarketItem, Confession, TimetableEntry, Todo, Report } from './types';
import { SCHOOLS, COURSES, LEVELS, MOCK_GROUPS, MOCK_POSTS, MOCK_STUDY_ROOMS, MOCK_MARKET_ITEMS, MOCK_CONFESSIONS, TOXIC_WORDS, DAYS_OF_WEEK, MOCK_TIMETABLE, MOCK_TODOS, MOCK_USERS, ADMIN_EMAIL, MOCK_REPORTS, LEVEL_THRESHOLDS, BADGES } from './constants';

// --- Modals (Report Modal integrated with App State) ---

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  onSubmitReport: (reason: string, description: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, targetName, onSubmitReport }) => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(reason, description);
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setReason('');
        setDescription('');
        onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-slide-up">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
                <AlertTriangle size={24} />
                Report Content
              </h3>
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              You are reporting <span className="font-bold">{targetName}</span>. 
              Reports are reviewed by our safety team.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <select 
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-red-500 outline-none"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="">Select a reason</option>
                  <option value="Harassment">Harassment or Bullying</option>
                  <option value="Sexual Misconduct">Sexual Misconduct / Assault</option>
                  <option value="Hate Speech">Hate Speech</option>
                  <option value="Spam">Spam or Fake Account</option>
                  <option value="Academic Dishonesty">Academic Dishonesty</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                  placeholder="Please describe what happened..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Report Received</h3>
            <p className="text-gray-600 mb-6">
              Thank you for keeping our community safe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CreatePostModal = ({ user, onClose, onCreate }: { user: User, onClose: () => void, onCreate: (content: string, hasImage: boolean) => void }) => {
    const [content, setContent] = useState('');
    const [hasImage, setHasImage] = useState(false);

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Create Post</h3>
                    <button onClick={onClose}><X className="text-gray-400" /></button>
                </div>
                
                <div className="flex gap-3 mb-4">
                    <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    <div className="flex-1">
                        <p className="font-bold text-sm">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500">Public • {user.school}</p>
                    </div>
                </div>

                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your campus experience, notes, or ask a question..." 
                    className="w-full h-32 p-3 bg-gray-50 rounded-xl border border-gray-100 outline-none resize-none focus:ring-2 focus:ring-blue-100 mb-4"
                />

                {hasImage && (
                    <div className="relative mb-4">
                        <img src="https://picsum.photos/seed/temp/400/200" className="w-full h-40 object-cover rounded-xl" />
                        <button onClick={() => setHasImage(false)} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"><X size={14}/></button>
                    </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <button onClick={() => setHasImage(!hasImage)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition ${hasImage ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>
                        <ImageIcon size={18} /> Photo
                    </button>
                    <button 
                        onClick={() => onCreate(content, hasImage)}
                        disabled={!content.trim()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

const FocusConfigModal = ({ isOpen, onClose, onStart }: { isOpen: boolean, onClose: () => void, onStart: (mins: number) => void }) => {
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2"><Brain className="text-purple-600" /> Focus Mode</h3>
                    <button onClick={onClose}><X className="text-gray-400" /></button>
                </div>
                <p className="text-gray-600 mb-6 text-sm">Lock social features and distractions to get real work done.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button onClick={() => onStart(30)} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-purple-50 border-2 border-transparent hover:border-purple-500 transition">
                        <Zap size={32} className="text-purple-600 mb-2" />
                        <span className="font-bold text-gray-800">30 Mins</span>
                        <span className="text-xs text-gray-500">Power Session</span>
                    </button>
                    <button onClick={() => onStart(60)} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-50 border-2 border-transparent hover:border-blue-500 transition">
                        <Timer size={32} className="text-blue-600 mb-2" />
                        <span className="font-bold text-gray-800">60 Mins</span>
                        <span className="text-xs text-gray-500">Deep Work</span>
                    </button>
                </div>
                <div className="text-center text-xs text-gray-400 bg-gray-100 p-3 rounded-lg">
                    ⚠️ Social Feed & Marketplace will be locked.
                </div>
            </div>
        </div>
    );
}

const FocusLockedView = ({ endTime, onEndEarly }: { endTime: number, onEndEarly: () => void }) => {
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = endTime - Date.now();
            if (diff <= 0) {
                onEndEarly(); // Time up
                return;
            }
            const m = Math.floor(diff / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${m}:${s < 10 ? '0' : ''}${s}`);
        }, 1000);
        return () => clearInterval(interval);
    }, [endTime]);

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-gray-50 text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Lock size={64} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Focus Mode Active</h2>
            <p className="text-gray-500 mb-8 max-w-xs">This feature is locked to help you concentrate. Keep crushing your goals!</p>
            
            <div className="text-5xl font-mono font-bold text-gray-900 mb-10">
                {timeLeft}
            </div>

            <button onClick={onEndEarly} className="text-sm text-red-500 font-bold hover:underline">
                Give up & Exit Focus Mode
            </button>
        </div>
    );
};

// --- Helper Components ---

const Splash = ({ onComplete }: { onComplete: () => void }) => (
  <div className="h-screen w-full bg-gradient-to-br from-blue-600 to-indigo-600 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
    <div className="z-10 flex flex-col items-center animate-fade-in-up">
      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl rotate-3">
        <BookOpen className="text-blue-600 w-12 h-12" />
      </div>
      <h1 className="text-4xl font-bold mb-2 tracking-tight">StudyConnect</h1>
      <p className="text-blue-100 text-lg mb-12">Learn. Connect. Grow.</p>
      <button onClick={onComplete} className="bg-white text-blue-600 font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-50 transition transform hover:scale-105 active:scale-95">Get Started</button>
    </div>
  </div>
);

const Terms = ({ onAgree, onDecline }: { onAgree: () => void, onDecline: () => void }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      <div className="bg-white p-6 shadow-sm z-10"><h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Shield className="text-blue-600" /> Terms & Conditions</h1><p className="text-sm text-gray-500 mt-1">Please read carefully before proceeding.</p></div>
      <div className="flex-1 overflow-y-auto p-6 text-gray-700 text-sm leading-relaxed space-y-4">
        <section><h3 className="font-bold text-gray-900 mb-2">1. Academic Integrity</h3><p>StudyConnect is for learning. Cheating is strictly prohibited.</p></section>
        <section><h3 className="font-bold text-gray-900 mb-2 text-red-600">2. Safety & Misconduct</h3><p className="bg-red-50 p-3 rounded-lg border border-red-100">Sexual assault, harassment, or explicit content will result in an <strong>immediate permanent ban</strong>.</p></section>
        <div className="h-10"></div>
      </div>
      <div className="p-6 bg-white border-t border-gray-100 z-10">
        <label className="flex items-start gap-3 mb-6 cursor-pointer"><input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="mt-1 w-5 h-5 text-blue-600 rounded" /><span className="text-sm text-gray-600">I have read and agree to the Terms & Conditions.</span></label>
        <div className="flex gap-4"><button onClick={onDecline} className="flex-1 py-3 text-gray-500 font-medium hover:text-gray-700">Exit App</button><button disabled={!checked} onClick={onAgree} className={`flex-1 py-3 rounded-xl font-bold shadow-md transition-all ${checked ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Agree & Continue</button></div>
      </div>
    </div>
  );
};

// --- Modals ---

const CreateGroupModal = ({ onClose, onCreate }: { onClose: () => void, onCreate: (data: any) => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <form 
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-slide-up"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          onCreate({
            name: fd.get('name'),
            description: fd.get('description'),
            course: fd.get('course'),
          });
        }}
      >
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Create Study Group</h3>
            <button type="button" onClick={onClose}><X className="text-gray-400" /></button>
         </div>
         
         <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Group Name</label>
              <input name="name" required className="w-full bg-gray-100 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Calculus Heroes" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" required className="w-full bg-gray-100 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="What is this group about?" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Related Course</label>
               <select name="course" className="w-full bg-gray-100 p-3 rounded-lg outline-none">
                  {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
               </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg mt-2">Create Group</button>
         </div>
      </form>
    </div>
  );
};

const PostConfessionModal = ({ onClose, onPost }: { onClose: () => void, onPost: (content: string) => void }) => {
    const [content, setContent] = useState('');
    
    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-slide-up relative overflow-hidden">
                <Ghost className="absolute -right-4 -top-4 text-purple-100 w-32 h-32 pointer-events-none" />
                <div className="flex justify-between items-center mb-4 relative z-10">
                    <h3 className="text-xl font-bold text-gray-900">Post Secretly</h3>
                    <button onClick={onClose}><X className="text-gray-400" /></button>
                </div>
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type your confession here... (It will be anonymous)"
                    className="w-full bg-purple-50 p-4 rounded-xl h-32 outline-none border border-purple-100 resize-none text-gray-700 placeholder-purple-300 relative z-10 focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500 mt-2 mb-4 relative z-10 flex items-center gap-1"><Shield size={12}/> Your identity is hidden.</p>
                <button 
                    disabled={!content.trim()}
                    onClick={() => onPost(content)}
                    className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition relative z-10"
                >
                    Post Confession
                </button>
             </div>
        </div>
    );
};

const UserProfileModal = ({ user, onClose, onMessage }: { user: User, onClose: () => void, onMessage: () => void }) => {
  if (!user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                 <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 text-white p-2 rounded-full hover:bg-black/30">
                    <X size={20} />
                 </button>
            </div>
            <div className="px-6 pb-8 -mt-16 flex flex-col items-center">
                <img src={user.avatar} className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 object-cover" />
                <h2 className="text-2xl font-bold mt-4 text-center">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-500 text-center">{user.school}</p>
                <div className="flex gap-2 mt-2 mb-4 justify-center">
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-bold">{user.course}</span>
                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-bold">Lvl {user.level}</span>
                </div>
                
                <p className="text-center text-gray-700 mb-6 italic">"{user.bio || 'Ready to study!'}"</p>

                {user.isPublic ? (
                  <button 
                    onClick={onMessage}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                  >
                      <MessageCircle size={20} /> Message
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500 bg-gray-100 p-3 rounded-xl">
                     <Info size={16} />
                     <span className="text-sm">This profile is private.</span>
                  </div>
                )}
            </div>
        </div>
    </div>
  )
}

const EditProfileModal = ({ user, onClose, onSave }: { user: User, onClose: () => void, onSave: (u: User) => void }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName || '');
    const [bio, setBio] = useState(user.bio || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...user, firstName, lastName, bio });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
                    <button type="button" onClick={onClose}><X className="text-gray-400" /></button>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">First Name</label>
                            <input value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Last Name</label>
                            <input value={lastName} onChange={e => setLastName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Bio</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-xl mt-2">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

const NotificationsModal = ({ onClose }: { onClose: () => void }) => {
    const [settings, setSettings] = useState({ push: true, email: false, groups: true });
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
                    <button onClick={onClose}><X className="text-gray-400" /></button>
                </div>
                <div className="space-y-4">
                    {Object.entries(settings).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="capitalize font-medium text-gray-700">{key} Notifications</span>
                            <button onClick={() => setSettings({...settings, [key]: !val})} className={`w-12 h-6 rounded-full p-1 transition-colors ${val ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${val ? 'translate-x-6' : ''}`} />
                            </button>
                        </div>
                    ))}
                    <button onClick={onClose} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl mt-4">Done</button>
                </div>
            </div>
        </div>
    );
};

const PrivacyModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-slide-up">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Privacy & Security</h3>
                    <button onClick={onClose}><X className="text-gray-400" /></button>
                </div>
                <div className="space-y-4">
                    <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100">
                        <div>
                            <p className="font-bold text-gray-800">Change Password</p>
                            <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                    <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100">
                        <div>
                            <p className="font-bold text-gray-800">Blocked Users</p>
                            <p className="text-xs text-gray-500">2 users blocked</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                    <div className="p-4 bg-blue-50 rounded-xl">
                         <p className="text-sm text-blue-800 flex items-center gap-2"><Shield size={16} /> Your data is encrypted and secure.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimetableModal = ({ onClose, timetable, onUpdate, semesterEnd, onUpdateSemesterEnd }: any) => {
    const [entry, setEntry] = useState<Partial<TimetableEntry>>({ day: 'Monday', color: 'bg-blue-100 text-blue-800' });
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSave = () => {
        if (!entry.courseName || !entry.startTime || !entry.endTime) return;
        
        if (editingId) {
            onUpdate(timetable.map((t: TimetableEntry) => t.id === editingId ? { ...t, ...entry } : t));
        } else {
            onUpdate([...timetable, { ...entry, id: `t_${Date.now()}` }]);
        }
        
        // Reset form
        setEntry({ courseName: '', location: '', startTime: '', endTime: '', day: 'Monday', color: 'bg-blue-100 text-blue-800' });
        setEditingId(null);
    };

    const handleEdit = (item: TimetableEntry) => {
        setEntry(item);
        setEditingId(item.id);
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering edit
        onUpdate(timetable.filter((t: TimetableEntry) => t.id !== id));
        if (editingId === id) {
             setEditingId(null);
             setEntry({ courseName: '', location: '', startTime: '', endTime: '', day: 'Monday', color: 'bg-blue-100 text-blue-800' });
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEntry({ courseName: '', location: '', startTime: '', endTime: '', day: 'Monday', color: 'bg-blue-100 text-blue-800' });
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl p-6 h-[85vh] flex flex-col animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl flex items-center gap-2"><Calendar /> Manage Timetable</h3>
                    <button onClick={onClose}><X size={24} className="text-gray-500" /></button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl mb-4">
                    <label className="text-xs font-bold text-blue-700 uppercase mb-1 block">Semester Ends On</label>
                    <input type="date" value={semesterEnd} onChange={(e) => onUpdateSemesterEnd(e.target.value)} className="bg-white p-2 rounded-lg border border-blue-200 w-full text-sm font-bold text-gray-700" />
                </div>

                <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
                    {editingId && (
                        <div className="absolute top-2 right-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-bold">
                            Editing Mode
                        </div>
                    )}
                    <h4 className="font-bold text-sm text-gray-700">{editingId ? 'Edit Class' : 'Add Weekly Class'}</h4>
                    <div className="grid grid-cols-2 gap-2">
                        <input placeholder="Course Name" value={entry.courseName || ''} onChange={e => setEntry({...entry, courseName: e.target.value})} className="p-2 border rounded-lg text-sm" />
                        <input placeholder="Location" value={entry.location || ''} onChange={e => setEntry({...entry, location: e.target.value})} className="p-2 border rounded-lg text-sm" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <select value={entry.day} onChange={e => setEntry({...entry, day: e.target.value})} className="p-2 border rounded-lg text-sm bg-white">
                            {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <input type="time" value={entry.startTime || ''} onChange={e => setEntry({...entry, startTime: e.target.value})} className="p-2 border rounded-lg text-sm" />
                        <input type="time" value={entry.endTime || ''} onChange={e => setEntry({...entry, endTime: e.target.value})} className="p-2 border rounded-lg text-sm" />
                    </div>
                    <div className="flex gap-2">
                        {editingId && <button onClick={cancelEdit} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold text-sm">Cancel</button>}
                        <button onClick={handleSave} className="flex-1 bg-black text-white py-2 rounded-lg font-bold text-sm">{editingId ? 'Update Class' : 'Add to Schedule'}</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2">
                    {timetable.length === 0 && <p className="text-center text-gray-400 text-sm">No classes added yet.</p>}
                    {timetable.map((t: TimetableEntry) => (
                        <div 
                            key={t.id} 
                            onClick={() => handleEdit(t)}
                            className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer hover:border-blue-300 transition ${t.id === editingId ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-gray-50 border-gray-100'}`}
                        >
                            <div>
                                <p className="font-bold text-sm">{t.courseName}</p>
                                <p className="text-xs text-gray-500">{t.day} • {t.startTime} - {t.endTime}</p>
                                <p className="text-xs text-blue-600 flex items-center gap-1"><MapPin size={10} /> {t.location}</p>
                            </div>
                            <button onClick={(e) => handleDelete(t.id, e)} className="text-red-500 p-2 hover:bg-red-50 rounded-full"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ClassDetailModal = ({ entry, onClose, todos, onUpdateTodos, onToggleReminder }: { entry: TimetableEntry, onClose: () => void, todos: Todo[], onUpdateTodos: (t: Todo[]) => void, onToggleReminder: (id: string) => void }) => {
    const [task, setTask] = useState('');
    const classTodos = todos.filter(t => t.courseName === entry.courseName);
    
    const addTodo = () => {
        if (!task.trim()) return;
        const newTodo: Todo = { id: `td_${Date.now()}`, courseName: entry.courseName, task, isCompleted: false };
        onUpdateTodos([...todos, newTodo]);
        setTask('');
    };

    const toggleTodo = (id: string) => {
        onUpdateTodos(todos.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    };

    const deleteTodo = (id: string) => {
        onUpdateTodos(todos.filter(t => t.id !== id));
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end sm:items-center">
            <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-6 h-[70vh] flex flex-col animate-slide-up shadow-2xl">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{entry.courseName}</h2>
                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                            <Clock size={16} /> <span>{entry.startTime} - {entry.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 mt-1 font-medium">
                            <MapPin size={16} /> <span>{entry.location}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="bg-gray-100 p-2 rounded-full"><X size={20} /></button>
                </div>

                <div className={`p-4 rounded-xl border mb-6 flex items-start gap-3 transition-colors ${entry.reminderEnabled ? 'bg-yellow-50 border-yellow-100' : 'bg-gray-50 border-gray-100'}`}>
                    <Bell className={`shrink-0 mt-1 ${entry.reminderEnabled ? 'text-yellow-600' : 'text-gray-400'}`} size={20} />
                    <div>
                        <p className={`font-bold text-sm ${entry.reminderEnabled ? 'text-yellow-800' : 'text-gray-700'}`}>Class Reminder</p>
                        <p className={`text-xs ${entry.reminderEnabled ? 'text-yellow-700' : 'text-gray-500'}`}>
                           {entry.reminderEnabled ? 'You will be notified 15 mins before this class starts.' : 'Notifications are disabled for this class.'}
                        </p>
                    </div>
                    <div className="ml-auto">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={entry.reminderEnabled || false} onChange={() => onToggleReminder(entry.id)} className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><CheckSquare size={20} /> Course To-Do List</h3>
                    <div className="flex gap-2 mb-4">
                        <input value={task} onChange={e => setTask(e.target.value)} placeholder="Add homework, reading, etc..." className="flex-1 p-3 bg-gray-100 rounded-xl outline-none" />
                        <button onClick={addTodo} className="bg-black text-white px-4 rounded-xl font-bold"><Plus /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {classTodos.length === 0 && <p className="text-gray-400 text-sm italic">No tasks yet. Pin a todo for this course!</p>}
                        {classTodos.map(t => (
                            <div key={t.id} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                <button onClick={() => toggleTodo(t.id)} className={t.isCompleted ? "text-green-500" : "text-gray-300"}>
                                    {t.isCompleted ? <CheckCircle size={24} /> : <Square size={24} />}
                                </button>
                                <span className={`flex-1 text-sm ${t.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>{t.task}</span>
                                <button onClick={() => deleteTodo(t.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CommentModal = ({ post, currentUser, onClose, onUpdatePost }: { post: Post, currentUser: User, onClose: () => void, onUpdatePost: (p: Post) => void }) => {
  const [comments, setComments] = useState<Comment[]>(post.commentsList || []);
  const [inputText, setInputText] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.firstName,
      userAvatar: currentUser.avatar || '',
      text: replyTo ? `@${replyTo.userName} ${inputText}` : inputText,
      timestamp: new Date()
    };
    
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    onUpdatePost({ ...post, comments: updatedComments.length, commentsList: updatedComments });
    setInputText('');
    setReplyTo(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end sm:items-center">
      <div className="bg-white w-full max-w-lg h-[80vh] sm:h-[600px] sm:rounded-2xl rounded-t-3xl flex flex-col shadow-2xl animate-slide-up">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg">Comments ({comments.length})</h3>
          <button onClick={onClose}><X size={24} className="text-gray-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">No comments yet. Be the first!</div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="flex gap-3">
                 <img src={comment.userAvatar} className="w-8 h-8 rounded-full object-cover" />
                 <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl p-3 rounded-tl-none">
                       <p className="text-xs font-bold text-gray-900">{comment.userName}</p>
                       <p className="text-sm text-gray-800">{comment.text}</p>
                    </div>
                    <div className="flex gap-4 mt-1 ml-2">
                       <span className="text-[10px] text-gray-400">{comment.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                       <button onClick={() => { setReplyTo(comment); setInputText(`@${comment.userName} `); }} className="text-[10px] font-bold text-gray-500 hover:text-blue-600">Reply</button>
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t bg-white pb-safe">
           {replyTo && (
             <div className="flex justify-between items-center text-xs text-gray-500 mb-2 bg-gray-50 p-2 rounded-lg">
                <span>Replying to <b>{replyTo.userName}</b></span>
                <button onClick={() => { setReplyTo(null); setInputText(''); }}><X size={14} /></button>
             </div>
           )}
           <div className="flex gap-2 items-center">
              <input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Add a comment..." 
                className="flex-1 bg-gray-100 p-3 rounded-xl outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button onClick={handleSubmit} className="p-3 bg-blue-600 text-white rounded-xl"><Send size={18} /></button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Views ---

const AdminPortal = ({ 
    onLogout, 
    reports, 
    onDismissReport, 
    onBanUser,
    onWarnReporter 
  }: { 
    onLogout: () => void, 
    reports: Report[], 
    onDismissReport: (id: string) => void,
    onBanUser: (id: string, reportId: string) => void,
    onWarnReporter: (id: string, reportId: string) => void
  }) => {
    
    return (
        <div className="h-full flex flex-col bg-gray-900 text-white overflow-hidden">
            <header className="p-4 bg-gray-800 shadow-md flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                        <Gavel size={20} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">Admin Portal</h1>
                        <p className="text-xs text-gray-400">Moderation Dashboard</p>
                    </div>
                </div>
                <button onClick={onLogout} className="p-2 hover:bg-gray-700 rounded-full transition"><LogOut size={20} /></button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                        <h3 className="text-gray-400 text-xs font-bold uppercase">Pending Reports</h3>
                        <p className="text-3xl font-bold mt-1 text-yellow-500">{reports.length}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                        <h3 className="text-gray-400 text-xs font-bold uppercase">Action Required</h3>
                        <p className="text-3xl font-bold mt-1 text-red-500">{reports.filter(r => r.severity === 'HIGH').length}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="font-bold text-lg flex items-center gap-2"><FileText className="text-blue-400" /> Active Reports</h2>
                    
                    {reports.length === 0 ? (
                        <div className="text-center p-8 bg-gray-800 rounded-xl border border-gray-700 text-gray-500">
                            <CheckCircle size={48} className="mx-auto mb-4 opacity-50" />
                            <p>All clean! No pending reports.</p>
                        </div>
                    ) : (
                        reports.map(report => (
                            <div key={report.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                                <div className="p-4 border-b border-gray-700 flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${report.severity === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {report.severity}
                                            </span>
                                            <span className="text-xs text-gray-400">{report.timestamp.toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="font-bold text-base text-gray-200">Reason: {report.reason}</h3>
                                    </div>
                                    <AlertTriangle className="text-red-500" size={20} />
                                </div>
                                
                                <div className="p-4 bg-gray-900/50">
                                    <p className="text-xs text-gray-500 mb-1">Reported Content:</p>
                                    <p className="text-sm text-gray-300 italic">"{report.content}"</p>
                                </div>

                                <div className="p-4 grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <span className="text-gray-500">Offender:</span> <span className="text-white font-bold">{report.offenderName}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Reporter:</span> <span className="text-white font-bold">{report.reporterName}</span>
                                    </div>
                                </div>

                                <div className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
                                    <button 
                                        onClick={() => onDismissReport(report.id)}
                                        className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-bold transition"
                                    >
                                        Dismiss
                                    </button>
                                    <button 
                                        onClick={() => onWarnReporter(report.reporterId, report.id)}
                                        className="flex-1 py-2 bg-orange-900/50 text-orange-400 hover:bg-orange-900/70 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                                    >
                                        <XCircle size={12} /> False Report
                                    </button>
                                    <button 
                                        onClick={() => onBanUser('offender_id', report.id)}
                                        className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                                    >
                                        <Ban size={12} /> Ban User
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const SuggestedConnections = ({ currentUser, users, onConnect }: { currentUser: User, users: User[], onConnect: (u: User) => void }) => {
    // Basic recommendation logic: same school and course
    const suggestions = users.filter(u => u.id !== currentUser.id && u.school === currentUser.school && u.course === currentUser.course);

    if (suggestions.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 px-1"><UserPlus size={18} /> Classmates & Suggestions</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-1">
                {suggestions.map(u => (
                    <div key={u.id} className="flex-shrink-0 w-36 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition" onClick={() => onConnect(u)}>
                        <img src={u.avatar} className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-blue-50" />
                        <h4 className="font-bold text-sm text-gray-900 truncate w-full">{u.firstName} {u.lastName}</h4>
                        <p className="text-[10px] text-gray-500 mb-3">{u.level} Level</p>
                        <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-bold w-full">View Profile</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StudyRoomView = ({ rooms }: { rooms: StudyRoom[] }) => {
  const [activeRoom, setActiveRoom] = useState<StudyRoom | null>(null);
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  if (activeRoom) {
     const mins = Math.floor(timer / 60);
     const secs = timer % 60;
     return (
       <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col text-white animate-fade-in">
          <div className="p-4 flex justify-between items-center">
             <button onClick={() => setActiveRoom(null)}><ChevronRight className="rotate-180" /></button>
             <h3 className="font-bold">{activeRoom.name}</h3>
             <Settings size={20} />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
             <div className="w-64 h-64 rounded-full border-4 border-blue-500 flex items-center justify-center text-5xl font-mono font-bold relative mb-8 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                 {mins}:{secs < 10 ? '0' : ''}{secs}
                 <div className="absolute -bottom-10 text-sm font-sans font-normal text-blue-300 flex items-center gap-2"><Users size={14} /> {activeRoom.activeUsers + 1} Studying</div>
             </div>
             <button 
               onClick={() => setIsRunning(!isRunning)}
               className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition transform active:scale-95 ${isRunning ? 'bg-yellow-500' : 'bg-blue-600'}`}
             >
               {isRunning ? <Pause fill="white" /> : <Play fill="white" className="ml-1" />}
             </button>
             <p className="mt-8 text-gray-400 italic">"Focus on being productive instead of busy."</p>
          </div>
       </div>
     );
  }

  return (
    <div className="p-4 space-y-4">
       <h2 className="font-bold text-lg flex items-center gap-2"><Clock className="text-blue-600" /> Silent Study Rooms</h2>
       <div className="grid grid-cols-1 gap-4">
          {rooms.map(room => (
             <div key={room.id} onClick={() => setActiveRoom(room)} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition cursor-pointer">
                 <img src={room.image} className="w-16 h-16 rounded-xl object-cover" />
                 <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{room.name}</h3>
                    <p className="text-xs text-gray-500">{room.topic}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-600 font-bold"><Users size={12} /> {room.activeUsers} Active</div>
                 </div>
                 <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold">Join</button>
             </div>
          ))}
       </div>
    </div>
  );
};

const MoodTracker = () => {
    const [mood, setMood] = useState<string | null>(null);
    return (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-2xl mb-6">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Smile size={18} /> Mood Check-in</h3>
            {!mood ? (
                <div className="flex justify-between">
                    {['😫','😕','😐','🙂','🤩'].map(e => (
                        <button key={e} onClick={() => setMood(e)} className="text-2xl hover:scale-125 transition">{e}</button>
                    ))}
                </div>
            ) : (
                <div className="text-center py-2 animate-fade-in">
                    <p className="text-sm font-medium text-gray-700">Thanks for sharing! Keep going! 💪</p>
                </div>
            )}
        </div>
    );
};

const MarketplaceView = ({ items, onContact }: { items: MarketItem[], onContact: (sellerId: string) => void }) => (
   <div className="p-4">
      <h2 className="font-bold text-xl mb-4 flex items-center gap-2"><ShoppingBag className="text-orange-500" /> Campus Market</h2>
      <div className="grid grid-cols-2 gap-4">
         {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
               <div className="aspect-square bg-gray-100 relative">
                   <img src={item.image} className="w-full h-full object-cover" />
                   <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">{item.category}</span>
               </div>
               <div className="p-3">
                  <h4 className="font-bold text-sm truncate">{item.title}</h4>
                  <p className="text-blue-600 font-bold text-sm mt-1">{item.price}</p>
                  <p className="text-xs text-gray-500 mt-1">Sold by {item.sellerName}</p>
                  <button onClick={() => onContact(item.sellerId)} className="w-full mt-2 bg-gray-900 text-white text-xs font-bold py-2 rounded-lg">Message</button>
               </div>
            </div>
         ))}
      </div>
   </div>
);

const ConfessionView = ({ confessions, onPostClick, onLike }: { confessions: Confession[], onPostClick: () => void, onLike: (id: string) => void }) => (
    <div className="p-4 space-y-4 bg-gray-50 min-h-full">
        <div className="bg-purple-600 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden mb-6">
            <Ghost className="absolute -right-4 -bottom-4 opacity-20 w-32 h-32" />
            <h2 className="font-bold text-xl relative z-10">Confession Box</h2>
            <p className="text-purple-100 text-sm relative z-10">Anonymous. Safe. Unfiltered.</p>
            <button onClick={onPostClick} className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-bold text-sm relative z-10 active:scale-95 transition">Post Confession</button>
        </div>
        {confessions.map(conf => (
            <div key={conf.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-800 font-medium font-serif italic text-lg leading-relaxed">"{conf.content}"</p>
                <div className="flex justify-between items-center mt-4 text-xs text-gray-500 border-t pt-3">
                    <span>{conf.school} • {conf.timestamp}</span>
                    <div className="flex gap-3">
                        <button onClick={() => onLike(conf.id)} className={`flex items-center gap-1 transition ${conf.isLiked ? 'text-red-500 font-bold' : 'text-gray-500 hover:text-red-500'}`}>
                            <Heart size={14} fill={conf.isLiked ? "currentColor" : "none"} /> {conf.likes}
                        </button>
                        <span className="flex items-center gap-1"><MessageCircle size={14} /> {conf.comments}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// --- Gamification Components ---

const LevelProgressCard = ({ user }: { user: User }) => {
    // Find current level based on points
    const currentLevel = LEVEL_THRESHOLDS.find(l => user.points >= l.min && user.points <= l.max) || LEVEL_THRESHOLDS[0];
    const nextLevel = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.indexOf(currentLevel) + 1] || currentLevel;
    
    const progress = Math.min(100, Math.max(0, ((user.points - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100));

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800 text-sm">{currentLevel.name}</h3>
                <span className="text-xs text-blue-600 font-bold">{user.points} pts</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400">
                <span>Current Level</span>
                <span>Next: {nextLevel.name}</span>
            </div>
        </div>
    );
};

const BadgesDisplay = ({ badgeIds }: { badgeIds: string[] }) => {
    const userBadges = BADGES.filter(b => badgeIds.includes(b.id));

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Medal size={18} className="text-yellow-500" /> Badges & Achievements</h3>
            {userBadges.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No badges earned yet. Start studying!</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {userBadges.map(badge => (
                        <div key={badge.id} className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-2xl mb-1 border border-yellow-100 shadow-sm">
                                {badge.icon}
                            </div>
                            <span className="text-[10px] font-bold text-gray-700 leading-tight">{badge.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const LeaderboardView = ({ users, groups }: { users: User[], groups: Group[] }) => {
    const [filter, setFilter] = useState<'students' | 'teams'>('students');
    
    // Sort logic
    const topStudents = [...users].sort((a, b) => b.points - a.points);
    const topTeams = [...groups].sort((a, b) => (b.points || 0) - (a.points || 0));

    return (
        <div className="p-4 space-y-4">
            <div className="flex bg-gray-100 p-1 rounded-xl mb-2">
                <button onClick={() => setFilter('students')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${filter === 'students' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Students</button>
                <button onClick={() => setFilter('teams')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${filter === 'teams' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Study Teams</button>
            </div>

            <div className="space-y-3">
                {filter === 'students' ? (
                    topStudents.map((u, idx) => (
                        <div key={u.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                            <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${idx < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                                {idx + 1}
                            </div>
                            <img src={u.avatar} className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-gray-900">{u.firstName} {u.lastName}</h4>
                                <p className="text-[10px] text-gray-500">{u.level} Level • {u.school}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-blue-600 text-sm">{u.points}</p>
                                <p className="text-[10px] text-gray-400">pts</p>
                            </div>
                        </div>
                    ))
                ) : (
                     topTeams.map((g, idx) => (
                        <div key={g.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                            <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${idx < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                                {idx + 1}
                            </div>
                            <img src={g.image} className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-gray-900">{g.name}</h4>
                                <p className="text-[10px] text-gray-500">{g.memberCount} Members</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-blue-600 text-sm">{g.points || 0}</p>
                                <p className="text-[10px] text-gray-400">pts</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

const HomeView = ({ user, timetable, onManageTimetable, onClassClick, semesterEnd, suggestions, onConnect, onStartFocus }: any) => {
    const todayIndex = new Date().getDay(); 
    const dayMap = [6, 0, 1, 2, 3, 4, 5];
    const todayName = DAYS_OF_WEEK[dayMap[todayIndex]];
    
    const todaysClasses = timetable
        .filter((t: TimetableEntry) => t.day === todayName)
        .sort((a: TimetableEntry, b: TimetableEntry) => a.startTime.localeCompare(b.startTime));

    return (
        <div className="h-full overflow-y-auto p-4 pb-20 no-scrollbar space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hi, {user.firstName} 👋</h1>
                    <p className="text-gray-500 text-sm">Ready to learn today?</p>
                </div>
                <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                    <Flame size={14} fill="currentColor" /> {user.streak} Day Streak
                </div>
            </header>

            <LevelProgressCard user={user} />

            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg flex justify-between items-center relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-1">Focus Mode</h3>
                    <p className="text-purple-100 text-xs mb-3">Lock distractions & boost productivity.</p>
                    <button onClick={onStartFocus} className="bg-white text-purple-600 px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-gray-100 transition">Start Session</button>
                </div>
                <Brain size={64} className="text-white/20 absolute -right-4 -bottom-4" />
            </div>

            <SuggestedConnections currentUser={user} users={suggestions} onConnect={onConnect} />
            
            <MoodTracker />

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><Clock size={18} /> Today's Schedule</h3>
                    <button onClick={onManageTimetable} className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100">Manage</button>
                </div>
                
                {todaysClasses.length > 0 ? (
                    <div className="grid gap-3">
                        {todaysClasses.map((t: TimetableEntry) => (
                            <div key={t.id} onClick={() => onClassClick(t)} className={`p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center cursor-pointer hover:opacity-90 transition ${t.color}`}>
                                <div>
                                    <h4 className="font-bold text-base">{t.courseName}</h4>
                                    <p className="text-xs opacity-80 flex items-center gap-1 mt-1"><MapPin size={10} /> {t.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">{t.startTime}</p>
                                    <p className="text-xs opacity-70">to {t.endTime}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm">
                         <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600"><CheckCircle /></div>
                         <h4 className="font-bold text-gray-900">No Classes Today!</h4>
                         <p className="text-xs text-gray-500 mt-1">Take a break or catch up on studies.</p>
                         <button onClick={onManageTimetable} className="mt-3 text-blue-600 text-xs font-bold">Update Schedule</button>
                    </div>
                )}
            </div>

            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <Calendar className="absolute top-4 right-4 opacity-20 w-24 h-24" />
                <h3 className="font-bold text-lg mb-2">Semester Progress</h3>
                <p className="opacity-80 text-sm mb-4">Classes automatically repeat weekly until:</p>
                <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg font-mono font-bold">
                    {semesterEnd ? new Date(semesterEnd).toLocaleDateString() : 'Not Set'}
                </div>
            </div>
        </div>
    );
};

const StudyHubView = ({ groups, onGroupClick, onCreateGroup }: any) => {
    const [tab, setTab] = useState<'groups'|'rooms'|'leaderboard'>('groups');
    return (
        <div className="h-full flex flex-col bg-gray-50">
            <div className="p-4 bg-white shadow-sm z-10 sticky top-0">
                <div className="flex bg-gray-100 p-1 rounded-xl mb-2">
                    <button onClick={() => setTab('groups')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${tab === 'groups' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Groups</button>
                    <button onClick={() => setTab('rooms')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${tab === 'rooms' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Rooms</button>
                    <button onClick={() => setTab('leaderboard')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${tab === 'leaderboard' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Leaderboard</button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
                {tab === 'rooms' ? (
                    <StudyRoomView rooms={MOCK_STUDY_ROOMS} />
                ) : tab === 'leaderboard' ? (
                    <LeaderboardView users={MOCK_USERS} groups={groups} />
                ) : (
                    <div className="p-4 space-y-3">
                        <button onClick={onCreateGroup} className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center gap-2 text-gray-500 font-bold hover:bg-gray-100 transition mb-4"><Plus size={20} /> Create New Group</button>
                        {groups.map((group: Group) => (
                            <div key={group.id} onClick={() => onGroupClick(group)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:shadow-md transition">
                                <div className="relative"><img src={group.image} className="w-16 h-16 rounded-xl object-cover bg-gray-200" /></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start"><h3 className="font-bold text-gray-900 truncate">{group.name}</h3><span className="text-[10px] text-gray-400 whitespace-nowrap">{group.lastMessageTime?.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span></div>
                                    <p className="text-sm mt-1 line-clamp-1 text-gray-500">{group.lastMessage || group.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Added Views ---

const GroupChatView = ({ group, messages, onSendMessage, onBack, currentUser, onReport, onAskForHelp }: { group: Group, messages: Message[], onSendMessage: (id: string, text: string, type?: 'text'|'gift') => void, onBack: () => void, currentUser: User, onReport: (name: string) => void, onAskForHelp: () => void }) => {
  const [text, setText] = useState('');
  const [showNudge, setShowNudge] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Nudge Logic: Simulate a "long session" check
  useEffect(() => {
     // If user stays in the chat view for more than 10 seconds (simulating 30-45 mins), show nudge
     const timer = setTimeout(() => {
         setShowNudge(true);
     }, 10000); 

     return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(group.id, text);
    setText('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 relative">
      {showNudge && (
          <div className="absolute top-16 left-4 right-4 z-30 bg-blue-600 text-white p-3 rounded-xl shadow-lg flex items-center justify-between animate-fade-in-down">
             <div className="flex items-center gap-2">
                 <Coffee size={20} />
                 <div>
                    <p className="font-bold text-sm">Time for a break?</p>
                    <p className="text-xs text-blue-100">You've been active for a while. Stretch!</p>
                 </div>
             </div>
             <button onClick={() => setShowNudge(false)} className="bg-white/20 p-1 rounded-full"><X size={16} /></button>
          </div>
      )}

      <div className="bg-white p-3 shadow-sm flex items-center gap-3 z-10 border-b border-gray-200">
        <button onClick={onBack}><ChevronRight className="rotate-180 text-gray-600" /></button>
        <img src={group.image} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm">{group.name}</h3>
          <p className="text-xs text-gray-500">{group.course}</p>
        </div>
        <div className="flex gap-2">
            <button onClick={onAskForHelp} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-100 flex items-center gap-1 hover:bg-red-100">
                <Shield size={12} /> Help
            </button>
            <button onClick={() => onReport(group.name)}><MoreVertical size={20} className="text-gray-400" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => {
           const isMe = msg.senderId === currentUser.id;
           const isSys = msg.isSystem;
           if (isSys) return <div key={msg.id} className="text-center text-xs text-gray-400 my-2">{msg.text}</div>;
           return (
             <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                {!isMe && <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex-shrink-0 overflow-hidden"><img src={`https://picsum.photos/seed/${msg.senderId}/100/100`} /></div>}
                <div className={`max-w-[75%] p-3 rounded-2xl relative ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none shadow-sm'}`}>
                   {!isMe && <p className="text-[10px] font-bold opacity-50 mb-1">{msg.senderName}</p>}
                   
                   {msg.isToxic ? (
                        <div className="filter blur-[3px] select-none hover:blur-none transition-all duration-300 cursor-pointer">
                           <p className="text-sm">{msg.text}</p>
                        </div>
                   ) : msg.type === 'gift' ? (
                       <div className="flex items-center gap-2"><Gift className="animate-bounce" /> Sent a Gift</div>
                   ) : (
                       <p className="text-sm">{msg.text}</p>
                   )}

                   {msg.isToxic && (
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-md">Sensitive Content</span>
                       </div>
                   )}
                   
                   <p className="text-[10px] opacity-50 text-right mt-1">{msg.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                </div>
             </div>
           );
        })}
      </div>

      <div className="p-3 bg-white border-t flex items-center gap-2 pb-safe">
        {currentUser.isMuted ? (
            <div className="w-full bg-red-50 text-red-600 p-3 rounded-xl text-center text-sm font-bold border border-red-100 flex items-center justify-center gap-2">
                <MicOff size={16} /> You are temporarily muted.
            </div>
        ) : (
            <>
                <button className="text-gray-400 hover:text-blue-600"><Paperclip size={20} /></button>
                <input 
                value={text} 
                onChange={e => setText(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..." 
                className="flex-1 bg-gray-100 p-2.5 rounded-xl outline-none text-sm"
                />
                <button onClick={() => onSendMessage(group.id, 'Gift', 'gift')} className="text-pink-500 hover:scale-110 transition"><Gift size={24} /></button>
                <button onClick={handleSend} className="bg-blue-600 text-white p-2.5 rounded-xl"><Send size={20} /></button>
            </>
        )}
      </div>
    </div>
  );
};

const SocialHubView = ({ posts, currentUser, onComment, onLike, onCreatePost }: { posts: Post[], currentUser: User, onComment: (post: Post) => void, onLike: (id: string) => void, onCreatePost: () => void }) => {
    return (
        <div className="bg-gray-100 h-full overflow-y-auto pb-20 no-scrollbar">
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm mb-2">
                <h1 className="font-bold text-xl">Campus Feed</h1>
            </div>
            
            <div onClick={onCreatePost} className="mx-4 mb-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition">
                <img src={currentUser.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-500 font-medium">
                    Share your experience...
                </div>
                <ImageIcon className="text-green-500" size={24} />
            </div>

            <div className="space-y-3 px-4">
                {posts.map(post => (
                    <div key={post.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-3 items-center">
                                <img src={post.userAvatar} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-bold text-sm">{post.userName}</h4>
                                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                                </div>
                            </div>
                            <button className="text-gray-400"><MoreVertical size={18} /></button>
                        </div>
                        
                        {post.type === 'teammate_request' && (
                             <div className="mb-3 flex gap-2 flex-wrap">
                                 {post.tags?.map(tag => (
                                     <span key={tag} className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full">#{tag}</span>
                                 ))}
                             </div>
                        )}

                        <p className="text-sm text-gray-800 leading-relaxed mb-3">{post.content}</p>
                        
                        {post.imageUrl && (
                            <img src={post.imageUrl} className="w-full h-48 object-cover rounded-xl mb-3" />
                        )}

                        <div className="flex items-center gap-6 border-t pt-3">
                            <button onClick={() => onLike(post.id)} className={`flex items-center gap-2 transition text-sm font-medium ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}>
                                <Heart size={18} fill={post.isLiked ? "currentColor" : "none"} /> {post.likes}
                            </button>
                            <button onClick={() => onComment(post)} className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition text-sm font-medium">
                                <MessageCircle size={18} /> {post.comments}
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition text-sm font-medium ml-auto">
                                <Send size={18} /> Share
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CampusHubView = ({ onContact }: { onContact: (id: string) => void }) => {
    return null;
};

const CampusHubViewWithProps = ({ onContact, confessions, onPostConfession, onLikeConfession }: any) => {
    const [tab, setTab] = useState<'market'|'confessions'>('market');
    return (
        <div className="h-full flex flex-col bg-gray-50">
             <div className="p-4 bg-white shadow-sm z-10 sticky top-0">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button onClick={() => setTab('market')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${tab === 'market' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Marketplace</button>
                    <button onClick={() => setTab('confessions')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${tab === 'confessions' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Confessions</button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
                {tab === 'market' ? <MarketplaceView items={MOCK_MARKET_ITEMS} onContact={onContact} /> : <ConfessionView confessions={confessions} onPostClick={onPostConfession} onLike={onLikeConfession} />}
            </div>
        </div>
    )
}


const ProfileView = ({ user, onLogout, onEditProfile, onNotifications, onPrivacy }: { user: User, onLogout: () => void, onEditProfile: () => void, onNotifications: () => void, onPrivacy: () => void }) => {
    return (
        <div className="h-full overflow-y-auto bg-gray-50 pb-20">
            <div className="relative mb-16">
                 <div className="h-32 bg-blue-600"></div>
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                     <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 object-cover" />
                 </div>
            </div>
            
            <div className="text-center px-6 mb-6">
                <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-500">{user.school}</p>
                <div className="flex justify-center gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{user.course}</span>
                </div>
            </div>

            <div className="px-4 space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-around text-center">
                    <div>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                        <p className="text-xs text-gray-500 uppercase">Streak</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">85</p>
                        <p className="text-xs text-gray-500 uppercase">Study Hrs</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">4.0</p>
                        <p className="text-xs text-gray-500 uppercase">GPA Goal</p>
                    </div>
                </div>

                <BadgesDisplay badgeIds={user.badges || []} />

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <h3 className="font-bold text-gray-900">Settings & Account</h3>
                    
                    <button onClick={onEditProfile} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <span className="flex items-center gap-3"><UserIcon size={20} className="text-gray-500" /> Edit Profile</span>
                        <ChevronRight size={16} className="text-gray-400" />
                    </button>
                    <button onClick={onNotifications} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <span className="flex items-center gap-3"><Bell size={20} className="text-gray-500" /> Notifications</span>
                        <ChevronRight size={16} className="text-gray-400" />
                    </button>
                    <button onClick={onPrivacy} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <span className="flex items-center gap-3"><Shield size={20} className="text-gray-500" /> Privacy & Security</span>
                        <ChevronRight size={16} className="text-gray-400" />
                    </button>

                    <button onClick={onLogout} className="w-full flex items-center gap-3 p-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 mt-4 transition">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main App ---

const App = () => {
  const [view, setView] = useState<AppView>(AppView.SPLASH);
  const [currentTab, setCurrentTab] = useState<MainTab>(MainTab.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [firstName, setFirstName] = useState(''); // New State for Registration
  const [selectedSchool, setSelectedSchool] = useState(''); // New State for Registration
  const [selectedCourse, setSelectedCourse] = useState(''); // New State for Registration
  
  // Data State
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [confessions, setConfessions] = useState<Confession[]>(MOCK_CONFESSIONS);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [messagesStore, setMessagesStore] = useState<Record<string, Message[]>>({ '1': [], '2': [], '3': [], 'dm_1': [] });
  
  // Timetable State
  const [timetable, setTimetable] = useState<TimetableEntry[]>(MOCK_TIMETABLE);
  const [semesterEnd, setSemesterEnd] = useState<string>('2024-12-20');
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);

  // Modals & UI
  const [commentPost, setCommentPost] = useState<Post | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState('');
  const [timetableModalOpen, setTimetableModalOpen] = useState(false);
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [postConfessionModalOpen, setPostConfessionModalOpen] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false); // New State
  const [viewingProfile, setViewingProfile] = useState<User | null>(null);
  const [activeClassEntry, setActiveClassEntry] = useState<TimetableEntry | null>(null);
  const [isRegistering, setIsRegistering] = useState(false); // For Login Toggle

  // Profile Settings Modals
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Focus Mode State
  const [focusConfigOpen, setFocusConfigOpen] = useState(false);
  const [focusEndTime, setFocusEndTime] = useState<number | null>(null);

  // Derived Focus State
  const isActiveFocus = focusEndTime !== null && Date.now() < focusEndTime;

  // Handlers
  const handleLogin = (e: React.FormEvent) => { 
      e.preventDefault(); 
      if (emailInput === ADMIN_EMAIL) {
          setUser({ 
              id: 'admin_1', 
              firstName: 'Admin', 
              email: ADMIN_EMAIL, 
              role: 'ADMIN', 
              school: 'StudyConnect HQ', 
              course: 'Moderation', 
              level: 'Staff', 
              avatar: 'https://ui-avatars.com/api/?name=Admin&background=111827&color=fff', 
              warnings: 0, 
              isMuted: false, 
              isBanned: false,
              points: 0,
              badges: []
          });
          setView(AppView.ADMIN_PORTAL);
      } else {
          // Dynamic User Creation Logic
          let finalName = 'Student';
          let finalSchool = 'University of Ghana';
          let finalCourse = 'General';

          if (isRegistering) {
             finalName = firstName || 'Student';
             finalSchool = selectedSchool || 'Unknown School';
             finalCourse = selectedCourse || 'General';
          } else {
             // Try to parse name from email if logging in
             if (emailInput.includes('@')) {
                const namePart = emailInput.split('@')[0];
                finalName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
             }
          }

          setUser({ 
              id: `u_${Date.now()}`, 
              firstName: finalName, 
              email: emailInput || 'user@study.com', 
              role: 'STUDENT',
              school: finalSchool, 
              course: finalCourse, 
              level: '100', 
              avatar: `https://ui-avatars.com/api/?name=${finalName}&background=random`, 
              streak: 0, // Reset for new user
              warnings: 0,
              isMuted: false,
              isBanned: false,
              points: 100, // Welcome bonus
              badges: []
          }); 
          setView(AppView.MAIN); 
      }
  };
  
  const handleSendMessage = (groupId: string, text: string, type: 'text'|'gift' = 'text') => {
      // 1. Check if user is muted
      if (user?.isMuted) {
          alert("You are currently muted due to repeated policy violations.");
          return;
      }

      // 2. Auto-Moderation Filter
      const isToxic = TOXIC_WORDS.some(w => text.toLowerCase().includes(w));
      
      if (isToxic) {
          // Increment warnings
          const newWarnings = (user?.warnings || 0) + 1;
          const isNowMuted = newWarnings >= 3;
          
          setUser(prev => prev ? ({ ...prev, warnings: newWarnings, isMuted: isNowMuted }) : null);

          // Alert user
          if (isNowMuted) {
              alert(`🚫 You have been MUTED for repeated offensive language. (Warnings: ${newWarnings})`);
          } else {
              alert(`⚠️ Warning: Offensive language detected. Repeated violations will result in a mute. (Warnings: ${newWarnings}/3)`);
          }
      }

      // 3. Send Message (Even if toxic, we send it but mark it as toxic for blurring)
      const newMessage: Message = { 
          id: `msg_${Date.now()}`, 
          senderId: user!.id, 
          senderName: user!.firstName, 
          text, 
          type, 
          timestamp: new Date(),
          isToxic // Mark message as toxic
      };

      setMessagesStore(prev => ({ ...prev, [groupId]: [...(prev[groupId] || []), newMessage] }));
      
      // Update group last message (blurred if toxic)
      setGroups(groups.map(g => g.id === groupId ? { ...g, lastMessage: isToxic ? 'Sensitive Content' : (type === 'gift' ? 'Sent a gift' : text), lastMessageTime: new Date() } : g));

      // 4. Gamification Reward (Simulated)
      if (!isToxic && Math.random() > 0.7) {
         const pointsEarned = 5;
         setUser(prev => prev ? ({ ...prev, points: prev.points + pointsEarned }) : null);
         // In a real app, show a toast here "You earned 5 points!"
      }
  };

  const handleSubmitReport = (reason: string, description: string) => {
      // Create a new report object
      const newReport: Report = {
          id: `rep_${Date.now()}`,
          reporterId: user?.id || 'unknown',
          reporterName: user?.firstName || 'Anonymous',
          offenderName: reportTarget, // In real app, this would be an ID
          content: description,
          reason: reason,
          status: 'PENDING',
          timestamp: new Date(),
          severity: reason === 'Sexual Misconduct' ? 'HIGH' : 'MEDIUM'
      };
      setReports([newReport, ...reports]);
  };

  const handleUpdatePost = (updatedPost: Post) => {
      setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
      setCommentPost(updatedPost); // Keep modal synced
  };

  const handleStartChat = (targetId: string, name = 'User', avatar = '') => {
      let dm = groups.find(g => g.isDm && g.dmUserId === targetId);
      if (!dm) {
          dm = { id: `dm_${targetId}`, name: name, description: 'Direct Message', memberCount: 2, course: 'General', image: avatar || 'https://picsum.photos/seed/dm/100/100', isDm: true, dmUserId: targetId, lastMessage: 'Started a chat', lastMessageTime: new Date() };
          setGroups([dm, ...groups]);
          setMessagesStore(prev => ({...prev, [dm!.id]: [] }));
      }
      setViewingProfile(null); // Close profile if open
      setActiveGroup(dm);
      setCurrentTab(MainTab.STUDY); // Switch to where chat is
  };

  const handleCreateGroup = (data: any) => {
      const newGroup: Group = {
          id: `g_${Date.now()}`,
          name: data.name,
          description: data.description,
          course: data.course,
          memberCount: 1,
          image: `https://picsum.photos/seed/${data.name}/100/100`,
          lastMessage: 'Group created',
          lastMessageTime: new Date(),
          points: 0
      };
      setGroups([newGroup, ...groups]);
      setMessagesStore(prev => ({ ...prev, [newGroup.id]: [{ id: 'sys_1', senderId: 'sys', senderName: 'System', text: 'Welcome to your new group!', timestamp: new Date(), isSystem: true, type: 'text' }] }));
      setCreateGroupModalOpen(false);
      setActiveGroup(newGroup);
  };

  const handleCreateConfession = (content: string) => {
      const newConfession: Confession = {
          id: `c_${Date.now()}`,
          content: content,
          timestamp: 'Just now',
          likes: 0,
          isLiked: false,
          comments: 0,
          school: user?.school || 'Unknown'
      };
      setConfessions([newConfession, ...confessions]);
      setPostConfessionModalOpen(false);
  };

  const handleCreatePost = (content: string, hasImage: boolean) => {
      const newPost: Post = {
          id: `p_${Date.now()}`,
          userId: user?.id || 'unknown',
          userName: user?.firstName || 'Unknown',
          userAvatar: user?.avatar || '',
          content: content,
          imageUrl: hasImage ? `https://picsum.photos/seed/${Date.now()}/600/400` : undefined,
          likes: 0,
          isLiked: false,
          comments: 0,
          commentsList: [],
          timestamp: 'Just now',
          type: 'regular'
      };
      setPosts([newPost, ...posts]);
      setCreatePostModalOpen(false);
  };

  const handleLikeConfession = (id: string) => {
      setConfessions(confessions.map(c => {
          if (c.id === id) {
              const isLiked = !c.isLiked;
              return { ...c, isLiked, likes: isLiked ? c.likes + 1 : c.likes - 1 };
          }
          return c;
      }));
  };

  const handleLikePost = (id: string) => {
      setPosts(posts.map(p => {
          if (p.id === id) {
              const isLiked = !p.isLiked;
              return { ...p, isLiked, likes: isLiked ? p.likes + 1 : p.likes - 1 };
          }
          return p;
      }));
  };

  const handleToggleReminder = (entryId: string) => {
      const updatedTimetable = timetable.map(t => t.id === entryId ? { ...t, reminderEnabled: !t.reminderEnabled } : t);
      setTimetable(updatedTimetable);
      // Also update the activeClassEntry if it matches, so the modal updates immediately
      if (activeClassEntry && activeClassEntry.id === entryId) {
          setActiveClassEntry({ ...activeClassEntry, reminderEnabled: !activeClassEntry.reminderEnabled });
      }
  };

  // Focus Mode Handlers
  const handleStartFocus = (mins: number) => {
      const end = Date.now() + mins * 60 * 1000;
      setFocusEndTime(end);
      setFocusConfigOpen(false);
  };

  const handleEndFocus = () => {
      setFocusEndTime(null);
  };

  // Admin Actions
  const handleDismissReport = (reportId: string) => {
      setReports(reports.filter(r => r.id !== reportId));
  };
  
  const handleBanUser = (offenderId: string, reportId: string) => {
      alert(`User banned successfully based on report ${reportId}`);
      handleDismissReport(reportId);
  };

  const handleWarnReporter = (reporterId: string, reportId: string) => {
      alert(`Warning sent to reporter of report ${reportId} for false reporting.`);
      handleDismissReport(reportId);
  };

  // Views
  if (view === AppView.SPLASH) return <Splash onComplete={() => setView(AppView.TERMS)} />;
  if (view === AppView.TERMS) return <Terms onAgree={() => setView(AppView.AUTH)} onDecline={() => setView(AppView.SPLASH)} />;
  if (view === AppView.AUTH) return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
              <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
                      <BookOpen className="text-blue-600 w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">StudyConnect</h2>
                  <p className="text-blue-100 mt-2">Your Campus, Your Community.</p>
              </div>
              
              <div className="p-8">
                  <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                      <button onClick={() => setIsRegistering(false)} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${!isRegistering ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Login</button>
                      <button onClick={() => setIsRegistering(true)} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${isRegistering ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Register</button>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                      {isRegistering && (
                          <div className="relative">
                              <UserIcon className="absolute left-4 top-3.5 text-gray-400" size={20} />
                              <input 
                                  type="text" 
                                  placeholder="First Name" 
                                  required={isRegistering}
                                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" 
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                              />
                          </div>
                      )}
                      
                      <div className="relative">
                          <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                          <input 
                            type="email" 
                            placeholder="Email (admin@study.com for Admin)" 
                            required 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                          />
                      </div>
                      
                      <div className="relative">
                          <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                          <input type="password" placeholder="Password (admin)" required className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
                      </div>

                      {isRegistering && (
                        <>
                           <select 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none text-gray-600"
                                value={selectedSchool}
                                onChange={(e) => setSelectedSchool(e.target.value)}
                           >
                               <option value="">Select School</option>
                               {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                           </select>
                           <select 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none text-gray-600"
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                           >
                               <option value="">Select Course</option>
                               {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                        </>
                      )}

                      {!isRegistering && (
                          <div className="text-right">
                              <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot Password?</button>
                          </div>
                      )}

                      <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform active:scale-95 flex justify-center items-center gap-2">
                          {isRegistering ? 'Create Account' : 'Sign In'} <ArrowRight size={20} />
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );

  if (view === AppView.ADMIN_PORTAL) {
      return (
          <AdminPortal 
            onLogout={() => { setView(AppView.AUTH); setEmailInput(''); }} 
            reports={reports}
            onDismissReport={handleDismissReport}
            onBanUser={handleBanUser}
            onWarnReporter={handleWarnReporter}
          />
      );
  }

  const renderContent = () => {
      if (activeGroup) return <GroupChatView group={activeGroup} messages={messagesStore[activeGroup.id] || []} onSendMessage={handleSendMessage} onBack={() => setActiveGroup(null)} currentUser={user!} onReport={(n: string) => { setReportTarget(n); setReportModalOpen(true); }} onAskForHelp={() => { setReportTarget('Emergency Help'); setReportModalOpen(true); }} />;
      
      // Focus Mode Lockout Logic
      if (isActiveFocus && (currentTab === MainTab.SOCIAL || currentTab === MainTab.CAMPUS)) {
          return <FocusLockedView endTime={focusEndTime!} onEndEarly={handleEndFocus} />;
      }

      switch(currentTab) {
          case MainTab.HOME: return <HomeView user={user!} timetable={timetable} onManageTimetable={() => setTimetableModalOpen(true)} onClassClick={setActiveClassEntry} semesterEnd={semesterEnd} suggestions={MOCK_USERS} onConnect={setViewingProfile} onStartFocus={() => setFocusConfigOpen(true)} />;
          case MainTab.STUDY: return <StudyHubView groups={groups} onGroupClick={setActiveGroup} onCreateGroup={() => setCreateGroupModalOpen(true)} />;
          case MainTab.SOCIAL: return <SocialHubView posts={posts} currentUser={user!} onComment={(p) => setCommentPost(p)} onLike={handleLikePost} onCreatePost={() => setCreatePostModalOpen(true)} />;
          case MainTab.CAMPUS: return <CampusHubViewWithProps onContact={(id: string) => handleStartChat(id, 'Seller')} confessions={confessions} onPostConfession={() => setPostConfessionModalOpen(true)} onLikeConfession={handleLikeConfession} />;
          case MainTab.PROFILE: return <ProfileView user={user!} onLogout={() => setView(AppView.AUTH)} onEditProfile={() => setEditProfileOpen(true)} onNotifications={() => setNotificationsOpen(true)} onPrivacy={() => setPrivacyOpen(true)} />;
          default: return <div>Error</div>;
      }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <ReportModal 
            isOpen={reportModalOpen} 
            onClose={() => setReportModalOpen(false)} 
            targetName={reportTarget} 
            onSubmitReport={handleSubmitReport}
        />
        {commentPost && <CommentModal post={commentPost} currentUser={user!} onClose={() => setCommentPost(null)} onUpdatePost={handleUpdatePost} />}
        {timetableModalOpen && <TimetableModal onClose={() => setTimetableModalOpen(false)} timetable={timetable} onUpdate={setTimetable} semesterEnd={semesterEnd} onUpdateSemesterEnd={setSemesterEnd} />}
        {activeClassEntry && <ClassDetailModal entry={activeClassEntry} onClose={() => setActiveClassEntry(null)} todos={todos} onUpdateTodos={setTodos} onToggleReminder={handleToggleReminder} />}
        {createGroupModalOpen && <CreateGroupModal onClose={() => setCreateGroupModalOpen(false)} onCreate={handleCreateGroup} />}
        {postConfessionModalOpen && <PostConfessionModal onClose={() => setPostConfessionModalOpen(false)} onPost={handleCreateConfession} />}
        {createPostModalOpen && <CreatePostModal user={user!} onClose={() => setCreatePostModalOpen(false)} onCreate={handleCreatePost} />}
        {viewingProfile && <UserProfileModal user={viewingProfile} onClose={() => setViewingProfile(null)} onMessage={() => handleStartChat(viewingProfile.id, viewingProfile.firstName, viewingProfile.avatar)} />}
        
        {editProfileOpen && <EditProfileModal user={user!} onClose={() => setEditProfileOpen(false)} onSave={(u) => setUser(u)} />}
        {notificationsOpen && <NotificationsModal onClose={() => setNotificationsOpen(false)} />}
        {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
        {focusConfigOpen && <FocusConfigModal isOpen={focusConfigOpen} onClose={() => setFocusConfigOpen(false)} onStart={handleStartFocus} />}

        <div className="flex-1 overflow-hidden relative">{renderContent()}</div>
        
        {!activeGroup && (
            <nav className="bg-white border-t border-gray-200 pb-safe pt-2 px-2 shadow-sm z-40">
                <div className="flex justify-between items-center max-w-md mx-auto">
                    <NavIcon icon={<HomeIcon />} label="Home" active={currentTab === MainTab.HOME} onClick={() => setCurrentTab(MainTab.HOME)} />
                    <NavIcon icon={<BookOpen />} label="Study" active={currentTab === MainTab.STUDY} onClick={() => setCurrentTab(MainTab.STUDY)} />
                    <NavIcon icon={<Users />} label="Social" active={currentTab === MainTab.SOCIAL} onClick={() => setCurrentTab(MainTab.SOCIAL)} />
                    <NavIcon icon={<MapPin />} label="Campus" active={currentTab === MainTab.CAMPUS} onClick={() => setCurrentTab(MainTab.CAMPUS)} />
                    <NavIcon icon={<UserIcon />} label="Profile" active={currentTab === MainTab.PROFILE} onClick={() => setCurrentTab(MainTab.PROFILE)} />
                </div>
            </nav>
        )}
    </div>
  );
};

// --- Sub Views ---

const NavIcon = ({ icon, label, active, onClick }: any) => (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 w-16 transition-all ${active ? 'text-blue-600 -translate-y-1' : 'text-gray-400'}`}>
        {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

export default App;
