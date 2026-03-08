export const PERSONAL_INFO = {
	name: 'Shohimardon Rahimov',
	firstName: 'Shohimardon',
	title: 'TypeScript/JavaScript Full-Stack Developer',
	phone: '+992 987770625',
	email: 'behruzrahimov580@gmail.com',
	location: 'Dushanbe, Tajikistan',
	company: '@zyplai',
	bio: 'Full-Stack developer with over 4 years of experience, specializing in TypeScript and JavaScript. Expert in designing, developing and deploying scalable web applications.',
	avatar: 'https://avatars.githubusercontent.com/u/94201286?v=4',
	social: {
		github: 'https://github.com/behruzrahimov',
		linkedin: 'https://www.linkedin.com/in/shohimardon-rahimov-435213245',
		twitter: 'https://twitter.com/shoh',
	},
	stats: {
		experience: 4,
		projects: 20,
		followers: 22,
	},
} as const;

export const PROFILE_TEXT =
	'I am a Full-Stack developer with over 4 years of experience, specializing in TypeScript and JavaScript. I am an expert in designing, developing and deploying scalable web applications. I have a proven ability to manage and lead cross-functional teams to deliver high quality software solutions. I have the skills to integrate front-end and back-end technologies to create a seamless user experience. I consistently exceed performance targets and have strong problem solving and analytical skills.';

export const TYPEWRITER_SEQUENCES = [
	'Full-Stack Developer',
	2000,
	'TypeScript Expert',
	2000,
	'React Specialist',
	2000,
	'Web3 Developer',
	2000,
] as const;

export interface Experience {
	id: string;
	role: string;
	company: string;
	location: string;
	period: string;
	startDate: string;
	endDate: string | null;
	isCurrent: boolean;
	highlights: string[];
}

export const EXPERIENCE: Experience[] = [
	{
		id: 'zypl',
		role: 'Frontend Developer',
		company: 'zypl.ai',
		location: 'Dushanbe, Tajikistan',
		period: '05/2023 - Present',
		startDate: 'May 2023',
		endDate: null,
		isCurrent: true,
		highlights: [
			'Designed and implemented user interfaces using React.js',
			'Developed front-end features using HTML5, CSS (SCSS), JavaScript (TypeScript) and React.JS',
			'Collaborated with backend developers to integrate RESTful APIs and GraphQL',
			'Utilized TypeScript for robust and scalable application development',
			'Implemented CI/CD pipelines using Docker and Kubernetes',
			'Conducted code reviews and mentored junior developers',
		],
	},
	{
		id: 'mobi',
		role: 'Full-Stack WEB-3 Developer',
		company: 'MOBI (Mobility Open Blockchain Initiative)',
		location: 'Dushanbe, Tajikistan',
		period: '09/2022 - 05/2023',
		startDate: 'Sep 2022',
		endDate: 'May 2023',
		isCurrent: false,
		highlights: [
			'Designed and implemented UIs with React.js and backend systems with Node.js',
			'Developed full-stack features using HTML5, CSS (SCSS), TypeScript, React.js, and Node.js',
			'Implemented Libp2p for peer-to-peer communication and decentralized networking',
			'Utilized TypeScript for frontend and backend development',
			'Implemented CI/CD pipelines using Docker and Kubernetes',
			'Code reviews and mentorship to junior developers',
		],
	},
];

export interface SkillCategory {
	id: string;
	label: string;
	skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
	{
		id: 'frontend',
		label: 'Frontend',
		skills: ['HTML5', 'CSS / SCSS', 'JavaScript', 'TypeScript', 'React.js', 'React Native'],
	},
	{
		id: 'backend',
		label: 'Backend',
		skills: ['Node.js', 'Nest.js', 'Express.js', 'Fastify.js'],
	},
	{
		id: 'database',
		label: 'Database',
		skills: ['PostgreSQL', 'CouchDB', 'PouchDB', 'Redis', 'MongoDB', 'LevelDB'],
	},
	{
		id: 'blockchain',
		label: 'Blockchain',
		skills: ['Ethereum', 'Solidity', 'Hardhat', 'Truffle', 'IPFS', 'MetaMask'],
	},
	{
		id: 'testing',
		label: 'Testing',
		skills: ['Jest', 'Vite', 'Mocha'],
	},
	{
		id: 'other',
		label: 'Other',
		skills: ['Python', 'GoLang', 'C++', 'Docker', 'GraphQL', 'TypeORM', 'Libp2p', 'Kubernetes'],
	},
];

