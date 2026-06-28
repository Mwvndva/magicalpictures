export interface CrewMember {
    id: number;
    image: string;
    name?: string;
    role?: string;
    description?: string;
}

export const crewMembers: CrewMember[] = [
    {
        id: 1,
        image: '/assets/crew/crew-1.jpg',
        name: 'Jefferson Muranga',
        role: 'Founder/Videographer/Editor',
        description: 'KIMC graduate,experience with Betika, AAKenya, Pepsi, CapwellIndustries, EABL, and DKT International.'
    },
    {
        id: 3,
        image: '/assets/crew/crew-3.jpg',
        name: 'Khabi Javan',
        role: 'Video director',
        description: 'KIMC graduate, experience with Capwell Industries, Pepsi, Ministry of Agriculture, Kenya Originals.'
    },
    {
        id: 4,
        image: '/assets/crew/crew-4.jpg',
        name: 'Veronicah Wanjiru',
        role: 'Production & Social Media Manager',
        description: 'skilled in  coordination and client communication.'
    },
    {
        id: 5,
        image: '/assets/crew/crew-5.jpg',
        name: 'Simon Ngure',
        role: 'Video editor',
        description: 'KIMC graduate, experienced in NGO and corporate editing.'
    }
];
