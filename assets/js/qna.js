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
                newButtonText: "New Wizard"
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
                id: "new-analysis-subject-select",
                class: "form-control"
            },
            subjectAddButton: {
                id: "new-analysis-subject-add-button",
                class: "btn btn-default"
            },
            answersSelect: {
                id: "new-analysis-answers-select",
                class: "form-control"
            },
            calculationSelect: {
                id: "new-analysis-calculation-select",
                class: "form-control"
            },
            calculationAddButton: {
                id: "new-analysis-calculation-add-button",
                class: "btn btn-default"
            },
            dataInfoContainer: {
                id: "new-analysis-data-info-container"
            },
            hiddenConditionInput: {
                id: "new-analysis-condition-value"
            },
            hiddenResultInput: {
                id: "new-analysis-result-value"
            }
        }
    }

    /**
     * Go to a given Step
     * @param {string} step
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
        goTo(settings.subjects.panel.id);
    }

    /**
     * Render New Subject Panel. Subject parameter can be null/empty when you create a new Subject.
     * @param {object} subject
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
        });

        if (subject) {
            createSubjectButton.attr({
                "data-id": subject.id,
                "data-action": "update"
            });
            questionInput.val(subject.question);
            typeSelect.val(subject.type_id);
            renderExistingAnswerOptions(subject, answersContainer, dataInfoContainer);
        } else {
            createSubjectButton.attr({
                "data-id": null,
                "data-action": "create"
            });
            questionInput.val("");
            typeSelect.val(1).change();
        }

        goTo(settings.newSubject.panel.id);
    }

    /**
     * Render New Calculation Panel. Calculation parameter can be null/empty when you create a new Calculation.
     * @param {object} calculation
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
     */
    const renderNewAnalysisForm = (analysis) => {
        let panel = $(`#${settings.newAnalysis.panel.id}`),
            createAnalaysisButton = $(`#${settings.newAnalysis.createButton.id}`),
            nameInput = $(`#${settings.newAnalysis.nameInput.id}`),
            subjectSelect = $(`#${settings.newAnalysis.subjectSelect.id}`),
            answersSelect = $(`#${settings.newAnalysis.answersSelect.id}`),
            calculationSelect = $(`#${settings.newAnalysis.calculationSelect.id}`),
            dataInfoContainer = $(`#new-analysis-data-info-container`);

        DataStorage.Analysis.options(_selected_wizard, (options) => {
            let calculationSelectSource = $("#new-anlysis-calculation-select-template").html(),
                calculationSelectTemplate = Handlebars.compile(calculationSelectSource),
                subjectSelectSource = $("#new-analysis-subject-select-template").html(),
                subjectSelectTemplate = Handlebars.compile(subjectSelectSource),
                answersSelectSource = $("#new-analysis-answers-select-template").html(),
                answersSelectTemplate = Handlebars.compile(answersSelectSource);

            subjectSelect.html(subjectSelectTemplate({
                subjects: options.subjects
            }));

            calculationSelect.html(calculationSelectTemplate({
                calculations: options.calculations
            }));

            if (analysis) {
                createAnalaysisButton.attr({
                    "data-id": analysis.id,
                    "data-action": "update"
                });
                nameInput.val(analysis.name);
            } else {
                createAnalaysisButton.attr({
                    "data-id": null,
                    "data-action": "create"
                });
                nameInput.val("");
            }
        });

        goTo(settings.newAnalysis.panel.id);
    }

    /**
     * Extract values from answer types configuration. Not done yet.
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
     */
    const updateLocalCalculations = (callback) => {
        DataStorage.Calculations.get(_selected_wizard, (calculation) => {
            _calculation = calculation;

            if (typeof callback == "function") {
                callback();
            }
        });
    }

    /**
     * Create a new subject with properties given by admin
     * @param {object} params
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
     * Rerender wizards table with data pulled from data store.
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
     * Get subjects select option 
     * @param {integer} id
     * @param {object} params
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
            if ($(`#${settings.newAnalysis.nameInput.id}`).val() !== "") {
                let params = {
                    id: event.target.getAttribute("data-id"),
                    wizard_id: _selected_wizard,
                    name: $(`#${settings.newAnalysis.nameInput.id}`).val().trim(),
                    operator: $(`#${settings.newAnalysis.operatorSelect.id}`).val(),
                    factors: extractFactorsFromFactorOptionsConfig()
                }
                if (event.target.getAttribute("data-action") == "create") {
                    // createCalculation(params);
                } else if (event.target.getAttribute("data-action") == "update") {
                    // updateCalculation(params);
                }
            } else {
                alert("Name can't be empty!");
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
                renderNewCalculationForm(analysis);
                goTo(settings.newCalculation.panel.id);
            });
        }).on("click", "button.subject-delete", (event) => {
            let $record = $(event.target).parents("tr");
            let id = $record.attr("data-subject-id");

            DataStorage.Subjects.remove(id, () => {
                renderSubjectsPanel();
                goTo(settings.subjects.panel.id);
            });
        }).on("click", "button.calculation-delete", (event) => {
            let $record = $(event.target).parents("tr");
            let id = $record.attr("data-calculation-id");

            DataStorage.Calculations.remove(id, () => {
                renderSubjectsPanel();
                goTo(settings.subjects.panel.id);
            });
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
            event.preventDefault();
            if (event.target.getAttribute("id") != settings.newAnalysis.subjectSelect.id) {
                return false;
            }
            let curSelectedSubjectId = event.target.value;

            DataStorage.Subjects.find(curSelectedSubjectId, (subject) => {
                let source = $("#new-analysis-answers-select-template").html(),
                    template = Handlebars.compile(source),
                    answersSelect = $(`#${settings.newAnalysis.answersSelect.id}`);

                let values = (typeof subject.answers == "object") ? subject.answers : JSON.parse(subject.answers);
                answersSelect.html(
                    $(template({
                        values: values
                    }))
                );
            })
        }).on("click", $(`#${settings.newAnalysis.subjectAddButton.id}`), (event) => {
            let $condition = $(`#${settings.newAnalysis.hiddenConditionInput.id}`),
                $subjectSelect = $(`#${settings.newAnalysis.subjectSelect.id}`),
                $answersSelect = $(`#${settings.newAnalysis.answersSelect.id}`);

            let objCondition = JSON.parse($condition.val()),
                subId = parseInt($subjectSelect.val()),
                answer = $answersSelect.val();

            objCondition.subjects.push({
                id,
                answer
            });
            $condition.val(JSON.stringify(objCondition));
            //  Code to render subject/answer configuration
        }).on("click", $(`#${settings.newAnalysis.calculationAddButton.id}`), (event) => {
            //
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

    /**
     * TEST FUNCTION THAT CHECKS IF IT DOES WORK OR NOT.
     */
    const renderSomething = () => {
        $_container.append(
            $("<center><h2>Front end User Library does work now.</h2></center>")
        );
    };


    /**
     * Initialize with Identity of HTML element and API base url
     * @param {string} id 
     * @param {string} url 
     */
    const init = (id, url) => {
        $_container = $(`#${id}`);
        _apiBaseUrl = url;
        renderSomething();
    };

    return {
        init: init
    };
})();