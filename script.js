// Team Directory Application
// Team data embedded directly to avoid CORS issues when opening file://
const teamData = [
  {
    "id": 1,
    "name": "Sarah Johnson",
    "role": "Software Engineer",
    "department": "Engineering",
    "location": "San Francisco, CA",
    "email": "sarah.johnson@company.com",
    "avatar": "https://i.pravatar.cc/150?img=1",
    "bio": "Full-stack developer passionate about building scalable web applications."
  },
  {
    "id": 2,
    "name": "Michael Chen",
    "role": "Product Manager",
    "department": "Product",
    "location": "New York, NY",
    "email": "michael.chen@company.com",
    "avatar": "https://i.pravatar.cc/150?img=2",
    "bio": "Driving product strategy and working closely with engineering teams."
  },
  {
    "id": 3,
    "name": "Emily Rodriguez",
    "role": "UX Designer",
    "department": "Design",
    "location": "Austin, TX",
    "email": "emily.rodriguez@company.com",
    "avatar": "https://i.pravatar.cc/150?img=3",
    "bio": "Creating intuitive and beautiful user experiences."
  },
  {
    "id": 4,
    "name": "David Kim",
    "role": "Software Engineer",
    "department": "Engineering",
    "location": "Seattle, WA",
    "email": "david.kim@company.com",
    "avatar": "https://i.pravatar.cc/150?img=4",
    "bio": "Backend specialist focused on microservices architecture."
  },
  {
    "id": 5,
    "name": "Jessica Martinez",
    "role": "Marketing Manager",
    "department": "Marketing",
    "location": "Los Angeles, CA",
    "email": "jessica.martinez@company.com",
    "avatar": "https://i.pravatar.cc/150?img=5",
    "bio": "Leading digital marketing campaigns and brand strategy."
  },
  {
    "id": 6,
    "name": "Robert Taylor",
    "role": "DevOps Engineer",
    "department": "Engineering",
    "location": "Chicago, IL",
    "email": "robert.taylor@company.com",
    "avatar": "https://i.pravatar.cc/150?img=6",
    "bio": "Ensuring reliable infrastructure and smooth deployments."
  },
  {
    "id": 7,
    "name": "Amanda White",
    "role": "Product Designer",
    "department": "Design",
    "location": "Boston, MA",
    "email": "amanda.white@company.com",
    "avatar": "https://i.pravatar.cc/150?img=7",
    "bio": "Designing products that users love and find easy to use."
  },
  {
    "id": 8,
    "name": "James Wilson",
    "role": "Sales Director",
    "department": "Sales",
    "location": "Denver, CO",
    "email": "james.wilson@company.com",
    "avatar": "https://i.pravatar.cc/150?img=8",
    "bio": "Building relationships and driving revenue growth."
  },
  {
    "id": 9,
    "name": "Lisa Anderson",
    "role": "Frontend Developer",
    "department": "Engineering",
    "location": "Portland, OR",
    "email": "lisa.anderson@company.com",
    "avatar": "https://i.pravatar.cc/150?img=9",
    "bio": "Crafting responsive and accessible user interfaces."
  },
  {
    "id": 10,
    "name": "Christopher Brown",
    "role": "HR Manager",
    "department": "Human Resources",
    "location": "Miami, FL",
    "email": "christopher.brown@company.com",
    "avatar": "https://i.pravatar.cc/150?img=10",
    "bio": "Supporting team growth and fostering a positive workplace culture."
  },
  {
    "id": 11,
    "name": "Nicole Garcia",
    "role": "Data Analyst",
    "department": "Analytics",
    "location": "Phoenix, AZ",
    "email": "nicole.garcia@company.com",
    "avatar": "https://i.pravatar.cc/150?img=11",
    "bio": "Turning data into actionable insights for business decisions."
  },
  {
    "id": 12,
    "name": "Kevin Lee",
    "role": "QA Engineer",
    "department": "Engineering",
    "location": "San Diego, CA",
    "email": "kevin.lee@company.com",
    "avatar": "https://i.pravatar.cc/150?img=12",
    "bio": "Ensuring quality and reliability through comprehensive testing."
  }
];

