
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
    slug: 'architectural-design-services',
    title: 'Architectural Design Services',
    icon: 'plan',
    summary: 'Comprehensive architectural concept development, space planning, 3D modelling, and construction documentation.',
    points: [
      'Architectural concept development and feasibility layouts',
      'Architectural design for residential, commercial, institutional and industrial buildings',
      'Preparation of architectural drawings, schedules and construction documentation',
      'Space planning, functional layouts and interior design',
      'Three-dimensional modelling, rendering and architectural visualisation',
      'Building renovation, remodelling, extension and change-of-use design support',
      'Landscape and external works design coordination',
      'Preparation and review of as-built architectural drawings',
    ],
  },
  {
    slug: 'structural-engineering-services',
    title: 'Structural Engineering Services',
    icon: 'structure',
    summary: 'Expert structural analysis, design, foundation engineering, and structural integrity investigations.',
    points: [
      'Structural analysis and design of buildings and other structures',
      'Reinforced concrete, structural steel and timber design',
      'Foundation and substructure design',
      'Design of multi-storey, commercial, institutional and industrial structures',
      'Design of roof trusses, canopies, warehouses and other steel structures',
      'Design of retaining walls, water tanks, reservoirs and other special structures',
      'Structural inspections, condition assessments and integrity investigations',
      'Independent structural design reviews, checks and peer reviews',
      'Preparation of structural drawings, specifications, calculations and technical reports',
      'Structural rehabilitation, strengthening and remedial design',
    ],
  },
  {
    slug: 'civil-engineering-and-infrastructure-design',
    title: 'Civil Engineering & Infrastructure Design',
    icon: 'road',
    summary: 'Road design, stormwater management, water supply networks, and civil structure engineering.',
    points: [
      'Road, access road and pavement design',
      'Stormwater drainage and surface-water management design',
      'Water supply, distribution and sewerage network design',
      'Site grading, earthworks and external infrastructure design',
      'Parking areas, access arrangements and utility layouts',
      'Design of culverts, small bridges and associated civil structures',
      'Hydrological and hydraulic assessments',
      'Flood mitigation, erosion control and sustainable drainage solutions',
      'Preparation of civil engineering drawings, specifications and reports',
    ],
  },
  {
    slug: 'mechanical-electrical-plumbing-mep',
    title: 'Mechanical, Electrical & Plumbing (MEP)',
    icon: 'bolt',
    summary: 'Integrated electrical power, HVAC, fire safety, plumbing, and ELV security system design.',
    points: [
      'Electrical power distribution, lighting and installation design',
      'Standby generator and backup power system design',
      'Solar photovoltaic and associated electrical system design',
      'Heating, ventilation and air-conditioning (HVAC) design',
      'Fire detection, alarm and firefighting system design',
      'Water supply, plumbing and sanitary drainage installation design',
      'Hot-water systems and pumping installations',
      'Extra-low-voltage systems, including CCTV, access control and security systems',
      'Lift and escalator installation design coordination',
      'MEP inspection, testing, commissioning and technical reporting',
    ],
  },
  {
    slug: 'quantity-surveying-and-cost-consultancy',
    title: 'Quantity Surveying & Cost Consultancy',
    icon: 'clipboard',
    summary: 'Bills of Quantities, tender documentation, cost monitoring, financial valuation, and value engineering.',
    points: [
      'Preparation of Bills of Quantities (BOQs) and schedules of rates',
      'Preliminary cost estimates, cost plans and project budgets',
      'Measurement of building and civil engineering works',
      'Preparation of tender documentation and pricing schedules',
      'Tender analysis, evaluation and recommendation support',
      'Construction cost monitoring and cost control',
      'Interim valuations and assessment of completed works',
      'Measurement and valuation of variations and additional works',
      'Preparation and negotiation support for final accounts',
      'Assessment of contractual claims and construction costs',
      'Value engineering and life-cycle cost advice',
    ],
  },
  {
    slug: 'project-and-construction-management',
    title: 'Project & Construction Management',
    icon: 'shield',
    summary: 'End-to-end project scheduling, site supervision, contract administration, and quality assurance.',
    points: [
      'Project planning, coordination and implementation management',
      'Preparation of project programmes, Gantt charts and implementation schedules',
      'Construction management and site supervision',
      'Contract administration and coordination of consultants and contractors',
      'Progress monitoring, reporting and performance tracking',
      'Resource planning, risk management and mitigation',
      'Quality assurance and quality control coordination',
      'Health, safety and environmental management coordination',
      'Budget monitoring, project controls and reporting',
      'Testing, commissioning, completion, handover and defects-liability monitoring',
    ],
  },
  {
    slug: 'construction-and-general-contracting',
    title: 'Construction & General Contracting',
    icon: 'hardhat',
    summary: 'New builds, structural steelwork, civil infrastructure construction, building maintenance, and refurbishment.',
    points: [
      'Residential, commercial, institutional and industrial building construction',
      'New-build construction, extensions, alterations and refurbishment',
      'Concrete, reinforcement, formwork, masonry and general building works',
      'Roofing, structural steelwork and fabrication-related construction',
      'Roads, pavements, drainage and sewerage construction',
      'Water supply and other civil infrastructure works',
      'External works, landscaping and site development',
      'Building maintenance, rehabilitation and remedial works',
    ],
  },
  {
    slug: 'geotechnical-engineering-and-materials-investigation',
    title: 'Geotechnical Engineering & Materials Investigation',
    icon: 'layers',
    summary: 'Soil testing, foundation recommendations, slope stability assessments, and material quality verification.',
    points: [
      'Geotechnical site investigation planning and coordination',
      'Soil sampling, testing coordination and interpretation of results',
      'Assessment of soil conditions and foundation recommendations',
      'Allowable bearing pressure and settlement assessments',
      'Slope stability and retaining-structure geotechnical assessments',
      'Compaction verification and earthworks quality assessment',
      'Pavement and construction-material investigations',
      'Preparation and review of geotechnical and materials reports',
    ],
  },
  {
    slug: 'environmental-and-social-consultancy',
    title: 'Environmental & Social Consultancy',
    icon: 'leaf',
    summary: 'NEMA-compliant EIA/ESIA studies, environmental audits, EMPs, waste management, and safety support.',
    points: [
      'Environmental Impact Assessment (EIA) and Environmental and Social Impact Assessment (ESIA) services',
      'Environmental audits and compliance assessments',
      'Preparation of Environmental Management Plans (EMP) and Environmental and Social Management Plans (ESMP)',
      'Environmental monitoring, inspections and reporting',
      'Environmental and social risk assessments',
      'Waste management and pollution prevention planning',
      'Occupational health and safety assessments and management support',
      'Stakeholder engagement and public participation coordination',
      'Water-quality assessment coordination and sustainability advice',
      'Environmental licensing and regulatory compliance support',
    ],
  },
  {
    slug: 'water-sanitation-hygiene-wash-engineering',
    title: 'WASH Engineering',
    icon: 'structure',
    summary: 'Water supply systems, borehole infrastructure, solar pumping, wastewater treatment, and sanitation planning.',
    points: [
      'Water demand assessments and water supply system design',
      'Borehole infrastructure and solar water-pumping system design',
      'Water treatment, storage and distribution system design',
      'Sanitation facilities and sewerage infrastructure design',
      'Septic tank, biodigester and wastewater treatment system design',
      'Water, sanitation and hygiene infrastructure for schools, hospitals and institutions',
      'Refugee camp and humanitarian WASH infrastructure planning and rehabilitation',
      'Hydraulic network modelling and system performance assessment',
      'WASH project supervision, implementation support and technical reporting',
    ],
  },
  {
    slug: 'land-surveying-planning-and-gis-support',
    title: 'Land Surveying, Planning & GIS Support',
    icon: 'scan',
    summary: 'Topographical surveys, site setting-out, subdivision planning, contour mapping, and spatial GIS analysis.',
    points: [
      'Topographical survey coordination and site data collection',
      'Construction setting-out and survey coordination',
      'Contour mapping and preparation of site plans',
      'Land subdivision and physical development planning support',
      'Site development and infrastructure layout planning',
      'GIS mapping and spatial data analysis',
      'Land-use and development feasibility support',
    ],
  },
  {
    slug: 'engineering-design-review-and-technical-consultancy',
    title: 'Engineering Design Review & Technical Consultancy',
    icon: 'shield',
    summary: 'Independent design reviews, structural safety audits, defect investigations, and expert dispute assessments.',
    points: [
      'Independent review of structural, civil, architectural and MEP designs',
      'Structural safety assessments and building condition surveys',
      'Technical due diligence and engineering audits',
      'Investigation of construction defects and structural distress',
      'Value engineering and alternative construction method assessments',
      'Review of drawings, specifications, calculations and technical submissions',
      'Preparation of technical opinions, assessments and expert reports',
      'Technical assessment of construction disputes, variations and claims',
    ],
  },
  {
    slug: 'procurement-tendering-and-contract-management',
    title: 'Procurement, Tendering & Contract Management',
    icon: 'clipboard',
    summary: 'Procurement planning, tender document preparation, FIDIC contract administration, and supplier coordination.',
    points: [
      'Procurement planning and preparation of procurement schedules',
      'Preparation of tender documents, technical specifications and BOQs',
      'Contractor and supplier prequalification support',
      'Tender evaluation, comparison and recommendation reports',
      'Preparation and review of construction contract documentation',
      'Contract administration, including FIDIC-based administration where applicable',
      'Monitoring of contractual obligations and performance',
      'Variation, extension-of-time and claims assessment support',
      'Procurement and supply-chain coordination',
    ],
  },
  {
    slug: 'renewable-energy-and-sustainable-building-solutions',
    title: 'Renewable Energy & Sustainable Building Solutions',
    icon: 'bolt',
    summary: 'Solar PV systems, energy efficiency audits, green building design, and rainwater harvesting solutions .',
    points: [
      'Solar photovoltaic system design and implementation support',
      'Solar water pumping and solar-powered institutional facilities',
      'Energy-efficiency assessments and improvement recommendations',
      'Green building and sustainable design consultancy',
      'Rainwater harvesting and water conservation systems',
      'Sustainable drainage and climate-resilient infrastructure solutions',
      'Energy-efficient lighting and building-services design',
    ],
  },
  {
    slug: 'facilities-management-and-maintenance',
    title: 'Facilities Management & Maintenance',
    icon: 'plan',
    summary: 'Preventive maintenance planning, building condition audits, asset registers, and facilities upgrading .',
    points: [
      'Building and facilities management services',
      'Preventive and corrective maintenance planning',
      'Inspection and maintenance of building fabric and services',
      'Electrical, mechanical, plumbing and drainage maintenance coordination',
      'Building condition assessments and maintenance audits',
      'Asset registers, maintenance schedules and lifecycle planning',
      'Facilities rehabilitation, upgrades and refurbishment management',
    ],
  },
]

