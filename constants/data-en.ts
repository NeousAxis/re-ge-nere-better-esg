import { ModelCompany } from '../types';

export const MODEL_COMPANIES: ModelCompany[] = [
  {
    id: 1,
    name: 'Solaria Grid',
    sector: 'Energy & Resources',
    subSectors: ['Oil & Gas', 'Renewable Energy', 'Utilities & Grids', 'Water & Sanitation', 'Mining & Extraction'],
    profile: 'Renewable energy production & distribution. Large enterprise / regional operator.',
    pillars: {
      E: {
        kpis: [
          '-50% direct emissions (Scope 1) in 5 years.',
          '100% of electricity sold is certified renewable (Scope 2 & 3 customer use).',
        ],
        actions: [
          { id: 'solaria-e-1', text: 'Replace 70% of the thermal fleet with electric vehicles.', tags: ['Scope 1', 'Impact'] },
          { id: 'solaria-e-2', text: 'Sign long-term renewable PPA for all sites.', tags: ['Scope 2', 'Impact', 'Financière'] },
          { id: 'solaria-e-3', text: 'Offer all customers a "green offer" contract by default.', tags: ['Scope 3', 'Impact', 'Financière'] },
        ],
      },
      S: {
        kpis: [
          'Accident rate with leave < 3 per 1,000 employees.',
          '100% of sites with a just transition plan for fossil fuel jobs.',
        ],
        actions: [
          { id: 'solaria-s-1', text: 'Implement a training program for transition-related jobs.', tags: ['Impact'] },
          { id: 'solaria-s-2', text: 'Establish a formalized social dialogue at each sensitive site.', tags: ['Impact', 'Financière'] },
          { id: 'solaria-s-3', text: 'Annually measure the social acceptability of projects in the territories.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          '20% of executive committee variable compensation linked to climate objectives.',
          'Climate risk mapping validated by the Board.',
        ],
        actions: [
          { id: 'solaria-g-1', text: 'Add an "emissions reduction" indicator to executive bonuses.', tags: ['Impact', 'Financière'] },
          { id: 'solaria-g-2', text: 'Create a Climate / CSR committee attached to the Board.', tags: ['Impact'] },
          { id: 'solaria-g-3', text: 'Integrate a 1.5°C scenario in all investment plans > €5M.', tags: ['Financière'] },
        ],
      },
    },
  },
  {
    id: 2,
    name: 'TerraFood Coop',
    sector: 'Agriculture & Food',
    subSectors: ['Farming / Livestock', 'Food Processing', 'Food Distribution', 'Restaurants'],
    profile: 'Local agro cooperative, processing + distribution.',
    pillars: {
      E: {
        kpis: ['0% deforestation in the supply chain (Scope 3).', '50% reusable / compostable packaging.'],
        actions: [
          { id: 'terrafood-e-1', text: 'Exclude all suppliers linked to deforestation (uncertified palm oil, at-risk soy...).', tags: ['Scope 3', 'Impact', 'Financière'] },
          { id: 'terrafood-e-2', text: 'Launch a pilot range of 100% bulk or returnable packaging.', tags: ['Scope 3', 'Impact'] },
          { id: 'terrafood-e-3', text: 'Implement emissions tracking per kilo of product sold.', tags: ['Scope 1', 'Scope 2', 'Scope 3', 'Financière'] },
        ],
      },
      S: {
        kpis: ['100% of producers with long-term contracts and guaranteed minimum prices.', '0 cases of forced/child labor in the chain.'],
        actions: [
          { id: 'terrafood-s-1', text: 'Establish a "fair price" charter signed with all farmers.', tags: ['Impact'] },
          { id: 'terrafood-s-2', text: 'Audit cooperatives / importers with social risks.', tags: ['Impact', 'Financière'] },
          { id: 'terrafood-s-3', text: 'Co-finance equipment (irrigation, storage) to secure producers\' incomes.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Responsible purchasing policy published and monitored.', 'Annual socio-environmental impact report.'],
        actions: [
          { id: 'terrafood-g-1', text: 'Set up a multi-stakeholder committee (producers, customers, NGOs).', tags: ['Impact'] },
          { id: 'terrafood-g-2', text: 'Trace and publish the origin of 100% of raw materials.', tags: ['Impact', 'Financière'] },
          { id: 'terrafood-g-3', text: 'Have ESG data verified by an external third party.', tags: ['Financière'] },
        ],
      },
    },
  },
  {
    id: 3,
    name: 'CircularFab',
    sector: 'Manufacturing',
    subSectors: ['Textile / Fashion', 'Automotive', 'Electronics', 'Building Materials', 'Chemicals & Pharmaceuticals'],
    profile: 'Industry specializing in manufacturing from recycled materials.',
    pillars: {
      E: {
        kpis: ['-40% process emissions (Scope 1).', '30% recycled material in products.'],
        actions: [
          { id: 'circularfab-e-1', text: 'Install heat recovery on furnaces / presses.', tags: ['Scope 1', 'Impact', 'Financière'] },
          { id: 'circularfab-e-2', text: 'Substitute a portion of virgin materials with certified recycled materials.', tags: ['Scope 3', 'Impact'] },
          { id: 'circularfab-e-3', text: 'Conduct an LCA on the top 5 products.', tags: ['Scope 3', 'Financière'] },
        ],
      },
      S: {
        kpis: ['0 fatal accidents, TF < industry threshold.', '90% of employees trained on industrial risks.'],
        actions: [
          { id: 'circularfab-s-1', text: 'Implement a "safety first" program with daily rituals.', tags: ['Impact'] },
          { id: 'circularfab-s-2', text: 'Annual budget for workstation ergonomics.', tags: ['Impact', 'Financière'] },
          { id: 'circularfab-s-3', text: 'Social audit of main subcontractors.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['ISO 9001 / 14001 / 45001 certifications.', 'Mapping of regulatory risks (REACH...).'],
        actions: [
          { id: 'circularfab-g-1', text: 'Appoint a risk-owner for each major industrial risk.', tags: ['Impact'] },
          { id: 'circularfab-g-2', text: 'Implement a quarterly regulatory dashboard for the executive committee.', tags: ['Financière'] },
          { id: 'circularfab-g-3', text: 'Integrate ESG criteria into technical tenders.', tags: ['Impact', 'Financière'] },
        ],
      },
    },
  },
  {
    id: 4,
    name: 'Regenera Build',
    sector: 'Construction & Real Estate',
    subSectors: ['Real Estate Development', 'Construction / Public Works', 'Architecture / Engineering', 'Property Management'],
    profile: 'Developer and builder focused on sustainable and regenerative buildings.',
    pillars: {
      E: {
        kpis: ['50% low-carbon / bio-based materials.', '0 construction site waste landfilled on pilot projects.'],
        actions: [
          { id: 'regenera-e-1', text: 'Use low-carbon construction materials (wood, recycled concrete).', tags: ['Scope 3', 'Impact'] },
          { id: 'regenera-e-2', text: 'Implement a systematic construction waste management plan.', tags: ['Impact', 'Financière'] },
          { id: 'regenera-e-3', text: 'Conduct a Life Cycle Assessment (LCA) for each major project.', tags: ['Financière'] },
        ],
      },
      S: {
        kpis: ['Accident rate < national threshold.', '20% of works budget awarded to local / integration companies.'],
        actions: [
          { id: 'regenera-s-1', text: 'Deploy a responsible construction site charter (safety, noise, cleanliness).', tags: ['Impact'] },
          { id: 'regenera-s-2', text: 'Include a local employment clause in tenders.', tags: ['Impact'] },
          { id: 'regenera-s-3', text: 'Organize consultations with residents before each project.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Full transparency on costs, deadlines, and environmental impacts.', '100% of projects > €5M audited by an independent third party.'],
        actions: [
          { id: 'regenera-g-1', text: 'Create an online information portal for each major project.', tags: ['Impact'] },
          { id: 'regenera-g-2', text: 'Mandate independent audits for energy and social performance.', tags: ['Financière'] },
          { id: 'regenera-g-3', text: 'Set up a local monitoring committee with stakeholders.', tags: ['Impact'] },
        ],
      },
    },
  },
  {
    id: 5,
    name: 'CleanMove',
    sector: 'Transport & Logistics',
    subSectors: ['Road Transport', 'Maritime', 'Rail', 'Air', 'Urban Delivery'],
    profile: 'Specialist in low-emission urban logistics and road transport.',
    pillars: {
      E: {
        kpis: ['80% of the fleet consists of low-emission vehicles (electric, biogas).', '-30% of empty kilometers traveled.'],
        actions: [
          { id: 'cleanmove-e-1', text: 'Plan the complete electrification of the urban delivery fleet.', tags: ['Scope 1', 'Impact', 'Financière'] },
          { id: 'cleanmove-e-2', text: 'Use route optimization software to reduce distances.', tags: ['Scope 1', 'Financière'] },
          { id: 'cleanmove-e-3', text: 'Train all drivers in eco-driving.', tags: ['Scope 1', 'Impact'] },
        ],
      },
      S: {
        kpis: ['100% of drivers trained in good road safety practices.', 'Zero serious labor code violations.'],
        actions: [
          { id: 'cleanmove-s-1', text: 'Implement an HR charter for drivers (rest times, compensation).', tags: ['Impact'] },
          { id: 'cleanmove-s-2', text: 'Install driver assistance systems to prevent accidents.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['ESG score integrated as a main criterion in subcontractor selection.', 'Publication of an annual report on emissions per ton-kilometer.'],
        actions: [
          { id: 'cleanmove-g-1', text: 'Integrate strict ESG clauses in all transport contracts.', tags: ['Financière', 'Impact'] },
          { id: 'cleanmove-g-2', text: 'Implement a non-financial performance reporting system.', tags: ['Impact'] },
        ],
      },
    },
  },
  {
    id: 6,
    name: 'EthicCloud',
    sector: 'Technology & Telecommunications',
    subSectors: ['Software / SaaS', 'Hardware', 'AI & Data', 'Telecom', 'Digital Services / Agencies'],
    profile: 'Cloud and SaaS provider committed to digital sobriety and AI ethics.',
    pillars: {
      E: {
        kpis: ['Carbon intensity per request < market threshold.', '100% of data centers powered by renewable energy.'],
        actions: [
          { id: 'ethiccloud-e-1', text: 'Apply eco-design principles to all new services.', tags: ['Impact', 'Financière'] },
          { id: 'ethiccloud-e-2', text: 'Limit the collection and storage of unnecessary logs.', tags: ['Impact'] },
          { id: 'ethiccloud-e-3', text: 'Offer a "low-tech" option for critical services.', tags: ['Impact'] },
        ],
      },
      S: {
        kpis: ['User well-being score > 8/10.', 'Diversity of product teams representative of users.'],
        actions: [
          { id: 'ethiccloud-s-1', text: 'Implement a responsible UX charter (anti-dark patterns).', tags: ['Impact'] },
          { id: 'ethiccloud-s-2', text: 'Launch an ethical "bug bounty" program.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Operational and independent AI ethics committee.', 'Regular algorithmic bias audits.'],
        actions: [
          { id: 'ethiccloud-g-1', text: 'Publish the company\'s AI ethics principles.', tags: ['Impact'] },
          { id: 'ethiccloud-g-2', text: 'Ensure transparency in the use of personal data.', tags: ['Financière'] },
        ],
      },
    },
  },
  {
    id: 7,
    name: '1.5° Capital',
    sector: 'Finance & Insurance',
    subSectors: ['Banks', 'Fintech', 'Asset Management', 'Insurance'],
    profile: 'Asset management company aligned with the Paris Agreement objectives.',
    pillars: {
      E: {
        kpis: ['80% of assets under management aligned with a 1.5°C trajectory.', 'Measurement and publication of financed carbon footprint (Scope 3).'],
        actions: [
          { id: 'capital-e-1', text: 'Apply a strict exclusion policy on coal and unconventional hydrocarbons.', tags: ['Impact', 'Financière'] },
          { id: 'capital-e-2', text: 'Conduct climate stress tests on all portfolios.', tags: ['Financière'] },
          { id: 'capital-e-3', text: 'Publish an annual report aligned with TCFD recommendations.', tags: ['Impact'] },
        ],
      },
      S: {
        kpis: ['0% investment in companies controversial for serious human rights violations.', '100% of managers trained on ESG issues.'],
        actions: [
          { id: 'capital-s-1', text: 'Lead an active shareholder engagement policy on social issues.', tags: ['Impact'] },
          { id: 'capital-s-2', text: 'Develop social impact investment products.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Systematic voting in favor of "pro-climate" resolutions at General Meetings.', 'Full transparency on SFDR compliance (Article 8 and 9).'],
        actions: [
          { id: 'capital-g-1', text: 'Integrate ESG criteria into the fundamental analysis of each investment.', tags: ['Financière'] },
          { id: 'capital-g-2', text: 'Publish the voting policy and engagement report.', tags: ['Impact'] },
        ],
      },
    },
  },
    {
    id: 8,
    name: 'LocalCircle',
    sector: 'Retail & Services',
    subSectors: ['Retail (small shops, department stores)', 'Business Services (consulting, marketing, IT)', 'Personal Services (hairdressers, gyms, artisans)'],
    profile: 'Network of local shops and services promoting short circuits and the local economy.',
    pillars: {
      E: {
        kpis: ['70% of suppliers are local (<150km).', '100% renewable electricity.'],
        actions: [
          { id: 'localcircle-e-1', text: 'Prioritize local and seasonal sourcing.', tags: ['Scope 3', 'Impact'] },
          { id: 'localcircle-e-2', text: 'Display the carbon impact of flagship products on shelves.', tags: ['Impact'] },
          { id: 'localcircle-e-3', text: 'Implement a deposit-return scheme for packaging.', tags: ['Scope 3', 'Financière'] },
        ],
      },
      S: {
        kpis: ['100% of employees paid above the local minimum wage.', 'Share of stable contracts (permanent) > 80%.'],
        actions: [
          { id: 'localcircle-s-1', text: 'Establish a clear and fair salary policy.', tags: ['Impact'] },
          { id: 'localcircle-s-2', text: 'Launch a loyalty program that rewards responsible purchases.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Full transparency on margins and product origins.', 'Shared governance mechanism with local producers.'],
        actions: [
          { id: 'localcircle-g-1', text: 'Publish the value distribution among producers, distributor, and employees.', tags: ['Impact'] },
          { id: 'localcircle-g-2', text: 'Create a supplier committee to co-build the offer.', tags: ['Impact', 'Financière'] },
        ],
      },
    },
  },
   {
    id: 9,
    name: 'PlanetCare Clinic',
    sector: 'Health & Wellness',
    subSectors: ['Hospitals', 'Private Clinics', 'Medical Offices', 'Pharmacies', 'Wellness Centers / Spas'],
    profile: 'Private clinic committed to a "One Health" approach, linking human and planetary health.',
    pillars: {
      E: {
        kpis: ['20% reduction in carbon footprint per bed.', '30% decrease in the volume of hazardous medical waste.'],
        actions: [
          { id: 'planetcare-e-1', text: 'Optimize the use of anesthetic gases with high global warming potential.', tags: ['Scope 1', 'Impact'] },
          { id: 'planetcare-e-2', text: 'Implement rigorous selective sorting for all types of waste.', tags: ['Impact', 'Financière'] },
          { id: 'planetcare-e-3', text: 'Prioritize suppliers of eco-designed medical equipment.', tags: ['Scope 3', 'Impact'] },
        ],
      },
      S: {
        kpis: ['Perceived quality of care index > 90%.', 'Psychosocial risk prevention plan for all staff.'],
        actions: [
          { id: 'planetcare-s-1', text: 'Launch psychological support programs for healthcare staff.', tags: ['Impact'] },
          { id: 'planetcare-s-2', text: 'Develop preventive care pathways for patients.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Active ethics committees consulted for critical decisions.', 'Zero patient data loss incidents.'],
        actions: [
          { id: 'planetcare-g-1', text: 'Conduct semi-annual patient data security audits.', tags: ['Financière'] },
          { id: 'planetcare-g-2', text: 'Publish an ethics charter on the relationship with the pharmaceutical industry.', tags: ['Impact'] },
        ],
      },
    },
  },
  {
    id: 10,
    name: 'FutureLearn Campus',
    sector: 'Education & Culture',
    subSectors: ['Schools', 'Universities', 'Museums', 'Galleries / Cultural Institutions', 'Training / EdTech'],
    profile: 'Higher education institution integrating ecological and social transition at all levels.',
    pillars: {
      E: {
        kpis: ['40% reduction in energy consumption per student.', '100% of cafeteria supplies are organic and local.'],
        actions: [
          { id: 'futurelearn-e-1', text: 'Initiate an energy renovation plan for campus buildings.', tags: ['Scope 1', 'Scope 2', 'Financière'] },
          { id: 'futurelearn-e-2', text: 'Integrate a mandatory module on climate issues in all curricula.', tags: ['Impact'] },
          { id: 'futurelearn-e-3', text: 'Install solar panels on building roofs.', tags: ['Scope 1', 'Impact'] },
        ],
      },
      S: {
        kpis: ['Inclusion rate (scholarships, disability) higher than the national average.', 'Active student participation in institutional governance.'],
        actions: [
          { id: 'futurelearn-s-1', text: 'Set up student councils with real decision-making power.', tags: ['Impact'] },
          { id: 'futurelearn-s-2', text: 'Create clear and effective reporting procedures against harassment.', tags: ['Impact'] },
        ],
      },
      G: {
        kpis: ['Full budgetary transparency on the use of funds.', 'Anti-harassment and anti-discrimination policy applied and evaluated.'],
        actions: [
          { id: 'futurelearn-g-1', text: 'Publish the institution\'s detailed budget in open data format.', tags: ['Impact'] },
          { id: 'futurelearn-g-2', text: 'Conduct an annual independent evaluation of the social climate on campus.', tags: ['Financière'] },
        ],
      },
    },
  },
    {
    id: 11,
    name: 'Regenera Lodge',
    sector: 'Tourism & Hospitality',
    subSectors: ['Hotels', 'Hostels', 'Tour Operators', 'Local Tourist Activities'],
    profile: 'Eco-responsible hotel aiming for a positive impact on its local ecosystem.',
    pillars: {
      E: {
        kpis: ['Carbon footprint per night < 10 kg CO2e.', 'Water consumption per client reduced by 30%.'],
        actions: [
          { id: 'regenera-lodge-e-1', text: 'Install renewable energy systems (solar thermal, photovoltaic).', tags: ['Scope 1', 'Impact', 'Financière'] },
          { id: 'regenera-lodge-e-2', text: 'Implement a rainwater harvesting and greywater recycling system.', tags: ['Impact', 'Financière'] },
          { id: 'regenera-lodge-e-3', text: 'Source 80% of food products locally and seasonally.', tags: ['Scope 3', 'Impact'] },
        ],
      },
      S: {
        kpis: ['90% of employees are from local communities.', 'Contribution of 5% of revenue per night to a local development fund.'],
        actions: [
          { id: 'regenera-lodge-s-1', text: 'Establish partnerships with local artisans and guides.', tags: ['Impact'] },
          { id: 'regenera-lodge-s-2', text: 'Offer fair working conditions and wages, even in high season.', tags: ['Impact'] },
        ],
      },
      G: {
        kpis: ['Full transparency on the environmental and social impacts of stays.', 'Certification by a recognized sustainable tourism label.'],
        actions: [
          { id: 'regenera-lodge-g-1', text: 'Communicate honestly about practices (avoid greenwashing).', tags: ['Impact'] },
          { id: 'regenera-lodge-g-2', text: 'Set up a dialogue committee with representatives of the local community.', tags: ['Impact', 'Financière'] },
        ],
      },
    },
  },
  {
    id: 12,
    name: 'Civic Horizon',
    sector: 'Public Sector & Organizations',
    subSectors: ['Public Administrations', 'Municipalities', 'NGOs / Associations', 'International Organizations'],
    profile: 'Local authority committed to a just transition and open governance.',
    pillars: {
      E: {
        kpis: ['40% reduction in the community\'s carbon footprint per inhabitant.', '50% of the investment budget aligned with climate objectives.'],
        actions: [
          { id: 'civic-e-1', text: 'Adopt and implement a Territorial Climate Air Energy Plan (PCAET).', tags: ['Impact', 'Financière'] },
          { id: 'civic-e-2', text: 'Integrate strict environmental criteria into 100% of public contracts.', tags: ['Scope 3', 'Impact'] },
          { id: 'civic-e-3', text: 'Launch an energy renovation program for public building heritage.', tags: ['Scope 1', 'Scope 2', 'Financière'] },
        ],
      },
      S: {
        kpis: ['Citizen participation rate in consultations > 10%.', 'Guaranteed access to essential public services for all inhabitants.'],
        actions: [
          { id: 'civic-s-1', text: 'Implement an annual participatory budget.', tags: ['Impact'] },
          { id: 'civic-s-2', text: 'Develop active social inclusion policies (housing, education, health).', tags: ['Impact'] },
        ],
      },
      G: {
        kpis: ['Public data openness level > 80% (Open Data).', 'Continuously increasing citizen trust index in the institution.'],
        actions: [
          { id: 'civic-g-1', text: 'Publish decisions and budgets in an open and accessible format.', tags: ['Impact'] },
          { id: 'civic-g-2', text: 'Establish mechanisms for complaints and monitoring of public commitments.', tags: ['Impact', 'Financière'] },
        ],
      },
    },
  },
];