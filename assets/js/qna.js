/**
 * Questions and Answers Rendering Tool
 * Created By Alexis Richard
 * ecmascript.guru@gmail.com
 * Created At June 8, 2017
 */
let QuestionGenerator = (() => {
    let _data = [],
        _something = null,
        _apiBaseUrl = null,
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
            }
        },
        subjects: {
            "panel": {
                id: "subjects-panel",
                class: "panel panel-default",
                title: "subjects List",
                newButton: {
                    id: "new-subject-button",
                    title: "New Subject",
                    class: "btn btn-default pull-right"
                }
            },
            "table": {
                id: "subjects-table",
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
                title: "Create"
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
     */
    const goTo = (step) => {
        if (!step) {
            step = settings.wizards.panel.id;
        }
        $(".panel.active").removeClass("active");
        $(`#${step}`).addClass("active")

        //  Redrawing tables
        if (step == settings.wizards.panel.id) {
            renderWizardsTable();
        }
    }

    /**
     * Render new ziard form
     */
    const renderNewWizardForm = (wizard) => {
        let panel = null,
            backToWizardsButton = null,
            createWizardButton = null,
            wizardNameInput = null;
        if ($(`#${settings.newWizard.panel.id}`).length > 0) {
            panel = $(`#${settings.newWizard.panel.id}`).eq(0);
            backToWizardsButton = $(`#${settings.newWizard.panel.id} button#${settings.newWizard.backButton.id}`).eq(0);
            createWizardButton = $(`#${settings.newWizard.panel.id} button#${settings.newWizard.createButton.id}`).eq(0);
            wizardNameInput = $(`#${settings.newWizard.panel.id} input#${settings.newWizard.nameInput.id}`).eq(0);
        } else {
            panel = $("<div/>").addClass(settings.newWizard.panel.class).attr({id: settings.newWizard.panel.id});
            let panelHeader = $("<div/>").addClass("panel-heading").append(
                    $("<h3/>").text(settings.newWizard.panel.title)
                ),
                panelBody = $("<div/>").addClass("panel-body"),
                panelFooter = $("<div/>").addClass("panel-footer");

            backToWizardsButton = $("<button/>").addClass(settings.newWizard.backButton.class)
                .text(settings.newWizard.backButton.title)
                .attr({
                    id: settings.newWizard.backButton.id
                });
            createWizardButton = $("<button/>").addClass(settings.newWizard.createButton.class)
                .text(settings.newWizard.createButton.title)
                .attr({
                    id: settings.newWizard.createButton.id
                });
                //  Adding buttons to panel footer
                panelFooter.append(
                    $("<div/>").addClass("row").append(
                        $("<div/>").addClass("col-lg-2 col-md-3 col-sm-4 col-xs-6").append(backToWizardsButton),
                        $("<div/>").addClass("col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6").append(createWizardButton)
                    )
                );

            wizardNameInput = $("<input/>").addClass(settings.newWizard.nameInput.class)
                .attr({
                    id: settings.newWizard.nameInput.id,
                    placeHolder: settings.newWizard.nameInput.title
                });
                //  Adding Input to panel body
                panelBody.append(
                    $("<div/>").addClass("form-group").append(
                        $("<label/>").attr({for: settings.newWizard.nameInput.id}).text(settings.newWizard.nameInput.title),
                        wizardNameInput
                    )
                );
            
            panel.append(panelHeader, panelBody, panelFooter);
            $_container.append(panel);

            backToWizardsButton.click(() => {
                goTo();
            });

            createWizardButton.click((event) => {
                if (wizardNameInput.val() !== "") {
                    let action = event.target.getAttribute("data-action");
                    let id = event.target.getAttribute("data-id");

                    if (action == "create") {
                        createWizard(wizardNameInput.val())
                    } else if (action == "update") {
                        updateWizard(id, wizardNameInput.val());
                    }
                } else {
                    alert("Wizard Name can't be empty!");
                }
                //  Creating a new wizard
            })
        }

        if (!wizard) {
            wizardNameInput.val("");
            createWizardButton.attr({"data-action": "create"});
        } else {
            wizardNameInput.val(wizard.name);
            createWizardButton.attr({"data-action": "update", "data-id": wizard.id});
        }
        goTo(settings.newWizard.panel.id);
    }

    /**
     * Render subjects(Questions and Answers) panel. This panel will be shown once a new wizard created.
     */
    const renderSubjectsPanel = (wizardName) => {
        //  Initializing container panel.
        if ($(`#${settings.subjects.panel.id}`).length == 0) {
            let containerPanel = $("<div/>").addClass(settings.subjects.panel.class).attr({
                    id: settings.subjects.panel.id
                }),
                panelHeader = $("<div/>").addClass("panel-heading"),
                newButton = $("<button/>").addClass(settings.subjects.panel.newButton.class)
                    .text(settings.subjects.panel.newButton.title)
                    .attr({id: settings.subjects.panel.newButton.id}).css({
                        position: "absolute",
                        "top": "25px",
                        "right": "15px"
                    }),
                panelBody = $("<div/>").addClass("panel-body"),
                panelFooter = $("<div/>").addClass("panel-footer");

                panelHeader.css({position: "relative"}).append(
                    $("<h3/>").text(settings.subjects.panel.title),
                    newButton
                ).appendTo(containerPanel);

                panelBody.appendTo(containerPanel);
                backToWizardsButton = $("<button/>").addClass("btn btn-default").text("Back To Wizards");
                panelFooter.append(
                    backToWizardsButton
                ).appendTo(containerPanel);

            //  Initializing Subjects table.
            let table = $("<table/>").addClass(settings.subjects.table.class)
                .attr({
                    id: settings.subjects.table.id
                }),
                tHead = $("<thead/>"),
                tHeadRecord = $("<tr/>"),
                tBody = $("<tbody/>");

                tHeadRecord.append(
                    $("<th/>").text("#"),
                    $("<th/>").text("Question"),
                    $("<th/>").text("Answer Type"),
                    $("<th/>").text("Actions")
                ).appendTo(tHead);
                table.append(tHead, tBody);

            panelBody.append(table);

            $_container.append(containerPanel);

            // Binding Event to new Button
            newButton.click(renderNewSubjectForm);
            backToWizardsButton.click(() => {
                goTo(settings.wizards.panel.id);
            })
        }
        goTo(settings.subjects.panel.id);
    }

    /**
     * Render New Subject Panel
     */
    const renderNewSubjectForm = () => {
        let panel = null,
            backToSubjectsButton = null,
            createSubjectButton = null,
            questionInput = null,
            typeSelect = null,
            answersContainer = null,
            dataInfoContainer = null;

        if ($(`#${settings.newSubject.panel.id}`).length > 0) {
            panel = $(`#${settings.newSubject.panel.id}`).eq(0);
            backToSubjectsButton = $(`#${settings.newSubject.panel.id} button#${settings.newSubject.backButton.id}`).eq(0);
            createSubjectButton = $(`#${settings.newSubject.panel.id} button#${settings.newSubject.createButton.id}`).eq(0);
            questionInput = $(`#${settings.newSubject.panel.id} input#${settings.newSubject.questionInput.id}`).eq(0);
            typeSelect = $(`#${settings.newSubject.panel.id} select#${settings.newSubject.typeSelect.id}`).eq(0);
            answersContainer = $(`#${settings.newSubject.panel.id} select#${settings.newSubject.answersContainer.id}`).eq(0);
            answerDataInfoContainer = $(`#${settings.newSubject.panel.id} select#new-subject-data-info-container`).eq(0);
        } else {
            panel = $("<div/>").addClass(settings.newSubject.panel.class).attr({id: settings.newSubject.panel.id});
            let panelHeader = $("<div/>").addClass("panel-heading").append(
                    $("<h3/>").text(settings.newSubject.panel.title)
                ),
                panelBody = $("<div/>").addClass("panel-body"),
                panelFooter = $("<div/>").addClass("panel-footer");

            backToSubjectsButton = $("<button/>").addClass(settings.newSubject.backButton.class)
                .text(settings.newSubject.backButton.title)
                .attr({
                    id: settings.newSubject.backButton.id
                });
            createSubjectButton = $("<button/>").addClass(settings.newSubject.createButton.class)
                .text(settings.newSubject.createButton.title)
                .attr({
                    id: settings.newSubject.createButton.id
                });
                //  Adding buttons to panel footer
                panelFooter.append(
                    $("<div/>").addClass("row").append(
                        $("<div/>").addClass("col-lg-2 col-md-3 col-sm-4 col-xs-6").append(backToSubjectsButton),
                        $("<div/>").addClass("col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6").append(createSubjectButton)
                    )
                );

            questionInput = $("<input/>").addClass(settings.newSubject.questionInput.class)
                .attr({
                    id: settings.newSubject.questionInput.id,
                    placeHolder: settings.newSubject.questionInput.title
                });
                //  Adding Input to panel body
                panelBody.append(
                    $("<div/>").addClass("form-group").append(
                        $("<label/>").attr({for: settings.newSubject.questionInput.id}).text(settings.newSubject.questionInput.title),
                        questionInput
                    )
                );

            typeSelect = $("<select/>").addClass(settings.newSubject.typeSelect.class)
                .attr({
                    id: settings.newSubject.typeSelect.id
                });
                values = settings.newSubject.typeSelect.values;
                for (let p in values) {
                    typeSelect.append(
                        $("<option/>").text(values[p]).val(p)
                    );
                }
                //  Adding Input to panel body
                panelBody.append(
                    $("<div/>").addClass("form-group").append(
                        $("<label/>").attr({for: settings.newSubject.typeSelect.id}).text(settings.newSubject.typeSelect.title),
                        typeSelect
                    )
                );

            dataInfoContainer = $("<div/>").addClass("form-group").attr({id: "new-subject-data-info-container"});
            panelBody.append(dataInfoContainer.text("Selected Type Info."));

            answersContainer = $("<div/>").addClass(settings.newSubject.answersContainer.class)
                .attr({
                    id: settings.newSubject.answersContainer.id
                });
                //  Adding Input to panel body
                panelBody.append(
                    answersContainer
                );
            
            panel.append(panelHeader, panelBody, panelFooter);
            $_container.append(panel);

            backToSubjectsButton.click(() => {
                goTo(settings.subjects.panel.id);
            });

            createSubjectButton.click(() => {
                if (questionInput.val() !== "") {
                    createWizard(wizardNameInput.val())
                } else {
                    alert("Question can't be empty!");
                }
                //  Creating a new wizard
            });

            typeSelect.change((event) => {
                renderAnswerOptions(event.target.value, answersContainer, dataInfoContainer);
            });
        }
        goTo(settings.newSubject.panel.id);
    }

    /**
     * Render Answer Types Container. This should render answer options according to answer type
     */
    const renderAnswerOptions = (value, container, monitor) => {
        DataStorage.Types.find(value, (type) => {
            container.children().remove();
            if (type) {
                let values = type.value;
                for (let i = 0; i < values.length; i ++) {
                    container.append(
                        $("<div/>").addClass("form-group row").append(
                            $("<div/>").addClass("col-lg-3 col-md-3 col-sm-sm-3 col-xs-6").append(
                                $("<input/>").attr({"data-id": "caption"}).val(values[i].caption).addClass("form-control")
                            ),
                            $("<div/>").addClass("col-lg-2 col-md-2 col-sm-sm-2 col-xs-6").append(
                                $("<input/>").attr({"data-id": "value"}).val(values[i].value).addClass("form-control")
                            ),
                            $("<div/>").addClass("col-lg-2 col-md-2 col-sm-sm-2 col-xs-4").append(
                                $("<input/>").attr({"type": "number", "data-id": "weight"}).val(values[i].weight).addClass("form-control")
                            ),
                            $("<div/>").addClass("col-lg-3 col-md-3 col-sm-sm-3 col-xs-4").append(
                                $("<select/>").attr({"data-id": "next"}).addClass("form-control").append(
                                    $("<option/>").val("aaa").text("AAA"),
                                    $("<option/>").val("bbb").text("BBB")
                                )
                            ),
                            $("<div/>").addClass("col-lg-2 col-md-2 col-sm-sm-2 col-xs-4").append(
                                $("<button/>").addClass("btn btn-danger form-control").text("Remove")
                            )
                        )
                    )
                }
            }
            
            monitor.children().remove();
            monitor.append(
                $("<pre/>").text(JSON.stringify((type || {}).value))
            );
        });
    }

    /**
     * Create a new Wizard with name property
     */
    const createWizard = (name) => {
        //  Code to create wizard here. Callback function should be used here.
        DataStorage.Wizards.insert(name, () => {
            renderSubjectsPanel(name);
        });
    }

    /**
     * Update an existing wizard
     */
    const updateWizard = (id, name) => {
        DataStorage.Wizards.update(id, name, () => {
            renderSubjectsPanel(name);
        });
    }

    /**
     * Create a new subject with properties given by admin
     */
    const createSubject = () => {
        alert("Creating a new subject");
    }

    /**
     * Rerender wizards table
     */
    const renderWizardsTable = () => {
        DataStorage.Wizards.get((wizards) => {
            let $tbody = $(`#${settings.wizards.table.id} tbody`);
            $tbody.children().remove();

            for (let i = 0; i < wizards.length; i ++) {
                $tbody.append(
                    $("<tr/>").attr({"data-wizard-id": wizards[i].id}).append(
                        $("<td/>").text(i + 1),
                        $("<td/>").text(wizards[i].name),
                        $("<td/>").append(
                            $("<div/>").addClass("col-xs-6").append($("<button/>").addClass("btn btn-info form-control wizard-edit").text("Edit")),
                            $("<div/>").addClass("col-xs-6").append($("<button/>").addClass("btn btn-danger form-control wizard-delete").text("Del"))
                        )
                    )
                )
            }
        })
    }

    /**
     * Render wizards talbe
     */
    const initWizardsTable = () => {
        //  Initializing container panel.
        let containerPanel = $("<div/>").addClass(settings.wizards.panel.class).attr({
                id: settings.wizards.panel.id
            }),
            panelHeader = $("<div/>").addClass("panel-heading"),
            newButton = $("<button/>").addClass("btn btn-default pull-right")
                .text(settings.wizards.panel.newButtonText).attr({id: settings.wizards.panel.newButtonID}).css({
                    position: "absolute",
                    "top": "25px",
                    "right": "15px"
                }),
            panelBody = $("<div/>").addClass("panel-body"),
            panelFooter = $("<div/>").addClass("panel-footer");

            panelHeader.css({position: "relative"}).append(
                $("<h3/>").text(settings.wizards.panel.title),
                newButton
            ).appendTo(containerPanel);

            panelBody.appendTo(containerPanel);

            panelFooter.append(
                $("<button/>").addClass("btn btn-primary").text("Something")
            ).appendTo(containerPanel);

        //  Initializing wizards table.
        let table = $("<table/>").addClass(settings.wizards.table.class).attr({
                id: settings.wizards.table.id
            }),
            tHead = $("<thead/>"),
            tHeadRecord = $("<tr/>"),
            tBody = $("<tbody/>");

            tHeadRecord.append(
                $("<th/>").css({width: "80px"}).text("#"),
                $("<th/>").text("Wizard Name"),
                $("<th/>").css({width: "240px"}).text("Actions")
            ).appendTo(tHead);
            table.append(tHead, tBody);

        panelBody.append(table);
        // $_wizardsTable = table.DataTable();

        $_container.append(containerPanel);

        // Binding Event to new Button
        newButton.click(() => {
            renderNewWizardForm();
        });

        table.on("click", "button.wizard-edit", (event) => {
            let $record = $(event.target).parents("tr");
            let wizardId = $record.attr("data-wizard-id");

            DataStorage.Wizards.find(wizardId, (wizard) => {
                renderNewWizardForm(wizard);
            });
        }).on("click", "button.wizard-delete", (event) => {
            let $record = $(event.target).parents("tr");
            let wizardId = $record.attr("data-wizard-id");

            DataStorage.Wizards.remove(wizardId, () => {
                renderWizardsTable();
            });
            // $(event.target).parents("tr").remove();
        })

        renderWizardsTable();
    }

    /**
     * Initialize Components
     */
    const initComponents = () => {
        //  Render wizards list table
        initWizardsTable();
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