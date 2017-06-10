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
                newButtonID: "new-wizard-button"
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
                title: "Create"
            },
            nameInput: {
                id: "new-wizard-name-input",
                class: "form-control",
                title: "Wizard Name"
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
    }

    /**
     * Render new ziard form
     */
    const renderNewWizardForm = () => {
        let panel = null,
            backToWizardsButton = null,
            createWizardButton = null,
            wizardNameInput = null;
        if ($(`#${settings.newWizard.panel.id}`).length > 0) {
            panel = $(`#${settings.newWizard.panel.id}`).eq(0);
            backToWizardsButton = $(`#${settings.newWizard.panel.id} button#${settings.newWizard.backButton.id}`).eq(0);
            createWizardButton = $(`#${settings.newWizard.panel.id} button#${settings.newWizard.createButton.id}`).eq(0);
            createWizardButton = $(`#${settings.newWizard.panel.id} input#${settings.newWizard.nameInput.id}`).eq(0);
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
        }
        goTo(settings.newWizard.panel.id);
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
            newButton = $("<button/>").addClass("btn btn-default pull-right").text("New Wizard").attr({id: settings.wizards.panel.newButtonID}).css({
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
                $("<th/>").text("#"),
                $("<th/>").text("Wizard Name"),
                $("<th/>").text("Actions")
            ).appendTo(tHead);
            table.append(tHead, tBody);

        panelBody.append(table);
        // $_wizardsTable = table.DataTable();

        $_container.append(containerPanel);

        // Binding Event to new Button
        newButton.click(renderNewWizardForm);
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