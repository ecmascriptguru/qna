/**
 * Questions and Answers Rendering Tool
 * Created By Alexis Richard
 * ecmascript.guru@gmail.com
 * Created At June 10, 2017
 */
let env = QNAConfig.env;
let DataStorage = (() => {
    /**
     * Send Ajax Request
     * @param {string} url 
     * @param {object} params 
     * @param {function} success 
     * @param {function} failure 
     */
    const sendRequest = (url, params, success, failure) => {
        $.ajax({
            url: url,
            method: "post",
            data: params,
            success: (response) => {
                response = JSON.parse(response);
                if (typeof success === "function") {
                    success(response);
                } else {
                    console.log(response);
                }
            },
            error: (xhr, status, err) => {
                if (typeof failure === "function") {
                    failure(xhr, status, err);
                }
            }
        });
    };

    /**
     * Answer Types
     */
    let AnswerTypes = (() => {
        const _types = Constants.types;

        /**
         * Getting all of Answer Types. Callback function can be null or empty
         * @param {function} success
         * @param {function} failure
         * @return {void}
         */
        const get = (success, failure) => {
            if (env == "demo") {
                if (typeof success === "function")
                    success(_types);
                else
                    return _types;
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "types",
                    action: "get_all",
                    params: JSON.stringify({})
                }, (response) => {
                    if (response.status) {
                        let types = response.types;
                        for (let i = 0; i < types.length; i ++) {
                            if (typeof types[i].value == "string") {
                                types[i].value = JSON.parse(types[i].value);
                            }
                        }
                        success(types);
                    } else {
                        success([]);
                    }
                }, failure);
            }
        }

        /**
         * Find a Answer Type with ID.
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure
         * @return {object}
         */
        const find = (id, success, failure) => {
            if (env === "demo") {
                for( let i = 0; i < _types.length; i ++) {
                    if (_types[i].id == parseInt(id)) {
                        if (typeof success === "function") {
                            success(_types[i]);
                            return false;
                        } else {
                            return _types[i];
                        }
                    }
                }
                if (typeof success === "function") {
                    success(null);
                } else {
                    return null;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "types",
                    action: "get",
                    id: id,
                    params: JSON.stringify({})
                }, (response) => {
                    if (response.status) {
                        if (typeof response.type.value == "string") {
                            response.type.value = JSON.parse(response.type.value);
                        }
                        success(response.type);
                    } else {
                        success({});
                    }
                }, failure);
            }   
        }

        return {
            get: get,
            find: find
        };
    })();

    let Wizards = (() => {
        let _wizards = Constants.wizards;
        let _calculations = Constants.calculations;
        let _analyses = Constants.analyses;

        let _offset = 3;

        /**
         * Getting all of Question and Answer Wizards
         * @param {function} success 
         * @param {function} failure
         * @return {array}
         */
        const get = (success, failure) => {
            if (env === "demo") {
                if (typeof success === "function") {
                    success(_wizards);
                } else {
                    return _wizards;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "wizards",
                    action: "get_all",
                    params: JSON.stringify({})
                }, (response) => {
                    if (response.status) {
                        success(response.wizards);
                    } else {
                        success([]);
                    }
                }, failure);
            }   
        }

        /**
         * Create a new wizard with the given name parameter.
         * @param {object} name 
         * @param {function} success 
         * @param {function} failure
         */
        const addWizard = (params, success, failure) => {
            if (env === "demo") {
                wizard = {
                    id: _offset,
                    name: params.name,
                    starts_with: params.starts_with
                }

                _wizards.push(wizard);
                _offset++;

                if (typeof success === "function") {
                    success({id: _offset - 1});
                } else {
                    return _offset - 1;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "wizards",
                    action: "create",
                    params: JSON.stringify({
                        name: params.name,
                        starts_with: params.starts_with
                    })
                }, (response) => {
                    if (response.status) {
                        success({
                            id: response.wizard_id
                        });
                    } else {
                        success([]);
                    }
                }, failure);
            }
                
        }

        /**
         * Update an existing wizard
         * @param {number} id 
         * @param {object} params 
         * @param {function} success 
         * @param {function} failure
         * @return {boolean}
         */
        const updateWizard = (id, params, success, failure) => {
            if (env === "demo") {
                let flag = false;
                for (let i = 0; i < _wizards.length; i ++) {
                    if (_wizards[i].id == id) {
                        _wizards[i].name = params.newName;
                        _wizards[i].starts_with = params.starts_with;
                        flag = true;
                        break;
                    }
                }
                
                if (typeof success == "function") {
                    success(flag);
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "wizards",
                    action: "update",
                    params: JSON.stringify({
                        id: id,
                        name: params.newName,
                        starts_with: params.starts_with
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.wizard_id);
                    } else {
                        success([]);
                    }
                }, failure);
            }
        }

        /**
         * Retrieve wizards with ID.
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure
         */
        const findWizard = (id, success, failure) => {
            if (env === "demo") {
                for (let i = 0; i < _wizards.length; i ++) {
                    if (_wizards[i].id == id) {
                        if (typeof success === "function") {
                            success(_wizards[i]);
                            break;
                        }
                    }
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "wizards",
                    action: "get",
                    params: JSON.stringify({
                        id: id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.wizard);
                    } else {
                        success([]);
                    }
                }, failure);
            }
        }

        /**
         * Getting settings like calculations, analyses for a given wizard. This will be used to render result panel.
         * @param {number} wizardId 
         * @param {function} success 
         * @param {function} failure 
         */
        const getSettings = (wizardId, success, failure) => {
            if (env === "demo") {
                let calculations = _calculations.filter(cal => cal.wizard_id == wizardId);
                let analyses = _analyses.filter(cal => cal.wizard_id == wizardId);
                if (typeof success === "function") {
                    success({
                        calculations,
                        analyses
                    });
                } else {
                    return {
                        calculations,
                        analyses
                    };
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "wizards",
                    action: "settings",
                    params: JSON.stringify({
                        id: wizardId
                    })
                }, (response) => {
                    if (response.status) {
                        success(response);
                    } else {
                        success({
                            calculations: [],
                            analyses: []
                        });
                    }
                }, failure);
            }
        }

        /**
         * 
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure
         */
        const deleteWizard = (id, success, failure) => {
            if (env === "demo") {
                _wizards = _wizards.filter(wizard => wizard.id != id);
                if (typeof success == "function") {
                    success();
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "wizards",
                    action: "delete",
                    params: JSON.stringify({
                        id: id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.status);
                    } else {
                        success(false);
                    }
                }, failure);
            }
        }

        return {
            get: get,
            insert: addWizard,
            remove: deleteWizard,
            update: updateWizard,
            find: findWizard,
            settings: getSettings
        }
    })();

    let Subjects = (() => {
        let _subjects = Constants.subjects;
        let _offset = 1;

        /**
         * Get all Subjects.
         * @param {number} wizard_id 
         * @param {function} success
         * @param {function}  failure
         * @return {void}
         */
        const get = (wizard_id, success, failure) => {
            if (env === "demo") {
                let results = [];
                for (let i = 0; i < _subjects.length; i ++) {
                    if (_subjects[i].wizard_id == wizard_id) {
                        let type = AnswerTypes.find(_subjects[i].type_id);
                        let cur = _subjects[i];
                        cur.type_name = type.type_name;
                        results.push(cur);
                    }
                }
                if (typeof success === "function") {
                    success(results);
                } else {
                    return results;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "subjects",
                    action: "get_all",
                    params: JSON.stringify({
                        wizard_id: wizard_id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.subjects);
                    } else {
                        success([]);
                    }
                }, failure);
            }
        }

        /**
         * Create a new subject.
         * @param {object} params 
         * @param {function} success 
         * @param {function} failure
         * @return {number}
         */
        const createSubject = (params, success, failure) => {
            if (env === "demo") {
                let tempSubject = {
                    id: _offset,
                    question: params.question || "No title",
                    type_id: params.type_id || 1,
                    wizard_id: params.wizard_id,
                    answers: JSON.stringify(params.answers || [{ caption: "", value: "", weight: 100, next: null }])
                };
                _subjects.push(tempSubject);
                _offset++;

                if (typeof success === "function") {
                    success(tempSubject);
                } else {
                    return offset -1;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "subjects",
                    action: "create",
                    params: JSON.stringify({
                        question: params.question || "No title",
                        type_id: params.type_id || 1,
                        wizard_id: params.wizard_id,
                        answers: JSON.stringify(params.answers || [{ caption: "", value: "", weight: 100, next: null }])
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.subject_id);
                    } else {
                        success([]);
                    }
                }, failure);
            }
        }

        /**
         * Find an existing Subject.
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure
         * @return {object}
         */
        const findSubject = (id, success, failure) => {
            if (env === "demo") {
                let subject = null;

                for (let i = 0; i < _subjects.length; i ++) {
                    if (_subjects[i].id == id) {
                        subject = _subjects[i];
                        break;
                    }
                }

                if (typeof success === "function") {
                    success(subject);
                } else {
                    return subject;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "subjects",
                    action: "get",
                    params: JSON.stringify({
                        id: id
                    })
                }, (response) => {
                    if (response.status) {
                        let subject = response.subject;

                        if (typeof subject.answers == "string") {
                            subject.answers = JSON.parse(subject.answers);
                        }
                        success(response.subject);
                    } else {
                        success({});
                    }
                }, failure);
            }
                
        }

        /**
         * Update an existing subject.
         * @param {number} id 
         * @param {object} params 
         * @param {function} success 
         * @param {function} failure
         * @return {boolean}
         */
        const updateSubject = (id, params, success, failure) => {
            if (env === "demo") {
                let flag = false;
                for (let i = 0; i < _subjects.length; i ++) {
                    if (_subjects[i].id == id) {
                        for (let p in _subjects[i]) {
                            if (params[p]) {
                                _subjects[i][p] = params[p];
                            }
                        }
                        flag = true;
                        break;
                    }
                }

                if (typeof success == "function") {
                    success({status: flag});
                } else {
                    return flag;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "subjects",
                    action: "update",
                    params: JSON.stringify({
                        id: id,
                        question: params.question || "No title",
                        type_id: params.type_id || 1,
                        wizard_id: params.wizard_id,
                        answers: JSON.stringify(params.answers || [{ caption: "", value: "", weight: 100, next: null }])
                    })
                }, (response) => {
                    if (response.status) {
                        success(response);
                    } else {
                        success(false);
                    }
                }, failure);
            }
        }

        /**
         * Delete a subject with the ID.
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure
         */
        const deleteSubject = (id, success, failure) => {
            if (env === "demo") {
                _subjects = _subjects.filter(subject => subject.id != id);

                if (typeof success === "function") {
                    success();
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "subjects",
                    action: "delete",
                    params: JSON.stringify({
                        id: id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.status);
                    } else {
                        success(false);
                    }
                }, failure);
            }
        }

        return {
            get: get,
            find: findSubject,
            insert: createSubject,
            update: updateSubject,
            remove: deleteSubject
        }
    })();

    /**
     * Calculations made with answers given by leads
     */
    let Calculations = (() => {
        let _calculations = Constants.calculations;
        let _offset = 1;

        /**
         * Get all Calculations.
         * @param {number} wizard_id 
         * @param {function} success 
         * @param {function} failure
         * @return {array}
         */
        const get = (wizard_id, success, failure) => {
            if (env === "demo") {
                let results = [];
                for (let i = 0; i < _calculations.length; i ++) {
                    if (_calculations[i].wizard_id == wizard_id) {
                        let cur = _calculations[i];
                        results.push(cur);
                    }
                }
                if (typeof success === "function") {
                    success(results);
                } else {
                    return results;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "calculations",
                    action: "get_all",
                    params: JSON.stringify({
                        wizard_id: wizard_id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.calculations);
                    } else {
                        success([]);
                    }
                }, failure);
            }
                
        }

        /**
         * Create a new Calculation.
         * @param {object} params 
         * @param {function} success 
         * @param {function} failure
         * @return {number}
         */
        const createCalculation = (params, success, failure) => {
            if (env === "demo") {
                let tempCalculation = {
                    id: _offset,
                    name: params.name || "No title",
                    wizard_id: params.wizard_id,
                    operator: params.operator,
                    factors: (typeof params.factors == "string") ? params.factors : JSON.stringify(params.factors)
                };
                _calculations.push(tempCalculation);
                _offset++;

                if (typeof success === "function") {
                    success(tempCalculation);
                } else {
                    return offset -1;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "calculations",
                    action: "create",
                    params: JSON.stringify({
                        name: params.name,
                        wizard_id: params.wizard_id,
                        operator: params.operator,
                        factors: JSON.stringify(params.factors)
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.subject_id);
                    } else {
                        success(null);
                    }
                }, failure);
            }
                
        }

        /**
         * Find an existing Calculation.
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure
         * @return {object}
         */
        const findCalculation = (id, success, failure) => {
            if (env === "demo") {
                let calculation = null;

                for (let i = 0; i < _calculations.length; i ++) {
                    if (_calculations[i].id == id) {
                        calculation = _calculations[i];
                        break;
                    }
                }

                if (typeof success === "function") {
                    success(calculation);
                } else {
                    return calculation;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "calculations",
                    action: "get",
                    params: JSON.stringify({
                        id: id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.calculation);
                    } else {
                        success([]);
                    }
                }, failure);
            }
        }

        /**
         * Update an existing Calculation.
         * @param {number} id 
         * @param {object} params 
         * @param {function} success 
         * @param {function} failure
         * @return {boolean}
         */
        const updateCalculation = (id, params, success, failure) => {
            if (env === "demo") {
                let flag = false;
                for (let i = 0; i < _calculations.length; i ++) {
                    if (_calculations[i].id == id) {
                        for (let p in _calculations[i]) {
                            if (params[p]) {
                                _calculations[i][p] = (typeof params[p] == "object") ? JSON.stringify(params[p]) : params[p];
                            }
                        }
                        flag = true;
                        break;
                    }
                }

                if (typeof success == "function") {
                    success({status: flag});
                } else {
                    return flag;
                }
            } else {
                params.id = id;

                if (typeof params.factors == "object") {
                    params.factors = JSON.stringify(params.factors);
                }
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "calculations",
                    action: "update",
                    params: JSON.stringify(params)
                }, (response) => {
                    if (response.status) {
                        success(response.status);
                    } else {
                        success(false);
                    }
                }, failure);
            }
                
        }

        /**
         * Delete a Calculation with the ID.
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure
         */
        const deleteCalculation = (id, success, failure) => {
            if (env === "demo") {
                _calculations = _calculations.filter(calculation => calculation.id != id);

                if (typeof success === "function") {
                    success();
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "calculations",
                    action: "delete",
                    params: JSON.stringify({
                        id: id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.status);
                    } else {
                        success(false);
                    }
                }, failure);
            }
        }

        return {
            get: get,
            find: findCalculation,
            insert: createCalculation,
            update: updateCalculation,
            remove: deleteCalculation
        }
    })();

    /**
     * Analyses made with answers given by leads
     */
    let Analyses = (() => {
        let _analyses = Constants.analyses;
        let _offset = 2;

        /**
         * Get subjects and calculations belong to a wizard. This will be used to create analyses.
         * @param {number} wizard_id 
         * @param {function} success 
         * @param {function} failure 
         */
        const getOptions = (wizard_id, success, failure) => {
            let subjects = [];
            let calculations = [];
            if (env === "demo") {
                subjects = Subjects.get(wizard_id);
                calculations = Calculations.get(wizard_id);

                if (typeof success === "function") {
                    success({subjects, calculations});
                } else {
                    return {
                        subjects,
                        calculations
                    };
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "analyses",
                    action: "option",
                    params: JSON.stringify({
                        wizard_id: wizard_id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.option);
                    } else {
                        success({
                            subjects: [],
                            calculations: [],
                            comparisons:[]
                        });
                    }
                }, failure);
            }
        }

        /**
         * Get all analyses.
         * @param {number} wizard_id 
         * @param {function} success 
         * @param {function} failure
         * @return {array}
         */
        const get = (wizard_id, success, failure) => {
            if (env === "demo") {
                let results = [];
                for (let i = 0; i < _analyses.length; i ++) {
                    if (_analyses[i].wizard_id == wizard_id) {
                        let cur = _analyses[i];
                        results.push(cur);
                    }
                }
                if (typeof success === "function") {
                    success(results);
                } else {
                    return results;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "analyses",
                    action: "get_all",
                    params: JSON.stringify({
                        wizard_id: wizard_id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.analyses);
                    } else {
                        success([]);
                    }
                }, failure);
            }
                
        }

        /**
         * Create a new Analysis.
         * @param {object} params 
         * @param {function} success 
         * @param {function} failure
         * @return {number}
         */
        const createAnalysis = (params, success, failure) => {
            if (env === "demo") {
                let tempAnalysis = {
                    id: _offset,
                    name: params.name || "No title",
                    wizard_id: params.wizard_id,
                    result: params.result,
                    condition: (typeof params.condition == "string") ? params.condition : JSON.stringify(params.condition)
                };
                _analyses.push(tempAnalysis);
                _offset++;

                if (typeof success === "function") {
                    success(tempAnalysis);
                } else {
                    return offset -1;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "analyses",
                    action: "create",
                    params: JSON.stringify({
                        name: params.name,
                        wizard_id: params.wizard_id,
                        result: params.result,
                        condition: (typeof params.condition == "string") ? params.condition : JSON.stringify(params.condition)
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.subject_id);
                    } else {
                        success(null);
                    }
                }, failure);
            }
                
        }

        /**
         * Find an existing Analysis.
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure
         * @return {object}
         */
        const findAnalysis = (id, success, failure) => {
            if (env === "demo") {
                let analysis = null;

                for (let i = 0; i < _analyses.length; i ++) {
                    if (_analyses[i].id == id) {
                        analysis = _analyses[i];
                        break;
                    }
                }

                if (typeof success === "function") {
                    success(analysis);
                } else {
                    return analysis;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "analyses",
                    action: "get",
                    params: JSON.stringify({
                        id: id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.analysis);
                    } else {
                        success([]);
                    }
                }, failure);
            }
        }

        /**
         * Update an existing analysis.
         * @param {number} id 
         * @param {object} params 
         * @param {function} success 
         * @param {function} failure
         * @return {boolean}
         */
        const updateAnalysis = (id, params, success, failure) => {
            if (env === "demo") {
                let flag = false;
                for (let i = 0; i < _analyses.length; i ++) {
                    if (_analyses[i].id == id) {
                        for (let p in _analyses[i]) {
                            if (params[p]) {
                                _analyses[i][p] = (typeof params[p] == "object") ? JSON.stringify(params[p]) : params[p];
                            }
                        }
                        flag = true;
                        break;
                    }
                }

                if (typeof success == "function") {
                    success({status: flag});
                } else {
                    return flag;
                }
            } else {
                params.id = id;

                if (typeof params.factors == "object") {
                    params.factors = JSON.stringify(params.factors);
                }
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "analyses",
                    action: "update",
                    params: JSON.stringify(params)
                }, (response) => {
                    if (response.status) {
                        success(response.status);
                    } else {
                        success(false);
                    }
                }, failure);
            }
                
        }

        /**
         * Delete a Analysis with the ID.
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure
         */
        const deleteAnalysis = (id, success, failure) => {
            if (env === "demo") {
                _analyses = _analyses.filter(analysis => analysis.id != id);

                if (typeof success === "function") {
                    success(true);
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "analyses",
                    action: "delete",
                    params: JSON.stringify({
                        id: id
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.status);
                    } else {
                        success(false);
                    }
                }, failure);
            }
        }

        return {
            get: get,
            options: getOptions,
            find: findAnalysis,
            insert: createAnalysis,
            update: updateAnalysis,
            remove: deleteAnalysis
        }
    })();


    /**
     * Questions and Answers result given by leads.
     */
    let Results = (() => {
        let _results = Constants.results;
        let _answers = Constants.answers;
        let _resultOffset = 2;
        let _answerOffset = 30;

        /**
         * 
         * @param {number} userID 
         * @param {function} success 
         * @param {function} failure 
         * @return {void}
         */
        const getResults = (userID, success, failure) => {
            if (env === "demo") {
                if (typeof success === "function") {
                    success(_results);
                } else {
                    return _results;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "results",
                    action: "get_all",
                    params: JSON.stringify({
                        user_id: userID
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.results);
                    } else {
                        success(response.results || []);
                    }
                }, failure);
            }
        };

        /**
         * Retrieve a result with result Identity.
         * @param {number} id 
         * @param {function} success 
         * @param {function} failure 
         * @return {void}
         */
        const findResult = (id, success, failure) => {
            if (env === "demo") {
                let results = _results.filter(result => result.id == id);

                if (results.length > 0) {
                    let result = results[0];
                    let answers = _answers.filter(answer => answer.result_id == results[0].id);
                    if (typeof success === "function") {
                        success({
                            result,
                            answers
                        });
                    } else {
                        return {
                            result,
                            answers
                        };
                    }
                } else {
                    if (typeof success === "function") {
                        success({
                            result: null,
                            answers: []
                        });
                    } else {
                        return {
                            result: null,
                            answers: []
                        };
                    }
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "results",
                    action: "get",
                    params: JSON.stringify({
                        id: id
                    })
                }, (response) => {
                    if (response.status) {
                        success({
                            result: response.result,
                            answers: response.answers
                        });
                    } else {
                        return ({
                            result: null,
                            answers: []
                        })
                    }
                }, failure);
            }
        };

        /**
         * Get all results given to a specific wizard.
         * @param {number} wizardId 
         * @param {function} success 
         * @param {function} failure 
         * @return {array}
         */
        const findResultsByWizard = (wizardId, success, failure) => {
            if (env === "demo") {
                let results = _results.filter(result => result.wizard_id == wizardId);

                if (typeof success === "function") {
                    success(results);
                } else {
                    return results;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "results",
                    action: "get_by_wizard",
                    params: JSON.stringify({
                        wizard_id: wizardId
                    })
                }, (response) => {
                    if (response.status) {
                        success(response.results);
                    } else {
                        return ([])
                    }
                }, failure);
            }
        }

        /**
         * Create a new result with answers given by leads
         * @param {number} user_id
         * @param {number} wizard_id 
         * @param {array} answers 
         * @param {function} success 
         * @param {function} failure 
         * @return {array} in case of that there are no callback function in parameter.
         */
        const createResult = (user_id, wizard_id, answers, success, failure) => {
            let result = {
                id: _resultOffset,
                user_id: user_id,
                wizard_id,
                analysis: null
            };

            if (env === "demo") {
                _results.push(result);

                for (let i = 0; answers && i < answers.length; i ++) {
                    answers[i].id = _answerOffset;
                    answers[i].result_id = _resultOffset;
                    _answerOffset++;
                }
                _answers = _answers.concat(answers);

                if (typeof success === "function") {
                    success({
                        id: _resultOffset
                    });
                } else {
                    return {
                        id: _resultOffset
                    };
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "results",
                    action: "create",
                    params: JSON.stringify({
                        result: result,
                        answers: answers
                    })
                }, (response) => {
                    if (response.status) {
                        success({
                            id: response.id
                        });
                    } else {
                        return ({
                            id: null
                        })
                    }
                }, failure);
            }
        }

        return {
            get: getResults,
            find: findResult,
            fromWizard: findResultsByWizard,
            insert: createResult
        };
    })();

    return {
        Types: AnswerTypes,
        Wizards: Wizards,
        Subjects: Subjects,
        Calculations: Calculations,
        Analysis: Analyses,
        Results: Results
    }
    
})();