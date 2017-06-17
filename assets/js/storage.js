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
                        success(response.types);
                    } else {
                        success([]);
                    }
                }, failure);
            }
        }

        /**
         * Find a Answer Type with ID.
         * @param {number} id 
         * @param {function} callback 
         * @return {object}
         */
        const find = (id, success, failure) => {
            if (env === "demo") {
                for( let i = 0; i < _types.length; i ++) {
                    if (_types[i].id == parseInt(id)) {
                        if (typeof callback === "function") {
                            callback(_types[i]);
                            return false;
                        } else {
                            return _types[i];
                        }
                    }
                }
                if (typeof callback === "function") {
                    callback(null);
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
                        success(response.wizard_id);
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
                        name: params.name,
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
            find: findWizard
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
                if (typeof callback === "function") {
                    callback(results);
                } else {
                    return results;
                }
            } else {
                sendRequest(QNAConfig.baseUrl(), {
                    end_point: "wizards",
                    action: "get_all",
                    params: JSON.stringify({})
                }, (response) => {
                    if (response.status) {
                        success(response.types);
                    } else {
                        success([]);
                    }
                }, failure);
            }
        }

        /**
         * Create a new subject.
         * @param {object} params 
         * @param {function} callback 
         * @return {number}
         */
        const createSubject = (params, callback) => {
            let tempSubject = {
                id: _offset,
                question: params.question || "No title",
                type_id: params.type_id || 1,
                wizard_id: params.wizard_id,
                answers: JSON.stringify(params.answers || AnswerTypes.find(1).value)
            };
            _subjects.push(tempSubject);
            _offset++;

            if (typeof callback === "function") {
                callback(tempSubject);
            } else {
                return offset -1;
            }
        }

        /**
         * Find an existing Subject.
         * @param {number} id 
         * @param {function} callback 
         * @return {object}
         */
        const findSubject = (id, callback) => {
            let subject = null;

            for (let i = 0; i < _subjects.length; i ++) {
                if (_subjects[i].id == id) {
                    subject = _subjects[i];
                    break;
                }
            }

            if (typeof callback === "function") {
                callback(subject);
            } else {
                return subject;
            }
        }

        /**
         * Update an existing subject.
         * @param {number} id 
         * @param {object} params 
         * @param {function} callback 
         * @return {boolean}
         */
        const updateSubject = (id, params, callback) => {
            let flag = false;
            for (let i = 0; i < _subjects.length; i ++) {
                if (_subjects[i].id == id) {
                    for (let p in _subjects[i]) {
                        if (params[p]) {
                            _subjects[i][p] = params[p];
                        }
                    }
                    // _subjects[i].question = params.question;
                    // _subjects[i].type_id = params.type_id;
                    // _subjects[i].answers = params.answers;
                    flag = true;
                    break;
                }
            }

            if (typeof callback == "function") {
                callback({status: flag});
            } else {
                return flag;
            }
        }

        /**
         * Delete a subject with the ID.
         * @param {number} id 
         * @param {function} callback 
         */
        const deleteSubject = (id, callback) => {
            _subjects = _subjects.filter(subject => subject.id != id);

            if (typeof callback === "function") {
                callback();
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

    let Analysis = (() => {
        let _analytics = Constants.analysis;
        let _offset = 1;

        /**
         * Get all Analytics.
         * @param {number} wizard_id 
         * @param {function} callback 
         * @return {array}
         */
        const get = (wizard_id, callback) => {
            let results = [];
            for (let i = 0; i < _analytics.length; i ++) {
                if (_analytics[i].wizard_id == wizard_id) {
                    let cur = _analytics[i];
                    results.push(cur);
                }
            }
            if (typeof callback === "function") {
                callback(results);
            } else {
                return results;
            }
        }

        /**
         * Create a new Analysis.
         * @param {object} params 
         * @param {function} callback 
         * @return {number}
         */
        const createAnalysis = (params, callback) => {
            let tempAnalysis = {
                id: _offset,
                name: params.name || "No title",
                wizard_id: params.wizard_id,
                operator: params.operator,
                factors: (typeof params.factors == "string") ? params.factors : JSON.stringify(params.factors)
            };
            _analytics.push(tempAnalysis);
            _offset++;

            if (typeof callback === "function") {
                callback(tempAnalysis);
            } else {
                return offset -1;
            }
        }

        /**
         * Find an existing Analysis.
         * @param {number} id 
         * @param {function} callback 
         * @return {object}
         */
        const findAnalysis = (id, callback) => {
            let analysis = null;

            for (let i = 0; i < _analytics.length; i ++) {
                if (_analytics[i].id == id) {
                    analysis = _analytics[i];
                    break;
                }
            }

            if (typeof callback === "function") {
                callback(analysis);
            } else {
                return analysis;
            }
        }

        /**
         * Update an existing Analysis.
         * @param {number} id 
         * @param {object} params 
         * @param {function} callback 
         * @return {boolean}
         */
        const updateAnalysis = (id, params, callback) => {
            let flag = false;
            for (let i = 0; i < _analytics.length; i ++) {
                if (_analytics[i].id == id) {
                    for (let p in _analytics[i]) {
                        if (params[p]) {
                            _analytics[i][p] = (typeof params[p] == "object") ? JSON.stringify(params[p]) : params[p];
                        }
                    }
                    flag = true;
                    break;
                }
            }

            if (typeof callback == "function") {
                callback({status: flag});
            } else {
                return flag;
            }
        }

        /**
         * Delete a Analysis with the ID.
         * @param {number} id 
         * @param {function} callback 
         */
        const deleteAnalysis = (id, callback) => {
            _analytics = _analytics.filter(analysis => analysis.id != id);

            if (typeof callback === "function") {
                callback();
            }
        }

        return {
            get: get,
            find: findAnalysis,
            insert: createAnalysis,
            update: updateAnalysis,
            remove: deleteAnalysis
        }
    })();

    

    return {
        Types: AnswerTypes,
        Wizards: Wizards,
        Subjects: Subjects,
        Analysis: Analysis
    }
    
})();