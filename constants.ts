import { Group, Post, StudyRoom, MarketItem, Confession, TimetableEntry, Todo } from './types';

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

export const TOXIC_WORDS = ["stupid", "idiot", "hate", "kill", "shut up"];

export const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const MOCK_TIMETABLE: TimetableEntry[] = [
  { id: 't1', courseName: 'Digital Systems', location: 'JQB 23', day: 'Monday', startTime: '10:30', endTime: '12:30', color: 'bg-blue-100 text-blue-800' },
  { id: 't2', courseName: 'Calculus I', location: 'Math Dept', day: 'Tuesday', startTime: '08:30', endTime: '10:30', color: 'bg-green-100 text-green-800' },
  { id: 't3', courseName: 'Circuit Theory', location: 'Eng Block B', day: 'Wednesday', startTime: '14:00', endTime: '16:00', color: 'bg-purple-100 text-purple-800' },
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
  { id: 'c1', content: 'I have a huge crush on the TA for Digital Systems but I can\'t solve a single circuit. 😭', timestamp: '10m ago', likes: 45, comments: 12, school: 'University of Ghana' },
  { id: 'c2', content: 'I accidentally walked into a Level 400 lecture thinking it was my L100 class. Sat there for 20 mins confused.', timestamp: '1h ago', likes: 120, comments: 34, school: 'KNUST' },
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
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: '2',
    name: 'Calculus I Survivors',
    description: 'Help with limits, derivatives, and integrals. We struggle together.',
    memberCount: 856,
    course: 'Mathematics',
    image: 'https://picsum.photos/seed/math/100/100',
    lastMessage: 'Can someone explain chain rule?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60)
  },
  {
    id: '3',
    name: 'Digital Systems Help',
    description: 'Understanding logic gates, VHDL, and circuit design.',
    memberCount: 45,
    course: 'Computer Engineering',
    image: 'https://picsum.photos/seed/circuit/100/100',
    lastMessage: 'Lab report due tomorrow!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24)
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
    comments: 0,
    timestamp: '1d ago',
    type: 'teammate_request',
    tags: ['StudyGroup', 'Thermodynamics'],
    commentsList: []
  }
];
