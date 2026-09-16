// Centralized mock/demo data used across the dashboard pages.
// Avatars use bounded Random User photos so every card has a valid image.

export const avatar = (seed) => {
  const imageId = ((seed - 1) % 50) + 1;
  const gender = seed % 2 === 0 ? 'women' : 'men';
  return `https://randomuser.me/api/portraits/${gender}/${imageId}.jpg`;
};

export const currentUser = {
  name: 'Easin Arafat',
  plan: 'Free Account',
  avatar: avatar(12),
};

export const navSections = [
  { to: '/', label: 'Dashboard', icon: 'LayoutGrid' },
  { to: '/analytics', label: 'Analytics', icon: 'BarChart2' },
  { to: '/invoices', label: 'Invoice', icon: 'FileStack' },
  { to: '/customers', label: 'Customers', icon: 'Users' },
  { to: '/schedule', label: 'Schedule', icon: 'ClipboardList' },
  { to: '/calendar', label: 'Calendar', icon: 'Calendar' },
  { to: '/tasks', label: 'Tasks', icon: 'KanbanSquare' },
  { to: '/messages', label: 'Messages', icon: 'MessageSquare', badge: 49 },
  { to: '/notifications', label: 'Notification', icon: 'Bell' },
  { to: '/settings', label: 'Settings', icon: 'Settings' },
];

export const reportSeries = [
  { time: '10am', value: 38 },
  { time: '11am', value: 62 },
  { time: '12am', value: 48 },
  { time: '01am', value: 44 },
  { time: '02am', value: 58 },
  { time: '03am', value: 26 },
  { time: '04am', value: 34 },
  { time: '05am', value: 48 },
  { time: '06am', value: 72 },
  { time: '07am', value: 66 },
];

export const analyticsBreakdown = [
  { name: 'Sale', value: 45, color: '#4C8CFF' },
  { name: 'Distribute', value: 30, color: '#FFC24B' },
  { name: 'Return', value: 25, color: '#FF7A5C' },
];

export const recentOrders = [
  { id: '#876364', product: 'Camera Lens', price: '$178', orders: 325, total: '$1,46,660', img: avatar(21) },
  { id: '#876368', product: 'Black Sleep Dress', price: '$14', orders: 53, total: '$46,660', img: avatar(22) },
  { id: '#876412', product: 'Argan Oil', price: '$21', orders: 78, total: '$3,46,676', img: avatar(23) },
  { id: '#876621', product: 'EAU DE Parfum', price: '$32', orders: 98, total: '$3,46,981', img: avatar(24) },
];

export const topSellingProducts = [
  { name: 'NIKE Shoes Black Pattern', price: '$87', rating: 4, img: avatar(31) },
  { name: 'iPhone 12', price: '$987', rating: 4, img: avatar(32) },
];

export const statCards = [
  { label: 'Save Products', value: '178+', icon: 'Heart', bg: 'bg-blue-50', fg: 'text-blue-500' },
  { label: 'Stock Products', value: '20+', icon: 'Coins', bg: 'bg-amber-50', fg: 'text-amber-500' },
  { label: 'Sales Products', value: '190+', icon: 'ShoppingBag', bg: 'bg-orange-50', fg: 'text-orange-500' },
  { label: 'Job Application', value: '12+', icon: 'Briefcase', bg: 'bg-primary-50', fg: 'text-primary-500' },
];

