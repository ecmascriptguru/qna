let QNAConfig = (() => {
    let env = "dev";
    // let env = "demo";
    // let env = "production";

    const getBaseUrl = () => {
        if (env === "dev" || env === "demo") {
            baseUrl = "http://qna.dev:8000/api/api.php";
        } else {
            baseUrl = "http://98.142.208.206/~alexdev/";
        }
        return baseUrl;
    }
    return {
        env: env,
        baseUrl: getBaseUrl
    };
})();
        