export interface Project {
	id: string;
	name: string;
	description: string;
	language: string;
	stars: number;
	url: string;
	featured?: boolean;
}

export const PROJECTS: Project[] = [
	{
		id: 'next-tj',
		name: 'next-tj',
		description: 'A Next.js application built with TypeScript. High-performance web application with modern React patterns and server-side rendering.',
		language: 'TypeScript',
		stars: 8,
		url: 'https://github.com/behruzrahimov/next-tj',
		featured: true,
	},
	{
		id: 'webApp1',
		name: 'webApp1',
		description: 'A full-featured JavaScript web application showcasing modern frontend development practices and responsive design patterns.',
		language: 'JavaScript',
		stars: 4,
		url: 'https://github.com/behruzrahimov/webApp1',
		featured: true,
	},
	{
		id: 'ocr',
		name: 'ocr',
		description: 'Optical Character Recognition system implemented in C++. High-performance image processing and text extraction engine.',
		language: 'C++',
		stars: 2,
		url: 'https://github.com/behruzrahimov/ocr',
		featured: true,
	},
	{
		id: 'pdf-viewer',
		name: 'pdf-viewer',
		description: 'A TypeScript-based PDF viewer library with smooth rendering, annotations support, and cross-browser compatibility.',
		language: 'TypeScript',
		stars: 2,
		url: 'https://github.com/behruzrahimov/pdf-viewer',
		featured: true,
	},
	{
		id: 'shoh-ui',
		name: 'shoh-ui',
		description: 'A custom UI component library built with TypeScript. Reusable, accessible, and beautifully designed React components.',
		language: 'TypeScript',
		stars: 1,
		url: 'https://github.com/behruzrahimov/shoh-ui',
		featured: false,
	},
	{
		id: 'megic-string',
		name: 'megic-string',
		description: 'A powerful string manipulation utility library with advanced text processing functions and Unicode support.',
		language: 'TypeScript',
		stars: 0,
		url: 'https://github.com/behruzrahimov/megic-string',
		featured: false,
	},
];

export interface Education {
	id: string;
	degree: string;
	institution: string;
	location: string;
	period: string;
	courses: string[];
}

export const EDUCATION: Education[] = [
	{
		id: 'tnu',
		degree: 'Computer Science',
		institution: 'Tajik National University',
		location: 'Dushanbe, Tajikistan',
		period: '2020 - 2024',
		courses: [
			'Programming Fundamentals',
			'C++ Programming',
			'Data Structures and Algorithms',
			'Object-Oriented Programming',
			'Software Engineering',
		],
	},
];

export interface Certification {
	id: string;
	name: string;
	date: string;
}

export const CERTIFICATIONS: Certification[] = [
	{ id: 'js0', name: 'JavaScript level.0', date: 'Jan 2021' },
	{ id: 'js1', name: 'JavaScript level.1', date: 'Feb 2021' },
	{ id: 'js2', name: 'JavaScript level.2', date: 'Mar 2021' },
	{ id: 'js3', name: 'JavaScript level.3', date: 'Apr 2021' },
	{ id: 'react', name: 'ProSkill React.JS', date: 'May 2022' },
];

export interface Language {
	id: string;
	name: string;
	level: string;
	proficiency: string;
}

export const LANGUAGES: Language[] = [
	{ id: 'tj', name: 'Tajik', level: 'Native', proficiency: 'C2' },
	{ id: 'ru', name: 'Russian', level: 'Native', proficiency: 'C2' },
	{ id: 'en', name: 'English', level: 'Intermediate', proficiency: 'A2/B1' },
];

export const AREAS_OF_EXPERTISE = [
	'Full Stack Development',
	'Node.js',
	'React',
	'RESTful APIs',
	'GraphQL',
	'Database Management',
	'Docker',
	'Kubernetes',
	'CI/CD',
	'Cloud Computing',
	'Microservices',
	'Agile',
	'TDD',
	'DevOps',
	'Git',
	'Web Performance',
	'Security',
	'Responsive Design',
	'PWAs',
	'SSR',
] as const;

export const NAV_LINKS = [
	{ id: 'hero', label: 'Home', href: '#hero' },
	{ id: 'about', label: 'About', href: '#about' },
	{ id: 'experience', label: 'Experience', href: '#experience' },
	{ id: 'skills', label: 'Skills', href: '#skills' },
	{ id: 'projects', label: 'Projects', href: '#projects' },
	{ id: 'education', label: 'Education', href: '#education' },
	{ id: 'contact', label: 'Contact', href: '#contact' },
] as const;
