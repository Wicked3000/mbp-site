window.FodeComponent = {
    async render() {
        // FODE intake lists managed from the admin back-end
        const fodeIntakes = [
            "FODE Intake 2026"
        ];

        const renderSchoolList = (intakes) => {
            return intakes.map(school => `
                <div class="selection-list-item">
                    <div class="selection-item-info">
                        <i data-lucide="file-text"></i>
                        <span class="selection-item-name">${school}</span>
                    </div>
                    <div class="selection-item-actions">
                        <button class="btn-action view" data-action="view" data-school="${school}">
                            <i data-lucide="eye"></i> View List
                        </button>
                        <button class="btn-action download" data-action="download" data-school="${school}">
                            <i data-lucide="download"></i> Download
                        </button>
                    </div>
                </div>
                <div class="selection-list-body" data-school="${school}" hidden><div class="selection-list-empty">Loading selection list...</div></div>
            `).join('');
        };

        return `
            <div class="about-page">
                <div class="about-banner" style="background-image: url('assets/fode/banner.png'); background-size: cover; background-position: center 25%;">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>Flexible Open & Distance Education</h1>
                        <p>Alternative Pathways to Academic Success in Milne Bay</p>
                    </div>
                </div>

                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon gold"><i data-lucide="laptop"></i></div>
                            <h2>Flexible Open & Distance Education (FODE)</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>Flexible Open and Distance Education (FODE) covers Grade 9 to 12. Lower secondary covers Grades 9 and 10 whilst Upper Secondary covers Grades 11 and 12. A FODE education is provided in a variety of study centres to students in Grades 9 to 12. This will equip them with life skills, enabling them to return to their communities or pursue further education and training. Students who demonstrate the ability to pursue further education receive a high quality distance education providing them with the depth of knowledge to satisfy personal community demand.</p>
                            
                            <h3 style="margin-top: 2.5rem; margin-bottom: 1rem; color: var(--mbp-blue-dark); font-size: 1.5rem;">Projected FODE Enrolments</h3>
                            
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
                            <div class="section-icon gold"><i data-lucide="clipboard-list"></i></div>
                            <h2>Plan & Strategy</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>In line with Government priorities in education, there will not be a significant increase in access to FODE education during the plan period. The expansion of existing FODE centres rather than the establishment of new centres will be the principal strategy for improving access to distance education. The transition rate between Grades 8 and Grade 9 will drop over the plan period to 50 per cent whilst the transition rates of 25 per cent from lower to upper secondary will be maintained.</p>
                            <p>These targets will require a marginal increase in the number of Grade 11 places each year and considerable increase in grade 9 classes. The number of centres expanding to take Grades 11 and 12 classes will slow down. Selection to Grade 11 will be carried out by the Department of Education on the basis of the number of places available. FODE study centres offering grade 11 and 12 classes will be properly planned and have all necessary buildings, equipment and teaching materials in place before teachers are allocated and Grade 11 classes enrolled.</p>
                        </div>
                    </section>

                    <!-- 2024 FODE Selection List Section -->
                    <section class="about-section" style="border-left-color: var(--mbp-green);">
                        <div class="section-header">
                            <div class="section-icon green"><i data-lucide="file-spreadsheet"></i></div>
                            <h2>2024 FODE Selection List</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>Official Milne Bay Administration (Division of Education) FODE Intake list for 2026. You can view or download the selection list below.</p>
                            <div class="selection-list-container">
                                ${renderSchoolList(fodeIntakes)}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
    },

    afterRender() {
        // Fetch FODE student data from the API
        const fetchFodeStudents = async (school) => {
            try {
                const response = await fetch(`/api/fode-students?school=${encodeURIComponent(school)}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching FODE students:", error);
                return [];
            }
        };

        const escapeHtml = (str) => String(str ?? '').replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));

        const renderInlineLists = async () => {
            const bodies = document.querySelectorAll('.selection-list-body');
            for (const el of bodies) {
                const school = el.getAttribute('data-school');
                const students = await fetchFodeStudents(school);
                el.setAttribute('data-loaded', 'true');
                if (students.length === 0) {
                    el.innerHTML = `<p class="selection-list-empty">No students found for this selection list yet.</p>`;
                } else {
                    el.innerHTML = `
                        <div class="table-container">
                            <table class="data-table selection-inline-table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Primary School</th>
                                        <th>Candidate Name</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${students.map((s, idx) => `
                                        <tr>
                                            <td>${idx + 1}</td>
                                            <td>${escapeHtml(s.primary_school || s.prev || '')}</td>
                                            <td><strong>${escapeHtml(s.candidate_name || s.name || '')}</strong></td>
                                            <td style="font-weight: 600;">${escapeHtml(s.gender || 'M')}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>`;
                }
            }
        };

        renderInlineLists();

        // Event listener for action buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', async (e) => {
                const action = button.getAttribute('data-action');
                const school = button.getAttribute('data-school');

                const students = await fetchFodeStudents(school);

                if (action === 'view') {
                    // Toggle the inline selection list table (single-open accordion)
                    let target = null;
                    let wasHidden = true;
                    document.querySelectorAll('.selection-list-body').forEach(el => {
                        if (el.getAttribute('data-school') === school) {
                            wasHidden = el.hidden;
                            target = el;
                        } else {
                            el.hidden = true;
                        }
                    });
                    if (target) {
                        target.hidden = !wasHidden;
                        if (!target.hidden) {
                            setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
                        }
                    }
                } else if (action === 'download') {
                    // Trigger download of selection list as text file
                    let fileContent = `MILNE BAY PROVINCE DIVISION OF EDUCATION\n`;
                    fileContent += `MILNE BAY ADMINISTRATION - OFFICE OF CHAIRMAN PEB\n`;
                    fileContent += `===============================================\n`;
                    fileContent += `OFFICIAL SELECTION LIST - ${school.toUpperCase()}\n`;
                    fileContent += `===============================================\n\n`;
                    fileContent += `Intake: ${school}\n\n`;
                    fileContent += `No. | Primary School   | Candidate Name          | Gender\n`;
                    fileContent += `----------------------------------------------------------\n`;

                    if (students.length === 0) {
                        fileContent += `No students found.\n`;
                    } else {
                        students.forEach((s, idx) => {
                            const prev = (s.primary_school || s.prev || '').padEnd(16);
                            const name = (s.candidate_name || s.name || '').padEnd(24);
                            fileContent += `${String(idx + 1).padEnd(3)} | ${prev} | ${name} | ${s.gender || 'M'}\n`;
                        });
                    }

                    fileContent += `\nGenerated: ${new Date().toLocaleDateString()}\n`;
                    fileContent += `End of List.\n`;

                    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${school.replace(/\s+/g, '_')}_Selection_List.txt`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }
            });
        });
    }
};