export const invoices = [
  { id: '#876364', name: 'Arrora gaur', email: 'arroragaur@gmail.com', date: '12 Dec, 2020', status: 'Complete', starred: true, img: avatar(1) },
  { id: '#876123', name: 'James Mullican', email: 'jamesmullican@gmail.com', date: '10 Dec, 2020', status: 'Pending', starred: true, img: avatar(2) },
  { id: '#876213', name: 'Robert Bacins', email: 'robertbacins@gmail.com', date: '09 Dec, 2020', status: 'Complete', starred: false, img: avatar(3) },
  { id: '#876987', name: 'Bethany Jackson', email: 'bethanyjackson@gmail.com', date: '09 Dec, 2020', status: 'Cancel', starred: false, img: avatar(4) },
  { id: '#871345', name: 'Anne Jacob', email: 'annejacob@gmail.com', date: '10 Dec, 2020', status: 'Complete', starred: false, img: avatar(5) },
  { id: '#872345', name: 'Bethany jackson', email: 'bethanyjackson@gmail.com', date: '10 Dec, 2020', status: 'Pending', starred: true, img: avatar(6) },
  { id: '#872346', name: 'James Mullican', email: 'jamesmullican@gmail.com', date: '10 Dec, 2020', status: 'Complete', starred: false, img: avatar(7) },
  { id: '#873245', name: 'Jhon Deo', email: 'jhondeo32@gmail.com', date: '08 Dec, 2020', status: 'Complete', starred: true, img: avatar(8) },
  { id: '#876364', name: 'Bethany jackson', email: 'bethanyjackson@gmail.com', date: '02 Dec, 2020', status: 'Cancel', starred: true, img: avatar(9) },
  { id: '#878769', name: 'James Mullican', email: 'jamesmullican@gmail.com', date: '01 Dec, 2020', status: 'Pending', starred: false, img: avatar(10) },
];

export const customers = [
  { name: 'John Deo', email: 'johndoe2211@gmail.com', phone: '+33757005467', gender: 'Male', img: avatar(41) },
  { name: 'Shelby Goode', email: 'shelbygoode41@gmail.com', phone: '+33757005467', gender: 'Female', img: avatar(42) },
  { name: 'Robert Bacins', email: 'robertbacins4182@gmail.com', phone: '+33757005467', gender: 'Male', img: avatar(43) },
  { name: 'John Carilo', email: 'john.carilo182@com', phone: '+33757805467', gender: 'Male', img: avatar(44) },
  { name: 'Adriene Watson', email: 'adrienewatson82@gmail.com', phone: '+83757305467', gender: 'Female', img: avatar(45) },
  { name: 'Jhon Deo', email: 'jhondeo24823@gmail.com', phone: '+63475700546', gender: 'Male', img: avatar(46) },
  { name: 'Mark Ruffalo', email: 'markruffalo3735@gmail.com', phone: '+33757005467', gender: 'Male', img: avatar(47) },
  { name: 'Bethanyjackson', email: 'bethanyjackson5@gmail.com', phone: '+33757005467', gender: 'Female', img: avatar(48) },
  { name: 'Christine Huston', email: 'christinehuston4@gmail.com', phone: '+33757005467', gender: 'Male', img: avatar(49) },
  { name: 'Anne Jacob', email: 'annejacob2@ummoh.com', phone: '+33757005467', gender: 'Male', img: avatar(50) },
  { name: 'James Mullican', email: 'jamesmullican5346@gmail.com', phone: '+33757005467', gender: 'Male', img: avatar(51) },
];

export const scheduleList = [
  { date: '12 Dec, 2021', time: '10.15AM', location: 'Office Meeting' },
  { date: '10 Dec, 2021', time: '11.20AM', location: 'Home' },
  { date: '09 Dec, 2021', time: '11.45AM', location: 'Friends Zone' },
  { date: '08 Dec, 2021', time: '12.15PM', location: 'Office Meeting' },
  { date: '07 Dec, 2021', time: '01.20PM', location: 'Home' },
  { date: '05 Dec, 2021', time: '10.15AM', location: 'Meeting Outside' },
  { date: '04 Dec, 2021', time: '11.15AM', location: 'Office Meeting' },
  { date: '04 Dec, 2021', time: '01.25PM', location: 'Home' },
  { date: '02 Dec, 2021', time: '10.15AM', location: 'Friends' },
  { date: '01 Dec, 2021', time: '04.30PM', location: 'Meeting Outside' },
];

export const people = [
  { name: 'Eddie Lobanovskiy', email: 'laboanovskiy@gmail.com', img: avatar(61) },
  { name: 'Alexey Stave', email: 'alexeyst@gmail.com', img: avatar(62) },
  { name: 'Anton Tkacheve', email: 'tkacheveanton@gmail.com', img: avatar(63) },
];

export const calendarEvents = {
  2: [{ label: 'Free day', color: 'bg-cyan-400' }, { label: 'Party Time', color: 'bg-fuchsia-500' }],
  16: [{ label: 'Victory day', color: 'bg-orange-400' }],
  21: [{ label: 'Invited by friends', color: 'bg-fuchsia-500' }],
  25: [{ label: 'Christmas Day', color: 'bg-cyan-400' }],
};

