"use strict";

function regexpValidate(re, val) {
    let regExp = new RegExp(re);
    return regExp.test(val);
}

function $value(controlId, component) {
    return component.$store.state.form.data.filter(function (v) {
        return v.controlId == controlId;
    })[0].value;
}

function controlValidation(component) {
    let result = false,
        conditions = component.control.validateConditions,
        conditionsResults = [],
        errorMessages = [],
        componentValue = component.value;

    console.info(`Control changed/mounted, validating "%c${component.control.id}"`, "font-weight: bold;");

    if (conditions) {
        Object.keys(conditions).forEach(function(conditionIndex) {
            let condition = conditions[conditionIndex],
                conditionResult,
                boolExp = condition.booleanExpression,
                errorMessage = condition.errorMessage;

            if (boolExp) {
                Object.keys(boolExp).forEach(function(expr) {
                    switch (expr) {
                        //Lesser than
                        case "$lt":
                            console.log(componentValue,' < ', boolExp[expr]);
                            conditionResult = componentValue < boolExp[expr];
                            break;

                        //Lesser than or equal
                        case "$lte":
                            if (typeof boolExp[expr] === 'object') {
                                let val = $value(boolExp[expr]['$value'], component);
                                conditionResult = componentValue <= val;
                                console.log(componentValue,' <= ', val);
                            } else {
                                conditionResult = componentValue <= boolExp[expr];
                                console.log(componentValue,' <= ', boolExp[expr]);
                            }

                            break;

                        //Greater than
                        case "$gt":
                            console.log(componentValue,' > ', boolExp[expr]);
                            conditionResult = componentValue > boolExp[expr];
                            break;

                        //Greater than or equal
                        case "$gte":
                            if (typeof boolExp[expr] === 'object') {
                                let val = $value(boolExp[expr]['$value'], component);
                                conditionResult = componentValue <= val;
                                console.log(componentValue,' <= ', val);
                            } else {
                                console.log(componentValue, ' >= ', boolExp[expr]);
                                conditionResult = componentValue >= boolExp[expr];
                            }
                            break;

                        //Value is in array
                        case "$in":
                            conditionResult = boolExp[expr].includes(componentValue);
                            console.log(componentValue + conditionResult ? " is in " : " not in " + boolExp[expr]);
                            break;

                        //Regular expression
                        case "$regex":
                            conditionResult = regexpValidate(boolExp[expr], componentValue);
                            console.log('$regex: ' + conditionResult);
                            break;
                    }

                    conditionsResults.push(conditionResult);

                    if (!conditionResult && errorMessage) {
                        errorMessages.push(errorMessage);
                    }
                });
            }
        });

        result = conditionsResults.indexOf(false) === -1;

        if (result) {
            console.log(`Results of validation: %c${component.control.id} — %c${result}`, "font-weight: bold;", "color: green;");
        } else {
            console.log(`Results of validation: %c${component.control.id} — %c${result}`, "font-weight: bold;", "color: red;");
            console.log(`Error messages: %c${component.control.id} — ${errorMessages}`, "font-weight: bold");
        }

    } else {
        result = true;
    }

    component.control.valid = result;
    component.control.errorMessages = errorMessages;

    let newControl = {
        id: component.control.id,
        valid: result
    };

    component.$store.commit('setControlValid', newControl);

    return result;
}

module.exports = controlValidation;