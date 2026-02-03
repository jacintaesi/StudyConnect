import { Group, Post, StudyRoom, MarketItem, Confession, TimetableEntry, Todo, User, Report } from './types';

export const ADMIN_EMAIL = "admin@study.com";

export const SCHOOLS = [
  "University of Ghana",
  "KNUST",
  "University of Cape Coast",
  "Ashesi University",
  "GIMPA",
  "Central University"
];

export const COURSES = [
  "Computer Engineering",
  "Computer Science",
  "Business Administration",
  "Medicine",
  "Law",
  "Economics",
  "Psychology"
];

export const LEVELS = ["100", "200", "300", "400", "500", "600"];

export const TOXIC_WORDS = ["stupid", "idiot", "hate", "kill", "shut up", "dumb", "ugly", "fight", "punch"];

export const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Gamification Config
export const LEVEL_THRESHOLDS = [
    { name: "Fresh Brain 🧠", min: 0, max: 200 },
    { name: "Sharp Thinker 💡", min: 201, max: 800 },
    { name: "Mastermind 🚀", min: 801, max: 2000 },
    { name: "Academic Legend 👑", min: 2001, max: 100000 },
];

export const BADGES = [
    { id: 'b1', name: 'Early Bird', icon: '🌅', description: 'Studied before 8 AM' },
    { id: 'b2', name: 'Helper', icon: '🤝', description: 'Answered 10 questions' },
    { id: 'b3', name: 'Night Owl', icon: '🦉', description: 'Studied after 11 PM' },
    { id: 'b4', name: 'Streak Master', icon: '🔥', description: '7 day study streak' },
    { id: 'b5', name: 'Team Player', icon: '👥', description: 'Active in 3 groups' },
];

export const MOCK_USERS: User[] = [
  { id: 'u2', firstName: 'Sarah', lastName: 'Mensah', email: 'sarah@test.com', school: 'University of Ghana', course: 'Computer Engineering', level: '300', avatar: 'https://picsum.photos/seed/sarah/200/200', bio: 'Loves coding, coffee, and calculus.', isPublic: true, role: 'STUDENT', warnings: 0, isMuted: false, isBanned: false, points: 1250, badges: ['b1', 'b4'] },
  { id: 'u3', firstName: 'Kofi', lastName: 'Boateng', email: 'kofi@test.com', school: 'University of Ghana', course: 'Computer Engineering', level: '300', avatar: 'https://picsum.photos/seed/kofi/200/200', bio: 'Tech enthusiast. Flutter developer.', isPublic: true, role: 'STUDENT', warnings: 1, isMuted: false, isBanned: false, points: 640, badges: ['b2'] },
  { id: 'u4', firstName: 'Ama', lastName: 'Osei', email: 'ama@test.com', school: 'KNUST', course: 'Medicine', level: '400', avatar: 'https://picsum.photos/seed/ama/200/200', bio: 'Future Surgeon. Study hard!', isPublic: true, role: 'STUDENT', warnings: 0, isMuted: false, isBanned: false, points: 2100, badges: ['b1', 'b3', 'b4'] },
  { id: 'u5', firstName: 'Michael', lastName: 'Addo', email: 'mike@test.com', school: 'University of Ghana', course: 'Business Administration', level: '200', avatar: 'https://picsum.photos/seed/michael/200/200', bio: 'Finance and Investment.', isPublic: false, role: 'STUDENT', warnings: 0, isMuted: false, isBanned: false, points: 150, badges: [] },
];

export const MOCK_REPORTS: Report[] = [
    { id: 'r1', reporterId: 'u2', reporterName: 'Sarah', offenderName: 'Kofi', content: 'He keeps sending spam messages in the group.', reason: 'spam', status: 'PENDING', timestamp: new Date(), severity: 'LOW' },
    { id: 'r2', reporterId: 'u4', reporterName: 'Ama', offenderName: 'Unknown User', content: 'Inappropriate language used in Study Room.', reason: 'harassment', status: 'PENDING', timestamp: new Date(), severity: 'HIGH' }
];

export const MOCK_TIMETABLE: TimetableEntry[] = [
  { id: 't1', courseName: 'Digital Systems', location: 'JQB 23', day: 'Monday', startTime: '10:30', endTime: '12:30', color: 'bg-blue-100 text-blue-800', reminderEnabled: true },
  { id: 't2', courseName: 'Calculus I', location: 'Math Dept', day: 'Tuesday', startTime: '08:30', endTime: '10:30', color: 'bg-green-100 text-green-800', reminderEnabled: false },
  { id: 't3', courseName: 'Circuit Theory', location: 'Eng Block B', day: 'Wednesday', startTime: '14:00', endTime: '16:00', color: 'bg-purple-100 text-purple-800', reminderEnabled: true },
];

export const MOCK_TODOS: Todo[] = [
  { id: 'td1', courseName: 'Digital Systems', task: 'Review logic gates', isCompleted: false, dueDate: 'Tomorrow' },
  { id: 'td2', courseName: 'Calculus I', task: 'Solve problem set 3', isCompleted: true },
];

