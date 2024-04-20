$(document).ready(function () {
    // Get the form elements
    const fileNameInput = $('#fileName');
    const firstNameInput = $('#firstName');
    const lastNameInput = $('#lastName');
    const emailInput = $('#email');
    const ageInput = $('#age');
    const genderSelect = $('#gender');
    const countryInput = $('#country');

    $("#xmlForm").submit(function (e) {
        e.preventDefault();
        const firstName = firstNameInput.val();
        const lastName = lastNameInput.val();
        const email = emailInput.val();
        const age = ageInput.val();
        const gender = genderSelect.val();
        const country = countryInput.val();


        // Create XML content
        var xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xmlContent += '<person>\n';
        xmlContent += '    <firstName>' + firstName + '</firstName>\n';
        xmlContent += '    <lastName>' + lastName + '</lastName>\n';
        xmlContent += '    <age>' + age + '</age>\n';
        xmlContent += '    <email>' + email + '</email>\n';
        xmlContent += '    <gender>' + gender + '</gender>\n';
        xmlContent += '    <country>' + country + '</country>\n';
        xmlContent += '</person>';

        // Trigger the file download
        downloadXml(xmlContent);
        alert('XML file downloaded successfully!');
        fileNameInput.val('');
        firstNameInput.val('');
        lastNameInput.val('');
        emailInput.val('');
        ageInput.val('');
        genderSelect.val('Male');
        countryInput.val('');

    });

    // Function to download the XML file
    function downloadXml(xmlContent) {
        const fileName = fileNameInput.val();
        var blob = new Blob([xmlContent], { type: 'text/xml' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName + '.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
});