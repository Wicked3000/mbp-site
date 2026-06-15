window.FodeComponent = {
    async render() {
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
                                <div class="selection-list-item">
                                    <div class="selection-item-info">
                                        <i data-lucide="file-text"></i>
                                        <span class="selection-item-name">FODE Intake 2026</span>
                                    </div>
                                    <div class="selection-item-actions">
                                        <button class="btn-action view" data-action="view" data-school="FODE Intake 2026">
                                            <i data-lucide="eye"></i> View List
                                        </button>
                                        <button class="btn-action download" data-action="download" data-school="FODE Intake 2026">
                                            <i data-lucide="download"></i> Download
                                        </button>
                                    </div>
                                </div>
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
                                <div class="pdf-preview-header" style="text-align: center; margin-bottom: 2rem;">
                                    <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0; text-transform: uppercase;">Milne Bay Administration</h3>
                                    <p style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin: 2px 0 0 0; text-transform: uppercase;">Office of Chairman - PEB</p>
                                    <p style="font-size: 0.85rem; font-weight: 700; color: var(--mbp-blue-dark); margin: 0; text-transform: uppercase; border-bottom: 2px solid var(--text-primary); padding-bottom: 0.75rem;">Division of Education</p>
                                    <h4 id="preview-school-name" style="margin-top: 1rem; color: var(--text-primary); font-size: 1.4rem; font-weight: 800;">FODE INTAKE 2026</h4>
                                </div>
                                <table class="pdf-preview-table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Primary School</th>
                                            <th>Candidate Name</th>
                                            <th>Gender</th>
                                        </tr>
                                    </thead>
                                    <tbody id="preview-students-body">
                                        <!-- Dynamic student rows -->
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
        const previewStudentsBody = document.getElementById('preview-students-body');
        const closeBtn = document.getElementById('modal-close-btn');

        // Exact candidate data from the user-provided FODE selection list image
        const fodeStudents = [
            { no: 1, primary: "LELOHOA", name: "BOINE ENSAIL", gender: "F" },
            { no: 2, primary: "LELOHOA", name: "JOHN NATIONTY", gender: "F" },
            { no: 3, primary: "LELOHOA", name: "KAGUBUY VIVIAN BRIG...", gender: "F" },
            { no: 4, primary: "LELOHOA", name: "OBEN ROSEANNE", gender: "F" },
            { no: 5, primary: "LELOHOA", name: "RICHARD TOMALI PITHAL", gender: "F" },
            { no: 6, primary: "LELOHOA", name: "TOMMY GEORGE", gender: "M" },
            { no: 7, primary: "PABE", name: "BENJAMIN ISABELLINA", gender: "F" },
            { no: 8, primary: "PABE", name: "DIDIA LANE JACINTA", gender: "F" },
            { no: 9, primary: "PABE", name: "GINI ANDREW", gender: "M" },
            { no: 10, primary: "PABE", name: "HAROLD MELILYN", gender: "F" },
            { no: 11, primary: "PABE", name: "LEOD BRIAN", gender: "M" },
            { no: 12, primary: "PABE", name: "PETRA JENINE", gender: "F" },
            { no: 13, primary: "PABE", name: "PENIAMIN GARRY", gender: "M" },
            { no: 14, primary: "PABE", name: "STANLEY MELANIE", gender: "M" },
            { no: 15, primary: "PABE", name: "TUIAWALA DANIEL", gender: "M" },
            { no: 16, primary: "PABE", name: "TIONI TRACEYL", gender: "F" }
        ];

        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = button.getAttribute('data-action');
                
                if (action === 'view') {
                    // Populate candidate rows into preview table
                    previewStudentsBody.innerHTML = fodeStudents.map(s => `
                        <tr>
                            <td>${s.no}</td>
                            <td>${s.primary}</td>
                            <td><strong>${s.name}</strong></td>
                            <td>${s.gender}</td>
                        </tr>
                    `).join('');

                    modal.classList.add('active');
                } else if (action === 'download') {
                    // Generate formatted selection list text file for FODE
                    let fileContent = `MILNE BAY PROVINCE DIVISION OF EDUCATION\n`;
                    fileContent += `MILNE BAY ADMINISTRATION - OFFICE OF CHAIRMAN PEB\n`;
                    fileContent += `=================================================\n`;
                    fileContent += `OFFICIAL SELECTION LIST - FODE INTAKE 2026\n\n`;
                    fileContent += `No. | Primary School | Candidate Name | Gender\n`;
                    fileContent += `-----------------------------------------------\n`;
                    fodeStudents.forEach(s => {
                        fileContent += `${String(s.no).padEnd(3)} | ${s.primary.padEnd(14)} | ${s.name.padEnd(22)} | ${s.gender}\n`;
                    });
                    fileContent += `\nEnd of Selection List.\n`;

                    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `FODE_Intake_2026_Selection_List.txt`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }
            });
        });

        // Close modal handlers
        const closeModal = () => modal.classList.remove('active');
        if(closeBtn) closeBtn.addEventListener('click', closeModal);
        if(modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
};