export const MOCK_STUDY_ROOMS: StudyRoom[] = [
  { id: 'sr1', name: 'Late Night Hustlers', topic: 'General Study', activeUsers: 342, image: 'https://picsum.photos/seed/night/200/200' },
  { id: 'sr2', name: 'Math Focus Room', topic: 'Calculus & Algebra', activeUsers: 128, image: 'https://picsum.photos/seed/maths/200/200' },
  { id: 'sr3', name: 'Deadline Survivors', topic: 'Assignment Grind', activeUsers: 856, image: 'https://picsum.photos/seed/deadline/200/200' },
];

export const MOCK_MARKET_ITEMS: MarketItem[] = [
  { id: 'mi1', sellerId: 'u5', sellerName: 'Michael', title: 'Casio fx-991EX Calculator', price: 'GHS 150', category: 'Electronics', image: 'https://picsum.photos/seed/calc/200/200' },
  { id: 'mi2', sellerId: 'u2', sellerName: 'Sarah', title: 'Calculus I Textbook (Used)', price: 'GHS 80', category: 'Books', image: 'https://picsum.photos/seed/book/200/200' },
  { id: 'mi3', sellerId: 'u6', sellerName: 'Kojo', title: 'Mini Fridge for Hall', price: 'GHS 400', category: 'Appliances', image: 'https://picsum.photos/seed/fridge/200/200' },
];

export const MOCK_CONFESSIONS: Confession[] = [
  { id: 'c1', content: 'I have a huge crush on the TA for Digital Systems but I can\'t solve a single circuit. 😭', timestamp: '10m ago', likes: 45, isLiked: false, comments: 12, school: 'University of Ghana' },
  { id: 'c2', content: 'I accidentally walked into a Level 400 lecture thinking it was my L100 class. Sat there for 20 mins confused.', timestamp: '1h ago', likes: 120, isLiked: true, comments: 34, school: 'KNUST' },
];

export const MOCK_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Computer Eng Level 300',
    description: 'Official study group for CE L300 students. Past questions and notes shared here.',
    memberCount: 142,
    course: 'Computer Engineering',
    image: 'https://picsum.photos/seed/tech/100/100',
    lastMessage: 'Check the pinned post for the schedule.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    points: 4500
  },
  {
    id: '2',
    name: 'Calculus I Survivors',
    description: 'Help with limits, derivatives, and integrals. We struggle together.',
    memberCount: 856,
    course: 'Mathematics',
    image: 'https://picsum.photos/seed/math/100/100',
    lastMessage: 'Can someone explain chain rule?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
    points: 12000
  },
  {
    id: '3',
    name: 'Digital Systems Help',
    description: 'Understanding logic gates, VHDL, and circuit design.',
    memberCount: 45,
    course: 'Computer Engineering',
    image: 'https://picsum.photos/seed/circuit/100/100',
    lastMessage: 'Lab report due tomorrow!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    points: 2300
  },
  {
    id: 'dm_1',
    name: 'Sarah',
    description: 'Direct Message',
    memberCount: 2,
    course: 'General',
    image: 'https://picsum.photos/seed/sarah/100/100',
    isDm: true,
    dmUserId: 'u2',
    lastMessage: 'Thanks for the notes! 🙏',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: '101',
    userId: 'u2',
    userName: 'Sarah',
    userAvatar: 'https://picsum.photos/seed/sarah/100/100',
    content: 'Finally finished the final year project! 🎓 The library has been my second home.',
    imageUrl: 'https://picsum.photos/seed/library/600/400',
    likes: 342,
    isLiked: false,
    comments: 2,
    timestamp: '2h ago',
    type: 'regular',
    commentsList: [
        { id: 'cm1', userId: 'u3', userName: 'Kofi', userAvatar: 'https://picsum.photos/seed/kofi/100/100', text: 'Congrats Sarah! 🎉', timestamp: new Date() },
        { id: 'cm2', userId: 'u4', userName: 'Ama', userAvatar: 'https://picsum.photos/seed/ama/100/100', text: 'Well deserved!', timestamp: new Date() }
    ]
  },
  {
    id: '102',
    userId: 'u3',
    userName: 'Kofi',
    userAvatar: 'https://picsum.photos/seed/kofi/100/100',
    content: 'Looking for 2 dedicated people to join my Hackathon team for the upcoming tech fair. Must know React or Flutter. 🚀',
    likes: 15,
    isLiked: true,
    comments: 0,
    timestamp: '4h ago',
    type: 'teammate_request',
    tags: ['Hackathon', 'Coding', 'TeamUp'],
    commentsList: []
  },
  {
    id: '103',
    userId: 'u4',
    userName: 'Ama',
    userAvatar: 'https://picsum.photos/seed/ama/100/100',
    content: 'Sunset view from the Commonwealth Hall balcony today. Stunning.',
    imageUrl: 'https://picsum.photos/seed/sunset/600/400',
    likes: 567,
    isLiked: false,
    comments: 0,
    timestamp: '1d ago',
    type: 'regular',
    commentsList: []
  },
  {
    id: '104',
    userId: 'u5',
    userName: 'Michael',
    userAvatar: 'https://picsum.photos/seed/michael/100/100',
    content: 'Starting a study circle for Advanced Thermodynamics. We meet Tuesdays at the Balme Library. Who is in?',
    likes: 42,
    isLiked: false,
    comments: 0,
    timestamp: '1d ago',
    type: 'teammate_request',
    tags: ['StudyGroup', 'Thermodynamics'],
    commentsList: []
  }
];