export const productStats = [
  { label: 'Total Product', value: '5,00,874', delta: '+1400 New Added', icon: 'Gift', bg: 'bg-blue-50', fg: 'text-blue-500' },
  { label: 'Total Sales', value: '2,34,888', delta: '+1000 Sales Today', icon: 'ShoppingCart', bg: 'bg-amber-50', fg: 'text-amber-500' },
];

export const productAddByMonth = [
  { month: 'Jan', value: 23400, color: '#FF8A65' },
  { month: 'Feb', value: 15000, color: '#4C8CFF' },
  { month: 'Mar', value: 30000, color: '#FF8A65' },
  { month: 'Apr', value: 22000, color: '#4C8CFF' },
  { month: 'May', value: 10000, color: '#4C8CFF' },
  { month: 'Jun', value: 23400, color: '#FF8A65' },
  { month: 'Jul', value: 5000, color: '#4C8CFF' },
];

export const topSellingProductsTable = [
  { rank: 1, name: 'Blutooth Devices', price: '$10', orders: '34,666 Piece', sales: '$3,46,660', img: avatar(71), medal: true },
  { rank: 2, name: 'Airdot', price: '$15', orders: '20,000 Piece', sales: '$3,00,000', img: avatar(72), medal: true },
  { rank: 3, name: 'Shoes', price: '$10', orders: '15,000 Piece', sales: '$1,50,000', img: avatar(73), medal: true },
  { rank: 4, name: 'Kids T-Shirt', price: '$12', orders: '10,000 Piece', sales: '$1,20,000', img: avatar(74), medal: false },
  { rank: 5, name: 'Smart Watch', price: '$12', orders: '10,000 Piece', sales: '$1,20,000', img: avatar(75), medal: false },
  { rank: 5, name: 'Girls Top', price: '$12', orders: '10,000 Piece', sales: '$1,20,000', img: avatar(76), medal: false },
];

export const productSalesAnalytics = [
  { name: 'Total Sales', value: 40, color: '#4C8CFF' },
  { name: 'Total Order', value: 35, color: '#FFC24B' },
  { name: 'Order Cancel', value: 25, color: '#FF7A5C' },
];

export const chatList = [
  { name: 'Shelby Goode', preview: 'Lorem Ipsum is simply dummy text of the printing', time: '1 min ago', img: avatar(81), online: true },
  { name: 'Robert Bacins', preview: 'Lorem Ipsum is simply dummy text of the printing', time: '9 min ago', img: avatar(82), online: true },
  { name: 'John Carilo', preview: 'Lorem Ipsum is simply dummy text of the printing', time: '15 min ago', img: avatar(83), online: true, active: true },
  { name: 'Adriene Watson', preview: 'Lorem Ipsum is simply dummy text of the printing', time: '21 min ago', img: avatar(84), online: true },
  { name: 'Jhon Deo', preview: 'Lorem Ipsum is simply dummy text of the printing', time: '29 min ago', img: avatar(85), online: true },
  { name: 'Mark Ruffalo', preview: 'Lorem Ipsum is simply dummy text of the printing', time: '45 min ago', img: avatar(86), online: true },
  { name: 'Bethany Jackson', preview: 'Lorem Ipsum is simply dummy text', time: '1h ago', img: avatar(87), online: false },
];

export const chatMessages = [
  { fromMe: true, text: 'Lorem Ipsum is simply', time: '' },
  { fromMe: true, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '09:02 PM' },
  {
    fromMe: false,
    images: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=320&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=320&q=80',
    ],
    time: '',
  },
  { fromMe: true, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '09:04 PM' },
];

