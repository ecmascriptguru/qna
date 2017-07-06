/**
 * Questions and Answers Rendering Tool
 * Created By Alexis Richard
 * ecmascript.guru@gmail.com
 * Created At June 8, 2017
 */
let QuestionGenerator = (() => {
    let _data = [],
        _something = null,
        _subjectsStack = [],
        _apiBaseUrl = null,
        _selected_wizard = null,
        _subjects = [],
        _calculations = [],
        _analyses = [],
        $_container = null,
        $_wizardsTable = null;

    /**
     * Configuration
     */
    let settings = {
        wizards: {
            "panel": {
                id: "wizards-panel",
                class: "panel panel-default",
                title: "Wizards List",
                newButtonID: "new-wizard-button",
                newButtonText: "New Wizard",
                viewReusltsButton: {
                    id: "wizards-view-results-button"
                }
            },
            "table": {
                id: "wizards-table",
                class: "table table-striped table-bordered"
            }
        },
        newWizard: {
            panel: {
                id: "new-wizard-panel",
                class: "panel panel-default",
                title: "Create a new Wizard"
            },
            backButton: {
                id: "new-wizard-back-button",
                class: "btn btn-default form-control",
                title: "Back to List"
            },
            createButton: {
                id: "new-wizard-create-button",
                class: "btn btn-primary form-control",
                title: "Save Changes"
            },
            nameInput: {
                id: "new-wizard-name-input",
                class: "form-control",
                title: "Wizard Name"
            },
            initiativeSubject: {
                container_id: "wizard-starting-subject-container",
                id: "wizard-starting-subject",
                class: "form-control",
                title: "Initiative Subject"
            }
        },
        subjects: {
            "panel": {
                id: "subjects-panel",
                class: "panel panel-default",
                title: "Manage Wizard",
                newSubjectButton: {
                    id: "new-subject-button",
                    title: "New Subject",
                    class: "btn btn-default pull-right new-subject"
                },
                newCalculationButton: {
                    id: "new-calculation-button",
                    title: "New Calculation",
                    class: "btn btn-default pull-right new-calculation"
                },
                newAnalysisButton: {
                    id: "new-analysis-button",
                    title: "New Analysis",
                    class: "btn btn-default pull-right new-analysis"
                }
            },
            "subjectsTable": {
                id: "subjects-table",
                class: "table table-striped table-bordered"
            },
            "calculationTable": {
                id: "calculation-table",
                class: "table table-striped table-bordered"
            },
            "analysesTable": {
                id: "analyses-table",
                class: "table table-striped table-bordered"
            },
            "resultsTable": {
                id: "results-table",
                class: "table table-striped table-bordered",
                template: {
                    id: "results-table-template"
                }
            }
        },
        newSubject: {
            panel: {
                id: "new-subject-panel",
                class: "panel panel-default",
                title: "Create a new Subject"
            },
            backButton: {
                id: "new-subject-back-button",
                class: "btn btn-default form-control",
                title: "Back to List"
            },
            createButton: {
                id: "new-subject-create-button",
                class: "btn btn-primary form-control",
                title: "Save Changes"
            },
            questionInput: {
                id: "new-subject-question-input",
                class: "form-control",
                title: "Enter a question."
            },
            typeSelect: {
                id: "new-subject-type-select",
                class: "form-control",
                values: {
                    "1": "Text Field",
                    "2": "Number Field",
                    "3": "Drop Down Choice",
                    "4": "Multiple Choice",
                    "5": "Yes / No"
                }
            },
            answersContainer: {
                id: "new-subject-answers-container",
                class: "",
                title: ""
            },
            dataInfoContainer: {
                id: "new-subject-data-info-container"
            }
        },
        newCalculation: {
            panel: {
                id: "new-calculation-panel",
                class: "panel panel-default",
                title: "Create a new Calculation"
            },
            backButton: {
                id: "new-calculation-back-button",
                class: "btn btn-default form-control",
                title: "Back to List"
            },
            createButton: {
                id: "new-calculation-create-button",
                class: "btn btn-primary form-control",
                title: "Save Changes"
            },
            nameInput: {
                id: "new-calculation-name-input",
                class: "form-control",
                title: "Enter calculation name."
            },
            operatorSelect: {
                id: "new-calculation-operator-select",
                class: "form-control"
            },
            factorsContainer: {
                id: "new-calculation-factors-container",
                class: "",
                title: ""
            },
            dataInfoContainer: {
                id: "new-calculation-data-info-container"
            }
        },
        newAnalysis: {
            panel: {
                id: "new-analysis-panel",
                class: "panel panel-default",
                title: "Create a new analysis"
            },
            backButton: {
                id: "new-analysis-back-button",
                class: "btn btn-default form-control",
                title: "Back to List"
            },
            createButton: {
                id: "new-analysis-create-button",
                class: "btn btn-primary form-control",
                title: "Save Changes"
            },
            nameInput: {
                id: "new-analysis-name-input",
                class: "form-control",
                title: "Enter analysis name."
            },
            subjectSelect: {
                id: "new-analysis-subject-select-for-comparison",
                class: "form-control"
            },
            calculationSelect: {
                id: "new-analysis-calculation-select-for-comparison"
            },
            operatorSelectForCalculation: {
                id: "new-analysis-operator-select-for-calculations",
                options: [
                    {
                        caption: "=",
                        value:  "=="
                    }, {
                        caption:">",
                        value: ">"
                    }, {
                        caption: "<",
                        value: "<"
                    }
                ]
            },
            operatorSelectForSubject: {
                id: "new-analysis-operator-select-for-subjects"
            },
            calculationComparisonValueInput: {
                id: "new-analysis-calculation-comparison-value"
            },
            subjectComparisonValueInput: {
                id: "new-analysis-subject-comparison-value"
            },
            calculationComparisonAddButton: {
                id: "new-analysis-calculation-comparison-add-button"
            },
            subjectComparisonAddButton: {
                id: "new-analysis-subject-comparison-add-button",
                class: "btn btn-default"
            },
            dataInfoContainer: {
                id: "new-analysis-data-info-container"
            },
            conditionsContainer: {
                id: "new-analysis-conditions-container",
                class: "form-group"
            },
            hiddenConditionInput: {
                id: "new-analysis-condition-value"
            },
            resultInput: {
                id: "new-analysis-result-value"
            },
            comparisonTypeSelect: {
                id: "new-analysis-comparison-type-select"
            },
            comparisonValueSelect: {
                id: "new-analysis-comparison-value-select",
                template: {
                    id: "new-analysis-comparison-value-select-template"
                }
            },
            comparisonVisibleTypeSelect: {
                id: "new-analysis-comparison-visible-type-select",
                template: {
                    id: "new-analysis-comparison-visible-type-select-template"
                }
            },
            analysisTagAddButton: {
                id: "new-analysis-analysis-tag-add-button"
            }
        }
    }

    /**
     * Go to a given Step
     * @param {string} step
     * @return {void}
     */
    const goTo = (step) => {
        if (!step) {
            step = settings.wizards.panel.id;
        }
        $(".panel.active").removeClass("active");
        $(`#${step}`).addClass("active")

        //  Redrawing tables
        if (step == settings.wizards.panel.id) {
            updateWizardsTable();
        }
    }

    /**
     * Render new ziard form.
     * Here wizard parameter can be empty. So this can be empty when you need to create a new Wizard
     * @param {object} wizard
     * @return {void}
     */
    const renderNewWizardForm = (wizard) => {
        let panel = $(`#${settings.newWizard.panel.id}`).eq(0);
            backToWizardsButton = $(`#${settings.newWizard.panel.id} button#${settings.newWizard.backButton.id}`).eq(0);
            createWizardButton = $(`#${settings.newWizard.panel.id} button#${settings.newWizard.createButton.id}`).eq(0);
            wizardNameInput = $(`#${settings.newWizard.panel.id} input#${settings.newWizard.nameInput.id}`).eq(0),
            startingSubjectSelect = $(`#${settings.newWizard.initiativeSubject.container_id}`).eq(0);

        let source = $("#wizard-starting-question-template").html();
        let template = Handlebars.compile(source);

        backToWizardsButton.click(() => {
            goTo();
        });

        if (!wizard) {
            wizardNameInput.val("");
            createWizardButton.attr({"data-action": "create"});

            DataStorage.Subjects.get(_selected_wizard, (subjects) => {
                startingSubjectSelect.html(
                    $(template({
                        subjects: subjects
                    }))
                );

                goTo(settings.newWizard.panel.id);
            });
        } else {
            wizardNameInput.val(wizard.name);
            createWizardButton.attr({"data-action": "update", "data-id": wizard.id});
            
            DataStorage.Subjects.get(_selected_wizard, (subjects) => {
                for (let i = 0; i < subjects.length; i ++) {
                    subjects[i].selected = (subjects[i].id == wizard.starts_with);
                }

                startingSubjectSelect.html(
                    $(template({
                        subjects: subjects
                    }))
                );

                goTo(settings.newWizard.panel.id);
            });
        }
        
    }

    /**
     * Render subjects(Questions and Answers) panel. This panel will be shown once a new wizard created.
     * Currently wizard name was not used, but this will be value of because user might need to know where he/she is in.
     * @param {string} wizardName
     * @return {void}
     */
    const renderSubjectsPanel = (wizardName) => {
        //  Initializing container panel.
        let containerPanel = $(`#${settings.subjects.panel.id}`),
            newButton = $(`#${settings.subjects.panel.newSubjectButton.id}`),
            backToWizardsButton = $(`#subjects-panel-back-to-wizards`);

        updateSubjectsTable();
        updateCalculationTable();
        updateAnalysesTable();
        updateResultsTable();
        goTo(settings.subjects.panel.id);
    }

    /**
     * Render New Subject Panel. Subject parameter can be null/empty when you create a new Subject.
     * @param {object} subject
     * @return {void}
     */
    const renderNewSubjectForm = (subject) => {
        let panel = $(`#${settings.newSubject.panel.id}`),
            backToSubjectsButton = $(`#${settings.newSubject.backButton.id}`),
            createSubjectButton = $(`#${settings.newSubject.createButton.id}`),
            questionInput = $(`#${settings.newSubject.questionInput.id}`),
            typeSelect = $(`#${settings.newSubject.typeSelect.id}`),
            answersContainer = $(`#${settings.newSubject.answersContainer.id}`),
            dataInfoContainer = $(`#new-subject-data-info-container`);

        DataStorage.Types.get((types) => {
            let source = $("#new-subject-type-template").html(),
                template = Handlebars.compile(source);

            typeSelect.html(template({
                types: types
            }));

            if (subject) {
                typeSelect.val(subject.type_id);
            } else {
                typeSelect.val(1).change();
            }
        });

        if (subject) {
            createSubjectButton.attr({
                "data-id": subject.id,
                "data-action": "update"
            });
            questionInput.val(subject.question);
            
            renderExistingAnswerOptions(subject, answersContainer, dataInfoContainer);
        } else {
            createSubjectButton.attr({
                "data-id": null,
                "data-action": "create"
            });
            questionInput.val("");
        }

        goTo(settings.newSubject.panel.id);
    }

    /**
     * Render New Calculation Panel. Calculation parameter can be null/empty when you create a new Calculation.
     * @param {object} calculation
     * @return {void}
     */
    const renderNewCalculationForm = (calculation) => {
        let panel = $(`#${settings.newCalculation.panel.id}`),
            createCalculationButton = $(`#${settings.newCalculation.createButton.id}`),
            nameInput = $(`#${settings.newCalculation.nameInput.id}`),
            operatorSelect = $(`#${settings.newCalculation.operatorSelect.id}`),
            factorsContainer = $(`#${settings.newCalculation.factorsContainer.id}`),
            dataInfoContainer = $(`#new-calculation-data-info-container`);

        DataStorage.Subjects.get(_selected_wizard, (subjects) => {
            if (calculation) {
                createCalculationButton.attr({
                    "data-id": calculation.id,
                    "data-action": "update"
                });
                nameInput.val(calculation.name);
                operatorSelect.val(calculation.operator);
                renderExistingFactorOptions(calculation, factorsContainer, dataInfoContainer);
            } else {
                createCalculationButton.attr({
                    "data-id": null,
                    "data-action": "create"
                });
                nameInput.val("");
                operatorSelect.val(1).change();
                factorsContainer.children().remove();

                let factorSource = $("#new-calculation-factor-option-template").html(),
                    factorTemplate = Handlebars.compile(factorSource),
                    addFactorButtonSource = $("#add-new-factor-option-button").html(),
                    addFactorButtonTemplate = Handlebars.compile(addFactorButtonSource);

                factorsContainer.append(
                    $(factorTemplate({
                        coeff: 1,
                        subjects: subjects
                    })),
                    $(addFactorButtonTemplate())
                );
            }
        });

        goTo(settings.newCalculation.panel.id);
    }


    /**
     * Render New Analysis Panel. Analysis parameter can be null/empty when you create a new Analysis.
     * @param {object} Analysis
     * @return {void}
     */
    const renderNewAnalysisForm = (analysis) => {
        let panel = $(`#${settings.newAnalysis.panel.id}`),
            createAnalaysisButton = $(`#${settings.newAnalysis.createButton.id}`),
            nameInput = $(`#${settings.newAnalysis.nameInput.id}`),
            subjectSelect = $(`#${settings.newAnalysis.subjectSelect.id}`),
            calculationSelect = $(`#${settings.newAnalysis.calculationSelect.id}`),
            operatorSelectForCalculation = $(`#${settings.newAnalysis.operatorSelectForCalculation.id}`),
            operatorSelectForSubject = $(`#${settings.newAnalysis.operatorSelectForSubject.id}`),
            hiddenConditionInput = $(`#${settings.newAnalysis.hiddenConditionInput.id}`),
            resultInput = $(`#${settings.newAnalysis.resultInput.id}`),
            dataInfoContainer = $(`#new-analysis-data-info-container`);

        DataStorage.Analysis.options(_selected_wizard, (option) => {
            let calculationSelectSource = $("#new-anlysis-calculation-select-template").html(),
                calculationSelectTemplate = Handlebars.compile(calculationSelectSource),
                subjectSelectSource = $("#new-analysis-subject-select-template").html(),
                subjectSelectTemplate = Handlebars.compile(subjectSelectSource),
                operatorSelectForCalculationSource = $("#new-analysis-operator-select-template").html(),
                operatorSelectForCalculationTemplate = Handlebars.compile(operatorSelectForCalculationSource);

            subjectSelect.html(subjectSelectTemplate({
                subjects: option.subjects
            }));

            calculationSelect.html(calculationSelectTemplate({
                calculations: option.calculations
            }));
            
            operatorSelectForCalculation.html(operatorSelectForCalculationTemplate({
                operators: settings.newAnalysis.operatorSelectForCalculation.options
            }));

            operatorSelectForSubject.html(operatorSelectForCalculationTemplate({
                operators: settings.newAnalysis.operatorSelectForCalculation.options
            }));

            $(`#${settings.newAnalysis.comparisonTypeSelect.id}`).val("subject").change();

            if (analysis) {
                createAnalaysisButton.attr({
                    "data-id": analysis.id,
                    "data-action": "update"
                });
                nameInput.val(analysis.name);
                resultInput.val(analysis.result);
                hiddenConditionInput.val(analysis.condition || JSON.stringify({subjects:[], calculations:[]}));
                renderAnalysisConditionFields(JSON.parse(analysis.condition));
            } else {
                createAnalaysisButton.attr({
                    "data-id": null,
                    "data-action": "create"
                });
                nameInput.val("");
                resultInput.val("");
                hiddenConditionInput.val(JSON.stringify({subjects:[], calculations:[]}));
                renderAnalysisConditionFields(JSON.stringify({subjects:[], calculations:[]}));
            }
        });

        goTo(settings.newAnalysis.panel.id);
    }

    /**
     * Render conditions for a specific analysis. The condition consists of subject/answers and calculations
     * @param {object} condition 
     * @return {void}
     */
    const renderAnalysisConditionFields = (condition) => {
        let subjects = condition.subjects || [];
        let calculations = condition.calculations || [];
        let comparisons = condition.comparisons || [];
        let $container = $(`#${settings.newAnalysis.conditionsContainer.id}`);

        $container.children().remove();

        for (let i = 0; i < subjects.length; i ++) {
            let source = $("#new-analysis-condition-subject-template").html(),
                template = Handlebars.compile(source);

            $container.append(
                $(template(subjects[i]))
            );
        }

        for (let i = 0; i < calculations.length; i ++) {
            let source = $("#new-analysis-condition-calculation-template").html(),
                template = Handlebars.compile(source);

            $container.append(
                $(template(calculations[i]))
            );
        }
    }

    /**
     * Extract current analysis options from HTML made by admin.
     * @return {void}
     */
    const extractAnalysisConditionsFromConfig = () => {
        let $subjects = $(`#${settings.newAnalysis.conditionsContainer.id} div.condition.condition-subject`);
        let $calculations = $(`#${settings.newAnalysis.conditionsContainer.id} div.condition.condition-calculation`);
        let subjects = [],
            calculations = [];

        for (let i = 0; i < $subjects.length; i ++) {
            let tempSubject = {};
            tempSubject.id = $subjects.eq(i).attr("data-id");
            tempSubject.question = $subjects.eq(i).find(".question").text().trim();
            tempSubject.answer = $subjects.eq(i).find(".answer").text().trim();

            subjects.push(tempSubject);
        }

        for (let i = 0; i < $calculations.length; i ++) {
            let tempCalculation = {};
            tempCalculation.id = $calculations.eq(i).attr("data-id");
            tempCalculation.name = $calculations.eq(i).find(".name").text().trim();
            tempCalculation.factors = $calculations.eq(i).find(".factors").text().trim();

            calculations.push(tempCalculation);
        }

        let condition = {subjects, calculations};

        $(`#${settings.newAnalysis.hiddenConditionInput.id}`).val(JSON.stringify(condition))
    }

    /**
     * Extract values from answer types configuration.
     * @return {array}
     */
    const extractValuesFromAnswersConfig = () => {
        let values = [];
        let $options = $(`#${settings.newSubject.answersContainer.id} div.answer-option`);

        for (let i = 0; i < $options.length; i ++) {
            let curOption = $options.eq(i);
            let value = {
                caption: curOption.find("[data-id='caption']").val(),
                value: curOption.find("[data-id='value']").val(),
                weight: curOption.find("[data-id='weight']").val(),
                next: curOption.find("[data-id='next']").val(),
            };

            values.push(value);
        }

        return values;
    }

    /**
     * Extract factors from factor options
     * @return {array}
     */
    const extractFactorsFromFactorOptionsConfig = () => {
        let factors = [];
        let $options = $(`#${settings.newCalculation.factorsContainer.id} div.factor-option`);

        for (let i = 0; i < $options.length; i ++) {
            let curOption = $options.eq(i);
            let factor = {
                coeff: curOption.find("[data-id='coeff']").val(),
                id: curOption.find("[data-id='subject-id']").val()
            };

            factors.push(factor);
        }

        return factors;
    }

    /**
     * Render Answer Types Container. This should render answer options according to answer type whenever admin changes answer type options.
     * container parameter will be used to place all of answer options
     * monitor parameter is valid in development phase to observe data
     * @param {string} id
     * @param {object} container
     * @param {object} monitor
     * @return {void}
     */
    const renderNewAnswerOptions = (id, container, monitor) => {
        DataStorage.Types.find(id, (type) => {
            container.children().remove();
            if (type) {
                let values = type.value;
                DataStorage.Subjects.get(_selected_wizard, (subjects) => {
                    for (let i = 0; i < values.length; i ++) {
                        let $subjectsDropdown = getSubjectsDropdown();
                        let source = $("#new-answer-option-template").html();
                        let template = Handlebars.compile(source);
                        container.append(
                            $(template({
                                caption: "",
                                value: "",
                                weight: 0,
                                subjects: subjects
                            }))
                        )
                    }

                    if (type.type_name == "Drop Down" || type.type_name == "Multiple Choice") {
                        let source = $("#add-new-answer-option-button").html();
                        let template = Handlebars.compile(source);
                        container.append(
                            $(template())
                        );
                    }
                });
            }
            
            monitor.children().remove();
            monitor.append(
                $("<pre/>").text(JSON.stringify((type || {}).value))
            );
        });
    }

    /**
     * Render answer options from existing subject's answer options.
     * @param {object} subject
     * @param {object} container
     * @param {object} monitor
     * @return {void}
     */
    const renderExistingAnswerOptions = (subject, container, monitor) => {
        let values = null;
        container.children().remove();
        if (subject.answers) {
            if (typeof subject.answers == "string") {
                values = JSON.parse(subject.answers || "[]");
            } else if (typeof subject.answers == "object") {
                values = subject.answers;
            }

            DataStorage.Subjects.get(_selected_wizard, (subjects) => {
                subjects = subjects.filter(item => item.id != subject.id);

                for (let i = 0; i < values.length; i ++) {
                    let $subjectsDropdown = getSubjectsDropdown();
                    let source = $("#new-answer-option-template").html();
                    let template = Handlebars.compile(source);

                    for (let j = 0; j < subjects.length; j ++) {
                        subjects[j].selected = (subjects[j].id == values[i].next);
                    }

                    container.append(
                        $(template({
                            caption: values[i].caption,
                            value: values[i].value,
                            weight: values[i].weight,
                            next: values[i].next,
                            subjects: subjects
                        }))
                    )
                }
            });
        }

        if (subject.type_name == "Drop Down" || subject.type_name == "Multiple Choice") {
            let source = $("#add-new-answer-option-button").html();
            let template = Handlebars.compile(source);
            container.append(
                $(template())
            );
        }
        
        monitor.children().remove();
        monitor.append(
            $("<pre/>").text(JSON.stringify(values || {}))
        );
    }

    /**
     * Render answer options from existing calculation's answer options.
     * @param {object} calculation
     * @param {object} container
     * @param {object} monitor
     * @return {void}
     */
    const renderExistingFactorOptions = (calculation, container, monitor) => {
        let factors = null;
        container.children().remove();
        if (calculation.factors) {
            if (typeof calculation.factors == "string") {
                factors = JSON.parse(calculation.factors || "[]");
            } else if (typeof calculation.factors == "object") {
                factors = calculation.factors;
            }

            DataStorage.Subjects.get(_selected_wizard, (subjects) => {
                for (let i = 0; i < factors.length; i ++) {
                    let source = $("#new-calculation-factor-option-template").html();
                    let template = Handlebars.compile(source);

                    for (let j = 0; j < subjects.length; j ++) {
                        subjects[j].selected = (subjects[j].id == factors[i].id);
                    }

                    container.append(
                        $(template({
                            coeff: factors[i].coeff,
                            subjects: subjects
                        }))
                    )
                }

                let newFactorButtonSource = $("#add-new-factor-option-button").html();
                let newFactorTemplate = Handlebars.compile(newFactorButtonSource);

                container.append(
                    $(newFactorTemplate())
                )
            });
        }
        
        monitor.children().remove();
        monitor.append(
            $("<pre/>").text(JSON.stringify(factors || {}))
        );
    }

    /**
     * Create a new Wizard with name property. This method will call the temp object to manage mock database.
     * @param {string} name
     * @param {number} starts_with
     * @return {void}
     */
    const createWizard = (name, starts_with) => {
        //  Code to create wizard here. Callback function should be used here.
        DataStorage.Wizards.insert({
                name,
                starts_with
            }, (response) => {
            _selected_wizard = response.id;
            renderSubjectsPanel(name);
        });
    }

    /**
     * Update an existing wizard.
     * @param {number} id
     * @param {string} name
     * @param {number} starts_with
     * @return {void}
     */
    const updateWizard = (id, name, starts_with) => {
        DataStorage.Wizards.update(id, {
                newName: name,
                starts_with
            }, () => {
            _selected_wizard = id;
            renderSubjectsPanel(name);
        });
    }

    /**
     * Update local subject Database. can be called refreshing for subjects.
     * @param {function} callback
     * @return {void}
     */
    const updateLocalSubjects = (callback) => {
        DataStorage.Subjects.get(_selected_wizard, (subjects) => {
            _subjects = subjects;

            if (typeof callback == "function") {
                callback();
            }
        });
    }

    /**
     * Update local subject Database. can be called refreshing for calculation.
     * @param {function} callback
     * @return {void}
     */
    const updateLocalCalculations = (callback) => {
        DataStorage.Calculations.get(_selected_wizard, (calculations) => {
            _calculations = calculations;

            if (typeof callback == "function") {
                callback();
            }
        });
    }

    /**
     * Create a new subject with properties given by admin
     * @param {object} params
     * @return {void}
     */
    const createSubject = (params) => {
        DataStorage.Subjects.insert(params, () => {
            if (_subjectsStack.length == 0) {
                renderSubjectsPanel();
            } else {
                renderNewSubjectForm(_subjectsStack.pop());
            }
            updateLocalSubjects();
        });
    }

    /**
     * Update an existing subject
     * @param {object} params
     * @return {void}
     */
    const updateSubject = (params) => {
        DataStorage.Subjects.update(params.id, params, (response) => {
            updateLocalSubjects(() => {
                if (_subjectsStack.length == 0) {
                    renderSubjectsPanel();
                } else {
                    renderNewSubjectForm(_subjectsStack.pop());
                }
            })
        })
    }

    /**
     * Create a new calculation with properties given by admin
     * @param {object} params
     * @return {void}
     */
    const createCalculation = (params) => {
        DataStorage.Calculations.insert(params, () => {
            // if (_subjectsStack.length == 0) {
            //     renderSubjectsPanel();
            // }// else {
            //    renderNewSubjectForm(_subjectsStack.pop());
            //}
            updateLocalCalculations(() => {
                renderSubjectsPanel();
            });
        });
    }

    /**
     * Update an existing calculation
     * @param {object} params
     * @return {void}
     */
    const updateCalculation = (params) => {
        DataStorage.Calculations.update(params.id, params, (response) => {
            updateLocalCalculations(() => {
                if (_subjectsStack.length == 0) {
                    renderSubjectsPanel();
                }// else {
                //    renderNewSubjectForm(_subjectsStack.pop());
                //}
            })
        })
    }

    /**
     * Update local subject Database. can be called refreshing for analyses.
     * @param {function} callback
     * @return {void}
     */
    const updateLocalAnalyses = (callback) => {
        DataStorage.Analysis.get(_selected_wizard, (analyses) => {
            _analyses = analyses;

            if (typeof callback == "function") {
                callback();
            }
        });
    }

    /**
     * Create a new analysis.
     * @param {object} params 
     * @return {void}
     */
    const createAnalysis = (params) => {
        //
        DataStorage.Analysis.insert(params, () => {
            updateLocalAnalyses(() => {
                renderSubjectsPanel();
            })
        });
    }

    /**
     * Update an existing analysis.
     * @param {object} params 
     * @return {void}
     */
    const updateAnalysis = (params) => {
        DataStorage.Analysis.update(params.id, params, () => {
            updateLocalAnalyses(() => {
                renderSubjectsPanel();
            })
        });
    }

    /**
     * Rerender wizards table with data pulled from data store.
     * @return {void}
     */
    const updateWizardsTable = () => {
        DataStorage.Wizards.get((wizards) => {
            let table = $(`#${settings.wizards.table.id}`);
            let source = $("#wizards-table-template").html();
            let template = Handlebars.compile(source);
            table.html(template({
                wizards: wizards,
                class: settings.wizards.table.class,
                id: settings.wizards.table.id
            }));
        });
    }

    /**
     * Rerender Subjects table with data pulled from data store.
     * @return {void}
     */
    const updateSubjectsTable = () => {
        DataStorage.Subjects.get(_selected_wizard, (subjects) => {
            _subjects = subjects;
            let table = $(`#${settings.subjects.subjectsTable.id}`);
            let source = $("#subjects-table-template").html();
            let template = Handlebars.compile(source);
            table.html(template({
                subjects: subjects,
                class: settings.subjects.subjectsTable.class,
                id: settings.subjects.subjectsTable.id
            }));
        })
    }

    /**
     * Render Calculations talbe with data pulled from data store.
     * @return {void}
     */
    const updateCalculationTable = () => {
        DataStorage.Calculations.get(_selected_wizard, (calculations) => {
            _calculations = calculations;
            let table = $(`#${settings.subjects.calculationTable.id}`);
            let source = $("#calculation-table-template").html();
            let template = Handlebars.compile(source);
            table.html(template({
                calculations: _calculations,
                class: settings.subjects.calculationTable.class,
                id: settings.subjects.calculationTable.id
            }));
        })
    }

    /**
     * Render Analyses talbe with data pulled from data store.
     * @return {void}
     */
    const updateAnalysesTable = () => {
        DataStorage.Analysis.get(_selected_wizard, (analyses) => {
            _analyses = analyses;
            let table = $(`#${settings.subjects.analysesTable.id}`);
            let source = $("#analyses-table-template").html();
            let template = Handlebars.compile(source);
            table.html(template({
                analyses: _analyses,
                class: settings.subjects.analysesTable.class,
                id: settings.subjects.analysesTable.id
            }));
        })
    }

    /**
     * Render Results table with data pulled from data store. With this panel, admins will be able to touch reuslts given by leads.
     * @return {void}
     */
    const updateResultsTable = () => {
        DataStorage.Results.fromWizard(_selected_wizard, (results) => {
            _results = results;
            let table = $(`#${settings.subjects.resultsTable.id}`);
            let source = $(`#${settings.subjects.resultsTable.template.id}`).html();
            let template = Handlebars.compile(source);
            table.html(template({
                results: _results,
                class: settings.subjects.resultsTable.class,
                id: settings.subjects.resultsTable.id
            }));
        })
    }


    /**
     * Get subjects select option 
     * @param {integer} id
     * @param {object} params
     * @return {object}
     */
    const getSubjectsDropdown = (id, params) => {
        let others = null;
        let $select = $("<select/>").addClass("form-control").attr({
            "data-id": "next"
        });

        if (params) {
            $select.attr(params);
        }

        if (id == undefined) {
            others = _subjects;
        } else {
            others = _subjects.filter(subject => subject.id != id);
        }
        $select.append(
            $("<option/>").text("Select a next subject").val("")
        );

        for (let i = 0; i < others.length; i ++) {
            $select.append(
                $("<option/>").text(others[i].question).val(others[i].id)
            );
        }

        return $select;
    }

    /**
     * Initialize Wizards panel including wizards table.
     * @return {void}
     */
    const initWizardsTable = () => {
        //  Initializing container panel.
        let containerPanel = $(`#${settings.wizards.panel.id}`);

        let source = $("#wizards-table-template").html();
        let template = Handlebars.compile(source);
        Handlebars.registerPartial("wizardsTable", template({
            wizards: [],// wizards,
            class: settings.wizards.table.class,
            id: settings.wizards.table.id
        }));
        
        source = $("#wizards-list-template").html();
        template = Handlebars.compile(source);
        containerPanel.html(template({
            title: settings.wizards.panel.title,
            class: settings.wizards.panel.class,
            id: settings.wizards.panel.id
        }));

        // Binding Event to new Button
        containerPanel.on("click", `#${settings.wizards.panel.newButtonID}`, (event) => {
            _selected_wizard = null;
            renderNewWizardForm();
        });

        updateWizardsTable();
    }

    /**
     * Initialize Components
     * @return {void}
     */
    const initComponents = () => {
        //  Render wizards list table
        
        initWizardsTable();

        $(document).on("click", "button.answer-option-delete", (event) => {
            event.preventDefault();
            let $optionContainer = $(event.target).parents("div.row.answer-option");
            let optionsCount = $optionContainer.parent().children("div.row.answer-option").length;

            if (optionsCount < 2) {
                alert("You should have an answer option at least.");
            } else if (confirm("Are you sure to delete this option?")) {
                $optionContainer.remove();
            }
        }).on("click", "button.factor-option-delete", (event) => {
            event.preventDefault();
            let $optionContainer = $(event.target).parents("div.row.factor-option");
            let optionsCount = $optionContainer.parent().children("div.row.factor-option").length;

            if (optionsCount < 2) {
                alert("You should have an factor option at least.");
            } else if (confirm("Are you sure to delete this option?")) {
                $optionContainer.remove();
            }
        }).on("click", "button#btn-add-answer-option", (event) => {
            event.preventDefault();
            let $panelBody = $(event.target).parents(".panel-body");
            let source = $("#new-answer-option-template").html();
            let template = Handlebars.compile(source);

            $panelBody.find("div.answer-option").last().after(
                $(template({
                    caption: "",
                    value: "",
                    weight: 0,
                    subjects: _subjects
                }))
            )
        }).on("click", "button#btn-add-factor-option", (event) => {
            event.preventDefault();
            let $container = $(event.target).parents(`#${settings.newCalculation.factorsContainer.id}`);
            let source = $("#new-calculation-factor-option-template").html();
            let template = Handlebars.compile(source);

            $container.find("div.factor-option").last().after(
                $(template({
                    coeff: 1,
                    subjects: _subjects
                }))
            )
        }).on("click", `#${settings.newSubject.createButton.id}`, (event) => {
            event.preventDefault();
            if ($(`#${settings.newSubject.questionInput.id}`).val() !== "") {
                let params = {
                    id: event.target.getAttribute("data-id"),
                    wizard_id: _selected_wizard,
                    question: $(`#${settings.newSubject.questionInput.id}`).val().trim(),
                    type_id: parseInt($(`#${settings.newSubject.typeSelect.id}`).val()),
                    answers: extractValuesFromAnswersConfig()
                }
                if (event.target.getAttribute("data-action") == "create") {
                    createSubject(params);
                } else if (event.target.getAttribute("data-action") == "update") {
                    updateSubject(params);
                }
            } else {
                alert("Question can't be empty!");
            }
            //  Creating a new wizard
        }).on("click", `#${settings.newCalculation.createButton.id}`, (event) => {
            event.preventDefault();
            if ($(`#${settings.newCalculation.nameInput.id}`).val() !== "") {
                let params = {
                    id: event.target.getAttribute("data-id"),
                    wizard_id: _selected_wizard,
                    name: $(`#${settings.newCalculation.nameInput.id}`).val().trim(),
                    operator: $(`#${settings.newCalculation.operatorSelect.id}`).val(),
                    factors: extractFactorsFromFactorOptionsConfig()
                }
                if (event.target.getAttribute("data-action") == "create") {
                    createCalculation(params);
                } else if (event.target.getAttribute("data-action") == "update") {
                    updateCalculation(params);
                }
            } else {
                alert("Name can't be empty!");
            }
            //  Creating a new wizard
        }).on("click", `#${settings.newAnalysis.createButton.id}`, (event) => {
            event.preventDefault();
            if ($(`#${settings.newAnalysis.nameInput.id}`).val() !== "" && $(`#${settings.newAnalysis.resultInput.id}`).val() != "") {
                let params = {
                    id: event.target.getAttribute("data-id"),
                    wizard_id: _selected_wizard,
                    name: $(`#${settings.newAnalysis.nameInput.id}`).val().trim(),
                    condition: $(`#${settings.newAnalysis.hiddenConditionInput.id}`).val().trim(),
                    result: $(`#${settings.newAnalysis.resultInput.id}`).val().trim()
                };

                if (event.target.getAttribute("data-action") == "create") {
                    createAnalysis(params);
                } else if (event.target.getAttribute("data-action") == "update") {
                    updateAnalysis(params);
                }
            } else {
                alert("Name and result can't be empty!");
            }
            //  Creating a new wizard
        }).on("click", `#${settings.newSubject.backButton.id}`, () => {
            goTo(settings.subjects.panel.id);
        }).on("click", `#${settings.newCalculation.backButton.id}`, () => {
            goTo(settings.subjects.panel.id);
        }).on("click", `#${settings.newAnalysis.backButton.id}`, () => {
            goTo(settings.subjects.panel.id);
        }).on("click", "button.subject-edit", (event) => {
            let $record = $(event.target).parents("tr");
            let id = $record.attr("data-subject-id");

            DataStorage.Subjects.find(id, (subject) => {
                renderNewSubjectForm(subject);
                goTo(settings.newSubject.panel.id);
            });
        }).on("click", "button.calculation-edit", (event) => {
            let $record = $(event.target).parents("tr");
            let id = $record.attr("data-calculation-id");

            DataStorage.Calculations.find(id, (calculation) => {
                renderNewCalculationForm(calculation);
                goTo(settings.newCalculation.panel.id);
            });
        }).on("click", "button.analysis-edit", (event) => {
            let $record = $(event.target).parents("tr");
            let id = $record.attr("data-analysis-id");

            DataStorage.Analysis.find(id, (analysis) => {
                renderNewAnalysisForm(analysis);
                goTo(settings.newAnalysis.panel.id);
            });
        }).on("click", "button.subject-delete", (event) => {
            let $record = $(event.target).parents("tr");
            let id = $record.attr("data-subject-id");

            DataStorage.Subjects.remove(id, () => {
                renderSubjectsPanel();
                goTo(settings.subjects.panel.id);
            });
        })
        .on("click", $(`button#${settings.newAnalysis.subjectComparisonAddButton.id}`), () => {
            let $condition = $(`#${settings.newAnalysis.hiddenConditionInput.id}`),
                $subjectSelect = $(`#${settings.newAnalysis.subjectSelect.id}`),
                $operatorSelect = $(`#${settings.newAnalysis.operatorSelectForSubject.id}`),
                $value = $(`#${settings.newAnalysis.subjectComparisonValueInput.id}`);

            let objCondition = JSON.parse($condition.val()),
                id = parseInt($subjectSelect.val()),
                operator = $operatorSelect.val(),
                value = $value.val();

            if (event.target.id != settings.newAnalysis.subjectComparisonAddButton.id) {
                return false;
            }

            if (id == "" || operator == "" || value == "") {
                alert("Plese fill in the form.");
            } else {
                objCondition.subjects.push({
                    id, 
                    operator,
                    value
                });
                $condition.val(JSON.stringify(objCondition));
                renderAnalysisConditionFields(objCondition);

                $subjectSelect.val("");
                $operatorSelect.val("");
                $value.val("");
            }
        })
        .on("click", $(`#${settings.newAnalysis.calculationComparisonAddButton.id}`), (event) => {
            if (event.target.getAttribute("id") != settings.newAnalysis.calculationComparisonAddButton.id) {
                return false;
            }

            let $condition = $(`#${settings.newAnalysis.hiddenConditionInput.id}`),
                $calculationSelect = $(`#${settings.newAnalysis.calculationSelect.id}`),
                $operatorSelect = $(`#${settings.newAnalysis.operatorSelectForCalculation.id}`),
                $comparisonValue = $(`#${settings.newAnalysis.calculationComparisonValueInput.id}`);

            let objCondition = JSON.parse($condition.val()),
                calId = parseInt($calculationSelect.val()),
                operator = $operatorSelect.val(),
                value = $comparisonValue.val();

            if (calId == "" || operator == "") {
                alert("Please fill in the form.");
                return false;
            } else {
                if (!objCondition.calculations) {
                    objCondition.calculations = [];
                }

                objCondition.calculations.push({
                    id: calId,
                    operator: operator,
                    value: value
                });
                $condition.val(JSON.stringify(objCondition));
                renderAnalysisConditionFields(objCondition);

                $calculationSelect.val("");
                $operatorSelect.val("");
                $comparisonValue.val("");
            }
        })
        .on("click", "button.calculation-delete", (event) => {
            let $record = $(event.target).parents("tr");
            let id = $record.attr("data-calculation-id");

            DataStorage.Calculations.remove(id, () => {
                renderSubjectsPanel();
                goTo(settings.subjects.panel.id);
            });
        })
        .on('click', 'button.condition-subject-delete', (event) => {
            let $record = $(event.target).parents('.form-group.condition');

            if (confirm("Are you sure to delete this subject option?")) {
                $record.remove();
                extractAnalysisConditionsFromConfig()
            }
        })
        .on("click", "button.condition-comparison-delete", (event) => {
            let $record = $(event.target).parents('.form-group.condition');

            if (confirm("Are you sure to delete this Comparison option?")) {
                $record.remove();
                extractAnalysisConditionsFromConfig()
            }
        })
        .on('click', 'button.condition-calculation-delete', (event) => {
            let $record = $(event.target).parents('.form-group.condition');

            if (confirm("Are you sure to delete this calculation option?")) {
                $record.remove();
                extractAnalysisConditionsFromConfig()
            }
        }).on("click", "button.wizard-edit", (event) => {
            let $record = $(event.target).parents("tr");
            let wizardId = $record.attr("data-wizard-id");

            DataStorage.Wizards.find(wizardId, (wizard) => {
                _selected_wizard = wizardId;
                renderNewWizardForm(wizard);
            });
        }).on("click", "button.wizard-delete", (event) => {
            let $record = $(event.target).parents("tr");
            let wizardId = $record.attr("data-wizard-id");

            DataStorage.Wizards.remove(wizardId, () => {
                updateWizardsTable();
            });
        }).on("click", `#${settings.subjects.panel.newSubjectButton.id}`, () => {
            renderNewSubjectForm()
        }).on("click", `#${settings.subjects.panel.newCalculationButton.id}`, () => {
            renderNewCalculationForm();
        }).on("click", `#${settings.subjects.panel.newAnalysisButton.id}`, () => {
            renderNewAnalysisForm();
        }).on("click", `#subjects-panel-back-to-wizards`, () => {
            goTo(settings.wizards.panel.id);
        }).on("click", `#${settings.newWizard.panel.id} button#${settings.newWizard.createButton.id}`, (event) => {
            if (wizardNameInput.val() !== "") {
                let action = event.target.getAttribute("data-action");
                let id = event.target.getAttribute("data-id");
                let starts_with = $(`#${settings.newWizard.initiativeSubject.id}`).val();

                if (action == "create") {
                    createWizard(wizardNameInput.val(), starts_with)
                } else if (action == "update") {
                    updateWizard(id, wizardNameInput.val(), starts_with);
                }
            } else {
                alert("Wizard Name can't be empty!");
            }
            //  Creating a new wizard
        }).on("change", `#${settings.newSubject.typeSelect.id}`, (event) => {
            renderNewAnswerOptions(
                event.target.value, 
                $(`#${settings.newSubject.answersContainer.id}`), 
                $(`#${settings.newSubject.dataInfoContainer.id}`)
            );
        }).on("change", `div.answer-option select`, (event) => {
            if (event.target.value == "create_new_and_link") {
                DataStorage.Subjects.insert({
                    wizard_id: _selected_wizard
                }, (subject) => {
                    $(event.target).append(
                        $("<option/>").text(subject.question).val(subject.id)
                    );
                    $(event.target).val(subject.id).change();
                    if ($(`#${settings.newSubject.questionInput.id}`).val() == "") {
                        $(`#${settings.newSubject.questionInput.id}`).val("No title")
                    }

                    $(`#${settings.newSubject.createButton.id}`).click();
                })
            }
        }).on("change", $(`#${settings.newAnalysis.subjectSelect.id}`), (event) => {
            // event.preventDefault();
            // if (event.target.getAttribute("id") != settings.newAnalysis.subjectSelect.id) {
            //     return false;
            // }
            // let curSelectedSubjectId = event.target.value;

            // if (curSelectedSubjectId == "") {
            //     return false;
            // }
            // DataStorage.Subjects.find(curSelectedSubjectId, (subject) => {
            //     let source = $("#new-analysis-answers-select-template").html(),
            //         template = Handlebars.compile(source),
            //         answersSelect = $(`#${settings.newAnalysis.answersSelect.id}`);

            //     let values = (typeof subject.answers == "object") ? subject.answers : JSON.parse(subject.answers);
            //     answersSelect.html(
            //         $(template({
            //             values: values
            //         }))
            //     );
            // });
        })
        .on("change", $(`#${settings.newAnalysis.comparisonTypeSelect.id}`), (event) => {
            if (event.target.getAttribute("id") == settings.newAnalysis.comparisonTypeSelect.id) {
                let value = event.target.value;

                let $comparisonVisibleTypeSelect = $(`#${settings.newAnalysis.comparisonVisibleTypeSelect.id}`),
                    source = $(`#${settings.newAnalysis.comparisonVisibleTypeSelect.template.id}`).html(),
                    template = Handlebars.compile(source);

                $comparisonVisibleTypeSelect.children().remove();
                if (value == "subject") {
                    $comparisonVisibleTypeSelect.append(
                        $(template({
                            is_subject: true
                        }))
                    );

                    $comparisonVisibleTypeSelect.val("answer").change();
                } else {
                    $comparisonVisibleTypeSelect.append(
                        $(template({
                            is_subject: false
                        }))
                    );

                    $comparisonVisibleTypeSelect.val("value").change();
                }
            }
        })
        .on("change", `#${settings.newAnalysis.comparisonVisibleTypeSelect.id}`, (event) => {
            if (event.target.getAttribute("id") == settings.newAnalysis.comparisonVisibleTypeSelect.id) {
                let comparisonType = $(`#${settings.newAnalysis.comparisonTypeSelect.id}`).val();
                let visibleType = event.target.value;

                let $comparisonValueSelect = $(`#${settings.newAnalysis.comparisonValueSelect.id}`),
                    source = $(`#${settings.newAnalysis.comparisonValueSelect.template.id}`).html(),
                    template = Handlebars.compile(source);

                $comparisonValueSelect.children().remove();
                if (comparisonType == "subject") {
                    let is_answer = (visibleType == "answer");
                    $comparisonValueSelect.append(
                        $(template({
                            is_subject: true,
                            is_answer,
                            subjects: _subjects
                        }))
                    );
                } else {
                    let is_value = (visibleType == "value");
                    $comparisonValueSelect.append(
                        $(template({
                            is_subject: false,
                            is_value,
                            calculations: _calculations
                        }))
                    );
                }
            }
        })
        .on("click", `button#${settings.newAnalysis.analysisTagAddButton.id}`, (event) => {
            let $comparisonValueSelect = $(`#${settings.newAnalysis.comparisonValueSelect.id}`);
            let tag = $comparisonValueSelect.val();

            if (tag == "") {
                alert("Please select a subject or a calculation.");
            } else {
                let $body = $("body");
                let $tmp = $("<input/>");
                tag = "{{" + tag + "}}";
                $body.append($tmp);
                $tmp.val(tag).select();
                document.execCommand("copy");
                $tmp.remove();

                event.target.textContent = "Copied to Clipboard.";
                event.target.className = "btn btn-success form-control";

                let tempTimer = window.setTimeout(() => {
                    event.target.textContent = "Copy to Clipboard";
                    event.target.className = "btn btn-default form-control";

                    clearTimeout(tempTimer);
                }, 5000);
            }
        });

        $(".nav-tabs li a").click((event) => {
			event.preventDefault();
			$(event.target).tab('show');
		});
    }

    /**
     * Initialize this object with ID of element and API base URL
     * @param { string } containerID 
     * @param { string } baseUrl 
     * @return {void}
     */
    const init = (containerID, baseUrl) => {
        $_container = $(`#${containerID}`);
        _apiBaseUrl = `${baseUrl}api/api.php`;
        initComponents();
        goTo();
    };

    return {
        init: init
    };
})();


