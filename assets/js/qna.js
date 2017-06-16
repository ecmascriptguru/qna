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
        _analytics = [],
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
            "analysisTable": {
                id: "analysis-table",
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
        newAnalysis: {
            panel: {
                id: "new-analysis-panel",
                class: "panel panel-default",
                title: "Create a new Analysis"
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
            operatorSelect: {
                id: "new-analysis-operator-select",
                class: "form-control"
            },
            factorsContainer: {
                id: "new-analysis-factors-container",
                class: "",
                title: ""
            },
            dataInfoContainer: {
                id: "new-analysis-data-info-container"
            }
        }
    }

    /**
     * TEST FUNCTION THAT CHECKS IF IT DOES WORK OR NOT.
     */
    const renderSomething = () => {
        $_container.append(
            $("<center><h2>Admin Library does work now.</h2></center>")
        );
    };

    /**
     * Go to Next Step
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
            });
        }
        goTo(settings.newWizard.panel.id);
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
        updateAnalysisTable();
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
     * Render New Analysis Panel. Analysis parameter can be null/empty when you create a new Analysis.
     * @param {object} analysis
     */
    const renderNewAnalysisForm = (analysis) => {
        let panel = $(`#${settings.newAnalysis.panel.id}`),
            backToAnalysissButton = $(`#${settings.newAnalysis.backButton.id}`),
            createAnalysisButton = $(`#${settings.newAnalysis.createButton.id}`),
            nameInput = $(`#${settings.newAnalysis.nameInput.id}`),
            operatorSelect = $(`#${settings.newAnalysis.operatorSelect.id}`),
            factorsContainer = $(`#${settings.newAnalysis.factorsContainer.id}`),
            dataInfoContainer = $(`#new-analysis-data-info-container`);

        DataStorage.Subjects.get(_selected_wizard, (subjects) => {
            if (analysis) {
                createAnalysisButton.attr({
                    "data-id": analysis.id,
                    "data-action": "update"
                });
                nameInput.val(analysis.name);
                operatorSelect.val(analysis.operator);
                renderExistingFactorOptions(analysis, factorsContainer, dataInfoContainer);
            } else {
                createAnalysisButton.attr({
                    "data-id": null,
                    "data-action": "create"
                });
                nameInput.val("");
                operatorSelect.val(1).change();
                factorsContainer.children().remove();

                let factorSource = $("#new-analysis-factor-option-template").html(),
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
        let $options = $(`#${settings.newAnalysis.factorsContainer.id} div.factor-option`);

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
                });
            }

            if (type.type_name == "Drop Down" || type.type_name == "Multiple Choice") {
                let source = $("#add-new-answer-option-button").html();
                let template = Handlebars.compile(source);
                container.append(
                    $(template())
                );
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
     * Render answer options from existing analysis's answer options.
     * @param {object} analysis
     * @param {object} container
     * @param {object} monitor
     */
    const renderExistingFactorOptions = (analysis, container, monitor) => {
        let factors = null;
        container.children().remove();
        if (analysis.factors) {
            if (typeof analysis.factors == "string") {
                factors = JSON.parse(analysis.factors || "[]");
            } else if (typeof analysis.factors == "object") {
                factors = analysis.factors;
            }

            DataStorage.Subjects.get(_selected_wizard, (subjects) => {
                for (let i = 0; i < factors.length; i ++) {
                    let source = $("#new-analysis-factor-option-template").html();
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
            });
        }

        let source = $("#add-new-factor-option-button").html();
        let template = Handlebars.compile(source);
        container.append(
            $(template())
        );
        
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
     * Update local subject Database. can be called refreshing for analysis.
     * @param {function} callback
     */
    const updateLocalAnalysis = (callback) => {
        DataStorage.Analysis.get(_selected_wizard, (analysis) => {
            _analysis = analysis;

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
     * Create a new analysis with properties given by admin
     * @param {object} params
     */
    const createAnalysis = (params) => {
        DataStorage.Analysis.insert(params, () => {
            if (_subjectsStack.length == 0) {
                renderSubjectsPanel();
            }// else {
            //    renderNewSubjectForm(_subjectsStack.pop());
            //}
            updateLocalAnalysis();
        });
    }

    /**
     * Update an existing analysis
     * @param {object} params
     */
    const updateAnalysis = (params) => {
        DataStorage.Analysis.update(params.id, params, (response) => {
            updateLocalAnalysis(() => {
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

    const updateAnalysisTable = () => {
        DataStorage.Analysis.get(_selected_wizard, (analytics) => {
            _analytics = analytics;
            let table = $(`#${settings.subjects.analysisTable.id}`);
            let source = $("#analysis-table-template").html();
            let template = Handlebars.compile(source);
            table.html(template({
                analytics: analytics,
                class: settings.subjects.analysisTable.class,
                id: settings.subjects.analysisTable.id
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
            let $container = $(event.target).parents(`#${settings.newAnalysis.factorsContainer.id}`);
            let source = $("#new-analysis-factor-option-template").html();
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
                    createAnalysis(params);
                } else if (event.target.getAttribute("data-action") == "update") {
                    updateAnalysis(params);
                }
            } else {
                alert("Name can't be empty!");
            }
            //  Creating a new wizard
        }).on("click", `#${settings.newSubject.backButton.id}`, () => {
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
        }).on("click", "button.analysis-delete", (event) => {
            let $record = $(event.target).parents("tr");
            let id = $record.attr("data-analysis-id");

            DataStorage.Analysis.remove(id, () => {
                renderSubjectsPanel();
                goTo(settings.subjects.panel.id);
            });
        }).on("click", "button.wizard-edit", (event) => {
            let $record = $(event.target).parents("tr");
            let wizardId = $record.attr("data-wizard-id");

            DataStorage.Wizards.find(wizardId, (wizard) => {
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