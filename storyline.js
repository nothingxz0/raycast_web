/**
 * The Entrepreneur's Journey - Storyline Data
 * Linear maze structure with choices at each level
 */

const STORYLINE = {
    // Game metadata
    gameTitle: "The Entrepreneur's Journey",
    gameSubtitle: "A PIE Learning Experience",
    
    // Introduction
    intro: {
        title: "Welcome, Future Entrepreneur!",
        text: "You're a young Moroccan student with a dream: to become an entrepreneur. But you have no money, no experience, and no clear idea. Your journey starts here. Each choice you make will shape your entrepreneurial mindset. Choose wisely!",
        location: "Casablanca, Morocco"
    },
    
    // 6 Levels with choices
    levels: [
        {
            id: 1,
            title: "Level 1: The Starting Point",
            scenario: "No Idea Yet",
            description: "You're sitting in your room in Casablanca. You want to become an entrepreneur but don't know where to start. You see three paths ahead...",
            
            choices: [
                {
                    id: "1A",
                    text: "I'll observe problems around me and listen to people's needs",
                    sign: "👀 Observe & Listen",
                    type: "good",
                    feedback: "Excellent! Entrepreneurship starts with curiosity and observation. You're learning to identify real problems.",
                    mindset: "Curious & Problem-Solving"
                },
                {
                    id: "1B",
                    text: "I'll wait until I find the perfect business idea",
                    sign: "⏳ Wait for Perfect Idea",
                    type: "bad",
                    gameOver: true,
                    feedback: "GAME OVER: You waited for months... then years. The 'perfect' idea never came.",
                    lesson: "Lesson: Entrepreneurs don't wait for perfect. They start with observation and learn by doing. Perfection is the enemy of progress.",
                    quote: "\"The best time to start was yesterday. The next best time is now.\" - Moroccan Proverb"
                },
                {
                    id: "1C",
                    text: "I need money first before I can do anything",
                    sign: "💰 Get Money First",
                    type: "bad",
                    gameOver: true,
                    feedback: "GAME OVER: You spent years saving money, but never developed the entrepreneurial mindset.",
                    lesson: "Lesson: Entrepreneurship is first about mindset and skills, not money. Many successful businesses started with almost nothing.",
                    quote: "\"Your mind is your greatest capital.\" - Unknown"
                }
            ]
        },
        
        {
            id: 2,
            title: "Level 2: From Passion to Project",
            scenario: "Turning Passion Into Action",
            description: "You've been observing! You notice you love cooking traditional Moroccan food. Your friends always compliment your dishes. Can this become something real?",
            
            choices: [
                {
                    id: "2A",
                    text: "I'll test it! I'll cook for 5 friends this weekend and ask for honest feedback",
                    sign: "✅ Test with 5 Friends",
                    type: "good",
                    feedback: "Perfect! You're thinking like an entrepreneur - test fast, learn fast!",
                    mindset: "Action-Oriented & Customer-Focused"
                },
                {
                    id: "2B",
                    text: "I should study cooking and business for 6 months before trying anything",
                    sign: "📚 Study for 6 Months",
                    type: "bad",
                    gameOver: true,
                    feedback: "GAME OVER: While you were studying, your neighbor started a similar food business and took all the customers.",
                    lesson: "Lesson: Learning is important, but overthinking prevents action. Entrepreneurs learn by doing, not just studying.",
                    quote: "\"Action without knowledge is dangerous. Knowledge without action is useless.\" - Balance is key"
                },
                {
                    id: "2C",
                    text: "Cooking is just a hobby. It can't be a real business",
                    sign: "🚫 Just a Hobby",
                    type: "bad",
                    gameOver: true,
                    feedback: "GAME OVER: You gave up on your passion. Years later, you see someone else built a successful catering business with the same idea.",
                    lesson: "Lesson: Entrepreneurs see opportunities where others see hobbies. Your passion + someone's need = opportunity.",
                    quote: "\"The biggest risk is not taking any risk.\" - Mark Zuckerberg"
                }
            ]
        },
        
        {
            id: 3,
            title: "Level 3: The No Money Problem",
            scenario: "Resources and Resourcefulness",
            description: "Great news! People loved your food. But now you need supplies, packaging, and a way to deliver. You have only 500 DH in your pocket. Your family can't help financially.",
            
            choices: [
                {
                    id: "3A",
                    text: "I'll start small - cook from home, use what I have, and reinvest profits",
                    sign: "🏠 Start Small & Grow",
                    type: "good",
                    feedback: "Smart! You're being resourceful. This is how most great businesses start!",
                    mindset: "Resourceful & Patient"
                },
                {
                    id: "3B",
                    text: "I'll find a partner who can invest money or has equipment",
                    sign: "🤝 Partner Up",
                    type: "good",
                    feedback: "Excellent thinking! Collaboration makes you stronger. Choose partners wisely!",
                    mindset: "Collaborative & Strategic"
                },
                {
                    id: "3C",
                    text: "Without money, I can't do anything. I'll stop here",
                    sign: "🛑 Give Up - No Money",
                    type: "bad",
                    gameOver: true,
                    feedback: "GAME OVER: You quit because of money. Meanwhile, someone else started with even less and succeeded.",
                    lesson: "Lesson: Money is NOT the main barrier. Creativity, resourcefulness, and determination are more valuable than capital.",
                    quote: "\"The entrepreneur always searches for change, responds to it, and exploits it as an opportunity.\" - Peter Drucker"
                }
            ]
        },
        
        {
            id: 4,
            title: "Level 4: Nobody Believes in You",
            scenario: "Facing Doubt and Criticism",
            description: "You started cooking from home! But your family says 'This is a waste of time.' Friends say 'Food business won't work in our neighborhood.' Even your teachers doubt you.",
            
            choices: [
                {
                    id: "4A",
                    text: "I'll prove them wrong with results, not words. Let my work speak",
                    sign: "💪 Prove with Results",
                    type: "good",
                    feedback: "Resilience! This is the entrepreneurial spirit. Actions speak louder than words!",
                    mindset: "Resilient & Determined"
                },
                {
                    id: "4B",
                    text: "I'll find a mentor or someone who understands entrepreneurship",
                    sign: "🗣️ Find a Mentor",
                    type: "good",
                    feedback: "Wise choice! Surrounding yourself with the right people is crucial for success!",
                    mindset: "Smart & Open to Learning"
                },
                {
                    id: "4C",
                    text: "Maybe they're right... I'm too young and inexperienced",
                    sign: "😞 Self-Doubt",
                    type: "bad",
                    gameOver: true,
                    feedback: "GAME OVER: You let others' opinions define your reality. Your dream died before it truly lived.",
                    lesson: "Lesson: Every successful entrepreneur faced doubt. Belief in yourself is non-negotiable. Don't let others' limitations become yours.",
                    quote: "\"They laughed at me because I was different. I laughed at them because they were all the same.\" - Be different"
                }
            ]
        },
        
        {
            id: 5,
            title: "Level 5: Understanding the Client",
            scenario: "Customer Feedback",
            description: "Success! You have your first 10 paying customers. But then... one customer complains: 'The food is good but arrived cold. The packaging leaked.'",
            
            choices: [
                {
                    id: "5A",
                    text: "I'll listen carefully, apologize, improve packaging, and ask for more feedback",
                    sign: "👂 Listen & Improve",
                    type: "good",
                    feedback: "Perfect! Customer feedback is gold. You're building a real business!",
                    mindset: "Customer-Focused & Adaptable"
                },
                {
                    id: "5B",
                    text: "They don't understand my vision. I know what's best for the product",
                    sign: "😤 Ignore Feedback",
                    type: "bad",
                    gameOver: true,
                    feedback: "GAME OVER: Customers stopped buying. You lost your reputation. Business closed in 3 months.",
                    lesson: "Lesson: Your business exists to solve customer problems, not to prove you're right. Ego kills businesses.",
                    quote: "\"Your customer doesn't care how much you know until they know how much you care.\" - Damon Richards"
                },
                {
                    id: "5C",
                    text: "Maybe I should change everything completely?",
                    sign: "🤷 Change Everything",
                    type: "bad",
                    gameOver: true,
                    feedback: "GAME OVER: You changed so much that you lost your original customers and confused new ones. The business lost its identity.",
                    lesson: "Lesson: Listen to feedback, but don't lose your core value. Improve, don't abandon. Confidence with flexibility.",
                    quote: "\"Stay committed to your decisions, but stay flexible in your approach.\" - Tony Robbins"
                }
            ]
        },
        
        {
            id: 6,
            title: "Level 6: Growing the Project",
            scenario: "Scaling Up",
            description: "Amazing! You now have 50 regular customers. Orders are growing. You're working 12 hours a day - cooking, packing, delivering, marketing. You're exhausted but excited.",
            
            choices: [
                {
                    id: "6A",
                    text: "I'll build a small team - hire 1-2 people and train them well",
                    sign: "🤝 Build a Team",
                    type: "good",
                    feedback: "Brilliant! You understand that growth requires delegation and teamwork!",
                    mindset: "Leader & Scalable Thinker",
                    isWinning: true
                },
                {
                    id: "6B",
                    text: "I'll do everything myself to keep control and save money",
                    sign: "💼 Control Everything",
                    type: "bad",
                    gameOver: true,
                    feedback: "GAME OVER: You burned out in 6 months. Quality dropped. Customers left. Your health suffered.",
                    lesson: "Lesson: You can't scale a business alone. Real entrepreneurs build systems and teams, not one-person shows.",
                    quote: "\"If you want to go fast, go alone. If you want to go far, go together.\" - African Proverb"
                },
                {
                    id: "6C",
                    text: "I'll sell the business now and take the money",
                    sign: "💸 Sell & Exit",
                    type: "neutral",
                    gameOver: true,
                    feedback: "GAME OVER: You sold for 50,000 DH. It felt good... for a month. Then you realized you sold your dream too early.",
                    lesson: "Lesson: Success isn't just about money. Building something meaningful and lasting is the true entrepreneurial journey.",
                    quote: "\"Don't aim for success if you want it; just do what you love and believe in, and it will come naturally.\" - David Frost"
                }
            ]
        }
    ],
    
    // Success ending (if they reach here)
    successEnding: {
        title: "🎉 YOU ARE THE ENTREPRENEUR! 🎉",
        message: "Congratulations! You've completed the journey. You started with nothing but curiosity and determination. You learned to observe, take action, be resourceful, stay resilient, listen to customers, and build a team.",
        achievement: "You didn't just learn about entrepreneurship - you BECAME an entrepreneur!",
        mindsets: [
            "✅ Curious & Observant",
            "✅ Action-Oriented",
            "✅ Resourceful",
            "✅ Resilient",
            "✅ Customer-Focused",
            "✅ Collaborative Leader"
        ],
        finalQuote: "\"The best way to predict the future is to create it.\" - Now go build your dreams! 🇲🇦",
        message2: "Remember: Every entrepreneur starts where you are now. The difference? They chose to start."
    }
};