const img = (n) => `/images/p${n}.jpg`

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

// PLACEHOLDER: until each project has its full photo set, repeat its own images so the gallery
// carousel and thumbnail strip can be seen working. Delete this block once real photos are added.
for (const p of projects) {
  const base = [...p.images]
  while (p.images.length < 6) p.images.push(base[p.images.length % base.length])
}

export const sitemap = [
  { heading: 'Company', links: [{ label: 'Home', to: '/' }, { label: 'Who We Are', to: '/about' }, { label: 'Our Team', to: '/team' }, { label: 'Careers', to: '/careers' }] },
  { heading: 'Services', links: services.slice(0, 8).map((s) => ({ label: s.title, to: `/services/${s.slug}` })) },
  { heading: 'More Services', links: services.slice(8).map((s) => ({ label: s.title, to: `/services/${s.slug}` })) },
  { heading: 'Work', links: [{ label: 'All Projects', to: '/projects' }, { label: 'Request a Quote', to: '/contact' }, { label: 'Contact', to: '/contact' }] },
]

export const heroSlides = [
  '/images/hero1.jpeg',
  '/images/hero2.jpeg',
  '/images/hero3.jpeg',
  '/images/hero4.jpeg',
  '/images/hero5.jpeg',
  '/images/hero6.jpeg',
]

