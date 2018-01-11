const displayCondition = require('./../helpers/displayCondition');

function pageValidation(page, $store) {
    console.log('Validating page...');

    let validateResult = true;
    let firstUnvalidControl;

    //TODO: make validation for sections
    page.sections.forEach(function (section) {
        if (displayCondition(section, $store)) {
            section.groups.forEach(function (group) {
                if (group.controls && displayCondition(group, $store)) {
                    group.controls.forEach(function (control) {
                        // Show errors on all page controls
                        $store.commit('setControlShowErrors', {
                            id: control.id,
                            showErrors: true
                        });

                        let unvalidControl = $store.state.form.data.filter(function (v) {
                            return (v.controlId == control.id && !v.valid && v.display);
                        });

                        if (unvalidControl.length > 0) {
                            console.log('Unvalid control:');
                            console.dir(unvalidControl);
                            validateResult = false;

                            if (!firstUnvalidControl) {
                                firstUnvalidControl = unvalidControl;
                            }
                        }
                    });
                }
            });
        }
    });

    console.log(
        `Page validation result: %c${validateResult}`,
        'font-weight: bold;' + validateResult ? 'color: green;' : 'color: red;'
    );

    //Scroll to first unvalid control on page
    if (firstUnvalidControl) {
        console.log( document.getElementById(firstUnvalidControl[0].controlId) );
        document.getElementById(firstUnvalidControl[0].controlId).scrollIntoView(true);
    }

    return validateResult;
}

module.exports = pageValidation;