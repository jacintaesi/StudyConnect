import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, BookOpen, Users, Home as HomeIcon, User as UserIcon, Camera, Send, 
  Paperclip, MoreVertical, Search, MessageCircle, LogOut, Settings, ChevronRight, 
  MapPin, Image as ImageIcon, Heart, Video, Phone, Mic, MicOff, VideoOff, Gift, 
  Plus, Bell, CheckCircle, UserPlus, X, Edit2, ShoppingBag, Map, Ghost, 
  Smile, AlertTriangle, Clock, Calendar, Award, Play, Pause, Flame, Trash2, CheckSquare, Square
} from 'lucide-react';
import { AppView, MainTab, User, Group, Message, Post, Comment, StudyRoom, MarketItem, Confession, TimetableEntry, Todo } from './types';
import { SCHOOLS, COURSES, LEVELS, MOCK_GROUPS, MOCK_POSTS, MOCK_STUDY_ROOMS, MOCK_MARKET_ITEMS, MOCK_CONFESSIONS, TOXIC_WORDS, DAYS_OF_WEEK, MOCK_TIMETABLE, MOCK_TODOS } from './constants';
import { ReportModal } from './components/ReportModal';

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

// --- Timetable & Todo Components ---

const TimetableModal = ({ onClose, timetable, onUpdate, semesterEnd, onUpdateSemesterEnd }: any) => {
    const [entry, setEntry] = useState<Partial<TimetableEntry>>({ day: 'Monday', color: 'bg-blue-100 text-blue-800' });
    
    const handleAdd = () => {
        if (!entry.courseName || !entry.startTime || !entry.endTime) return;
        onUpdate([...timetable, { ...entry, id: `t_${Date.now()}` }]);
        setEntry({ ...entry, courseName: '', location: '', startTime: '', endTime: '' });
    };

    const handleDelete = (id: string) => {
        onUpdate(timetable.filter((t: TimetableEntry) => t.id !== id));
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
                    <p className="text-[10px] text-blue-600 mt-1">Your schedule will automate weekly until this date.</p>
                </div>

                <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-sm text-gray-700">Add Weekly Class</h4>
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
                    <button onClick={handleAdd} className="w-full bg-black text-white py-2 rounded-lg font-bold text-sm">Add to Schedule</button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2">
                    {timetable.length === 0 && <p className="text-center text-gray-400 text-sm">No classes added yet.</p>}
                    {timetable.map((t: TimetableEntry) => (
                        <div key={t.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div>
                                <p className="font-bold text-sm">{t.courseName}</p>
                                <p className="text-xs text-gray-500">{t.day} • {t.startTime} - {t.endTime}</p>
                                <p className="text-xs text-blue-600 flex items-center gap-1"><MapPin size={10} /> {t.location}</p>
                            </div>
                            <button onClick={() => handleDelete(t.id)} className="text-red-500 p-2"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ClassDetailModal = ({ entry, onClose, todos, onUpdateTodos }: { entry: TimetableEntry, onClose: () => void, todos: Todo[], onUpdateTodos: (t: Todo[]) => void }) => {
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

                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mb-6 flex items-start gap-3">
                    <Bell className="text-yellow-600 shrink-0 mt-1" size={20} />
                    <div>
                        <p className="font-bold text-yellow-800 text-sm">Class Reminder</p>
                        <p className="text-xs text-yellow-700">You will be notified 15 mins before this class starts based on your location.</p>
                    </div>
                    <div className="ml-auto">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked readOnly className="sr-only peer" />
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

// --- New Features Components ---

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

const ConfessionView = ({ confessions }: { confessions: Confession[] }) => (
    <div className="p-4 space-y-4 bg-gray-50 min-h-full">
        <div className="bg-purple-600 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden mb-6">
            <Ghost className="absolute -right-4 -bottom-4 opacity-20 w-32 h-32" />
            <h2 className="font-bold text-xl relative z-10">Confession Box</h2>
            <p className="text-purple-100 text-sm relative z-10">Anonymous. Safe. Unfiltered.</p>
            <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-bold text-sm relative z-10">Post Confession</button>
        </div>
        {confessions.map(conf => (
            <div key={conf.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-800 font-medium font-serif italic text-lg leading-relaxed">"{conf.content}"</p>
                <div className="flex justify-between items-center mt-4 text-xs text-gray-500 border-t pt-3">
                    <span>{conf.school} • {conf.timestamp}</span>
                    <div className="flex gap-3">
                        <span className="flex items-center gap-1"><Heart size={12} /> {conf.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle size={12} /> {conf.comments}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// --- Main App ---

const App = () => {
  const [view, setView] = useState<AppView>(AppView.SPLASH);
  const [currentTab, setCurrentTab] = useState<MainTab>(MainTab.HOME);
  const [user, setUser] = useState<User | null>(null);
  
  // Data State
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [messagesStore, setMessagesStore] = useState<Record<string, Message[]>>({ '1': [], '2': [], '3': [], 'dm_1': [] });
  const [notifications, setNotifications] = useState(5);
  
  // Timetable State
  const [timetable, setTimetable] = useState<TimetableEntry[]>(MOCK_TIMETABLE);
  const [semesterEnd, setSemesterEnd] = useState<string>('2024-12-20');
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);

  // Modals & UI
  const [commentPost, setCommentPost] = useState<Post | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState('');
  const [timetableModalOpen, setTimetableModalOpen] = useState(false);
  const [activeClassEntry, setActiveClassEntry] = useState<TimetableEntry | null>(null);

  // Handlers
  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); setUser({ id: 'u1', firstName: 'Kwame', email: 'kwame@u.edu', school: 'University of Ghana', course: 'Computer Engineering', level: '300', avatar: 'https://picsum.photos/seed/kwame/200/200', streak: 12 }); setView(AppView.MAIN); };
  
  const handleSendMessage = (groupId: string, text: string, type: 'text'|'gift' = 'text') => {
      // Toxic Check
      if (TOXIC_WORDS.some(w => text.toLowerCase().includes(w))) {
          alert("⚠️ Message blocked: Toxic language detected. Please be respectful.");
          return;
      }

      const newMessage: Message = { id: `msg_${Date.now()}`, senderId: user!.id, senderName: user!.firstName, text, type, timestamp: new Date() };
      setMessagesStore(prev => ({ ...prev, [groupId]: [...(prev[groupId] || []), newMessage] }));
      setGroups(groups.map(g => g.id === groupId ? { ...g, lastMessage: type === 'gift' ? 'Sent a gift' : text, lastMessageTime: new Date() } : g));
  };

  const handleUpdatePost = (updatedPost: Post) => {
      setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
      setCommentPost(updatedPost); // Keep modal synced
  };

  const handleStartChat = (targetId: string) => {
      const targetUser = { id: targetId, firstName: 'Seller', avatar: '' }; // Mock lookup
      // Simplified logic for brevity
      let dm = groups.find(g => g.isDm && g.dmUserId === targetId);
      if (!dm) {
          dm = { id: `dm_${Date.now()}`, name: 'Seller', description: 'Marketplace Chat', memberCount: 2, course: 'General', image: 'https://picsum.photos/seed/seller/100/100', isDm: true, dmUserId: targetId, lastMessage: 'Hi, is this available?', lastMessageTime: new Date() };
          setGroups([dm, ...groups]);
      }
      setActiveGroup(dm);
      setCurrentTab(MainTab.STUDY); // Switch to where chat is
  };

  // Views
  if (view === AppView.SPLASH) return <Splash onComplete={() => setView(AppView.TERMS)} />;
  if (view === AppView.TERMS) return <Terms onAgree={() => setView(AppView.AUTH)} onDecline={() => setView(AppView.SPLASH)} />;
  if (view === AppView.AUTH) return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                  <input type="email" placeholder="Email" required className="w-full p-3 border rounded-xl" />
                  <input type="password" placeholder="Password" required className="w-full p-3 border rounded-xl" />
                  <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl">Login</button>
              </form>
          </div>
      </div>
  );

  const renderContent = () => {
      if (activeGroup) return <GroupChatView group={activeGroup} messages={messagesStore[activeGroup.id] || []} onSendMessage={handleSendMessage} onBack={() => setActiveGroup(null)} currentUser={user!} onReport={(n: string) => { setReportTarget(n); setReportModalOpen(true); }} />;
      
      switch(currentTab) {
          case MainTab.HOME: return <HomeView user={user!} timetable={timetable} onManageTimetable={() => setTimetableModalOpen(true)} onClassClick={setActiveClassEntry} semesterEnd={semesterEnd} />;
          case MainTab.STUDY: return <StudyHubView groups={groups} onGroupClick={setActiveGroup} />;
          case MainTab.SOCIAL: return <SocialHubView posts={posts} currentUser={user!} onComment={(p) => setCommentPost(p)} />;
          case MainTab.CAMPUS: return <CampusHubView onContact={handleStartChat} />;
          case MainTab.PROFILE: return <ProfileView user={user!} onLogout={() => setView(AppView.AUTH)} />;
          default: return <div>Error</div>;
      }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <ReportModal isOpen={reportModalOpen} onClose={() => setReportModalOpen(false)} targetName={reportTarget} />
        {commentPost && <CommentModal post={commentPost} currentUser={user!} onClose={() => setCommentPost(null)} onUpdatePost={handleUpdatePost} />}
        {timetableModalOpen && <TimetableModal onClose={() => setTimetableModalOpen(false)} timetable={timetable} onUpdate={setTimetable} semesterEnd={semesterEnd} onUpdateSemesterEnd={setSemesterEnd} />}
        {activeClassEntry && <ClassDetailModal entry={activeClassEntry} onClose={() => setActiveClassEntry(null)} todos={todos} onUpdateTodos={setTodos} />}

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

const HomeView = ({ user, timetable, onManageTimetable, onClassClick, semesterEnd }: { user: User, timetable: TimetableEntry[], onManageTimetable: () => void, onClassClick: (t: TimetableEntry) => void, semesterEnd: string }) => {
    const todayIndex = new Date().getDay(); // 0 is Sunday
    // Adjust logic: DAYS_OF_WEEK is Mon-Sun. new Date().getDay() returns 0 for Sunday.
    // Map Sunday (0) to index 6, Monday (1) to 0, etc.
    const dayMap = [6, 0, 1, 2, 3, 4, 5];
    const todayName = DAYS_OF_WEEK[dayMap[todayIndex]];
    
    const todaysClasses = timetable
        .filter(t => t.day === todayName)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

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

            <MoodTracker />

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><Clock size={18} /> Today's Schedule</h3>
                    <button onClick={onManageTimetable} className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100">Manage</button>
                </div>
                
                {todaysClasses.length > 0 ? (
                    <div className="grid gap-3">
                        {todaysClasses.map(t => (
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

            <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Award size={18} /> Upcoming Deadlines</h3>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="bg-red-100 text-red-600 w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold text-xs leading-none">
                        <span className="text-lg">14</span><span>OCT</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">Lab Report Submission</h4>
                        <p className="text-xs text-gray-500">Computer Engineering • 11:59 PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StudyHubView = ({ groups, onGroupClick }: any) => {
    const [tab, setTab] = useState<'groups'|'rooms'>('groups');
    return (
        <div className="h-full flex flex-col bg-gray-50">
            <div className="p-4 bg-white shadow-sm z-10 sticky top-0">
                <div className="flex bg-gray-100 p-1 rounded-xl mb-2">
                    <button onClick={() => setTab('groups')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${tab === 'groups' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Study Groups</button>
                    <button onClick={() => setTab('rooms')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${tab === 'rooms' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Silent Rooms</button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
                {tab === 'rooms' ? (
                    <StudyRoomView rooms={MOCK_STUDY_ROOMS} />
                ) : (
                    <div className="p-4 space-y-3">
                        <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center gap-2 text-gray-500 font-bold hover:bg-gray-100 transition mb-4"><Plus size={20} /> Create New Group</button>
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

const SocialHubView = ({ posts, currentUser, onComment }: any) => {
    const [viewMode, setViewMode] = useState<'feed'|'confessions'>('feed');
    return (
        <div className="h-full flex flex-col bg-gray-50">
             <div className="p-4 bg-white shadow-sm z-10 flex justify-between items-center sticky top-0">
                <div className="flex gap-4 text-sm font-bold text-gray-400">
                    <button onClick={() => setViewMode('feed')} className={`transition ${viewMode === 'feed' ? 'text-black text-lg' : ''}`}>Experience</button>
                    <button onClick={() => setViewMode('confessions')} className={`transition ${viewMode === 'confessions' ? 'text-black text-lg' : ''}`}>Confessions</button>
                </div>
                <button className="bg-black text-white p-2 rounded-full"><Plus size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
                {viewMode === 'confessions' ? (
                    <ConfessionView confessions={MOCK_CONFESSIONS} />
                ) : (
                    <div className="p-4 space-y-6">
                        {posts.map((post: Post) => (
                            <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                <div className="p-4 flex items-center gap-3">
                                    <img src={post.userAvatar} className="w-10 h-10 rounded-full object-cover" />
                                    <div><p className="font-bold text-sm">{post.userName}</p><p className="text-xs text-gray-400">{post.timestamp}</p></div>
                                </div>
                                <div className="px-4 pb-2"><p className="text-gray-800 text-sm leading-relaxed">{post.content}</p></div>
                                {post.imageUrl && <div className="mt-2 aspect-video bg-gray-100"><img src={post.imageUrl} className="w-full h-full object-cover" /></div>}
                                <div className="p-4 pt-3 flex items-center gap-6 text-gray-500 border-t border-gray-50 mt-2">
                                    <button className="flex items-center gap-2 hover:text-red-500"><Heart size={20} /><span className="text-xs">{post.likes}</span></button>
                                    <button onClick={() => onComment(post)} className="flex items-center gap-2 hover:text-blue-500"><MessageCircle size={20} /><span className="text-xs">{post.comments}</span></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const CampusHubView = ({ onContact }: any) => {
    const [tab, setTab] = useState<'market'|'map'>('market');
    return (
        <div className="h-full flex flex-col bg-gray-50">
             <div className="p-4 bg-white shadow-sm z-10 sticky top-0">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button onClick={() => setTab('market')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${tab === 'market' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Marketplace</button>
                    <button onClick={() => setTab('map')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${tab === 'map' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Map & Spots</button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
                {tab === 'market' ? <MarketplaceView items={MOCK_MARKET_ITEMS} onContact={onContact} /> : <div className="p-10 text-center text-gray-500"><Map className="w-16 h-16 mx-auto mb-4 opacity-20" />Map Coming Soon</div>}
            </div>
        </div>
    );
};

const ProfileView = ({ user, onLogout }: any) => (
  <div className="h-full bg-gray-50 overflow-y-auto pb-24">
    <div className="bg-white p-8 flex flex-col items-center border-b border-gray-200">
      <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500 mb-4"><img src={user.avatar} className="w-full h-full rounded-full border-4 border-white object-cover" /></div>
      <h2 className="text-2xl font-bold text-gray-900">{user.firstName}</h2>
      <p className="text-blue-600 font-medium">{user.school}</p>
      <div className="flex gap-2 mt-4">
         <button className="bg-red-50 text-red-600 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 border border-red-100 shadow-sm hover:bg-red-100"><AlertTriangle size={16} /> SOS Alert</button>
      </div>
    </div>
    <div className="p-6 space-y-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100"><div className="flex items-center gap-3"><Settings size={20} className="text-blue-600" /><span className="font-medium text-gray-700">Settings</span></div><ChevronRight size={20} className="text-gray-300" /></button>
        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50"><div className="flex items-center gap-3"><Shield size={20} className="text-purple-600" /><span className="font-medium text-gray-700">Safety Center</span></div><ChevronRight size={20} className="text-gray-300" /></button>
      </div>
      <button onClick={onLogout} className="w-full bg-white text-red-600 font-bold py-4 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-red-50"><LogOut size={20} /> Log Out</button>
    </div>
  </div>
);

// --- Chat View (Reused) ---
const GroupChatView = ({ group, messages, onBack, currentUser, onReport, onSendMessage }: any) => {
  const [inputText, setInputText] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);
  const handleSend = (text: string = inputText, type: 'text'|'gift' = 'text') => { onSendMessage(text, type); setInputText(''); };
  if (showVideoCall) return <VideoCallView group={group} onClose={() => setShowVideoCall(false)} />;
  return (
    <div className="h-full flex flex-col bg-[#e5ddd5]">
      <div className="bg-white p-3 px-4 shadow-sm flex items-center gap-3 z-20">
        <button onClick={onBack} className="text-blue-600"><ChevronRight className="rotate-180" size={28} /></button>
        <img src={group.image} className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
        <div className="flex-1 cursor-pointer"><h3 className="font-bold text-gray-900 leading-tight">{group.name}</h3><p className="text-xs text-gray-500">{group.isDm ? 'Online' : `${group.memberCount} members`}</p></div>
        <div className="flex items-center gap-1"><button onClick={() => setShowVideoCall(true)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"><Video size={24} /></button></div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
        {messages.map((msg: Message) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm relative group ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'} ${msg.type === 'gift' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : ''}`}>
                 {!isMe && !group.isDm && <p className="text-[10px] font-bold text-orange-600 mb-1">{msg.senderName}</p>}
                 {msg.type === 'gift' ? <div className="flex flex-col items-center py-2"><Gift size={32} className="mb-2 animate-bounce" /><p className="font-bold text-sm">Sent a resource gift!</p><p className="text-xs opacity-90">{msg.text}</p></div> : <p className="text-sm leading-relaxed">{msg.text}</p>}
                 <span className={`text-[10px] block text-right mt-1 opacity-70 ${isMe || msg.type === 'gift' ? 'text-white' : 'text-gray-400'}`}>{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-3 bg-white flex items-center gap-2 pb-safe">
        <button onClick={() => handleSend('Sent a small donation to support! ☕', 'gift')} className="text-pink-500 p-2 hover:bg-pink-50 rounded-full transition"><Gift size={24} /></button>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center"><input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type a message..." className="bg-transparent flex-1 outline-none text-sm" /></div>
        <button onClick={() => handleSend()} className={`p-3 rounded-full transition-all ${inputText.trim() ? 'bg-blue-600 text-white shadow-md transform scale-100' : 'bg-gray-200 text-gray-400 scale-95'}`}><Send size={20} className={inputText.trim() ? "translate-x-0.5" : ""} /></button>
      </div>
    </div>
  );
};

// VideoCallView logic remains similar but compacted
const VideoCallView = ({ group, onClose }: { group: Group, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
            <div className="flex-1 flex items-center justify-center relative"><h2 className="text-white text-2xl font-bold animate-pulse">Connecting...</h2><button onClick={onClose} className="absolute top-4 left-4 text-white"><X size={32}/></button></div>
            <div className="p-8 flex justify-center"><button onClick={onClose} className="p-6 bg-red-600 rounded-full"><Phone className="rotate-[135deg]" size={32} text-white /></button></div>
        </div>
    )
}

export default App;
