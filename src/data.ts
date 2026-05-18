import { CVData } from './types';

export const CV_DATA: CVData = {
  name: "TAHA ANWAR",
  title: "Supply Chain & Logistics Professional",
  location: "Karachi, Pakistan",
  tagline: "Driving efficient supply chains with precision and reliability",
  about: "Dynamic Supply Chain professional with specialized expertise in logistics operations, demand planning, and inventory coordination. Proven record in handling complex remote site operations and optimizing supply chains for enhanced efficiency and cost-effectiveness.",
  skills: [
    { category: "Supply Chain", items: ["Supply Chain Management", "Demand Planning", "Inventory Coordination", "Procurement"] },
    { category: "Logistics Operations", items: ["Warehouse Management", "Distribution", "Remote Site Operations", "Last-Mile Delivery"] },
    { category: "Tools & Systems", items: ["ERP Systems", "Microsoft Excel (Advanced)", "Logistics Optimization Software"] },
    { category: "Business Skills", items: ["Critical Thinking", "Stakeholder Management", "Strategic Planning", "Team Coordination"] }
  ],
  experience: [
    {
      role: "Supply Chain Officer",
      company: "Zia-ul-Haq and Sons",
      period: "Present",
      description: [
        "Managing large-scale catering and remote sites operations across diverse geographic locations.",
        "Overseeing demand planning and inventory cycles to ensure 100% service availability at remote project sites.",
        "Streamlining procurement processes to reduce lead times and optimize costs."
      ],
      type: 'professional'
    },
    {
      role: "Logistics Specialist",
      company: "Daraz (Alibaba Group)",
      period: "Previous",
      description: [
        "Coordinated logistics operations for high-volume e-commerce fulfillment.",
        "Monitored inventory flow and warehouse efficiency during peak mega-sales events.",
        "Enhanced delivery performance through data-driven route optimization and hub management."
      ],
      type: 'professional'
    }
  ],
  projects: [
    {
      title: "Remote Site Supply Hub",
      category: "Operations",
      description: "Development of a unified supply coordination system for remote catering operations.",
      impact: "Reduced logistical delays by 25%."
    },
    {
      title: "Inventory Sync Protocol",
      category: "Optimization",
      description: "Implementation of a real-time inventory tracking system for multi-site coordination.",
      impact: "99% inventory accuracy achieved."
    },
    {
      title: "Demand Forecast Model",
      category: "Planning",
      description: "Excel-based predictive tool for seasonal demand fluctuation in logistics.",
      impact: "Minimized stockouts by 30%."
    }
  ]
};
