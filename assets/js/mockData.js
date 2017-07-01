let Constants = {
    types: [
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
    ],

    wizards: [
        // {
        //     id: 1,
        //     name: "Demo Wizard 1",
        //     starts_with: null
        // },
        // {
        //     id: 2,
        //     name: "Demo Wizard 2",
        //     starts_with: null
        // },
        {
            id: 3,
            name: "Demo for Admin UI including analysis",
            starts_with: 1
        }
    ],

    subjects: [
        {
            id: 1,
            wizard_id: "3",
            question: "How much do you want for it?",
            type_id: 2,
            type_name: "Number Field",
            answers: "[{\"caption\":\"\",\"value\":\"\",\"weight\":\"0\",\"next\":\"2\"}]"
        },{
            id: 2,
            wizard_id: "3",
            question: "How much do you think it's worth?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 3
            }])
        },{
            id: 3,
            wizard_id: "3",
            question: "Why?",
            type_id: 1,
            type_name: "Text Field",
            answers: "[{\"caption\":\"\",\"value\":\"\",\"weight\":\"0\",\"next\":\"4\"}]"
        },{
            id: 4,
            wizard_id: "3",
            question: "How did you come up with the price?",
            type_id: 4,
            type_name: "Multiple Choice",
            answers: JSON.stringify([
                {
                    caption: "Comparable Sales",
                    value: "Comparable Sales",
                    weight: 25,
                    next: 5
                },
                {
                    caption: "Zestimate",
                    value: "Zestimate",
                    weight: 25,
                    next: 5
                },
                {
                    caption: "Realtor",
                    value: "Realtor",
                    weight: 25,
                    next: 5
                },
                {
                    caption: "Guess",
                    value: "Guess",
                    weight: 25,
                    next: 5
                }
            ])
        },
        {
            id: 5,
            wizard_id: "3",
            question: "How much will it rent for? (number)",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 6
            }])
        },
        {
            id: 6,
            wizard_id: "3",
            question: "Is it vacant?",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([
                {
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 7
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: 7
                }
            ])
        },
        {
            id: 7,
            wizard_id: "3",
            question: "Does it need repairs?",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([
                {
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 8
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: 8
                }
            ])
        },
        {
            id: 8,
            wizard_id: "3",
            question: "Approximate cost to repair?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 9
            }])
        },
        {
            id: 9,
            wizard_id: "3",
            question: "How long have you owned it?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "Years",
                value: 1,
                weight: 100,
                next: 10
            }])
        },
        {
            id: 10,
            wizard_id: "3",
            question: "First mortgage balance?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 11
            }])
        },
        {
            id: 11,
            wizard_id: "3",
            question: "Payment amount? PITI - Principle, Interest, Taxes and Insurance",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 12
            }])
        },
        
        {
            id: 12,
            wizard_id: "3",
            question: "Years to payoff?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 13
            }])
        },
        {
            id: 13,
            wizard_id: "3",
            question: "Interest rate fixed or adjustable?",
            type_id: 3,
            type_name: "Drop Down",
            answers: JSON.stringify([{
                    caption: "Fixed",
                    value: "Fixed",
                    weight: 50,
                    next: 14
                },
                {
                    caption: "Adjustable",
                    value: "Adjustable",
                    weight: 50,
                    next: 14
                }
            ])
        },
        {
            id: 14,
            wizard_id: "3",
            question: "Interest rate?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 15
            }])
        },
        {
            id: 15,
            wizard_id: "3",
            question: "Second mortgage balance?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 16
            }])
        },
        {
            id: 16,
            wizard_id: "3",
            question: "Payment amount?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 17
            }])
        },
        {
            id: 17,
            wizard_id: "3",
            question: "Years to payoff?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 18
            }])
        },
        {
            id: 18,
            wizard_id: "3",
            question: "Interest rate fixed or adjustable?",
            type_id: 3,
            type_name: "Drop Down",
            answers: JSON.stringify([{
                    caption: "Fixed",
                    value: "Fixed",
                    weight: 50,
                    next: 19
                },
                {
                    caption: "Adjustable",
                    value: "Adjustable",
                    weight: 50,
                    next: 19
                }
            ])
        },
        {
            id: 19,
            wizard_id: "3",
            question: "Interest rate?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 20
            }])
        },
        {
            id: 20,
            wizard_id: "3",
            question: "Additional mortgage owed?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 21
            }])
        },
        {
            id: 21,
            wizard_id: "3",
            question: "Is there a monthly HOA fee? (Home Owners Association)",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([{
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 22
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: 23
                }
            ])
        },
        {
            id: 22,
            wizard_id: "3",
            question: "If yes, how much is the HOA fee?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 23
            }])
        },
        {
            id: 23,
            wizard_id: "3",
            question: "Are the payments current?",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([{
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 25
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: 24
                }
            ])
        },
        {
            id: 24,
            wizard_id: "3",
            question: "If not, balance of arrears?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 25
            }])
        },
        {
            id: 25,
            wizard_id: "3",
            question: "Why are you selling?",
            type_id: 1,
            type_name: "Text Field",
            answers: JSON.stringify([{
                caption: "",
                value: "",
                weight: 100,
                next: 26
            }])
        },
        {
            id: 26,
            wizard_id: "3",
            question: "Do you have to sell or would you consider keeping it and why?",
            type_id: 1,
            type_name: "Text Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 27
            }])
        },
        {
            id: 27,
            wizard_id: "3",
            question: "Are you moving out of the area?",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([{
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 28
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: 28
                }
            ])
        },

        
        {
            id: 28,
            wizard_id: "3",
            question: "If yes, where?",
            type_id: 1,
            type_name: "Text Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 29
            }])
        },
        {
            id: 29,
            wizard_id: "3",
            question: "How soon do you have to move? (Days)",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: null
            }])
        },
    ],

    calculations: [
        {
            id: 1,
            wizard_id: 3,
            name: "V1: calculates difference between asking price and value",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 1,
                    coeff: 1
                },
                {
                    id: 2,
                    coeff: -1
                }
            ])
        },
        {
            id: 2,
            wizard_id: 3,
            name: "V2: Monthly property management fee.",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 0.1
                }
            ])
        },
        {
            id: 3,
            wizard_id: 3,
            name: "V3: Total owed:",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 10,
                    coeff: 1
                },
                {
                    id: 15,
                    coeff: 1
                }
            ])
        },
        {
            id: 4,
            wizard_id: 3,
            name: "V4: Total payment",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 11,
                    coeff: 1
                },
                {
                    id: 16,
                    coeff: 1
                }
            ])
        },
        {
            id: 5,
            wizard_id: 3,
            name: "V5: Cash Flow",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 0.9
                },
                {
                    id: 11,
                    coeff: -1
                },
                {
                    id: 16,
                    coeff: -1
                }
            ])
        },
        {
            id: 6,
            wizard_id: 3,
            name: "V6: Annual Cashflow Potential",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 10.8
                },
                {
                    id: 11,
                    coeff: -12
                },
                {
                    id: 16,
                    coeff: -12
                }
            ])
        },
        {
            id: 7,
            wizard_id: 3,
            name: "V7: Annual gross income potential",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 12
                }
            ])
        },
        {
            id: 8,
            wizard_id: 3,
            name: "V8: Annual net income potential",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 10.8
                },
                {
                    id: 11,
                    coeff: -12
                },
                {
                    id: 16,
                    coeff: -12
                }
            ])
        },
        {
            id: 9,
            wizard_id: 3,
            name: "V9: Annual income after estimated expenses",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 9.8
                },
                {
                    id: 11,
                    coeff: -12
                },
                {
                    id: 16,
                    coeff: -12
                }
            ])
        },
    ],

    analyses: [
        {
            id: 1,
            wizard_id: 3,
            name: "First analysis",
            condition: JSON.stringify({
                subjects: [{
                    id: 4,
                    questoin: "How did you come up with the price?",
                    operator: "==",
                    value: "Zestimate"
                }],
                calculations:[{
                    id: 3,
                    operator: ">",
                    value: "200"
                }]
            }),
            result: "Something here {{Q5}} and {{A7}} on {{Calc3}} and {{Val9}}"
        }
    ],

    results: [
        {
            id: 1,
            user_id: 1,
            wizard_id: 3,
            analysis: null
        }
    ],

    answers: [
        {
            id: 1,
            result_id: 1,
            subject_id: 1,
            value: "356"
        },{
            id: 2,
            result_id: 1,
            subject_id: 2,
            value: "665"
        },{
            id: 3,
            result_id: 1,
            subject_id: 3,
            value: "lorem string blah blah"
        },{
            id: 4,
            result_id: 1,
            subject_id: 4,
            value: "Zestimate"
        },
        {
            id: 5,
            result_id: 1,
            subject_id: 5,
            value: "5578"
        },
        {
            id: 6,
            result_id: 1,
            subject_id: 6,
            value: "Yes"
        },
        {
            id: 7,
            result_id: 1,
            subject_id: 7,
            value: "Yes"
        },
        {
            id: 8,
            result_id: 1,
            subject_id: 8,
            value: "554"
        },
        {
            id: 9,
            result_id: 1,
            subject_id: 9,
            value: "6"
        },
        {
            id: 10,
            result_id: 1,
            subject_id: 10,
            value: "546"
        },
        {
            id: 11,
            result_id: 1,
            subject_id: 11,
            value: "45"
        },
        
        {
            id: 12,
            result_id: 1,
            subject_id: 12,
            value: "24"
        },
        {
            id: 13,
            result_id: 1,
            subject_id: 13,
            value: "Adjustable"
        },
        {
            id: 14,
            result_id: 1,
            subject_id: 14,
            value: "245"
        },
        {
            id: 15,
            result_id: 1,
            subject_id: 15,
            value: "351"
        },
        {
            id: 16,
            result_id: 1,
            subject_id: 16,
            value: "478"
        },
        {
            id: 17,
            result_id: 1,
            subject_id: 17,
            value: "752"
        },
        {
            id: 18,
            result_id: 1,
            subject_id: 18,
            value: "Fixed"
        },
        {
            id: 19,
            result_id: 1,
            subject_id: 19,
            value: "421"
        },
        {
            id: 20,
            result_id: 1,
            subject_id: 20,
            value: "125"
        },
        {
            id: 21,
            result_id: 1,
            subject_id: 21,
            value: "yes"
        },
        {
            id: 22,
            result_id: 1,
            subject_id: 22,
            value: "22"
        },
        {
            id: 23,
            result_id: 1,
            subject_id: 23,
            value: "no"
        },
        {
            id: 24,
            result_id: 1,
            subject_id: 24,
            value: "757"
        },
        {
            id: 25,
            result_id: 1,
            subject_id: 25,
            value: "Balh blah, it's sucks"
        },
        {
            id: 26,
            result_id: 1,
            subject_id: 26,
            value: "Wow, additional text again! You are killing me."
        },
        {
            id: 27,
            result_id: 1,
            subject_id: 27,
            value: "yes"
        },
        {
            id: 28,
            result_id: 1,
            subject_id: 28,
            value: "Don't ask me, ever"
        },
        {
            id: 29,
            result_id: 1,
            subject_id: 29,
            value: "10"
        },
    ],
}