export const userRoles = [
  'Teacher Administrator',
  'Minister for Finance',
  'Minister for Public Expenditure',
  'Department Minister'
];

export const gameFlow = [
  'Tax Summit',
  'Department Decisions',
  'Funding Requests',
  'Budget Decisions',
  'Election Night'
];

export const budgetBands = [
  { value: 5, label: 'Surplus' },
  { value: 3, label: 'Balanced Budget' },
  { value: 0, label: 'Small Deficit' },
  { value: -5, label: 'Medium Deficit' },
  { value: -10, label: 'Large Deficit' }
];

export const electionBands = [
  { label: 'Landslide Victory', range: '30+' },
  { label: 'Majority Government', range: '20-29' },
  { label: 'Re-Elected', range: '10-19' },
  { label: 'Hung Parliament', range: '0-9' },
  { label: 'Government Defeated', range: 'Below 0' }
];

export const taxDecisions = [
  {
    id: 'income-tax-up',
    label: 'Increase Income Tax',
    description: 'Raise revenue from working households to fund public services.',
    revenue: 420000,
    score: -4
  },
  {
    id: 'vat-up',
    label: 'Increase VAT',
    description: 'Increase spending tax with a wider impact on consumer demand.',
    revenue: 360000,
    score: -3
  },
  {
    id: 'tobacco-tax',
    label: 'Increase Tobacco Tax',
    description: 'Price increases aimed at reducing smoking and improving health.',
    revenue: 180000,
    score: -2
  },
  {
    id: 'carbon-tax',
    label: 'Carbon Tax',
    description: 'Charge emitters to invest in greener infrastructure.',
    revenue: 220000,
    score: 3
  },
  {
    id: 'corporation-tax',
    label: 'Increase Corporation Tax',
    description: 'Tax big businesses more to help fund services and social programmes.',
    revenue: 330000,
    score: 1
  },
  {
    id: 'income-tax-down',
    label: 'Reduce Income Tax',
    description: 'Lower household tax burden and support consumer spending.',
    revenue: -260000,
    score: 4
  },
  {
    id: 'fuel-duty-down',
    label: 'Reduce Fuel Duty',
    description: 'Reduce transport costs and protect households from energy pressure.',
    revenue: -190000,
    score: 2
  },
  {
    id: 'vape-tax',
    label: 'Tax on Vapes',
    description: 'Introduce new taxes to reduce youth vaping rates.',
    revenue: 90000,
    score: -1
  }
];

function createDepartment({
  id,
  name,
  priority,
  tagline,
  issueTitles,
  cutTitles,
  issueScores,
  cutScores,
  issueCosts,
  issueSavings,
  cutCosts,
  cutSavings
}) {
  return {
    id,
    name,
    priority,
    tagline,
    issues: issueTitles.map((title, index) => ({
      id: `${id}-issue-${index + 1}`,
      title,
      cost: issueCosts[index],
      savings: issueSavings[index],
      score: issueScores[index]
    })),
    cuts: cutTitles.map((title, index) => ({
      id: `${id}-cut-${index + 1}`,
      title,
      cost: cutCosts[index],
      savings: cutSavings[index],
      score: cutScores[index]
    }))
  };
}