let filteredData = [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const roleFilter = document.getElementById('roleFilter');
const teamContainer = document.getElementById('teamGrid');
const teamCount = document.getElementById('statusMessage');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Use embedded team data
        filteredData = [...teamData];

        // Populate role filter dropdown
        populateRoleFilter();

        // Render initial team list
        renderTeam(filteredData);

        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Remove loading state
        teamContainer.setAttribute('aria-busy', 'false');

        // Add event listeners
        searchInput.addEventListener('input', handleSearch);
        roleFilter.addEventListener('change', handleFilter);
    } catch (error) {
        console.error('Error initializing team directory:', error);
        teamContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
                <p style="margin: 0 0 0.5rem; font-size: 1rem; color: #ef4444;">Unable to initialize team directory.</p>
                <p style="margin: 0; font-size: 0.85rem;">${escapeHtml(error.message)}</p>
            </div>
        `;
    }
});

// Populate role filter dropdown with unique departments
function populateRoleFilter() {
    const departments = [...new Set(teamData.map(member => member.department))].sort();
    
    // Clear existing options except "All Roles"
    roleFilter.innerHTML = '<option value="">All Roles</option>';
    
    // Add department options
    departments.forEach(department => {
        const option = document.createElement('option');
        option.value = department;
        option.textContent = department;
        roleFilter.appendChild(option);
    });
}

// Handle search input
function handleSearch() {
    applyFilters();
}

// Handle role filter change
function handleFilter() {
    applyFilters();
}

// Apply both search and role filters
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedRole = roleFilter.value;

    filteredData = teamData.filter(member => {
        // Search filter: match name or role
        const matchesSearch = !searchTerm || 
            member.name.toLowerCase().includes(searchTerm) ||
            member.role.toLowerCase().includes(searchTerm) ||
            member.department.toLowerCase().includes(searchTerm);

        // Role filter: match selected department
        const matchesRole = !selectedRole || member.department === selectedRole;

        return matchesSearch && matchesRole;
    });

    renderTeam(filteredData);
}

// Render team members
function renderTeam(members) {
    // Update count
    teamCount.textContent = `${members.length} team member${members.length !== 1 ? 's' : ''} found`;

    // Clear container
    teamContainer.innerHTML = '';

    if (members.length === 0) {
        teamContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
                <p style="margin: 0 0 0.5rem; font-size: 1rem;">No team members found matching your criteria.</p>
                <p style="margin: 0; font-size: 0.9rem;">Try adjusting your search or filter.</p>
            </div>
        `;
        return;
    }

    // Create and append team member cards
    members.forEach(member => {
        const card = createTeamCard(member);
        teamContainer.appendChild(card);
    });
}

// Create a team member card element
function createTeamCard(member) {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.setAttribute('data-id', member.id);

    card.innerHTML = `
        <img src="${member.avatar}" alt="${member.name}" class="avatar" onerror="this.src='https://via.placeholder.com/150?text=${encodeURIComponent(member.name.charAt(0))}'">
        <div class="card-main">
            <div class="card-header">
                <h3 class="member-name">${escapeHtml(member.name)}</h3>
                <span class="pill">${escapeHtml(member.department)}</span>
            </div>
            <p class="member-role">${escapeHtml(member.role)}</p>
            <div class="card-meta">
                <span class="meta-item">
                    <span class="meta-dot"></span>
                    ${escapeHtml(member.location)}
                </span>
            </div>
            ${member.bio ? `<p class="member-bio">${escapeHtml(member.bio)}</p>` : ''}
            <div class="card-footer">
                <a href="mailto:${escapeHtml(member.email)}" class="email-link" aria-label="Email ${escapeHtml(member.name)}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Email
                </a>
            </div>
        </div>
    `;

    return card;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

