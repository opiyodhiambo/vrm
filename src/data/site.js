// Content sourced from "VRM ENGINEERING COMPANY PROFILE.pdf".
// Placeholder copy is marked TODO and will be refined page by page.

export const company = {
  name: 'VRM Engineering Solutions Ltd',
  short: 'VRM Engineering',
  tagline: 'The future, built smarter',
  strapline: 'Design. Plan. Build. We Deliver.',
  contactPerson: 'Eng. Vincent Ooko',
  phones: ['+254 724 691 276', '+254 763 591 276'],
  email: 'info.vrmholdings254@gmail.com',
  location: 'Nairobi, Kenya',
  incorporation: 'Incorporated under the Companies Act (Cap. 486) Laws of Kenya',
  vision:
    'To be a leading provider of innovative, sustainable, and globally competitive engineering and planning solutions that transform communities and exceed client expectations.',
  mission:
    'To deliver high-quality, timely, and cost-effective solutions through innovation, professionalism, and adherence to global standards.',
  objectives: [
    'Deliver Excellence',
    'Ensure Timeliness',
    'Promote Innovation',
    'Uphold Standards',
    'Sustain Growth',
    'Empower People',
    'Support Sustainability',
  ],
}

export const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Who We Are', to: '/about' },
      { label: 'Our Team', to: '/team' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export const values = [
  { title: 'Integrity', text: 'Conduct all business with honesty, transparency, and accountability.' },
  { title: 'Quality', text: 'Commit to delivering services that meet the highest standards.' },
  { title: 'Innovation', text: 'Continuously embrace new ideas, technologies, and methods.' },
  { title: 'Professionalism', text: 'Uphold the highest ethical and professional standards in all engagements.' },
  { title: 'Teamwork', text: 'Foster collaboration, respect, and mutual support among staff, clients, and partners.' },
  { title: 'Sustainability', text: 'Promote environmentally responsible and socially beneficial practices.' },
  { title: 'Customer Focus', text: 'Prioritise client needs, ensuring satisfaction and long-term relationships.' },
]

export const pillars = [
  'Timely Delivery',
  'Quality Assurance',
  'Client-centred Service',
  'Technical Expertise',
  'Sustainability',
  'Innovation & Technology',
]

// To show a real logo, drop the image in /public/images/accreditations/ and add  logo: '/images/accreditations/ebk.jpeg'
// to the entry (see EBK below). Entries without a logo show their initials as a placeholder tile.
export const accreditations = [
  { logo: '/images/accreditations/ebk.jpeg' },
  { logo: '/images/accreditations/iek.jpg' },
  { logo: '/images/accreditations/pprb.jpeg' },
  { logo: '/images/accreditations/nema.avif' },
  { logo: '/images/accreditations/eik.jpeg' },
  { logo: '/images/accreditations/kip.jpeg' },
  { logo: '/images/accreditations/icpmk.png' },
]

export const stats = [
  { value: '10+', label: 'Years of experience' },
  { value: '21', label: 'Professional staff' },
  { value: '20+', label: 'Projects delivered' },
  { value: '7', label: 'Regulatory registrations' },
]

export const team = [
  { type: 'Engineering', count: 7, areas: ['Civil & Structural', 'Water & Drainage', 'Highways / Roads', 'Electrical & Mechanical (MEP)'] },
  { type: 'Architecture', count: 2, areas: ['Macro planning', 'Architectural design', 'Interior design', 'Master planning'] },
  { type: 'Environmental', count: 2, areas: ['Noise pollution control', 'Waste material control', 'Air pollution control', 'Water quality control'] },
  { type: 'Construction & Project Management', count: null, areas: ['Project management', 'Highways / roads construction', 'Building construction'] },
]

export const manpower = { total: 21, technical: 13, admin: 6, it: 1, bizDev: 2 }

export const services = [
  {
    slug: 'civil-structural-engineering',
    title: 'Civil & Structural Engineering',
    icon: 'structure',
    summary: 'Structural design and supervision for high-rise and low-rise buildings, industrial structures, steel structures, roads, bridges, and water systems.',
    points: ['High-rise & low-rise buildings (residential, commercial, offices)', 'Industrial structures (warehouses)', 'Structural steel design', 'Roads, highways & bridges', 'Water & wastewater reticulation', 'Structural integrity investigations & reports'],
  },
  {
    slug: 'architectural-design',
    title: 'Architectural Design',
    icon: 'plan',
    summary: 'Concept-to-construction architectural design, master planning and macro planning for residential, commercial and institutional projects.',
    points: ['Architectural designs', 'Master planning', 'Macro planning', '3D visualisation (TODO: confirm)'],
  },
  {
    slug: 'electrical-mechanical-engineering',
    title: 'Electrical & Mechanical (MEP)',
    icon: 'bolt',
    summary: 'Integrated electrical, mechanical and plumbing design so buildings work as well as they look.',
    points: ['Electrical design', 'Mechanical design', 'MEP services design & supervision'],
  },
  {
    slug: 'interior-design',
    title: 'Interior Design',
    icon: 'interior',
    summary: 'Interior design that carries the architecture through to the spaces people actually use.',
    points: ['Residential interiors', 'Commercial & office interiors'],
  },
  {
    slug: 'environmental-impact-assessments',
    title: 'Environmental Impact Assessments',
    icon: 'leaf',
    summary: 'NEMA-compliant assessments and environmental management for projects of every scale.',
    points: ['Environmental Impact Assessments', 'Noise pollution control', 'Waste material control', 'Air pollution control', 'Water quality control'],
  },
  {
    slug: 'roads-traffic-engineering',
    title: 'Roads & Traffic Engineering',
    icon: 'road',
    summary: 'Design and supervision of roads and highways, drainage and traffic engineering.',
    points: ['Roads & highways design', 'Drainage', 'Traffic engineering'],
  },
  {
    slug: 'geotechnical-engineering',
    title: 'Geotechnical Engineering',
    icon: 'layers',
    summary: 'Ground investigation and foundation recommendations that de-risk construction.',
    points: ['Site & soil investigation', 'Foundation recommendations'],
  },
  {
    slug: 'non-destructive-testing',
    title: 'Non-Destructive Testing',
    icon: 'scan',
    summary: 'Testing and structural integrity investigations that assess existing structures without damaging them.',
    points: ['Structural integrity investigations', 'Condition assessment reports'],
  },
  {
    slug: 'health-safety-environment',
    title: 'Health, Safety & Environment',
    icon: 'shield',
    summary: 'HSE planning and compliance across design and construction.',
    points: ['Site safety planning', 'Compliance & audits'],
  },
  {
    slug: 'construction-project-management',
    title: 'Construction Project Management',
    icon: 'clipboard',
    summary: 'Registered project managers delivering on time, to budget and to specification.',
    points: ['Project management', 'Design supervision', 'Cost & schedule control'],
  },
  {
    slug: 'construction-services',
    title: 'Construction Services',
    icon: 'hardhat',
    summary: 'Design-and-build delivery of residential, commercial and industrial projects, including supply and installation.',
    points: ['Building construction', 'Highways / roads construction', 'Design & build', 'Supply, fabrication & installation'],
  },
]

const img = (n) => `/images/p${n}.jpg`

// NOTE: image-to-project mapping is a best guess from the PDF order — please verify.
export const projects = [
  { slug: 'bkl-residential-apartments', name: 'BKL Residential Apartments', client: 'BKL Ltd', type: 'Residential', location: 'Captain Mungai St, Eastleigh, Nairobi', description: '17-storey residential apartment block.', scope: 'Architectural design, structural engineering, MEP services, construction management and construction services.', images: [img(42)] },
  { slug: 'tanad-1-and-2-apartments', name: 'Tanad 1 & 2 Residential Apartments', client: 'Triple AGQ Investments Ltd', type: 'Residential', location: '9th St, Eastleigh, Nairobi', description: '16-storey residential building.', images: [img(43)] },
  { slug: 'karen-mansionette', name: 'Residential Unit, Karen', client: 'Mr. & Mrs. Mwangi', type: 'Residential', location: 'Runda, Kiambu County', description: 'Mansionette.', images: [img(44), img(45)] },
  { slug: 'kitengela-residential-house', name: 'Residential House, Kitengela', client: 'Mr. Mike Otieno', type: 'Residential', location: 'Kitengela, Kajiado County', description: 'Design and build of a residential house.', images: [img(46), img(47)] },
  { slug: 'rongai-bungalow', name: 'Bungalow, Rongai', client: 'Mr. Onono', type: 'Residential', location: 'Rongai, Kenya', description: 'Design and build services.', images: [img(48), img(49)] },
  { slug: 'athi-river-residential-house', name: 'Residential House, Athi River', client: 'Mr. Jackob Ouma', type: 'Residential', location: 'Athi River, Nairobi', value: 'KES 25M', year: 2018, description: 'Design and construction services.', images: [img(57), img(58), img(59)] },
  { slug: 'pangani-apartments', name: 'Residential Apartments, Pangani', client: 'AK Affordable Real Estate Ltd', type: 'Residential', location: 'Pangani, Nairobi', value: 'KES 250M', year: 2024, description: 'Design and construction services.', images: [img(66), img(67)] },
  { slug: 'parklands-apartments', name: 'Residential Apartments, Parklands', client: 'Dimco Properties Ltd', type: 'Residential', location: 'Parklands, Nairobi', value: 'KES 300M', year: 2024, description: 'Design and construction services.', images: [img(54)] },
  { slug: 'katani-apartments', name: 'Residential Apartments, Katani', client: 'Mary Kerubo', type: 'Residential', location: 'Katani, Machakos County', value: 'KES 25M', year: 2025, description: 'Design and construction services.', images: [img(55), img(56)] },
  { slug: 'bomet-guest-house', name: 'Guest House, Bomet', client: 'Faith Aid Kenya', type: 'Hospitality', location: 'Bomet County', value: 'KES 65M', year: 2025, description: 'Design and construction services.', images: [img(50), img(51)] },
  { slug: 'valeria-villas', name: 'Valeria Villas — 14 Units', client: 'Valeria Villas', type: 'Residential', location: 'Kamakis, Ruiru, Kiambu County', value: 'KES 20M', year: 2025, description: '14 residential units. Design and construction services.', images: [img(60), img(61), img(62), img(63), img(64)] },
  { slug: 'ruiru-apartments', name: 'Residential Apartments, Ruiru', client: 'Mr. Lewis', type: 'Residential', location: 'Kimbo, Ruiru, Kiambu County', value: 'KES 50M', year: 2025, description: 'Design and construction services.', images: [img(68), img(69)] },
  { slug: 'mlolongo-apartments', name: 'Residential Apartments, Mlolongo', client: 'Mr. Kennedy Ngure', type: 'Residential', location: 'Mlolongo, Machakos County', value: 'KES 80M', year: 2025, description: 'Design and construction services.', images: [img(70)] },
  { slug: 'legacy-apartments', name: 'Legacy Apartments', client: 'Mr. Kelvin Ngei', type: 'Residential', location: 'Mwihoko, Kiambu County', value: 'KES 45M', year: 2024, description: 'Design and construction services.', images: [img(71)] },
  { slug: 'katani-maisonette', name: '5-Bedroom Maisonette, Katani', client: 'Mrs. Rose Njeri', type: 'Residential', location: 'Katani, Machakos County', value: 'KES 20M', year: 2025, description: 'Design and construction services.', images: [img(72)] },
  { slug: 'ketraco-storage-systems', name: 'Modern Storage Systems', client: 'KETRACO', type: 'Industrial', location: 'Apex Storage Facilities, Mombasa Road, Nairobi', value: 'KES 25M', year: 2025, description: 'Supply, fabrication and installation of modern storage systems.', images: [img(73), img(74)] },
]

export const sitemap = [
  { heading: 'Company', links: [{ label: 'Home', to: '/' }, { label: 'Who We Are', to: '/about' }, { label: 'Our Team', to: '/team' }, { label: 'Careers', to: '/careers' }] },
  { heading: 'Services', links: services.slice(0, 6).map((s) => ({ label: s.title, to: `/services/${s.slug}` })) },
  { heading: 'More Services', links: services.slice(6).map((s) => ({ label: s.title, to: `/services/${s.slug}` })) },
  { heading: 'Work', links: [{ label: 'All Projects', to: '/projects' }, { label: 'Request a Quote', to: '/contact' }, { label: 'Contact', to: '/contact' }] },
]

// Hero slideshow — add or remove image paths here (files live in /public/images).
export const heroSlides = [
  '/images/hero1.jpeg',
  '/images/hero2.jpeg',
  '/images/hero3.jpeg',
  // '/images/p45.jpg',
  // '/images/p50.jpg',
  // '/images/p58.jpg',
]

// The eleven services grouped by stage of a project's life. `services` are slugs from the list above.
export const stages = [
  { id: 'plan-approve', n: '01', title: 'Plan & Approve', icon: 'clipboard',
    gets: 'A site that is assessed and approved before any money is spent on building.',
    services: ['environmental-impact-assessments', 'geotechnical-engineering'] },
  { id: 'design', n: '02', title: 'Design', icon: 'plan',
    gets: 'Coordinated drawings and engineering, ready to build and ready for approval.',
    services: ['architectural-design', 'civil-structural-engineering', 'electrical-mechanical-engineering', 'interior-design', 'roads-traffic-engineering'] },
  { id: 'build', n: '03', title: 'Build', icon: 'hardhat',
    gets: 'A finished building delivered to the agreed scope by the team that designed it.',
    services: ['construction-services'] },
  { id: 'manage', n: '04', title: 'Manage', icon: 'shield',
    gets: 'Independent supervision, testing and safety control so cost and quality stay on track.',
    services: ['construction-project-management', 'health-safety-environment', 'non-destructive-testing'] },
]

// The client's journey with us — edit to match your real process.
export const process = [
  { icon: 'chat', title: 'Enquiry', text: 'You tell us what you want to build and where.' },
  { icon: 'pin', title: 'Site visit', text: 'We visit the site, listen and agree scope.' },
  { icon: 'document', title: 'Quotation', text: 'You receive a clear, itemised quotation.' },
  { icon: 'pen', title: 'Contract', text: 'We agree timeline and terms in writing, then start.' },
  { icon: 'key', title: 'Handover', text: 'Final inspection, documents and aftercare.' },
]




// Organisational chart (from the company profile). Teams sit under their department head.
export const orgChart = {
  governance: [
    { id: 'board', title: 'Board' },
    { id: 'ed', title: 'Executive Director' },
  ],
  executive: [
    { id: 'audit', title: 'Internal Audit' },
    { id: 'gm', title: 'General Manager' },
    { id: 'legal', title: 'Legal Advisor' },
  ],
  departments: [
    { id: 'eng', title: 'Engineering Manager', teams: ['Civil / Structural Engineers', 'Mechanical Engineers', 'Electrical Engineers'] },
    { id: 'proj', title: 'Projects & Construction Manager', teams: ['Assistant Project Manager', 'Assistant Construction Manager'] },
    { id: 'plan', title: 'Planning & Environmental Manager', teams: ['Assistant Planners & Surveyors', 'Environmentalists & Social-economists', 'GIS Experts'] },
    { id: 'fin', title: 'Finance Manager', teams: ['Procurement', 'Accountant'] },
    { id: 'hr', title: 'Human Resource & Administration Manager', teams: ['General Support Staff & Customer Service'] },
    { id: 'ict', title: 'ICT Manager', teams: [] },
    { id: 'bd', title: 'Business Development Manager', teams: ['Marketers & Business Development'] },
  ],
}
