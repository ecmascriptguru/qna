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
        $container = null;

    /**
     * TEST FUNCTION THAT CHECKS IF IT DOES WORK OR NOT.
     */
    const renderSomething = () => {
        $container.append(
            $("<center><h2>Admin Library does work now.</h2></center>")
        );
    };

    /**
     * Initialize this object with ID of element and API base URL
     * @param { string } containerID 
     * @param { string } apiBaseUrl 
     */
    const init = (containerID, apiBaseUrl) => {
        $container = $(`#${containerID}`);
        _apiBaseUrl = apiBaseUrl;
        renderSomething();
    };

    return {
        init: init
    };
})();


let QuestionRenderer = (() => {
    let _data = [],
        _something = null,
        _apiBaseUrl = null,
        $container = null;

    /**
     * TEST FUNCTION THAT CHECKS IF IT DOES WORK OR NOT.
     */
    const renderSomething = () => {
        $container.append(
            $("<center><h2>Front end User Library does work now.</h2></center>")
        );
    };


    /**
     * Initialize with Identity of HTML element and API base url
     * @param {string} id 
     * @param {string} url 
     */
    const init = (id, url) => {
        $container = $(`#${id}`);
        _apiBaseUrl = url;
        renderSomething();
    };

    return {
        init: init
    };
})();