let QuestionRenderer = (() => {
    let _data = [],
        _something = null,
        _apiBaseUrl = null,
        $_container = null;

    let _selectedWizard = null;
    let _selectedSubject = null;

    /**
     * Temp Variables
     */
    let _subjects = [];
    let _calculations = [];
    let _userId = null;

    let _done = [];
    let _todo = [];

    /**
     * Constants for configuration.
     */
    const settings = {
        wizards: {
            panel: {
                id: "qna-leads-wizards"
            },
            tableTemplate: {
                id: "wizards-list-template"
            },
            selectWizardButton: {
                class: "select-wizard"
            },
            selectResultButton: {
                class: "select-result"
            }
        },
        subject: {
            panel: {
                id: "qna-leads-subject",
                backButton: {
                    id: "subject-prev-button"
                },
                nextButton: {
                    id: "subject-next-button"
                }
            },
            template: {
                id: "subject-template"
            },
            answerTemplates: {
                number: "subject-number-type-answer-template",
                text: "subject-text-type-answer-template",
                dropDown: "subject-dropdown-type-answer-template",
                multiChoice: "subject-multichoice-type-answer-template",
                yesOrNo: "subject-yes-no-type-answer-template"
            }
        },
        analysis: {
            panel: {
                id: "qna-leads-analysis"
            },
            backToAnswersButton: {
                id: "back-to-answers-button"
            },
            submitButton: {
                id: "qna-analysis-submit-answers-button"
            }
        }
    }

    /**
     * Validate a Subject Form. We expect that leads will fill the forms provided.
     * @return {boolean}
     */
    const validateForm = () => {
        let $inputs = $.merge(
                $.merge(
                    $(`#${settings.subject.panel.id} input[type='text']`), 
                    $(`#${settings.subject.panel.id} input[type='number']`)
                ),
                $(`#${settings.subject.panel.id} textarea`)),
            $selects = $(`#${settings.subject.panel.id} select`);

        for (let i =  0; i < $inputs.length; i ++) {
            if ($inputs.eq(i).val() == "") {
                return false;
            } else {
                continue;
            }
        }

        for (let i =  0; i < $selects.length; i ++) {
            if ($selects.eq(i).val() == "") {
                return false;
            } else {
                continue;
            }
        }

        return true;
    }

    /**
     * Render Text Field Type Answer Form
     * @param {object} answers 
     * @param {object} $container
     * @param {object} subject
     * @return {void}
     */
    const renderTextAnswer = (answers, $container, subject) => {
        let source = $(`#${settings.subject.answerTemplates.text}`).html(),
            template = Handlebars.compile(source);

        $container.children().remove();
        for (let i = 0; i < answers.length; i ++) {
            $container.append(
                $(template(answers[i]))
            );
            break;
        }

        $("button.subject-control-button.next").attr({'data-target': answers[0].next});

        if (subject && subject.value) {
            $container.find("textarea").val(subject.value);
        }
    }

    /**
     * Render Number Field Type Answer Form
     * @param {object} answers 
     * @param {object} $container
     * @param {object} subject
     * @return {void}
     */
    const renderNumberAnswer = (answers, $container, subject) => {
        let source = $(`#${settings.subject.answerTemplates.number}`).html(),
            template = Handlebars.compile(source);

        $container.children().remove();
        for (let i = 0; i < answers.length; i ++) {
            $container.append(
                $(template(answers[i]))
            );
            break;
        }

        $("button.subject-control-button.next").attr({'data-target': answers[0].next});

        if (subject && subject.value) {
            $container.find("input").val(subject.value);
        }
    }

    /**
     * Render Drop Down Field Type Answer Form
     * @param {object} answers 
     * @param {object} $container
     * @param {obejct} subject
     * @return {void}
     */
    const renderDropDownAnswer = (answers, $container, subject) => {
        let source = $(`#${settings.subject.answerTemplates.dropDown}`).html(),
            template = Handlebars.compile(source);

        $container.children().remove();
        $container.append(
            $(template({
                answers: answers
            }))
        );

        $("button.subject-control-button.next").attr({'data-target': answers[0].next});

        if (subject && subject.value) {
            $container.find("select").val(subject.value);
        }
    }

    /**
     * Render Multiple Choice Type Answer Form
     * @param {object} answers 
     * @param {object} $container
     * @param {object} subject
     * @return {void}
     */
    const renderMultipleChoiceAnswer = (answers, $container, subject) => {
        let source = $(`#${settings.subject.answerTemplates.multiChoice}`).html(),
            template = Handlebars.compile(source);

        $container.children().remove();
        $container.append(
            $(template({
                answers: answers
            }))
        );

        $("button.subject-control-button.next").attr({'data-target': answers[0].next});

        if (subject && subject.value) {
            let values = subject.value.split("&");
            for (let i = 0; i < values.length; i ++) {
                $container.find(`input[value='${values[i]}']`).prop("checked", true);
            }
        }
    }

    /**
     * Render Yes or No Type Answer Form
     * @param {object} answers 
     * @param {object} $container
     * @param {object} subject
     * @return {void}
     */
    const renderYesNoAnswer = (answers, $container, subject) => {
        let source = $(`#${settings.subject.answerTemplates.yesOrNo}`).html(),
            template = Handlebars.compile(source);

        $container.children().remove();
        $container.append(
            $(template({
                answers: answers
            }))
        );

        $("button.subject-control-button.next").attr({'data-target': answers[1].next});

        if (subject && subject.value) {
            $container.find(`input[value='${subject.value}']`).prop("checked", true);
        }
    }

    /**
     * Once a lead provides an answer to click "Next", one of input option should be focused.
     * @return {void}
     */
    const focusOnSomething = () => {
        let $inputs = $.merge(
                $.merge(
                    $(`#${settings.subject.panel.id} input`),
                    $(`#${settings.subject.panel.id} select`)
                ),
                $(`#${settings.subject.panel.id} textarea`)
            );

        if ($inputs.length > 0) {
            $inputs.eq(0).focus();
        }
    }

    /**
     * Render the Subject panel with subject consiting of questions, type and answers, etc.
     * @param {object} subject 
     * @return {void}
     */
    const renderSubjectPanel = (subject) => {
        let subjectPanel = $(`#${settings.subject.panel.id}`),
            subjectSource = $(`#${settings.subject.template.id}`).html(),
            subjectTemplate = Handlebars.compile(subjectSource);

        const renderBody = {
            1: renderTextAnswer,
            2: renderNumberAnswer,
            3: renderDropDownAnswer,
            4: renderMultipleChoiceAnswer,
            5: renderYesNoAnswer
        };

        subjectPanel.html(
            $(subjectTemplate(subject))
        );

        let subjectPanelBody = subjectPanel.find(".panel-body");
        if (typeof subject.answers == "string") {
            subject.answers = JSON.parse(subject.answers);
        }

        renderBody[subject.type_id](subject.answers, subjectPanelBody, subject);

        goTo(settings.subject.panel.id);
        if (_done.length == 0) {
            $(`#${settings.subject.panel.backButton.id}`).text("Back To Wizards");
        }

        if (_todo.length == 0 && subject.answers.filter(answer => (answer.next)).length == 0) {
            $(`#${settings.subject.panel.nextButton.id}`).text("View Result");
        }
        focusOnSomething();
    }

    /**
     * Check whether the given analysis should be shown for the answers provided by leads.
     * @param {array} subjects 
     * @param {object} analysis 
     * @return {boolean}
     */
    const checkCondition = (subjects, analysis) => {
        let condition = analysis.condition;

        if (typeof condition == "string") {
            condition = JSON.parse(condition);
        }

        let subjectConditions = condition.subjects;

        for (let i = 0; i < subjectConditions.length; i ++) {
            let matches = subjects.filter(subject => (subject.id == subjectConditions[i].id) && (subject.value == subjectConditions[i].answer));

            if (matches.length > 0) {
                continue;
            } else {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if a given object is true for the condition.
     * @param {object} cond 
     * @param {object} obj 
     * @return {boolean}
     */
    const checkMatch = (cond, obj) => {
        const opFunctions = {
            "==": (a, b) => { return a == b; },
            ">": (a, b) => { return a > b; },
            "<": (a, b) => { return a < b; },
        };

        return opFunctions[cond.operator](obj.value, cond.value);
    }

    /**
     * Parse result text and replace tags with corresponding content
     * @param {string} result 
     * @param {array} subjects 
     * @param {array} calculations 
     * @return {string}
     */
    const processAnalysisResult = (result, subjects, calculations) => {
        const getValue = {
            "Q": (id) => {
                let objs = (subjects.length > 0 && subjects[0].subject_id)
                            ? subjects.filter(subject => subject.subject_id == id)
                            : subjects.filter(subject => subject.id == id);

                return (objs.length > 0) ? objs[0].question : "Not found.";
            },
            "A": (id) => {
                let objs = (subjects.length > 0 && subjects[0].subject_id)
                            ? subjects.filter(subject => subject.subject_id == id)
                            : subjects.filter(subject => subject.id == id);

                return (objs.length > 0) ? objs[0].value : "Not found.";
            },
            "Calc": (id) => {
                let objs = calculations.filter(calculation => calculation.id == id);
                return (objs.length > 0) ? objs[0].name : "Not found.";
            },
            "Val": (id) => {
                let objs = calculations.filter(calculation => calculation.id == id);
                return (objs.length > 0) ? objs[0].value : "Not found.";
            },
        }

        let matches = result.match(/\{\{(Q|A|Calc|Val)\d+\}\}/g);
        for (let i = 0; matches && i < matches.length; i ++) {
            let tag = matches[i].replace(/\{|\}/g, "");
            let option = tag.match(/(Q|A|Calc|Val)/g)[0];
            let ID = tag.match(/\d+/g)[0];

            let content = getValue[option](ID);
            let pattern = new RegExp(matches[i], "g");
            result = result.replace(pattern, content);
        }

        return result;
    }

    /**
     * Replace all of tags within analyses' result text with real content.
     * Originally the result text has tags like {{Q3}}, {{A5}} for subjects and {{Calc2}}, {{Val6}}.
     * Those tags should be replaced with corresponding values.
     * @param {array} subjects 
     * @param {array} calculations 
     * @param {array} analyses 
     * @param {function} callback 
     * @return {void}
     */
    const replaceTagsWithRealValues = (subjects, calculations, analyses, callback) => {
        for (let i = 0; i < analyses.length; i ++) {
            analyses[i].result = processAnalysisResult(analyses[i].result, subjects, calculations);
        }

        if (typeof callback === "function") {
            callback(analyses);
        }
    }

    /**
     * Get all analysis corresponding to answers given by a lead.
     * @param {array} subjects 
     * @param {array} calculations 
     * @param {function} callback 
     * @return {void}
     */
    const getMatchedAnalyses = (subjects, calculations, callback) => {
        DataStorage.Analysis.get(_selectedWizard.id, (analyses) => {
            let result = [];
            for (let i = 0; i < analyses.length; i ++) {
                let condition = analyses[i].condition;
                let matchFlag = true;

                if (typeof condition === "string") {
                    condition = JSON.parse(condition);
                }

                let condSubjects = condition.subjects;
                let condCalculations = condition.calculations;

                for (let j = 0; j < condSubjects.length; j ++) {
                    let matches = [];
                    
                    if (subjects[0].subject_id) {
                        matches = subjects.filter(subject => subject.subject_id == condSubjects[j].id);
                    } else {
                        matches = subjects.filter(subject => subject.id == condSubjects[j].id);
                    }

                    if (matches.length == 0 || !checkMatch(condSubjects[j], matches[0])) {
                        matchFlag = false;
                        break;
                    }
                }

                for (let j = 0; j < condCalculations.length && matchFlag; j ++) {
                    let matches = calculations.filter(calculation => calculation.id == condCalculations[j].id);

                    if (matches.length == 0 || !checkMatch(condCalculations[j], matches[0])) {
                        matchFlag = false;
                        break;
                    }
                }

                if (matchFlag) {
                    result.push(analyses[i]);
                }
            }

            replaceTagsWithRealValues(subjects, calculations, result, callback);
        })
    }

    /**
     * Compute all calculations for a given answers.
     * And call function to get analyses matched with answers given by user.
     * @param {array} subjects 
     * @param {function} callback 
     * @return {void}
     */
    const computeCalculations = (subjects, callback) => {
        DataStorage.Calculations.get(_selectedWizard.id, (calculations) => {
            for (let i = 0; i < calculations.length; i ++) {
                let cal = calculations[i];
                let factors = cal.factors;
                let op = cal.operator;
                let value = 0;
                let calc = {
                    "+": (src, coeff, operand) => { return src + coeff * operand; },
                    "-": (src, coeff, operand) => { return src - coeff * operand; },
                    "*": (src, coeff, operand) => { return src * coeff * operand; },
                    "/": (src, coeff, operand) => { return src / coeff * operand; }
                };

                if (typeof factors === "string") {
                    factors = JSON.parse(factors);
                }

                for (let j = 0; j < factors.length; j ++) {
                    let matches = [];
                    
                    if (subjects[i].subject_id) {
                        matches = subjects.filter(subject => subject.subject_id == factors[j].id);
                    } else {
                        matches = subjects.filter(subject => subject.id == factors[j].id);
                    }
                    
                    value = calc[op](value, factors[j].coeff, matches[0].value);
                }

                calculations[i].value = value;
            }

            getMatchedAnalyses(subjects, calculations, callback);
        })
    }

    /**
     * Render Analayses panel based on answers given by leads.
     * @param {array} subjects 
     * @param {function} callback 
     * @return {void}
     */
    const renderAnalysisPanel = (subjects, isEditable, callback) => {
        let $panelBody = $(`#${settings.analysis.panel.id} div.panel-body`);
        $panelBody.children().remove();

        let analysisTextSource = $("#analysis-text-template").html(),
            analysisTextTemplate = Handlebars.compile(analysisTextSource);

        computeCalculations(subjects, (analyses) => {
            $panelBody.append(
                $(analysisTextTemplate({analyses}))
            );

            if (isEditable) {
                $(`#${settings.analysis.submitButton.id}`).show();
            } else {
                $(`#${settings.analysis.submitButton.id}`).hide();
            }
            
            goTo(settings.analysis.panel.id);
        });
    }

    /**
     * Funtion to satrt showing Questions and Answers once a lead choose a wizard.
     * @param {object} wizard 
     * @return {void}
     */
    const start = (wizard) => {
        _selectedWizard = wizard;
        let startPoint = wizard.starts_with;
        DataStorage.Subjects.find(startPoint, (subject) => {
            _selectedSubject = subject;
            renderSubjectPanel(subject);
            $(`#${settings.subject.panel.backButton.id}`).text("Back To Wizards");
        });

        /**
         * Temp function calls for dev
         */
        DataStorage.Subjects.get(_selectedWizard.id, (subjects) => { _subjects = subjects; });
        DataStorage.Calculations.get(_selectedWizard.id, (calculations) => { _calculations = calculations; });
    }

    /**
     * Function to render the corresponding Panel.
     * @param {string} panelID 
     * @return {void}
     */
    const goTo = (panelID) => {
        panelID = panelID || settings.wizards.panel.id;

        $("div.panel").hide();
        $(`#${panelID}`).show();
    }

    /**
     * Render Wizards list panel to show leads. In this page, leads will be able to select a wizard to give answers.
     * @return {void}
     */
    const renderWizardsPanel = () => {
        DataStorage.Wizards.get((wizards) => {
            DataStorage.Results.get(_userId, (results) => {
                let tableSource = $(`#${settings.wizards.tableTemplate.id}`).html(),
                    tableTemplate = Handlebars.compile(tableSource),
                    $wizardsPanelBody = $(`#${settings.wizards.panel.id} .panel-body`);

                $wizardsPanelBody.children().remove();

                for (let i = 0; i < wizards.length; i ++) {
                    let matchedReuslts = results.filter(result => result.wizard_id == wizards[i].id);

                    if (matchedReuslts.length > 0) {
                        wizards[i].isAnswered = true;
                        wizards[i].result_id = matchedReuslts[0].id;
                    } else {
                        wizards[i].isAnswered = false;
                    }
                }
                $wizardsPanelBody.append(
                    $(tableTemplate({
                        wizards: wizards
                    }))
                );

                goTo(settings.wizards.panel.id);
            });
        });
    }

    /**
     * Initialize with Identity of HTML element and API base url
     * @param {string} id 
     * @param {string} url ,
     * @param {number} userId
     */
    const init = (id, url, userId) => {
        $_container = $(`#${id}`);
        _apiBaseUrl = url;
        _userId = userId;
        renderWizardsPanel();
        initEvents();
    };

    /**
     * Function to get current answers given by a lead.
     * @return {object}
     */
    const getAnswers = () => {
        return {
            todo: _todo,
            done: _done
        };
    }

    /**
     * Parse HTML to extract answer given by leads.
     * @return {string}
     */
    const parseAnswer = () => {
        let $panelBody = $(`#${settings.subject.panel.id} div.panel-body`);
        let $inputs = $panelBody.find("input"),
            $textareas = $panelBody.find("textarea"),
            $selects = $panelBody.find("select");

        if ($selects.length > 0) {
            return $selects.eq(0).val()
        } else if ($inputs.length > 0) {
            if ($inputs.eq(0).attr("type") == "checkbox") {
                let values = [];

                for (let i = 0; i < $inputs.length; i ++) {
                    if ($inputs.eq(i).prop("checked")) {
                        values.push($inputs.eq(i).val());
                    }
                }

                return values.join("&&");
            } else {
                return $inputs.eq(0).val();
            }
        } else if ($textareas.length > 0) {
            return $textareas.eq(0).val();
        } else {
            return null;
        }
    }

    /**
     * Function to bind all of events needed in this page.
     * @return {void}
     */
    const initEvents = () => {
        $(document).on("click", $(`button.${settings.wizards.selectWizardButton.class}`), (event) => {

            if (event.target.className.split(" ").indexOf(settings.wizards.selectWizardButton.class) > 0) {
                let wizardID = event.target.getAttribute("data-id");

                DataStorage.Wizards.find(wizardID, (wizard) => {
                    // Code to render step by step Q&A wizard.
                    start(wizard);
                });
            }
        })
        .on("click", `button.${settings.wizards.selectResultButton.class}`, (event) => {
            if (event.target.className.split(" ").indexOf(settings.wizards.selectResultButton.class) > 0) {
                let resultId = event.target.getAttribute("data-id");

                DataStorage.Results.find(resultId, (response) => {
                    let result = response.result;
                    let answers = response.answers;

                    DataStorage.Wizards.find(result.wizard_id, (wizard) => {
                        // Code to render step by step Q&A wizard.
                        _selectedWizard = wizard;
                        renderAnalysisPanel(answers, false);
                    });
                })
            }
        })
        .on("click", $(`#${settings.subject.panel.id} div.panel-footer button.subject-control-button`), (event) => {
            // event.preventDefault();
            let targetID = event.target.getAttribute("data-target");

            if (event.target.className.split(" ").indexOf("subject-control-button") > 0) {
                _selectedSubject.value = parseAnswer();
                if (event.target.className.split(" ").indexOf("next") > -1) {
                    if (!validateForm()) {
                        alert("Please let us know your answers.");
                    } else if (!targetID) {
                        let answers = _selectedSubject.answers;
                        if (typeof answers == "string") {
                            answers = JSON.parse(answers);
                        }
                        answers = answers.filter(answer => answer.next != null);

                        if (answers.length > 0) {
                            alert("Please provide us your answers.");
                            return false;
                        } else {
                            //  Code to finish and show analysis page.
                            let buffer = _selectedSubject;
                            _done.push(buffer);
                            renderAnalysisPanel(_done, true);
                        }
                    } else {
                        let next = _todo.filter(item => item.id == targetID);

                        if (next.length > 0) {
                            let buffer = _selectedSubject;
                            _done.push(buffer);
                            _selectedSubject = next[0];
                            
                            renderSubjectPanel(_selectedSubject);
                        } else {
                            DataStorage.Subjects.find(targetID, (subject) => {
                                let buffer = _selectedSubject;
                                _done.push(buffer);
                                _selectedSubject = subject;
                                
                                renderSubjectPanel(_selectedSubject);
                            });
                        }

                        _todo = _todo.filter(item => item.id != targetID);
                    }

                } else if (event.target.className.split(" ").indexOf("prev") > -1) {
                    if (_done.length > 0) {
                        let buffer = _selectedSubject;
                        _todo.push(buffer);
                        _selectedSubject = _done.pop();
                        // let subject = _done.pop();
                        // _selectedSubject = subject;
                        renderSubjectPanel(_selectedSubject);
                    } else {
                        if (confirm("You will lost all of answers. Are you sure to go back to list?")) {
                            _todo = [];
                            _done = [];

                            goTo();
                        } else {
                            _selectedSubject
                        }
                    }
                }
            }
        })
        .on("change", $(`#${settings.subject.panel.id} input[name='answer-option-yes-no']`), (event) => {
            let index = parseInt(event.target.getAttribute("data-id"));
            let answers = _selectedSubject.answers;

            if (typeof answers == "string") {
                answers = JSON.parse(answers);
            }

            if ($(event.target).prop('checked')) {
                $("button.subject-control-button.next").attr({'data-target': answers[index].next});
            }
        })
        .on("keypress", $(`#${settings.subject.panel.id} div.panel-body`), (event) => {
            let keyCode = event.keyCode ? event.keyCode : event.which;

            if (keyCode == 13 && event.target.tagName.toLowerCase() != "textarea") {
                $(`#${settings.subject.panel.id} button.next`).click();
            }
        })
        .on("click", $(`#${settings.analysis.backToAnswersButton.id}`), (event) => {
            if (event.target.getAttribute("id") == settings.analysis.backToAnswersButton.id) {
                let buffer = _done.pop();
                _selectedSubject = buffer;
                //  To do
                goTo(settings.wizards.panel.id);
            }
        })
        .on("click", $(`#${settings.analysis.submitButton.id}`), (event) => {
            if (event.target.getAttribute("id") == settings.analysis.submitButton.id && confirm("Are you sure to submit your answers?")) {
                DataStorage.Results.insert(_userId ,_selectedWizard.id, _done, (response) => {
                    alert("Thanks for your answers.");
                    // renderWizardsPanel();
                    renderAnalysisPanel(_done, false);
                }, (response) => {
                    //  To do in failure.
                })
            }
        })
    }

    return {
        init: init,
        get: getAnswers
    };
})();