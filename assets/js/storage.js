let DataStorage = (() => {
    let AnswerTypes = (() => {
        const _types = [
            {
                id: 1,
                type_name: "Text Field",
                value: [{
                    caption: "",
                    value: "",
                    weight: 100,
                    next: null
                }]
            },
            {
                id: 2,
                type_name: "Number Field",
                value: [{
                    caption: "",
                    value: 1,
                    min: 1,
                    max: 100,
                    weight: 100,
                    next: null
                }]
            },
            {
                id: 3,
                type_name: "Drop Down",
                value: [{
                        caption: "One",
                        value: "one",
                        weight: 50,
                        next: null
                    },
                    {
                        caption: "Two",
                        value: "two",
                        weight: 50,
                        next: null
                    }
                ]
            },
            {
                id: 4,
                type_name: "Multiple Choice",
                value: [{
                        caption: "One",
                        value: "one",
                        weight: 50,
                        next: null
                    },
                    {
                        caption: "Two",
                        value: "two",
                        weight: 50,
                        next: null
                    }
                ]
            },
            {
                id: 5,
                type_name: "Yes or No",
                value: [{
                        caption: "Yes",
                        value: "yes",
                        weight: 100,
                        next: null
                    },
                    {
                        caption: "No",
                        value: "no",
                        weight: 0,
                        next: null
                    }
                ]
            }
        ];

        const get = (callback) => {
            if (typeof callback === "function") {
                callback(_types);
            }
        }

        const find = (id, callback) => {
            for( let i = 0; i < _types.length; i ++) {
                if (_types[i].id == parseInt(id)) {
                    if (typeof callback === "function") {
                        callback(_types[i]);
                        return false;
                    }
                }
            }
            if (typeof callback === "function") {
                callback(null);
            }
        }

        return {
            get: get,
            find: find
        };
    })();

    let Wizards = (() => {
        let _wizards = [
            {
                id: 1,
                name: "Demo Wizard 1"
            },
            {
                id: 2,
                name: "Demo Wizard 2"
            }
        ];

        let _offset = 3;
        const get = (callback) => {
            if (typeof callback === "function") {
                callback(_wizards);
            }
        }

        const addWizard = (name, callback) => {
            wizard = {
                id: _offset,
                name: name
            }
            _wizards.push(wizard);
            _offset++;

            if (typeof callback === "function") {
                callback();
            }
        }

        const editWizard = (id, newName, callback) => {
            let flag = false;
            for (let i = 0; i < _wizards.length; i ++) {
                if (_wizards[i].id == id) {
                    _wizards[i].name = newName;
                    flag = true;
                    break;
                }
            }
            
            if (typeof callback == "function") {
                callback(flag);
            }
        }

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
            update: editWizard,
            find: findWizard
        }
    })();

    let Subjects = (() => {
        let _subjects = [];
        let _offset = 1;

        const get = (wizard_id, callback) => {
            let results = [];
            for (let i = 0; i < _subjects.length; i ++) {
                if (_subjects[i].wizard_id == wizard_id) {
                    results.push(_subjects[i]);
                }
            }
            if (typeof callback === "function") {
                callback(results);
            }
        }

        const addSubject = (subject, callback) => {
            subject.id = _offset;
            _subjects.push(subject);
            _offset++;

            if (typeof callback === "function") {
                callback();
            }
        }

        return {
            get: get,
            insert: addSubject
        }
    })();

    return {
        Types: AnswerTypes,
        Wizards: Wizards,
        Subjects: Subjects
    }
    
})();