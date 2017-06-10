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
                id: "wizards-table-container",
                class: "panel panel-default",
                title: "Wizards List",
                newButtonID: "new-wizard-button"
            },
            "table": {
                id: "wizards-table",
                class: "table table-striped table-bordered"
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
     * Render new ziard form
     */
    const renderNewWizardForm = () => {
        
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