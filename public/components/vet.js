window.VetComponent = {
    async render() {
        // VET centres managed from the admin back-end
        const vetCentres = [
            "Kwato VET Centre"
        ];

        const renderSchoolList = (schools) => {
            return schools.map(school => `
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
                <div class="about-banner" style="background-image: url('assets/vet/banner.png'); background-size: cover; background-position: center 25%;">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>Vocational Education</h1>
                        <p>Skills Oriented Pathways in Milne Bay Province</p>
                    </div>
                </div>

                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon red"><i data-lucide="wrench"></i></div>
                            <h2>Technical Vocational Education</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>Vocational Education is a skills oriented education offered primarily to students completing Grade 8 and the community at large in a variety of institutions. A variety of institutions offering courses of varying lengths primarily catering for the needs of the immediate community. This is to be achieved through the devolution of management and upgrading of existing institutions with linkages to other sub sectors. The principle recipients are students who leave the formal education system at the first terminal point.</p>
                            
                            <h3 style="margin-top: 2.5rem; margin-bottom: 1rem; color: var(--mbp-blue-dark); font-size: 1.5rem;">Projected Vocational School Enrolments</h3>
                            
                            <div class="table-container">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>2007</th>
                                            <th>2010</th>
                                            <th>2013</th>
                                            <th>2016</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Year 1</strong></td>
                                            <td>802</td>
                                            <td>1,134</td>
                                            <td>1,313</td>
                                            <td>1,655</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Year 2</strong></td>
                                            <td>375</td>
                                            <td>227</td>
                                            <td>263</td>
                                            <td>0</td>
                                        </tr>
                                        <tr class="total-row">
                                            <td>Total</td>
                                            <td>1,176</td>
                                            <td>1,361</td>
                                            <td>1,576</td>
                                            <td>1,655</td>
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
                            <p>An appropriate number of well resourced vocational centres provided in public and private sectors. Vocational courses will be conducted in many different types of institution. These will range from Technical High Schools, large institutions offering a mix of academic and trade courses, to small centres that provide short courses, up to four weeks in duration, targeted at the wider population.</p>
                            <p>There have been problems in many centres with the availability of suitable tools and equipment for the centres and that these are adequately cared for and managed. Innovative schemes for ensuring that such materials are available need to be considered. Equally, the province is responsible for providing the infrastructure suitable for the types of programs to be run by each centre. The scope of works required will be determined as a part of the Provincial VET Plan.</p>
                        </div>
                    </section>

                    <!-- 2024 VET Selection List Section -->
                    <section class="about-section" style="border-left-color: var(--mbp-blue);">
                        <div class="section-header">
                            <div class="section-icon blue"><i data-lucide="award"></i></div>
                            <h2>2024 VET Selection List</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>The official selection list for vocational training centres in Milne Bay Province. You can view or download the selection lists for individual centres below.</p>
                            <div class="selection-list-container">
                                ${renderSchoolList(vetCentres)}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
    },

    afterRender() {
        // Fetch VET student data from the API
        const fetchVetStudents = async (school) => {
            try {
                const response = await fetch(`/api/vet-students?school=${encodeURIComponent(school)}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching VET students:", error);
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
                const students = await fetchVetStudents(school);
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

                const students = await fetchVetStudents(school);

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
                    fileContent += `OFFICIAL 2024 VET SELECTION LIST\n`;
                    fileContent += `===============================================\n\n`;
                    fileContent += `Centre: ${school}\n\n`;
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
                    link.download = `${school.replace(/\s+/g, '_')}_2024_Selection_List.txt`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }
            });
        });
    }
};