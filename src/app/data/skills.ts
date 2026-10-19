export type SkillGroup = {
  label: string;
  note: string;
  items: string[];
};

// Grouped by how much you'd trust me with it, not by self-rated percentages.
export const skills: SkillGroup[] = [
  {
    label: 'Daily',
    note: 'What I ship with at work',
    items: ['PHP', 'Laravel', 'MySQL', 'REST API design', 'React', 'TypeScript', 'Tailwind CSS', 'Git', 'IoT device integration']
  },
  {
    label: 'Comfortable',
    note: 'Used on real projects',
    items: ['Node.js', 'PostgreSQL', 'Docker', 'Linux', 'Firebase', 'Java (Android)', 'Bootstrap', 'NFC readers']
  },
  {
    label: 'Learning',
    note: 'Actively working toward',
    items: ['Kubernetes', 'Terraform', 'Ansible', 'AWS', 'CI/CD pipelines']
  }
];

export type Layer = { label: string; note: string; items: string[] };

// Where each skill sits in the stack, top (what users touch) to bottom (hardware).
// Every item here must also appear in exactly one group above.
export const layers: Layer[] = [
  { label: 'Interface', note: 'What people click', items: ['React', 'TypeScript', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Server & APIs', note: 'Business logic', items: ['PHP', 'Laravel', 'REST API design', 'Node.js'] },
  { label: 'Data', note: 'Where it lives', items: ['MySQL', 'PostgreSQL', 'Firebase'] },
  {
    label: 'Infra & tooling',
    note: 'How it ships',
    items: ['Git', 'Linux', 'Docker', 'CI/CD pipelines', 'Kubernetes', 'Terraform', 'Ansible', 'AWS']
  },
  { label: 'Devices', note: 'Out in the world', items: ['IoT device integration', 'NFC readers', 'Java (Android)'] }
];
