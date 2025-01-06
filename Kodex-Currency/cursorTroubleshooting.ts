/**
 * Comprehensive cursor troubleshooting guide
 * Organized by OS and complexity level
 */

interface TroubleshootingStep {
  title: string;
  description: string;
  expectedImprovement: string;
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  applicableOS: ('Windows' | 'macOS' | 'Linux')[];
}

export const cursorTroubleshootingSteps: TroubleshootingStep[] = [
  // Basic Software Solutions (All OS)
  {
    title: 'Clear Browser Cache',
    description: 'Clear browser cache and cookies, then restart the browser.',
    expectedImprovement: '20-30% reduction in cursor lag if browser-related',
    complexity: 'Basic',
    applicableOS: ['Windows', 'macOS', 'Linux']
  },
  {
    title: 'Disable Hardware Acceleration',
    description: 'Turn off hardware acceleration in your browser settings.',
    expectedImprovement: '40-50% improvement for GPU-related issues',
    complexity: 'Basic',
    applicableOS: ['Windows', 'macOS', 'Linux']
  },
  {
    title: 'Check Background Processes',
    description: 'Close unnecessary applications and browser tabs.',
    expectedImprovement: '30-40% improvement if system was resource-constrained',
    complexity: 'Basic',
    applicableOS: ['Windows', 'macOS', 'Linux']
  },

  // OS-Specific Basic Solutions
  {
    title: 'Windows Mouse Settings',
    description: 'Disable "Enhance pointer precision" in Mouse Settings.',
    expectedImprovement: '20-30% smoother cursor movement',
    complexity: 'Basic',
    applicableOS: ['Windows']
  },
  {
    title: 'macOS Cursor Size',
    description: 'Adjust cursor size in System Preferences > Accessibility > Display.',
    expectedImprovement: '15-20% better cursor visibility and response',
    complexity: 'Basic',
    applicableOS: ['macOS']
  },
  {
    title: 'Linux Compositor Settings',
    description: 'Disable desktop compositor or adjust animation settings.',
    expectedImprovement: '30-40% reduction in visual lag',
    complexity: 'Basic',
    applicableOS: ['Linux']
  },

  // Intermediate Solutions
  {
    title: 'Update Graphics Drivers',
    description: 'Install latest graphics card drivers from manufacturer website.',
    expectedImprovement: '40-60% improvement for GPU-related cursor lag',
    complexity: 'Intermediate',
    applicableOS: ['Windows', 'macOS', 'Linux']
  },
  {
    title: 'Monitor Refresh Rate',
    description: 'Ensure monitor is running at its highest supported refresh rate.',
    expectedImprovement: '50-70% smoother cursor movement',
    complexity: 'Intermediate',
    applicableOS: ['Windows', 'macOS', 'Linux']
  },
  {
    title: 'USB Polling Rate',
    description: 'Adjust mouse USB polling rate using manufacturer software.',
    expectedImprovement: '30-40% more responsive cursor',
    complexity: 'Intermediate',
    applicableOS: ['Windows', 'macOS', 'Linux']
  },

  // Advanced Solutions
  {
    title: 'Performance Power Plan',
    description: 'Set power plan to High Performance mode.',
    expectedImprovement: '20-30% better system responsiveness',
    complexity: 'Advanced',
    applicableOS: ['Windows']
  },
  {
    title: 'Registry Optimization',
    description: 'Adjust MouseHoverTime and MouseSpeed in Windows Registry.',
    expectedImprovement: '30-40% more responsive cursor',
    complexity: 'Advanced',
    applicableOS: ['Windows']
  },
  {
    title: 'X Server Configuration',
    description: 'Modify X11 configuration for input device settings.',
    expectedImprovement: '40-50% better cursor response',
    complexity: 'Advanced',
    applicableOS: ['Linux']
  }
];

export const diagnosticSteps = [
  'Monitor CPU and GPU usage during cursor movement',
  'Check for USB controller conflicts in Device Manager',
  'Test cursor performance in safe mode',
  'Run latency monitoring tools (LatencyMon for Windows)',
  'Verify monitor input lag using specialized testing tools'
];

export const professionalOptions = [
  'Contact mouse manufacturer support',
  'Consult with a certified system technician',
  'Visit authorized service center',
  'Consider hardware upgrades if issues persist'
];