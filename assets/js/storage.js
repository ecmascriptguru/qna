/**
 * Questions and Answers Rendering Tool
 * Created By Alexis Richard
 * ecmascript.guru@gmail.com
 * Created At June 10, 2017
 */
let DataStorage = (() => {
    let AnswerTypes = (() => {
        const _types = Constants.types;

        /**
         * Getting all of Answer Types. Callback function can be null or empty
         * @param {function} callback 
         * @return {array}
         */
        const get = (callback) => {
            if (typeof callback === "function") {
                callback(_types);
            } else {
                return _types;
            }
        }

        /**
         * Find a Answer Type with ID.
         * @param {number} id 
         * @param {function} callback 
         * @return {object}
         */
        const find = (id, callback) => {
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
         * @param {function} callback 
         * @return {array}
         */
        const get = (callback) => {
            if (typeof callback === "function") {
                callback(_wizards);
            } else {
                return _wizards;
            }
        }

        /**
         * Create a new wizard with the given name parameter.
         * @param {object} name 
         * @param {function} callback 
         */
        const addWizard = (params, callback) => {
            wizard = {
                id: _offset,
                name: params.name,
                starts_with: params.starts_with
            }
            _wizards.push(wizard);
            _offset++;

            if (typeof callback === "function") {
                callback({id: _offset - 1});
            } else {
                return _offset - 1;
            }
        }

        /**
         * Update an existing wizard
         * @param {number} id 
         * @param {object} params 
         * @param {function} callback 
         * @return {boolean}
         */
        const updateWizard = (id, params, callback) => {
            let flag = false;
            for (let i = 0; i < _wizards.length; i ++) {
                if (_wizards[i].id == id) {
                    _wizards[i].name = params.newName;
                    _wizards[i].starts_with = params.starts_with;
                    flag = true;
                    break;
                }
            }
            
            if (typeof callback == "function") {
                callback(flag);
            }
        }

        /**
         * Retrieve wizards with ID.
         * @param {number} id 
         * @param {function} callback 
         */
        const findWizard = (id, callback) => {
            for (let i = 0; i < _wizards.length; i ++) {
                if (_wizards[i].id == id) {
                    if (typeof callback === "function") {
                        callback(_wizards[i]);
                        break;
                    }
                }
            }
        }

        /**
         * 
         * @param {number} id 
         * @param {function} callback 
         */
        const deleteWizard = (id, callback) => {
            _wizards = _wizards.filter(wizard => wizard.id != id);
            if (typeof callback == "function") {
                callback();
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
         * @param {function} callback 
         * @return {array}
         */
        const get = (wizard_id, callback) => {
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
                    let type = AnswerTypes.find(_analytics[i].type_id);
                    let cur = _analytics[i];
                    cur.type_name = type.type_name;
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
                question: params.question || "No title",
                type_id: params.type_id || 1,
                wizard_id: params.wizard_id,
                answers: JSON.stringify(params.answers || AnswerTypes.find(1).value)
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
                            _analytics[i][p] = params[p];
                        }
                    }
                    // _analytics[i].question = params.question;
                    // _analytics[i].type_id = params.type_id;
                    // _analytics[i].answers = params.answers;
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