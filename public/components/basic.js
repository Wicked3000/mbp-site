window.BasicComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-image: url('assets/basic/banner.png'); background-size: cover; background-position: center 25%;">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>Basic Education</h1>
                        <p>Foundations for the Future of Milne Bay</p>
                    </div>
                </div>

                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon gold"><i data-lucide="book-open"></i></div>
                            <h2>Elementary Education</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>Elementary education is the first stage of formal education. It consists of an Elementary Preparatory Grade, Elementary Grade 1 and Elementary Grade 2 in the language of the child’s community.</p>
                            <p>All children enter school at age 6, commence their education in a language that they speak, acquire basic literacy and numeracy skills, family and community values, including discipline, personal health care and respect for others.</p>
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--mbp-blue-dark);">Projected Elementary School Enrolments</h3>
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
                                            <td><strong>Prep</strong></td>
                                            <td>6,412</td>
                                            <td>7,448</td>
                                            <td>8,343</td>
                                            <td>8,984</td>
                                        </tr>
                                        <tr>
                                            <td><strong>E1</strong></td>
                                            <td>6,066</td>
                                            <td>7,103</td>
                                            <td>8,139</td>
                                            <td>8,765</td>
                                        </tr>
                                        <tr>
                                            <td><strong>E2</strong></td>
                                            <td>5,056</td>
                                            <td>6,757</td>
                                            <td>7,794</td>
                                            <td>8,551</td>
                                        </tr>
                                        <tr class="total-row">
                                            <td>Total</td>
                                            <td>17,534</td>
                                            <td>21,308</td>
                                            <td>24,276</td>
                                            <td>26,301</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon green"><i data-lucide="graduation-cap"></i></div>
                            <h2>Primary Education</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>Primary education begins at Grade 3, finishes in Grade 8, and caters for the 9 to 14 year age group. Lower primary education comprises Grade 3 to 5, and upper primary Grades 6 to 8.</p>
                            <p>All children complete 6 years of primary education equipped with life skills to survive in their environments. In Grades 3 to 5, education is community oriented and through bilingual education, whilst in Grades 6 to 8 skills development and nationally oriented social and personal development programs are pursued.</p>
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--mbp-blue-dark);">Projected Primary School Enrolments</h3>
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
                                            <td><strong>Grade 1</strong></td>
                                            <td>1,515</td>
                                            <td>759</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 2</strong></td>
                                            <td>1,679</td>
                                            <td>960</td>
                                            <td>242</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 3</strong></td>
                                            <td>6,035</td>
                                            <td>7,551</td>
                                            <td>7,906</td>
                                            <td>8,343</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 4</strong></td>
                                            <td>4,994</td>
                                            <td>7,062</td>
                                            <td>7,398</td>
                                            <td>7,735</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 5</strong></td>
                                            <td>5,329</td>
                                            <td>6,002</td>
                                            <td>6,922</td>
                                            <td>7,242</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 6</strong></td>
                                            <td>4,921</td>
                                            <td>5,174</td>
                                            <td>6,474</td>
                                            <td>6,778</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 7</strong></td>
                                            <td>3,965</td>
                                            <td>4,836</td>
                                            <td>6,054</td>
                                            <td>6,343</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Grade 8</strong></td>
                                            <td>3,491</td>
                                            <td>4,319</td>
                                            <td>5,146</td>
                                            <td>5,935</td>
                                        </tr>
                                        <tr class="total-row">
                                            <td>Total</td>
                                            <td>31,929</td>
                                            <td>36,664</td>
                                            <td>40,146</td>
                                            <td>42,375</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <section class="about-section" style="border-left-color: var(--mbp-gold);">
                        <div class="section-header">
                            <div class="section-icon blue"><i data-lucide="clipboard-list"></i></div>
                            <h2>Planning & Policy</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>To ensure that all children complete three years of education with desired outcomes, the long standing problem of attrition will have to be solved. A policy will be developed and considered by Provincial Education Board to allow for repetition during elementary schooling consistence with that of National Education Board. Compulsory elementary education aims to achieve an enrolment rate of 100 per cent within this phase of education.</p>
                            <p>A major planning exercise will need to be undertaken at all levels. The district authorities will have to prepare school learning improvement plans and implementation schedules whilst the schools themselves will complete individual school learning improvement plans. All these plans need to be endorsed by the Provincial Education Board.</p>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
