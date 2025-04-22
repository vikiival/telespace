import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    question: "What are the two main layers of SpaceComputer's architecture?",
    options: ["Orbital and Ground layers", "Celestial and Uncelestial layers", "Primary and Secondary layers"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Why is SpaceComputer considered more secure against tampering than Earth-based systems?",
    options: [
      "Because it uses better encryption",
      "Because it’s physically unreachable in orbit and immune to physical tampering",
      "Because it has more security protocols"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Which of these combinations represents correct use cases for SpaceComputer?",
    options: [
      "Email service, web hosting, data storage",
      "Secure marketplace, cryptographic key management, secure computations",
      "Social media platform, payment processing, gaming"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is the main satellite network that SpaceComputer relies on for communication?",
    options: ["Starlink", "Iridium", "Kuiper"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "How does SpaceComputer handle secure deletion of data differently from Earth-based systems?",
    options: [
      "Uses better encryption methods",
      "Physical deletion is more secure as the storage is physically inaccessible",
      "Employs multiple deletion protocols"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What are the three grades of finality that SpaceComputer offers for transactions?",
    options: [
      "Initial, middle, final",
      "Pre-finality with backup, and full finality",
      "Soft confirmation, medium confirmation, hard confirmation"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What makes SpaceComputer more resistant to denial of service attacks?",
    options: [
      "Advanced firewall systems",
      "Due to being in orbit and having distributed satellite network",
      "Multiple backup servers"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "How does SpaceComputer plan to serve as a marketplace for satellite services?",
    options: [
      "By providing a settlement layer for payments and digital asset trading",
      "By creating a traditional e-commerce platform",
      "By operating as a simple payment processor"
    ],
    correctAnswer: 0
  },
  {
    id: 9,
    question: "What is the main advantage of having a blockchain system in orbit?",
    options: [
      "Faster transaction speed",
      "Lower operational costs",
      "Physical security and immunity to terrestrial attacks"
    ],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "What type of operating system do the SpaceComputer satellites use?",
    options: ["Windows", "Hardened Linux OS", "Custom proprietary OS"],
    correctAnswer: 1
  },
  {
    id: 11,
    question: "Why does SpaceComputer use a two-tier architecture?",
    options: [
      "To balance security (orbit) with processing capacity (Earth)",
      "To reduce operational costs",
      "To increase transaction speed"
    ],
    correctAnswer: 0
  },
  {
    id: 12,
    question: "How does SpaceComputer plan to handle communication between Earth and its satellite network?",
    options: [
      "Through fiber optic cables",
      "Through ground stations and the Iridium satellite network",
      "Through traditional internet infrastructure"
    ],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "What makes SpaceComputer particularly suitable for handling sensitive information?",
    options: [
      "Advanced encryption methods",
      "Its physical isolation in space and tamper-proof nature",
      "Multiple backup systems"
    ],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "What is the main limitation of the current system regarding communication with Earth?",
    options: [
      "High cost of operation",
      "Limited connectivity with satellites that need to be in range",
      "Slow processing speed"
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "How does SpaceComputer plan to evolve its communication capabilities?",
    options: [
      "By building more ground stations",
      "By incorporating additional networks like Kuiper and Starlink",
      "By developing its own proprietary communication network"
    ],
    correctAnswer: 1
  }
];
