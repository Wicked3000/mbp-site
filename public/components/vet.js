window.VetComponent = {
    async render() {
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
                                <div class="selection-list-item">
                                    <div class="selection-item-info">
                                        <i data-lucide="file-text"></i>
                                        <span class="selection-item-name">Kwato VET Centre</span>
                                    </div>
                                    <div class="selection-item-actions">
                                        <button class="btn-action view" data-action="view" data-school="Kwato VET Centre">
                                            <i data-lucide="eye"></i> View List
                                        </button>
                                        <button class="btn-action download" data-action="download" data-school="Kwato VET Centre">
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
                                    <h4 id="preview-school-name" style="margin-top: 1rem; color: var(--text-primary); font-size: 1.4rem; font-weight: 800;">2024 KWATO VET</h4>
                                    <p id="preview-subtitle" style="font-size: 0.85rem; color: var(--text-secondary); font-style: italic; font-weight: 500; border-bottom: 1px dashed #ccc; padding-bottom: 1rem;">Endorsed: Mr. Roma Tuidam - Chairman (PEB) | Date: 1/12/23</p>
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

        // Exact candidate data from the user-provided 2024 Kwato TVET image
        const kwatoStudents = [
            { no: 1, primary: "GOILANAI", name: "BINAN RIAN", gender: "M" },
            { no: 2, primary: "ALOTAU", name: "EZEKIEL ABIAH", gender: "F" },
            { no: 3, primary: "ALOTAU", name: "MORRIS JOEL", gender: "M" },
            { no: 4, primary: "ALOTAU", name: "NELSON NELSON", gender: "M" },
            { no: 5, primary: "ALOTAU", name: "RUPI JUDEITH", gender: "F" },
            { no: 6, primary: "ALOTAU", name: "HARO LEWARDY", gender: "M" },
            { no: 7, primary: "KUIARO", name: "NAPORA ISAAC", gender: "M" },
            { no: 8, primary: "RABE", name: "NEWTON ROSELYN JENNY", gender: "F" },
            { no: 9, primary: "GWARUME", name: "JEMMY CYRIL", gender: "M" },
            { no: 10, primary: "GWARUME", name: "GEOREY GLENDA", gender: "F" },
            { no: 11, primary: "GWARUME", name: "BUNAG RODNEY", gender: "M" },
            { no: 12, primary: "GWARUME", name: "ANDERSON NUMASUBA", gender: "M" },
            { no: 13, primary: "GWARUME", name: "WALUA DAVIDS", gender: "M" },
            { no: 14, primary: "ULULOGA", name: "INARU DANNY", gender: "M" },
            { no: 15, primary: "ULULOGA", name: "JEMMY SHARLOT", gender: "F" },
            { no: 16, primary: "ULULOGA", name: "WALUA CHUROLL", gender: "M" },
            { no: 17, primary: "RABARABA", name: "TAURIS MICHAEL", gender: "M" },
            { no: 18, primary: "RABARABA", name: "NIKEL WILLIE", gender: "M" },
            { no: 19, primary: "RABARABA", name: "MOMEN MIRIAM", gender: "F" }
        ];

        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = button.getAttribute('data-action');
                
                if (action === 'view') {
                    // Populate candidate rows into preview table
                    previewStudentsBody.innerHTML = kwatoStudents.map(s => `
                        <tr>
                            <td>${s.no}</td>
                            <td>${s.primary}</td>
                            <td><strong>${s.name}</strong></td>
                            <td>${s.gender}</td>
                        </tr>
                    `).join('');

                    modal.classList.add('active');
                } else if (action === 'download') {
                    // Generate formatted selection list text file for Kwato VET
                    let fileContent = `MILNE BAY PROVINCE DIVISION OF EDUCATION\n`;
                    fileContent += `MILNE BAY ADMINISTRATION - OFFICE OF CHAIRMAN PEB\n`;
                    fileContent += `=================================================\n`;
                    fileContent += `OFFICIAL 2024 SELECTION LIST - KWATO VET\n`;
                    fileContent += `Endorsed: Mr. Roma Tuidam - Chairman (PEB) | Date: 01/12/2023\n\n`;
                    fileContent += `No. | Primary School | Candidate Name | Gender\n`;
                    fileContent += `-----------------------------------------------\n`;
                    kwatoStudents.forEach(s => {
                        fileContent += `${String(s.no).padEnd(3)} | ${s.primary.padEnd(14)} | ${s.name.padEnd(22)} | ${s.gender}\n`;
                    });
                    fileContent += `\nEnd of Selection List.\n`;

                    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `Kwato_VET_2024_Selection_List.txt`;
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