export const taskGroups = [
  {
    key: 'todo',
    title: 'To Do',
    color: 'text-gray-900',
    tasks: [
      { name: 'Ui Design', icon: '🎨', start: '03/12/2021', end: '5/12/2021', member: '5 Member', status: 'Pending', done: false },
      { name: 'Logo Design', icon: '🖌️', start: '03/12/2021', end: '5/12/2021', member: '5 Member', status: 'Pending', done: false },
    ],
  },
  {
    key: 'doing',
    title: 'Doing',
    color: 'text-gray-900',
    tasks: [
      { name: 'Grapich Design', icon: '📐', start: '03/12/2021', end: '5/12/2021', member: '5 Member', status: 'Running', done: true },
      { name: 'Web Design', icon: '🖥️', start: '03/12/2021', end: '5/12/2021', member: '5 Member', status: 'Running', done: true },
    ],
  },
  {
    key: 'done',
    title: 'Done',
    color: 'text-gray-900',
    tasks: [
      { name: 'Logo Design', icon: '🖌️', start: '01/12/2021', end: '3/12/2021', member: '5 Member', status: 'Done', done: true },
    ],
  },
];

export const boardColumns = [
  {
    key: 'todo',
    title: 'ToDo',
    cards: [
      { title: 'Dashboard Design', tags: [{ label: 'Low', color: 'bg-rose-100 text-rose-600' }, { label: 'On Track', color: 'bg-amber-100 text-amber-600' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: false },
      { title: 'Landing page Design', tags: [{ label: 'Medium', color: 'bg-orange-100 text-orange-600' }, { label: 'At risk', color: 'bg-red-100 text-red-700' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: false },
      { title: 'E-Shop Mobile App', tags: [{ label: 'High', color: 'bg-cyan-100 text-cyan-600' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: false },
      { title: 'Dashboard Design', tags: [{ label: 'Low', color: 'bg-rose-100 text-rose-600' }, { label: 'On Track', color: 'bg-amber-100 text-amber-600' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: false },
    ],
  },
  {
    key: 'progress',
    title: 'In Progress',
    cards: [
      { title: 'Dashboard Design', tags: [{ label: 'High', color: 'bg-cyan-100 text-cyan-600' }, { label: 'On Track', color: 'bg-amber-100 text-amber-600' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: true },
      { title: 'Landing page Design', tags: [{ label: 'Low', color: 'bg-rose-100 text-rose-600' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: true },
      { title: 'E-Shop Mobile App', tags: [{ label: 'Low', color: 'bg-rose-100 text-rose-600' }, { label: 'On Track', color: 'bg-amber-100 text-amber-600' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: false },
    ],
  },
  {
    key: 'review',
    title: 'In Review',
    cards: [
      { title: 'Dashboard Design', tags: [{ label: 'Medium', color: 'bg-orange-100 text-orange-600' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: true },
      { title: 'E-Shop Mobile App', tags: [{ label: 'Low', color: 'bg-rose-100 text-rose-600' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: true },
    ],
  },
  {
    key: 'done',
    title: 'Done',
    cards: [
      { title: 'Dashboard Design', tags: [{ label: 'High', color: 'bg-cyan-100 text-cyan-600' }, { label: 'On Track', color: 'bg-amber-100 text-amber-600' }], desc: 'Discussion for management dashboard ui design', comments: 112, likes: '1.2k', done: true },
    ],
  },
];

export const timelineRows = [
  { title: 'Grapich Design', tag: { label: 'Low', color: 'bg-rose-100 text-rose-600' }, status: 'On Track', done: false, startCol: 0, span: 2 },
  { title: 'Dashboard Design', tag: { label: 'High', color: 'bg-cyan-100 text-cyan-600' }, status: 'On Track', done: true, startCol: 1, span: 3 },
  { title: 'Logo Design', tag: { label: 'High', color: 'bg-cyan-100 text-cyan-600' }, status: 'On Track', done: true, startCol: 2, span: 2 },
  { title: 'Web Design', tag: { label: 'High', color: 'bg-cyan-100 text-cyan-600' }, status: 'On Track', done: true, startCol: 3, span: 2 },
];

export const notifications = [
  { name: 'James Mullican', action: 'sent you an invoice', time: '2 min ago', img: avatar(91) },
  { name: 'Bethany Jackson', action: 'commented on your task Logo Design', time: '20 min ago', img: avatar(92) },
  { name: 'Robert Bacins', action: 'created a new schedule with you', time: '1 hour ago', img: avatar(93) },
  { name: 'Anne Jacob', action: 'accepted your invitation', time: '3 hours ago', img: avatar(94) },
  { name: 'John Carilo', action: 'sent you a message', time: 'Yesterday', img: avatar(95) },
];
