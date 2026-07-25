/* ==========================================================================
   YCC CHARITABLE TRUST - STATE ENGINE & STORAGE ENGINE
   ========================================================================== */

const STORAGE_KEY = 'YCC_TRUST_STORE_V1';

const INITIAL_SEED_DATA = {
  projects: [
    {
      id: 'proj-1',
      title: 'GyanDeep Child Education Drive',
      category: 'Education',
      targetAmount: 500000,
      raisedAmount: 385000,
      image: '/assets/images/education.jpg',
      summary: 'Providing scholarships, uniforms, textbooks, and digital tablets to 500+ underprivileged children in rural districts.',
      beneficiaries: '500+ Children',
      location: 'Northern Districts'
    },
    {
      id: 'proj-2',
      title: 'Rural Health & Eye Care Camps',
      category: 'Healthcare',
      targetAmount: 350000,
      raisedAmount: 290000,
      image: '/assets/images/healthcare.jpg',
      summary: 'Conducting free medical checkups, cataract surgeries, and emergency medicine distribution for senior villagers.',
      beneficiaries: '1,200+ Seniors',
      location: 'Rural Health Clinics'
    },
    {
      id: 'proj-3',
      title: 'Green Vision Tree Plantation',
      category: 'Environment',
      targetAmount: 200000,
      raisedAmount: 175000,
      image: '/assets/images/environment.jpg',
      summary: 'Planting 10,000 indigenous trees and restoring urban green micro-forests for clean air and biodiversity.',
      beneficiaries: 'Community Ecosystem',
      location: 'City & Peri-urban Belt'
    },
    {
      id: 'proj-4',
      title: 'Women Vocational & Skill Center',
      category: 'Empowerment',
      targetAmount: 250000,
      raisedAmount: 190000,
      image: '/assets/images/hero.jpg',
      summary: 'Empowering local women with tailoring, computer training, and micro-entrepreneurship support.',
      beneficiaries: '250 Women',
      location: 'Community Skill Hub'
    }
  ],
  events: [
    {
      id: 'evt-1',
      title: 'Independence Day Mega Blood & Health Camp',
      date: '2026-08-15',
      time: '09:00 AM - 04:00 PM',
      location: 'YCC Community Center, Main Auditorium',
      category: 'Healthcare',
      description: 'Free health consultation with specialist doctors, blood donation drive, and free distribution of vitamins.',
      rsvps: 48
    },
    {
      id: 'evt-2',
      title: 'Youth Green Earth Plantation Marathon',
      date: '2026-09-05',
      time: '07:00 AM - 11:30 AM',
      location: 'Riverside Ecological Park',
      category: 'Environment',
      description: 'Join 200+ volunteers as we plant saplings along the riverbank to prevent soil erosion.',
      rsvps: 92
    }
  ],
  media: [
    { id: 'm-1', title: 'Classroom Digital Learning Session', type: 'image', category: 'Education', url: '/assets/images/education.jpg' },
    { id: 'm-2', title: 'Elderly Eye Screening Drive', type: 'image', category: 'Healthcare', url: '/assets/images/healthcare.jpg' },
    { id: 'm-3', title: 'Volunteer Tree Plantation Drive', type: 'image', category: 'Environment', url: '/assets/images/environment.jpg' },
    { id: 'm-4', title: 'Trust Annual Function Highlights', type: 'image', category: 'Events', url: '/assets/images/hero.jpg' }
  ],
  blog: [
    {
      id: 'post-1',
      title: 'How Clean Water & Education Transformed 15 Villages',
      author: 'Dr. Ramesh Sharma (Trustee)',
      date: '2026-06-12',
      category: 'Impact Story',
      image: '/assets/images/education.jpg',
      content: 'Access to safe drinking water and school sanitation has increased girl child attendance by 68% across our targeted rural centers...'
    },
    {
      id: 'post-2',
      title: 'Empowering 250 Rural Women Through Micro-Skill Training',
      author: 'Priya Verma (Program Lead)',
      date: '2026-07-04',
      category: 'Empowerment',
      image: '/assets/images/hero.jpg',
      content: 'Vocational self-reliance is turning dreamers into entrepreneurs. Meet Sunita, who launched her independent tailoring shop...'
    }
  ],
  donations: [
    {
      id: 'TXN-90812',
      receiptNo: 'YCC-80G-2026-0101',
      donorName: 'Anil Kumar',
      donorEmail: 'anil.k@example.com',
      donorPhone: '+91 98765 43210',
      donorPan: 'ABCDE1234F',
      amount: 5000,
      projectId: 'proj-1',
      projectTitle: 'GyanDeep Child Education Drive',
      paymentMethod: 'UPI (Google Pay)',
      status: 'Completed',
      date: '2026-07-20'
    },
    {
      id: 'TXN-90813',
      receiptNo: 'YCC-80G-2026-0102',
      donorName: 'Sunita Menon',
      donorEmail: 'sunita.m@example.com',
      donorPhone: '+91 98123 45678',
      donorPan: 'XYZPQ9876K',
      amount: 10000,
      projectId: 'proj-2',
      projectTitle: 'Rural Health & Eye Care Camps',
      paymentMethod: 'Credit Card (Visa)',
      status: 'Completed',
      date: '2026-07-22'
    }
  ],
  volunteers: [
    {
      id: 'vol-1',
      name: 'Rohan Gupta',
      email: 'rohan.g@example.com',
      phone: '+91 99887 76655',
      skills: ['Teaching', 'Social Media'],
      availability: 'Weekends',
      status: 'Approved',
      appliedDate: '2026-07-10'
    }
  ],
  wallOfHope: [
    { name: 'Anil Kumar', amount: 5000, badge: 'Patron Donor' },
    { name: 'Sunita Menon', amount: 10000, badge: 'Visionary Supporter' },
    { name: 'Dr. A. P. Mehta', amount: 25000, badge: 'Trust Benefactor' }
  ]
};

