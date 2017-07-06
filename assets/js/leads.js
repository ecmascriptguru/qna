(function(window, jQuery) {
    // let hash = null;

    // const hashChangeHandler = (curHash) => {
    //     let pattern = /\d+/g;
    //     let matches = (curHash || "").match(pattern);
    //     let userId = 1;
    //     if (matches && matches.length > 0) {
    //         userId = parseInt(matches[0]);
    //     }

        
    // }

    // window.setInterval(() => {
    //     if (window.location.hash != hash) {
    //         hash = window.location.hash;
    //         hashChangeHandler(hash);
    //     }
    // }, 500);
    QuestionRenderer.init("qna-container", QNAConfig.baseUrl(), window.uId);
})(window, $);