export const departments = [
  createDepartment({
    id: 'health',
    name: 'Health',
    priority: 'Frontline',
    tagline: 'Waiting lists and public health access',
    issueTitles: ['Expand community care', 'Upgrade mental health services', 'Reduce hospital waiting times', 'Improve emergency response'],
    cutTitles: ['Reduce admin overhead', 'Audit procurement', 'Cut duplicate contracts', 'Delay non-essential upgrades'],
    issueScores: [8, 9, 7, 6],
    cutScores: [-4, -3, -2, -1],
    issueCosts: [420000, 560000, 390000, 470000],
    issueSavings: [120000, 150000, 70000, 110000],
    cutCosts: [65000, 70000, 54000, 90000],
    cutSavings: [35000, 50000, 30000, 42000]
  }),
  createDepartment({
    id: 'education',
    name: 'Education',
    priority: 'Future',
    tagline: 'Teacher staffing and student attainment',
    issueTitles: ['Recruit extra teachers', 'Expand special education supports', 'Upgrade digital learning', 'Reduce classroom overcrowding'],
    cutTitles: ['Reduce non-essential travel', 'Consolidate IT licences', 'Freeze discretionary hiring', 'Review school catering costs'],
    issueScores: [7, 8, 6, 9],
    cutScores: [-3, -2, -1, -2],
    issueCosts: [480000, 520000, 310000, 600000],
    issueSavings: [160000, 140000, 110000, 170000],
    cutCosts: [80000, 65000, 70000, 58000],
    cutSavings: [47000, 38000, 43000, 30000]
  }),
  createDepartment({
    id: 'housing',
    name: 'Housing',
    priority: 'Homes',
    tagline: 'Affordable homes and homelessness response',
    issueTitles: ['Build more social homes', 'Support first-time buyers', 'Tackle homelessness', 'Improve insulation schemes'],
    cutTitles: ['Pause low-priority projects', 'Review maintenance contracts', 'Reduce legacy grants', 'Streamline housing admin'],
    issueScores: [8, 7, 9, 6],
    cutScores: [-2, -3, -1, -2],
    issueCosts: [650000, 430000, 550000, 320000],
    issueSavings: [160000, 120000, 180000, 95000],
    cutCosts: [95000, 78000, 60000, 58000],
    cutSavings: [40000, 33000, 28000, 25000]
  }),
  createDepartment({
    id: 'transport',
    name: 'Transport',
    priority: 'Movement',
    tagline: 'Road, rail, and public transport',
    issueTitles: ['Expand bus services', 'Repair local roads', 'Invest in public transport', 'Improve active travel links'],
    cutTitles: ['Pause low-use routes', 'Reduce consultancy spend', 'Delay depot upgrades', 'Review fleet replacement timing'],
    issueScores: [7, 6, 8, 5],
    cutScores: [-3, -2, -2, -1],
    issueCosts: [390000, 470000, 510000, 280000],
    issueSavings: [110000, 150000, 140000, 90000],
    cutCosts: [69000, 52000, 61000, 75000],
    cutSavings: [35000, 28000, 27000, 33000]
  }),
  createDepartment({
    id: 'environment',
    name: 'Environment',
    priority: 'Climate',
    tagline: 'Sustainability and climate resilience',
    issueTitles: ['Expand recycling services', 'Improve flood defences', 'Support clean energy investment', 'Restore biodiversity'],
    cutTitles: ['Cut low-priority consultancy', 'Review waste contracts', 'Reduce paper-heavy reporting', 'Pause non-essential landscaping'],
    issueScores: [8, 7, 9, 6],
    cutScores: [-2, -3, -1, -2],
    issueCosts: [340000, 620000, 580000, 410000],
    issueSavings: [130000, 200000, 170000, 120000],
    cutCosts: [73000, 68000, 54000, 62000],
    cutSavings: [32000, 29000, 24000, 28000]
  }),
  createDepartment({
    id: 'agriculture',
    name: 'Agriculture',
    priority: 'Rural',
    tagline: 'Farming support and food security',
    issueTitles: ['Support family farms', 'Invest in sustainable practices', 'Improve rural broadband', 'Secure food supply chains'],
    cutTitles: ['Review farm subsidy duplication', 'Cut low-priority grants', 'Reduce advisory spend', 'Delay office upgrades'],
    issueScores: [7, 8, 6, 7],
    cutScores: [-2, -1, -3, -2],
    issueCosts: [430000, 380000, 290000, 520000],
    issueSavings: [140000, 120000, 70000, 150000],
    cutCosts: [66000, 58000, 62000, 71000],
    cutSavings: [26000, 24000, 31000, 29000]
  }),
  createDepartment({
    id: 'justice',
    name: 'Justice',
    priority: 'Safety',
    tagline: 'Crime reduction and court systems',
    issueTitles: ['Expand probation support', 'Increase youth diversion', 'Modernise courts', 'Improve police resourcing'],
    cutTitles: ['Reduce overtime', 'Cut non-essential equipment', 'Review fleet allocation', 'Streamline admin processes'],
    issueScores: [7, 8, 6, 7],
    cutScores: [-3, -2, -2, -1],
    issueCosts: [410000, 470000, 500000, 430000],
    issueSavings: [110000, 140000, 130000, 120000],
    cutCosts: [72000, 63000, 61000, 68000],
    cutSavings: [34000, 31000, 25000, 29000]
  }),
  createDepartment({
    id: 'enterprise',
    name: 'Enterprise',
    priority: 'Jobs',
    tagline: 'Business growth and employment',
    issueTitles: ['Support SMEs', 'Improve apprenticeships', 'Boost regional investment', 'Expand export support'],
    cutTitles: ['Reduce low-impact grants', 'Review event spending', 'Cut duplicate marketing', 'Delay non-essential projects'],
    issueScores: [8, 7, 7, 6],
    cutScores: [-2, -1, -3, -2],
    issueCosts: [460000, 390000, 510000, 350000],
    issueSavings: [150000, 120000, 140000, 100000],
    cutCosts: [77000, 62000, 54000, 73000],
    cutSavings: [36000, 28000, 22000, 33000]
  }),
  createDepartment({
    id: 'social-protection',
    name: 'Social Protection',
    priority: 'Support',
    tagline: 'Welfare, support programmes and poverty reduction',
    issueTitles: ['Expand child support', 'Increase cost-of-living support', 'Improve disability services', 'Strengthen community supports'],
    cutTitles: ['Review benefit admin costs', 'Reduce duplication', 'Limit low-priority schemes', 'Tighten procurement'],
    issueScores: [9, 8, 8, 7],
    cutScores: [-2, -3, -1, -2],
    issueCosts: [540000, 610000, 470000, 450000],
    issueSavings: [140000, 170000, 130000, 110000],
    cutCosts: [83000, 76000, 69000, 64000],
    cutSavings: [39000, 35000, 26000, 30000]
  }),
  createDepartment({
    id: 'defence',
    name: 'Defence',
    priority: 'Security',
    tagline: 'National security and resilience',
    issueTitles: ['Upgrade cyber security', 'Modernise equipment', 'Improve recruitment', 'Strengthen emergency readiness'],
    cutTitles: ['Review procurement cycle', 'Delay non-essential contracts', 'Cut duplicate planning', 'Reduce travel overhead'],
    issueScores: [6, 7, 5, 8],
    cutScores: [-3, -2, -1, -2],
    issueCosts: [610000, 560000, 440000, 470000],
    issueSavings: [180000, 150000, 120000, 130000],
    cutCosts: [88000, 71000, 60000, 55000],
    cutSavings: [42000, 32000, 26000, 24000]
  })
];