class Store {
  constructor() {
    this.listeners = [];
    this.data = this.loadData();
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load from localStorage, using initial seed data.', e);
    }
    this.saveData(INITIAL_SEED_DATA);
    return INITIAL_SEED_DATA;
  }

  saveData(newData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveData(this.data);
    this.listeners.forEach(fn => fn(this.data));
  }

  // --- GETTERS ---
  getProjects() { return this.data.projects || []; }
  getEvents() { return this.data.events || []; }
  getMedia() { return this.data.media || []; }
  getBlog() { return this.data.blog || []; }
  getDonations() { return this.data.donations || []; }
  getVolunteers() { return this.data.volunteers || []; }
  getWallOfHope() { return this.data.wallOfHope || []; }

  // --- DONATIONS ---
  addDonation(donation) {
    const newDonation = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      receiptNo: `YCC-80G-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      ...donation
    };

    this.data.donations.unshift(newDonation);

    // Update project raised amount
    if (donation.projectId) {
      const project = this.data.projects.find(p => p.id === donation.projectId);
      if (project) {
        project.raisedAmount += Number(donation.amount);
      }
    }

    // Add to Wall of Hope
    this.data.wallOfHope.unshift({
      name: donation.donorName || 'Anonymous Hero',
      amount: Number(donation.amount),
      badge: Number(donation.amount) >= 10000 ? 'Visionary Supporter' : 'Kind Supporter'
    });

    this.notify();
    return newDonation;
  }

  // --- CMS ACTIONS ---
  addProject(project) {
    const newProject = {
      id: `proj-${Date.now()}`,
      raisedAmount: 0,
      ...project
    };
    this.data.projects.unshift(newProject);
    this.notify();
    return newProject;
  }

  updateProject(id, updatedFields) {
    const proj = this.data.projects.find(p => p.id === id);
    if (proj) {
      Object.assign(proj, updatedFields);
      this.notify();
    }
  }

  deleteProject(id) {
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    this.notify();
  }

  addEvent(evt) {
    const newEvt = {
      id: `evt-${Date.now()}`,
      rsvps: 0,
      ...evt
    };
    this.data.events.unshift(newEvt);
    this.notify();
  }

  deleteEvent(id) {
    this.data.events = this.data.events.filter(e => e.id !== id);
    this.notify();
  }

  addMedia(item) {
    const newItem = { id: `m-${Date.now()}`, ...item };
    this.data.media.unshift(newItem);
    this.notify();
  }

  addVolunteer(vol) {
    const newVol = {
      id: `vol-${Date.now()}`,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      ...vol
    };
    this.data.volunteers.unshift(newVol);
    this.notify();
    return newVol;
  }

  updateVolunteerStatus(id, status) {
    const vol = this.data.volunteers.find(v => v.id === id);
    if (vol) {
      vol.status = status;
      this.notify();
    }
  }
}

export const store = new Store();