export const stages = [
  { id: 'plan-approve', n: '01', title: 'Plan & Approve', icon: 'clipboard',
    gets: 'A site that is assessed and approved before any money is spent on building.',
    services: ['environmental-and-social-consultancy', 'geotechnical-engineering-and-materials-investigation', 'land-surveying-planning-and-gis-support'] },
  { id: 'design', n: '02', title: 'Design', icon: 'plan',
    gets: 'Coordinated drawings and engineering, ready to build and ready for approval.',
    services: ['architectural-design-services', 'structural-engineering-services', 'civil-engineering-and-infrastructure-design', 'mechanical-electrical-plumbing-mep', 'renewable-energy-and-sustainable-building-solutions'] },
  { id: 'build', n: '03', title: 'Build', icon: 'hardhat',
    gets: 'A finished building delivered to the agreed scope by the team that designed it.',
    services: ['construction-and-general-contracting'] },
  { id: 'manage', n: '04', title: 'Manage', icon: 'shield',
    gets: 'Independent supervision, testing and safety control so cost and quality stay on track.',
    services: ['quantity-surveying-and-cost-consultancy', 'project-and-construction-management', 'engineering-design-review-and-technical-consultancy', 'procurement-tendering-and-contract-management', 'facilities-management-and-maintenance'] },
]

export const process = [
  { icon: 'chat', title: 'Enquiry', text: 'You tell us what you want to build and where. We ask the questions that matter early: budget range, timeline, the site and what approvals are already in hand.' },
  { icon: 'pin', title: 'Site visit', text: 'We walk the site with you, take levels and photographs, and listen. By the end of the visit we agree the scope in plain terms, so the quotation is built on facts rather than assumptions.' },
  { icon: 'document', title: 'Quotation', text: 'You receive a clear, itemised quotation: what each stage covers, what it costs and how long it takes. No hidden extras and nothing buried in the small print.' },
  { icon: 'pen', title: 'Contract', text: 'We agree the programme and terms in writing, then mobilise. You get one point of contact who is accountable for design, approvals and construction from here on.' },
  { icon: 'key', title: 'Handover', text: 'Final inspection with you on site, the as-built documents and certificates in your hands, and aftercare once you have moved in.' },
]

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