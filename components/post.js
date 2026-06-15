window.PostComponent = {
    async render() {
        // List of Grade 9 and Grade 11 schools from the provided selection list image
        const grade9Schools = [
            "Cameron Secondary School",
            "Cape Vogel High School",
            "Duau High School",
            "Holy Name Secondary School",
            "Hagita Secondary School",
            "Kiriwina High School",
            "Kuiaro High School",
            "Misima High School",
            "Santa Maria Secondary School",
            "Suau High School",
            "Wesley Secondary School",
            "Woodlark Junior School",
            "Yeleyamba Junior High School"
        ];

        const grade11Schools = [
            "Cameron Secondary School",
            "Duau High School",
            "Holy Name Secondary School",
            "Hagita Secondary School",
            "Kiriwina High School",
            "Misima High School",
            "Santa Maria Secondary School",
            "Wesley Secondary School"
        ];

        const renderSchoolList = (schools, grade) => {
            return schools.map(school => `
                <div class="selection-list-item">
                    <div class="selection-item-info">
                        <i data-lucide="file-text"></i>
                        <span class="selection-item-name">${school}</span>
                    </div>
                    <div class="selection-item-actions">
                        <button class="btn-action view" data-action="view" data-school="${school}" data-grade="${grade}">
                            <i data-lucide="eye"></i> View List
                        </button>
                        <button class="btn-action download" data-action="download" data-school="${school}" data-grade="${grade}">
                            <i data-lucide="download"></i> Download
                        </button>
                    </div>
                </div>
            `).join('');
        };

        return `
            <div class="about-page">
                <div class="about-banner" style="background-image: url('assets/post/banner.png'); background-size: cover; background-position: center 25%;">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>Post Primary Education</h1>
                        <p>Secondary & High School Pathways in Milne Bay Province</p>
                    </div>
                </div>

                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon blue"><i data-lucide="graduation-cap"></i></div>
                            <h2>Secondary Education</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>Secondary education covers Grade 9 to 12. Lower secondary covers Grades 9 and 10 whilst Upper Secondary covers Grades 11 and 12. A secondary education is provided in a variety of institutions to students in Grades 9 to 12. This will equip them with life skills, enabling them to return to their communities or pursue further education and training. Students who demonstrate the ability to pursue further education receive a high quality secondary education providing them with the depth of knowledge to satisfy personal community demand.</p>
                            
                            <h3 style="margin-top: 2.5rem; margin-bottom: 1rem; color: var(--mbp-blue-dark); font-size: 1.5rem;">Projected Secondary School Enrolments</h3>
                            
                            <div class="table-container">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Grade</th>
                                            <th>2007</th>
                                            <th>2010</th>
                                            <th>2013</th>
                                            <th>2016</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Grade 9</strong></td>
                                            <td>1,668</td>
                                            <td>2,021</td>
                                            <td>2,435</td>
                                            <td>2,922</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 10</strong></td>
                                            <td>1,585</td>
                                            <td>1,789</td>
                                            <td>2,182</td>
                                            <td>2,732</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 11</strong></td>
                                            <td>406</td>
                                            <td>415</td>
                                            <td>513</td>
                                            <td>611</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 12</strong></td>
                                            <td>404</td>
                                            <td>406</td>
                                            <td>480</td>
                                            <td>578</td>
                                        </tr>
                                        <tr class="total-row">
                                            <td>Total</td>
                                            <td>4,063</td>
                                            <td>4,632</td>
                                            <td>5,611</td>
                                            <td>6,843</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <section class="about-section" style="border-left-color: var(--mbp-gold);">
                        <div class="section-header">
                            <div class="section-icon gold"><i data-lucide="info"></i></div>
                            <h2>Plan & Strategy</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>In line with Government priorities in education, there will not be a significant increase in access to secondary education during the plan period. The expansion of existing schools rather than the establishment of new schools will be the principal strategy for improving access to secondary education. The transition rate between Grades 8 and Grade 9 will drop over the plan period to 50 per cent whilst the transition rates of 25 per cent from lower to upper secondary will be maintained.</p>
                            <p>These targets will require a marginal increase in the number of Grade 11 places each year and considerable increase in grade 9 classes. The number of schools expanding to take Grades 11 and 12 classes will slow down. Selection to Grade 11 will be carried out by the Department of Education on the basis of the number of places available.</p>
                            <p>Secondary schools offering grade 11 and 12 classes will be properly planned and have all necessary buildings, equipment and teaching materials in place before teachers are allocated and Grade 11 classes enrolled.</p>
                        </div>
                    </section>

                    <!-- Grade 9 Selection List Section -->
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon green"><i data-lucide="clipboard-list"></i></div>
                            <h2>2026 Grade 9 Selection List</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>Below is the official 2026 selection list for student entries into Grade 9 high school cohorts across Milne Bay Province. You can view or download the selection lists for each individual school below.</p>
                            <div class="selection-list-container">
                                ${renderSchoolList(grade9Schools, 9)}
                            </div>
                        </div>
                    </section>

                    <!-- Grade 11 Selection List Section -->
                    <section class="about-section" style="border-left-color: var(--mbp-red);">
                        <div class="section-header">
                            <div class="section-icon red"><i data-lucide="award"></i></div>
                            <h2>2026 Grade 11 Selection List</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>Official 2026 selection list for student transitions into Grade 11 upper secondary levels within the province. View or download the corresponding school lists below.</p>
                            <div class="selection-list-container">
                                ${renderSchoolList(grade11Schools, 11)}
                            </div>
                        </div>
                    </section>
                </div>

                <!-- PDF Preview Modal -->
                <div class="pdf-modal" id="pdf-view-modal">
                    <div class="pdf-modal-content">
                        <div class="pdf-modal-header">
                            <h3 id="modal-title">Selection List Preview</h3>
                            <button class="pdf-modal-close" id="modal-close-btn">&times;</button>
                        </div>
                        <div class="pdf-modal-body">
                            <div class="pdf-preview-doc">
                                <div class="pdf-watermark">PREVIEW</div>
                                <div class="pdf-preview-header">
                                    <h4 id="preview-school-name">School Name</h4>
                                    <p id="preview-subtitle">2026 Grade 9 Selection List - Milne Bay Province</p>
                                </div>
                                <table class="pdf-preview-table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Candidate Name</th>
                                            <th>Previous School</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="preview-students-body">
                                        <!-- Dynamic list of mock students -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const modal = document.getElementById('pdf-view-modal');
        const modalTitle = document.getElementById('modal-title');
        const previewSchoolName = document.getElementById('preview-school-name');
        const previewSubtitle = document.getElementById('preview-subtitle');
        const previewStudentsBody = document.getElementById('preview-students-body');
        const closeBtn = document.getElementById('modal-close-btn');

        // Mock student data generation
        const localFirstNames = ["Julian", "Belinda", "David", "Sarah", "Michael", "Grace", "John", "Alice", "Thomas", "Paul", "Mary", "Peter", "Esther", "Stephen", "Ruth"];
        const localLastNames = ["Kepas", "Thomas", "Tau", "Noah", "Abel", "Oliver", "Wesley", "Kula", "Namuri", "Lona", "Bani", "Didymus", "Moses", "Keke", "Kila"];
        const primarySchools = ["Alotau Primary", "Gurney Primary", "Logea Primary", "Kwagila Primary", "Cameron Primary", "KB Primary", "Duau Primary", "Kiriwina Primary", "Misima Primary", "Santa Maria Primary"];

        const generateMockStudents = (schoolName, grade) => {
            const count = Math.floor(Math.random() * 5) + 6; // Generate 6-10 students
            const students = [];
            for (let i = 0; i < count; i++) {
                const fName = localFirstNames[Math.floor(Math.random() * localFirstNames.length)];
                const lName = localLastNames[Math.floor(Math.random() * localLastNames.length)];
                const pSchool = primarySchools[Math.floor(Math.random() * primarySchools.length)];
                students.push({
                    name: `${fName} ${lName}`,
                    prev: grade === "11" ? `${schoolName} (Lower Sec)` : pSchool,
                    status: "Selected"
                });
            }
            return students;
        };

        // Event listener for action buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = button.getAttribute('data-action');
                const school = button.getAttribute('data-school');
                const grade = button.getAttribute('data-grade');

                if (action === 'view') {
                    // Show modal preview
                    modalTitle.textContent = `2026 Grade ${grade} Selection List`;
                    previewSchoolName.textContent = school;
                    previewSubtitle.textContent = `Official Selection List for 2026 Intake (Grade ${grade}) - Milne Bay Province`;
                    
                    const students = generateMockStudents(school, grade);
                    previewStudentsBody.innerHTML = students.map((s, idx) => `
                        <tr>
                            <td>${idx + 1}</td>
                            <td><strong>${s.name}</strong></td>
                            <td>${s.prev}</td>
                            <td style="color: var(--mbp-green); font-weight: 600;"><span style="display:inline-block; width:8px; height:8px; background:var(--mbp-green); border-radius:50%; margin-right:6px;"></span>${s.status}</td>
                        </tr>
                    `).join('');

                    modal.classList.add('active');
                } else if (action === 'download') {
                    // Trigger download of selection list as text file
                    const students = generateMockStudents(school, grade);
                    let fileContent = `MILNE BAY PROVINCE DIVISION OF EDUCATION\n`;
                    fileContent += `OFFICIAL 2026 SELECTION LIST - GRADE ${grade}\n`;
                    fileContent += `===============================================\n\n`;
                    fileContent += `Institution: ${school}\n\n`;
                    fileContent += `No. | Candidate Name | Previous School | Selection Status\n`;
                    fileContent += `---------------------------------------------------------\n`;
                    students.forEach((s, idx) => {
                        fileContent += `${String(idx + 1).padEnd(3)} | ${s.name.padEnd(20)} | ${s.prev.padEnd(20)} | ${s.status}\n`;
                    });
                    fileContent += `\nGenerated: ${new Date().toLocaleDateString()}\n`;
                    fileContent += `End of List.\n`;

                    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${school.replace(/\s+/g, '_')}_2026_Grade_${grade}_Selection_List.txt`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }
            });
        });

        // Close modal handlers
        const closeModal = () => modal.classList.remove('active');
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
};
